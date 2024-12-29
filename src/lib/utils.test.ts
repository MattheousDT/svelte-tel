import { describe, expect, it } from "vitest";
import { COUNTRIES } from "./countries.js";
import {
	detectCountry,
	formatNumber,
	numberStartsWithCountryCode,
	pickAppropriateCountry,
	sanitizeNumber,
} from "./utils.js";

describe("sanitizeNumber", () => {
	it("should remove all non-digit characters", () => {
		expect(sanitizeNumber("+1 (123) 456-7890")).toBe("11234567890");
	});

	it("should return an empty string if the input is empty", () => {
		expect(sanitizeNumber("")).toBe("");
	});

	it("should return an empty string if the input is not a number", () => {
		expect(sanitizeNumber("abc")).toBe("");
	});
});

describe("detectCountry", () => {
	const countries = COUNTRIES;
	const us = countries.find((c) => c.code === "us")!;
	const ca = countries.find((c) => c.code === "ca")!;
	const gb = countries.find((c) => c.code === "gb")!;

	it("should return undefined if the input is empty", () => {
		expect(detectCountry("", countries)).toBe(undefined);
	});

	it("should return undefined if the input is not a number", () => {
		expect(detectCountry("abc", countries)).toBe(undefined);
	});

	it("should return a country if the input is a country code", () => {
		expect(detectCountry("44", countries)).toEqual(gb);
	});

	it("should prioritize the country with the highest priority", () => {
		expect(detectCountry("1", countries)).toEqual(us);
	});

	it("should prioritize area codes over countries with the same country code", () => {
		expect(detectCountry("1416", countries)).toEqual(ca);
	});
});

describe("numberStartsWithCountryCode", () => {
	const countries = COUNTRIES;
	const us = countries.find((c) => c.code === "us")!;
	const ca = countries.find((c) => c.code === "ca")!;

	it("should return false if the input is empty", () => {
		expect(numberStartsWithCountryCode("", us)).toBe(false);
	});

	it("should return false if the input is not a number", () => {
		expect(numberStartsWithCountryCode("abc", us)).toBe(false);
	});

	it("should return true if the number starts with the country dial code", () => {
		expect(numberStartsWithCountryCode("1", us)).toBe(true);
	});

	it("should return true if the number starts with the country dial code and area code", () => {
		expect(numberStartsWithCountryCode("1416", ca)).toBe(true);
	});

	it("should return false if the number does not start with the country dial code", () => {
		expect(numberStartsWithCountryCode("416", ca)).toBe(false);
	});
});

describe("pickAppropriateCountry", () => {
	const countries = COUNTRIES;
	const us = countries.find((c) => c.code === "us")!;
	const ca = countries.find((c) => c.code === "ca")!;
	const gb = countries.find((c) => c.code === "gb")!;

	it("should return the detected country if the preferred country is not set", () => {
		expect(pickAppropriateCountry("1", us, undefined, countries)).toEqual(us);
		expect(pickAppropriateCountry("1416", ca, undefined, countries)).toEqual(ca);
		expect(pickAppropriateCountry("44", gb, undefined, countries)).toEqual(gb);
	});

	it("should return the preferred country if it matches the number", () => {
		expect(pickAppropriateCountry("1", us, undefined, countries)).toEqual(us);
		expect(pickAppropriateCountry("1", ca, ca, countries)).toEqual(ca);
	});

	it("should return the detected country if the preferred country does not match the number", () => {
		expect(pickAppropriateCountry("1", ca, gb, countries)).toEqual(ca);
		expect(pickAppropriateCountry("44", gb, ca, countries)).toEqual(gb);
	});
});

describe("formatNumber", () => {
	const countries = COUNTRIES;
	const us = countries.find((c) => c.code === "us")!;
	const gb = countries.find((c) => c.code === "gb")!;

	it("should return just the + if the input is empty and no country is set", () => {
		expect(formatNumber("", undefined)).toBe("+");
		expect(formatNumber("", us)).toBe("+");
	});

	it("should return just the + and country code if the input is not a number", () => {
		expect(formatNumber("abc", us)).toBe("+1");
	});

	it("should return the input with the + if the country is not set", () => {
		expect(formatNumber("691234", undefined)).toBe("+691234");
	});

	it("should format the number with the country dial code", () => {
		expect(formatNumber("11234567890", us)).toBe("+1 (123) 456-7890");
		expect(formatNumber("441234567890", gb)).toBe("+44 1234 567890");
	});

	it("should properly format type-ahead", () => {
		expect(formatNumber("1", us)).toBe("+1");
		expect(formatNumber("11", us)).toBe("+1 (1");
		expect(formatNumber("112", us)).toBe("+1 (12");
		expect(formatNumber("1123", us)).toBe("+1 (123");
		expect(formatNumber("11234", us)).toBe("+1 (123) 4");
		expect(formatNumber("112345", us)).toBe("+1 (123) 45");
		expect(formatNumber("1123456", us)).toBe("+1 (123) 456");
		expect(formatNumber("11234567", us)).toBe("+1 (123) 456-7");
		expect(formatNumber("112345678", us)).toBe("+1 (123) 456-78");
		expect(formatNumber("1123456789", us)).toBe("+1 (123) 456-789");
		expect(formatNumber("11234567890", us)).toBe("+1 (123) 456-7890");

		expect(formatNumber("44", gb)).toBe("+44");
		expect(formatNumber("441", gb)).toBe("+44 1");
		expect(formatNumber("4412", gb)).toBe("+44 12");
		expect(formatNumber("44123", gb)).toBe("+44 123");
		expect(formatNumber("441234", gb)).toBe("+44 1234");
		expect(formatNumber("4412345", gb)).toBe("+44 1234 5");
		expect(formatNumber("44123456", gb)).toBe("+44 1234 56");
		expect(formatNumber("441234567", gb)).toBe("+44 1234 567");
		expect(formatNumber("4412345678 ", gb)).toBe("+44 1234 5678");
	});
});
