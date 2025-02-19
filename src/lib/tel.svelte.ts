import {
	formatIncompletePhoneNumber,
	getCountries,
	getCountryCallingCode,
	getExampleNumber,
	ParseError,
	parsePhoneNumber,
	//
	type CountryCode,
} from "libphonenumber-js/min";
import examples from "libphonenumber-js/mobile/examples";
import type { HTMLInputAttributes } from "svelte/elements";

export class Tel<
	TFormat extends "national" | "international" = "international",
	TIncluded extends CountryCode[] | undefined = undefined,
	TExcluded extends CountryCode[] | undefined = undefined,
> {
	#input = $state("");
	#country = $state<CountryCode | undefined>(undefined);
	#format = $state<"international" | "national">("international");

	locale: Intl.LocalesArgument = $state("en");
	hideCallingCode = $state(false);
	editableCountryCode = $state(true);
	includedCountries = $state<TIncluded>([] as unknown as TIncluded);
	excludedCountries = $state<TExcluded>([] as unknown as TExcluded);

	// TODO: some extra stuff
	#value = $derived.by(() => {
		let val = this.#input;

		if (this.#format === "international") {
			if (this.#country && (!this.editableCountryCode || this.hideCallingCode)) {
				const code = getCountryCallingCode(this.#country);
				val = `+${code}${val.slice(code.length + 1)}`;
			}
			if (val.length > 0 && !val.startsWith("+")) {
				val = `+${val}`;
			}
		} else {
			val = val.replace(/^\+/, "");
		}

		return formatIncompletePhoneNumber(
			val,
			this.#format === "national" && this.#country ? this.#country : undefined,
		);
	});

	#num = $derived.by(() => {
		try {
			return {
				data: parsePhoneNumber(this.#value, this.#country),
				error: null,
			};
		} catch (err) {
			return {
				data: null,
				error: (err as ParseError).message,
			};
		}
	});

	#displayNames = $derived(new Intl.DisplayNames(this.locale, { type: "region" }));

	constructor(
		config?: {
			defaultValue?: string;
			/** The format to use when formatting the phone number */
			format?: TFormat;
			/** Whether to hide the country code prefix in the input */
			hideCallingCode?: boolean;
			/** Whether the country code is editable when in international format */
			editableCountryCode?: boolean;
			/** The countries to exclude from the countries list */
			excludeCountries?: TExcluded;
			/** The countries to include in the countries list */
			includeCountries?: TIncluded;
			/** Language to use for translations */
			locale?: Intl.Locale;
		} & (TFormat extends "national"
			? { defaultCountry: CountryCode }
			: { defaultCountry?: CountryCode }),
	) {
		if (config?.defaultValue) this.#input = config.defaultValue;
		if (config?.defaultCountry) this.#country = config.defaultCountry;
		if (config?.format) this.#format = config.format;
		if (config?.hideCallingCode) this.hideCallingCode = config.hideCallingCode;
		if (config?.editableCountryCode) this.editableCountryCode = config.editableCountryCode;
		if (config?.excludeCountries) this.excludedCountries = config.excludeCountries;
		if (config?.includeCountries) this.includedCountries = config.includeCountries;
		if (config?.locale) this.locale = config.locale;

		if (config?.editableCountryCode === false && !config?.defaultValue && config?.defaultCountry) {
			this.#input = `+${getCountryCallingCode(config.defaultCountry)}`;
		}

		if (
			this.hideCallingCode &&
			this.#format === "international" &&
			this.#country &&
			config?.defaultValue &&
			!config.defaultValue.startsWith(`+${getCountryCallingCode(this.#country)}`)
		) {
			this.#input = `+${getCountryCallingCode(this.#country)}${config.defaultValue}`;
		}
	}

	get value() {
		if (this.hideCallingCode && this.#format === "international") {
			return this.#value.replace(`+${getCountryCallingCode(this.#country!) ?? ""}`, "").trim();
		}
		return this.#value;
	}
	set value(val: string) {
		if (this.hideCallingCode && this.#format === "international" && this.#country) {
			val = `+${getCountryCallingCode(this.#country)}${val}`;
		}
		this.#input = val;
	}

	get format() {
		return this.#format as TFormat;
	}
	set format(val: TFormat) {
		if (this.#num.data) {
			this.#input =
				val === "international"
					? this.#num.data.formatInternational()
					: this.#num.data.formatNational();
		}
		this.#format = val;
	}

	get country() {
		return (
			this.#num.data?.country ??
			this.#country ??
			this.#num.data?.getPossibleCountries().at(0) ??
			null
		);
	}
	set country(val: CountryCode | null) {
		if (val === null) this.#format = "international";

		const existing = this.#country?.toString() as CountryCode | undefined;
		const existingCC = existing ? getCountryCallingCode(existing) : undefined;
		if (
			this.#format === "international" &&
			val &&
			existingCC &&
			this.#input.startsWith(`+${existingCC}`)
		) {
			const newCC = getCountryCallingCode(val);
			if (this.hideCallingCode === false) {
				this.#input = `+${newCC}` + this.#input.slice(existingCC.length + 1);
			} else {
				// TODO: handle this case
			}
		}

		this.#country = val ?? undefined;
	}

	get countries() {
		return getCountries()
			.filter((code) => {
				if (this.includedCountries?.length) return this.includedCountries.includes(code);
				if (this.excludedCountries?.length) return !this.excludedCountries.includes(code);
				return true;
			})
			.map((code) => ({
				name: this.locale ? this.#displayNames.of(code) : undefined,
				code,
				callingCode: getCountryCallingCode(code),
			}))
			.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name, this.locale) : 0));
	}

	get placeholder() {
		const method =
			this.#format === "national" && this.#country ? "formatNational" : "formatInternational";

		const num = getExampleNumber(this.#country ?? "US", examples)![method]() ?? "";

		if (this.hideCallingCode && this.#format === "international") {
			return num.replace(`+${getCountryCallingCode(this.#country!) ?? ""}`, "").trim();
		}

		return num;
	}

	get valid() {
		return this.#num.data?.isValid() ?? false;
	}

	get possible() {
		return this.#num.data?.isPossible() ?? false;
	}

	get international() {
		return this.#num.data?.formatInternational() ?? null;
	}

	get national() {
		return this.#num.data?.formatNational() ?? null;
	}

	get number() {
		return this.#num.data?.number ?? null;
	}

	get carrierCode() {
		return this.#num.data?.carrierCode ?? null;
	}

	get ext() {
		return this.#num.data?.ext ?? null;
	}

	get countryCallingCode() {
		return (
			this.#num.data?.countryCallingCode ??
			(this.#country ? getCountryCallingCode(this.#country) : null)
		);
	}

	/**
	 * Svelte helper props object to do everything in one go
	 * - Replaces bind:value
	 * - Adds some keyboard accessibility fixes
	 * - Adds accessibility attributes
	 * - Adds placeholder
	 * - Adds autocomplete attribute
	 */
	get props() {
		return {
			type: "tel",
			value: this.value,
			placeholder: this.placeholder,
			autocomplete: this.#format === "national" ? "tel-national" : "tel",
			oninput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
				this.value = e.currentTarget.value;
			},
			onkeydown: (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
				const el = e.currentTarget;

				// Fix for backspace deleting the closing bracket
				// By default, backspace won't delete the closing bracket as the formatIncompletePhoneNumber function will add it back
				if (
					e.key === "Backspace" &&
					el.value.at(-1) === ")" &&
					el.selectionStart === el.value.length
				) {
					e.preventDefault();
					el.value = el.value.slice(0, -2);
				}
			},
		} satisfies HTMLInputAttributes;
	}
}
