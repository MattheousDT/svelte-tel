import {
	COUNTRIES,
	TERRITORIES,
	type Country,
	type CountryCode,
	type Region,
	type Subregion,
} from "./countries.js";

type SveltelConfig = {
	defaultCountry?: CountryCode;
	defaultValue?: string;
	excludedCountries?: CountryCode[];
	excludedTerritories?: CountryCode[];
	excludedRegions?: Region[];
	excludedSubregions?: Subregion[];
	includeTerritories?: boolean;
};

/**
 * Svelte 5 telephone input state management
 */
export class Sveltel {
	/* ---- Non-reactive ---- */
	#excludedCountries: CountryCode[] = [];
	#excludedTerritories: CountryCode[] = [];
	#excludedRegions: Region[] = [];
	#excludedSubregions: Subregion[] = [];
	#includeTerritories = false;

	/* ---- State ---- */
	/**
	 * If the user has selected a country, this will be the preferred country.
	 * This will be preferred in future if the number matches the country.
	 * e.g. A user prefers Canada, future +1 numbers will be matched to Canada.
	 */
	#preferredCountry = $state<Country | undefined>();
	/** Raw input value from the user. This should be sanitised to only include numbers */
	#inputValue = $state<string | undefined>();

	/* ---- Private Methods ---- */

	#formatNumber = (num: string | undefined) => {
		// Step 1: Ensure number starts with +
		if (!num) return "+";

		// Step 2: Detect country code
		if (!this.#country) return `+${num}`;

		// Step 3: Apply formatting on number until current point
		const format =
			this.#country.format ??
			Array(
				// Maxiumum length of number is 15 including international calling prefix and dial code
				// https://en.wikipedia.org/wiki/Telephone_number
				15 - 1 - this.#country.dialCode.length,
			)
				.fill("0")
				.join("");
		let numI = this.#country.dialCode.length;
		let formatI = -1; // Start at -1 to account for the space between dial code and number
		let formattedNum = `+${this.#country.dialCode}`;
		num = num.replace(/\D/g, "");

		console.log(format);

		while (numI < num.length && formatI < format.length) {
			if (format[formatI] === "0") {
				formattedNum += num[numI];
				numI++;
			} else {
				// Add format character
				// Note: If format character is not found, add a space. This is the character between the dial code and the number.
				// We do this here so the user can backspace correctly.
				formattedNum += format[formatI] ?? " ";
			}
			formatI++;
		}

		// Step 4: Return formatted number
		return formattedNum;
	};

	#numberMatchesCountry = (num: string, country: Country) => {
		const startsWithDialCode = num.startsWith(country.dialCode);

		if (startsWithDialCode && "areaCodes" in country && country.areaCodes) {
			const areaCode = country.areaCodes.find((code) =>
				code.startsWith(num.slice(country.dialCode.length, code.length)),
			);
			if (areaCode) return true;
		}

		return startsWithDialCode;
	};

	#detectCountry = (num: string) => {
		// Get all possible countries
		const possibleCountries = this.countries.filter((c) => num.startsWith(c.dialCode));

		// Sort by dial code length
		possibleCountries.sort((a, b) => b.dialCode.length - a.dialCode.length);

		// Sort by priority
		possibleCountries.sort((a, b) => (a.priority ?? 0) + (b.priority ?? 0));

		// Check if country has area codes and if number matches
		for (const country of possibleCountries) {
			if ("areaCodes" in country && country.areaCodes) {
				const match = country.areaCodes.find((code) => num.startsWith(country.dialCode + code));
				if (match) return country;
			}
		}

		// Return first country
		return possibleCountries[0];
	};

	#sanitizeNumber = (num: string) => {
		return num.replace(/\D/g, "");
	};

	/* ---- Derived ---- */

	#detectedCountry = $derived<Country | undefined>(this.#detectCountry(this.#inputValue ?? ""));
	#country = $derived.by(() => {
		if (this.#preferredCountry) {
			const c = this.countries.find((c) => c.code === this.#preferredCountry!.code);
			if (!c) return this.#detectedCountry;
			if (this.#numberMatchesCountry(this.#inputValue ?? "", c)) return c;
		}
		return this.#detectedCountry;
	});
	#value = $derived(this.#formatNumber(this.#inputValue));

	/* ---- Constructor ---- */

	constructor(config: SveltelConfig) {
		if (config.defaultCountry) {
			const c = this.countries.find((c) => c.code === config.defaultCountry?.toLowerCase());
			if (!c) throw new Error("Invalid country code");
			this.#inputValue = c.dialCode;
		}

		if (config.defaultValue) {
			this.#inputValue = this.#sanitizeNumber(config.defaultValue);
		}

		this.#excludedCountries = config.excludedCountries ?? [];
		this.#excludedTerritories = config.excludedTerritories ?? [];
		this.#excludedRegions = config.excludedRegions ?? [];
		this.#excludedSubregions = config.excludedSubregions ?? [];
		this.#includeTerritories = config.includeTerritories ?? false;
	}

	/* ---- Public Methods ---- */

	get value() {
		return this.#value;
	}

	set value(val: string) {
		this.#inputValue = this.#sanitizeNumber(val);
	}

	get rawValue() {
		return this.#value.replace(/\D/g, "");
	}

	get country() {
		return this.#country?.code ?? null;
	}

	set country(code: CountryCode | null) {
		code = code?.toLowerCase() ?? null;
		const c = this.countries.find((c) => c.code === code);
		if (!c) throw new Error("Invalid country code");
		this.#preferredCountry = c;

		// Try updating current value
		if (this.#detectedCountry && this.#inputValue) {
			// Replace dial code with new country dial code
			this.#inputValue = this.#inputValue.replace(this.#detectedCountry.dialCode, c.dialCode);
		}
	}

	get countryData() {
		return this.#country;
	}

	get countries() {
		let countries: Country[] = COUNTRIES;

		// Include territories
		if (this.#includeTerritories) {
			countries = countries.concat(TERRITORIES).sort((a, b) => (a.name > b.name ? 1 : -1));
		}

		// Exclude countries
		if (this.#excludedCountries.length) {
			countries = countries.filter(
				(c) => !this.#excludedCountries.map((x) => x.toLowerCase()).includes(c.code),
			);
		}

		// Exclude territories
		if (this.#excludedTerritories.length) {
			countries = countries.filter(
				(c) => !this.#excludedTerritories.map((x) => x.toLowerCase()).includes(c.code),
			);
		}

		// Exclude regions
		if (this.#excludedRegions.length) {
			countries = countries.filter(
				(c) => !c.regions.some((r) => this.#excludedRegions.includes(r as Region)),
			);
		}

		// Exclude subregions
		if (this.#excludedSubregions.length) {
			countries = countries.filter(
				(c) => !c.regions.some((s) => this.#excludedSubregions.includes(s as Subregion)),
			);
		}

		return countries;
	}
}
