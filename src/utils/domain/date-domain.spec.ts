import { describe, expect, it } from "bun:test";
import { DateDomain } from "./date-domain";

describe("src/utils/domain/domain", () => {
	describe("DateDomain.floor", () => {
		it.each([
			["2024-04-04", 0, "years", "2024-01-01"],
			["2024-04-04", 1, "years", "2023-01-01"],
			["2024-04-04", 2, "years", "2022-01-01"],
			["2024-04-04", 3, "years", "2021-01-01"],
			["2024-04-04", 4, "years", "2020-01-01"],
			["2024-04-04", 5, "years", "2019-01-01"],
			["2024-04-04", 6, "years", "2018-01-01"],
			["2024-04-04", 7, "years", "2017-01-01"],
			["2024-04-04", 8, "years", "2016-01-01"],
			["2024-04-04", 9, "years", "2015-01-01"],
			["2024-04-04", 10, "years", "2014-01-01"],
			["2024-04-04", 11, "years", "2013-01-01"],
			["2024-04-04", 12, "years", "2012-01-01"],
		])("Should floor correctly for years", (date, unit, interval, expected) => {
			const result = DateDomain.floor({ date: new Date(date), unit, interval });
			expect(result).toEqual(new Date(expected));
		});
		it.each([
			["2024-01-01", 0, "months", "2024-01-01"],
			["2024-04-04", 1, "months", "2024-03-01"],
			["2024-04-04", 2, "months", "2024-02-01"],
			["2024-04-04", 3, "months", "2024-01-01"],
			["2024-04-04", 4, "months", "2023-12-01"],
			["2024-04-04", 5, "months", "2023-11-01"],
			["2024-04-04", 6, "months", "2023-10-01"],
			["2024-04-04", 7, "months", "2023-09-01"],
			["2024-04-04", 8, "months", "2023-08-01"],
			["2024-04-04", 9, "months", "2023-07-01"],
			["2024-04-04", 10, "months", "2023-06-01"],
			["2024-04-04", 11, "months", "2023-05-01"],
			["2024-04-04", 12, "months", "2023-04-01"],
		])("Should 'floor' correctly for months %s %i", (date, unit, interval, expected) => {
			const result = DateDomain.floor({ date: new Date(date), unit, interval });
			expect(result).toEqual(new Date(expected));
		});
	});
	describe("DateDomain.ceil", () => {
		it.each([
			["2024-01-01", 0, "years", "2024-01-01"] /* if it's already ceiled no rounding required */,
			["2024-01-01", 2, "years", "2026-01-01"],
			["2024-01-01", 1, "years", "2025-01-01"],
			["2024-04-04", 0, "years", "2025-01-01"],
			["2024-04-04", 1, "years", "2025-01-01"],
			["2024-04-04", 2, "years", "2026-01-01"],
			["2024-04-04", 3, "years", "2027-01-01"],
			["2024-04-04", 4, "years", "2028-01-01"],
			["2024-04-04", 5, "years", "2029-01-01"],
			["2024-04-04", 6, "years", "2030-01-01"],
			["2024-04-04", 7, "years", "2031-01-01"],
			["2024-04-04", 8, "years", "2032-01-01"],
			["2024-04-04", 9, "years", "2033-01-01"],
			["2024-04-04", 10, "years", "2034-01-01"],
			["2024-04-04", 11, "years", "2035-01-01"],
			["2024-04-04", 12, "years", "2036-01-01"],
		])("Should 'ceil' correctly for years %s %i", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2024-01-01", 0, "months", "2024-01-01"] /* if it's already ceiled no rounding required */,
			["2024-01-01", 2, "months", "2024-03-01"],
			["2024-01-01", 1, "months", "2024-02-01"],
			["2024-04-04", 0, "months", "2024-05-01"],
			["2024-04-04", 1, "months", "2024-05-01"],
			["2024-04-04", 2, "months", "2024-06-01"],
			["2024-04-04", 3, "months", "2024-07-01"],
			["2024-04-04", 4, "months", "2024-08-01"],
			["2024-04-04", 5, "months", "2024-09-01"],
			["2024-04-04", 6, "months", "2024-10-01"],
			["2024-04-04", 7, "months", "2024-11-01"],
			["2024-04-04", 8, "months", "2024-12-01"],
			["2024-04-04", 9, "months", "2025-01-01"],
			["2024-04-04", 10, "months", "2025-02-01"],
			["2024-04-04", 11, "months", "2025-03-01"],
			["2024-04-04", 12, "months", "2025-04-01"],
		])("Should 'ceil' correctly for months %s %i", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04", 0, "weeks", "2025-04-06"],
			["2025-04-04", 1, "weeks", "2025-04-13"],
			["2025-04-04", 2, "weeks", "2025-04-20"],
			["2025-04-04", 3, "weeks", "2025-04-27"],
			["2025-04-04", 4, "weeks", "2025-05-04"],
			["2025-04-04", 5, "weeks", "2025-05-11"],
			["2025-04-04", 6, "weeks", "2025-05-18"],
			["2025-04-04", 7, "weeks", "2025-05-25"],
			["2025-04-04", 8, "weeks", "2025-06-01"],
			["2025-04-04", 9, "weeks", "2025-06-08"],
			["2025-04-04", 10, "weeks", "2025-06-15"],
			["2025-04-04", 11, "weeks", "2025-06-22"],
			["2025-04-04", 12, "weeks", "2025-06-29"],
		])("Should 'ceil' correctly for weeks", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04", 0, "days", "2025-04-04"],
			["2025-04-04", 1, "days", "2025-04-05"],
			["2025-04-04", 2, "days", "2025-04-06"],
			["2025-04-04", 3, "days", "2025-04-07"],
			["2025-04-04", 4, "days", "2025-04-08"],
			["2025-04-04", 5, "days", "2025-04-09"],
			["2025-04-04", 6, "days", "2025-04-10"],
			["2025-04-04", 7, "days", "2025-04-11"],
			["2025-04-04", 8, "days", "2025-04-12"],
			["2025-04-04", 9, "days", "2025-04-13"],
			["2025-04-04", 10, "days", "2025-04-14"],
			["2025-04-04", 11, "days", "2025-04-15"],
			["2025-04-04", 12, "days", "2025-04-16"],
		])("Should 'ceil' correctly for days", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04T00:00:00.000Z", 0, "hours", "2025-04-04T00:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 1, "hours", "2025-04-04T01:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 2, "hours", "2025-04-04T02:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 3, "hours", "2025-04-04T03:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 4, "hours", "2025-04-04T04:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 5, "hours", "2025-04-04T05:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 6, "hours", "2025-04-04T06:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 7, "hours", "2025-04-04T07:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 8, "hours", "2025-04-04T08:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 9, "hours", "2025-04-04T09:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 10, "hours", "2025-04-04T10:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 11, "hours", "2025-04-04T11:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 12, "hours", "2025-04-04T12:00:00.000Z"],
		])("Should 'ceil' correctly for hours", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04T00:00:00.000Z", 0, "minutes", "2025-04-04T00:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 1, "minutes", "2025-04-04T00:01:00.000Z"],
			["2025-04-04T00:00:00.000Z", 2, "minutes", "2025-04-04T00:02:00.000Z"],
			["2025-04-04T00:00:00.000Z", 3, "minutes", "2025-04-04T00:03:00.000Z"],
			["2025-04-04T00:00:00.000Z", 4, "minutes", "2025-04-04T00:04:00.000Z"],
			["2025-04-04T00:00:00.000Z", 5, "minutes", "2025-04-04T00:05:00.000Z"],
			["2025-04-04T00:00:00.000Z", 6, "minutes", "2025-04-04T00:06:00.000Z"],
			["2025-04-04T00:00:00.000Z", 7, "minutes", "2025-04-04T00:07:00.000Z"],
			["2025-04-04T00:00:00.000Z", 8, "minutes", "2025-04-04T00:08:00.000Z"],
			["2025-04-04T00:00:00.000Z", 9, "minutes", "2025-04-04T00:09:00.000Z"],
			["2025-04-04T00:00:00.000Z", 10, "minutes", "2025-04-04T00:10:00.000Z"],
			["2025-04-04T00:00:00.000Z", 11, "minutes", "2025-04-04T00:11:00.000Z"],
			["2025-04-04T00:00:00.000Z", 12, "minutes", "2025-04-04T00:12:00.000Z"],
		])("Should 'ceil' correctly for minutes", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04T00:00:00.000Z", 0, "seconds", "2025-04-04T00:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 1, "seconds", "2025-04-04T00:00:01.000Z"],
			["2025-04-04T00:00:00.000Z", 2, "seconds", "2025-04-04T00:00:02.000Z"],
			["2025-04-04T00:00:00.000Z", 3, "seconds", "2025-04-04T00:00:03.000Z"],
			["2025-04-04T00:00:00.000Z", 4, "seconds", "2025-04-04T00:00:04.000Z"],
			["2025-04-04T00:00:00.000Z", 5, "seconds", "2025-04-04T00:00:05.000Z"],
			["2025-04-04T00:00:00.000Z", 6, "seconds", "2025-04-04T00:00:06.000Z"],
			["2025-04-04T00:00:00.000Z", 7, "seconds", "2025-04-04T00:00:07.000Z"],
			["2025-04-04T00:00:00.000Z", 8, "seconds", "2025-04-04T00:00:08.000Z"],
			["2025-04-04T00:00:00.000Z", 9, "seconds", "2025-04-04T00:00:09.000Z"],
			["2025-04-04T00:00:00.000Z", 10, "seconds", "2025-04-04T00:00:10.000Z"],
			["2025-04-04T00:00:00.000Z", 11, "seconds", "2025-04-04T00:00:11.000Z"],
			["2025-04-04T00:00:00.000Z", 12, "seconds", "2025-04-04T00:00:12.000Z"],
		])("Should 'ceil' correctly for seconds", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});

		it.each([
			["2025-04-04T00:00:00.000Z", 0, "milliseconds", "2025-04-04T00:00:00.000Z"],
			["2025-04-04T00:00:00.000Z", 1, "milliseconds", "2025-04-04T00:00:00.001Z"],
			["2025-04-04T00:00:00.000Z", 2, "milliseconds", "2025-04-04T00:00:00.002Z"],
			["2025-04-04T00:00:00.000Z", 3, "milliseconds", "2025-04-04T00:00:00.003Z"],
			["2025-04-04T00:00:00.000Z", 4, "milliseconds", "2025-04-04T00:00:00.004Z"],
			["2025-04-04T00:00:00.000Z", 5, "milliseconds", "2025-04-04T00:00:00.005Z"],
			["2025-04-04T00:00:00.000Z", 6, "milliseconds", "2025-04-04T00:00:00.006Z"],
			["2025-04-04T00:00:00.000Z", 7, "milliseconds", "2025-04-04T00:00:00.007Z"],
			["2025-04-04T00:00:00.000Z", 8, "milliseconds", "2025-04-04T00:00:00.008Z"],
			["2025-04-04T00:00:00.000Z", 9, "milliseconds", "2025-04-04T00:00:00.009Z"],
			["2025-04-04T00:00:00.000Z", 10, "milliseconds", "2025-04-04T00:00:00.010Z"],
			["2025-04-04T00:00:00.000Z", 11, "milliseconds", "2025-04-04T00:00:00.011Z"],
			["2025-04-04T00:00:00.000Z", 12, "milliseconds", "2025-04-04T00:00:00.012Z"],
		])("Should 'ceil' correctly for milliseconds", (date, unit, interval, expected) => {
			expect(DateDomain.ceil({ date: new Date(date), unit, interval })).toEqual(new Date(expected));
		});
	});
	describe("DateDomain.domainFor", () => {
		it("Should return month sequence for every month starting on start - end", () => {
			const result = DateDomain.domainFor({ min: new Date("2024-01-01"), max: new Date("2024-12-01"), jumps: "every 1 months" });
			expect(result).toEqual([
				new Date("2024-01-01"),
				new Date("2024-02-01"),
				new Date("2024-03-01"),
				new Date("2024-04-01"),
				new Date("2024-05-01"),
				new Date("2024-06-01"),
				new Date("2024-07-01"),
				new Date("2024-08-01"),
				new Date("2024-09-01"),
				new Date("2024-10-01"),
				new Date("2024-11-01"),
				new Date("2024-12-01"),
			]);
		});
		it("Should return month sequence for every month starting on floored(start) and ceiled(end)", () => {
			const result = DateDomain.domainFor({ min: new Date("2024-01-05"), max: new Date("2024-12-31"), jumps: "every 1 months" });
			expect(result).toEqual([
				new Date("2024-01-01"),
				new Date("2024-02-01"),
				new Date("2024-03-01"),
				new Date("2024-04-01"),
				new Date("2024-05-01"),
				new Date("2024-06-01"),
				new Date("2024-07-01"),
				new Date("2024-08-01"),
				new Date("2024-09-01"),
				new Date("2024-10-01"),
				new Date("2024-11-01"),
				new Date("2024-12-01"),
				new Date("2025-01-01"),
			]);
		});
	});
});
