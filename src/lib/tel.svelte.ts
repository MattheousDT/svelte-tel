import { tick } from "svelte";
import {
	COUNTRIES,
	TERRITORIES,
	type Country,
	type CountryCode,
	type Region,
	type Subregion,
} from "./countries.js";
import { detectCountry, formatNumber, pickAppropriateCountry, sanitizeNumber } from "./utils.js";

/** Configuration options for the Tel instance. */
export type SveltelConfig = {
	/** The default country to use. */
	defaultCountry?: CountryCode;
	/** The default phone number to use. */
	defaultValue?: string;
	/** Countries to exclude from the list. */
	excludedCountries?: CountryCode[];
	/** Territories to exclude from the list. */
	excludedTerritories?: CountryCode[];
	/** Regions to exclude from the list. */
	excludedRegions?: Region[];
	/** Subregions to exclude from the list. */
	excludedSubregions?: Subregion[];
	/** Whether to include territories in the list. */
	includeTerritories?: boolean;
};

export class Tel {
	/* ---- State ---- */
	excludedCountries: CountryCode[] = $state([]);
	excludedTerritories: CountryCode[] = $state([]);
	excludedRegions: Region[] = $state([]);
	excludedSubregions: Subregion[] = $state([]);
	includeTerritories = $state(false);
	/**
	 * If the user has selected a country, this will be the preferred country.
	 * This will be preferred in future if the number matches the country.
	 * e.g. A user prefers Canada, future +1 numbers will be matched to Canada.
	 */
	#preferredCountry = $state<Country | undefined>();
	/** Raw input value from the user. This should be sanitised to only include numbers */
	#inputValue = $state<string | undefined>();

	/* ---- Derived ---- */

	#detectedCountry = $derived<Country | undefined>(
		detectCountry(this.#inputValue ?? "", this.countries),
	);
	#country = $derived(
		pickAppropriateCountry(
			this.#inputValue ?? "",
			this.#detectedCountry,
			this.#preferredCountry,
			this.countries,
		),
	);
	#value = $derived(formatNumber(this.#inputValue, this.#country));

	/* ---- Constructor ---- */

	/**
	 * Simple headless phone number input handling for Svelte.
	 *
	 * You only need to write 3 lines of code to get started:
	 *
	 * 1. Import the `Tel` class from the package.
	 * 2. Create a new instance of `Tel` in your script tag.
	 * 3. Add `bind:value={tel.value}` to your input element.
	 *
	 * @example
	 * ```svelte
	 * <script>
	 *   import { Tel } from "svelte-tel";
	 *
	 *   const tel = new Tel();
	 * </script>
	 *
	 * <input type="tel" bind:value={tel.value} />
	 *
	 * <!-- Now you can access the country data and the raw phone number -->
	 *
	 * <p>Country: {tel.countryData.name}</p>
	 * <p>Country Code: {tel.countryData.code}</p>
	 * <p>Phone Number: {tel.value}</p>
	 * <p>Raw Phone Number: {tel.rawValue}</p>
	 * ```
	 *
	 * @param config - Configuration options for the Tel instance
	 */
	constructor(config?: SveltelConfig) {
		if (config?.defaultCountry) {
			const c = this.countries.find((c) => c.code === config?.defaultCountry?.toLowerCase());
			if (!c) throw new Error("Invalid country code");
			this.#inputValue = c.dialCode;
		}

		if (config?.defaultValue) {
			this.#inputValue = sanitizeNumber(config?.defaultValue);
		}

		this.excludedCountries = config?.excludedCountries ?? [];
		this.excludedTerritories = config?.excludedTerritories ?? [];
		this.excludedRegions = config?.excludedRegions ?? [];
		this.excludedSubregions = config?.excludedSubregions ?? [];
		this.includeTerritories = config?.includeTerritories ?? false;
	}

	/* ---- Public Methods ---- */

	/** The current value of the phone number input */
	get value() {
		return this.#value;
	}

	set value(val: string) {
		// Wait for the next tick to update the value
		tick().then(() => {
			this.#inputValue = sanitizeNumber(val);
		});
	}

	/** The raw value of the phone number input */
	get rawValue() {
		return this.#value.replace(/\D/g, "");
	}

	/** The current country code */
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

	/** The current country data */
	get countryData() {
		return this.#country;
	}

	/** The list of countries currently available */
	get countries() {
		let countries: Country[] = COUNTRIES;

		// Include territories
		if (this.includeTerritories) {
			countries = countries.concat(TERRITORIES).sort((a, b) => (a.name > b.name ? 1 : -1));
		}

		// Exclude countries
		if (this.excludedCountries.length) {
			countries = countries.filter(
				(c) => !this.excludedCountries.map((x) => x.toLowerCase()).includes(c.code),
			);
		}

		// Exclude territories
		if (this.excludedTerritories.length) {
			countries = countries.filter(
				(c) => !this.excludedTerritories.map((x) => x.toLowerCase()).includes(c.code),
			);
		}

		// Exclude regions
		if (this.excludedRegions.length) {
			countries = countries.filter(
				(c) => !c.regions.some((r) => this.excludedRegions.includes(r as Region)),
			);
		}

		// Exclude subregions
		if (this.excludedSubregions.length) {
			countries = countries.filter(
				(c) => !c.regions.some((s) => this.excludedSubregions.includes(s as Subregion)),
			);
		}

		return countries;
	}
}
