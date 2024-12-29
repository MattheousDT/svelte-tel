import type { Country } from "./countries.js";

/**
 * Sanitizes a string by removing all non-digit characters.
 *
 * @param num - The string to be sanitized.
 * @returns A new string containing only the digit characters from the input string.
 */
export const sanitizeNumber = (num: string): string => num.replace(/\D/g, "");

/**
 * Detects the country of a phone number.
 * This takes into account the area codes of countries and the priority of countries.
 *
 * @param num - The phone number to detect the country of.
 * @param countries - The list of countries to search through.
 * @returns The country that the phone number belongs to.
 */
export const detectCountry = (num: string, countries: Country[]): Country => {
	// Get all possible countries
	const possibleCountries = countries.filter((c) => num.startsWith(c.dialCode));

	// Sort by dial code length
	possibleCountries.sort((a, b) => b.dialCode.length - a.dialCode.length);

	// Sort by priority
	possibleCountries.sort((a, b) => ((a.priority ?? 0) < (b.priority ?? 0) ? -1 : 1));

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

/**
 * Checks if a phone number starts with a country dial code.
 *
 * @param num - The phone number to check.
 * @param country - The country to check against.
 * @returns `true` if the phone number starts with the country dial code, `false` otherwise.
 */
export const numberStartsWithCountryCode = (num: string, country: Country): boolean => {
	const startsWithDialCode = num.startsWith(country.dialCode);

	if (startsWithDialCode && "areaCodes" in country && country.areaCodes) {
		const areaCode = country.areaCodes.find((code) =>
			code.startsWith(num.slice(country.dialCode.length, code.length)),
		);
		if (areaCode) return true;
	}

	return startsWithDialCode;
};

/**
 * Picks the appropriate country for a given phone number.
 *
 * This takes into account the detected country, the preferred country, and the list of countries.
 * Preferred country is given priority over detected country.
 *
 * E.g. A user prefers Canada, future +1 numbers will be matched to Canada.
 *
 * @param inputValue - The phone number to check.
 * @param detectedCountry - The country detected from the phone number.
 * @param preferredCountry - The country that the user prefers.
 * @param countries - The list of countries to search through.
 * @returns The appropriate country for the phone number.
 */
export const pickAppropriateCountry = (
	inputValue: string,
	detectedCountry: Country | undefined,
	preferredCountry: Country | undefined,
	countries: Country[],
) => {
	if (preferredCountry) {
		const c = countries.find((c) => c.code === preferredCountry!.code);
		if (!c) return detectedCountry;
		if (numberStartsWithCountryCode(inputValue ?? "", c)) return c;
	}
	return detectedCountry;
};

/**
 * Formats a phone number based on the country.
 *
 * Note: This function does not check if the number is valid.
 *
 * @param num - The phone number to format.
 * @param country - The country to format the phone number for.
 * @returns The formatted phone number.
 */
export const formatNumber = (num: string | undefined, country: Country | undefined): string => {
	// Step 1: Ensure number starts with +
	if (!num) return "+";

	// Step 2: Detect country code
	if (!country) return `+${num}`;

	// Step 3: Apply formatting on number until current point
	const format =
		country.format ??
		Array(
			// Maxiumum length of number is 15 including international calling prefix and dial code
			// https://en.wikipedia.org/wiki/Telephone_number
			15 - 1 - country.dialCode.length,
		)
			.fill("0")
			.join("");
	let numI = country.dialCode.length;
	let formatI = -1; // Start at -1 to account for the space between dial code and number
	let formattedNum = `+${country.dialCode}`;
	num = num.replace(/\D/g, "");

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
