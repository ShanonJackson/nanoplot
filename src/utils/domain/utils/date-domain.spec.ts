import { describe, expect, it } from "bun:test";
import { getDateDomain, getFloorDateFromDuration } from "./date-domain";

describe("src/utils/domain/utils/date-domain.ts", () => {
	it("Should return 1 month 5 hr increments starting from floor(min) and ceil(max) on this duration", () => {
		const range = getDateDomain({
			min: new Date(2023, 0, 28, 0, 0, 0),
			max: new Date(2023, 5, 0, 0, 0, 0),
			duration: "P1MT5H",
		});
		expect(range).toEqual([
			new Date(2023, 0, 1, 5, 0, 0),
			new Date(2023, 1, 1, 5, 0, 0),
			new Date(2023, 2, 1, 5, 0, 0),
			new Date(2023, 3, 1, 5, 0, 0),
			new Date(2023, 4, 1, 5, 0, 0),
			new Date(2023, 5, 1, 5, 0, 0),
		]);
	});

	it("Should handle simple 1 month increments (P1M)", () => {
		const range = getDateDomain({
			min: new Date(2024, 0, 1, 12, 0, 0),
			max: new Date(2024, 3, 10, 8, 0, 0),
			duration: "P1M",
		});
		expect(range).toEqual([
			new Date(2024, 0, 1, 0, 0, 0),
			new Date(2024, 1, 1, 0, 0, 0),
			new Date(2024, 2, 1, 0, 0, 0),
			new Date(2024, 3, 1, 0, 0, 0),
			new Date(2024, 4, 1, 0, 0, 0),
		]);
	});

	it("Should handle hourly increments (PT6H)", () => {
		const range = getDateDomain({
			min: new Date("2023-07-01T02:30:00Z"),
			max: new Date("2023-07-01T20:15:00Z"),
			duration: "PT6H",
		});
		expect(range).toEqual([
			new Date("2023-07-01T00:00:00Z"),
			new Date("2023-07-01T06:00:00Z"),
			new Date("2023-07-01T12:00:00Z"),
			new Date("2023-07-01T18:00:00Z"),
			new Date("2023-07-02T00:00:00Z"),
		]);
	});

	it("Should handle daily increments (P2D)", () => {
		const range = getDateDomain({
			min: new Date(2025, 4, 3, 10, 0, 0),
			max: new Date(2025, 4, 10, 22, 0, 0),
			duration: "P2D",
		});
		expect(range).toEqual([
			new Date(2025, 4, 3, 0, 0, 0),
			new Date(2025, 4, 5, 0, 0, 0),
			new Date(2025, 4, 7, 0, 0, 0),
			new Date(2025, 4, 9, 0, 0, 0),
			new Date(2025, 4, 11, 0, 0, 0),
		]);
	});

	it("Should handle composite days and hours (P1DT3H)", () => {
		const range = getDateDomain({
			min: new Date(2025, 4, 1, 10, 0, 0), // May 1, 2025 10:00:00 local time
			max: new Date(2025, 4, 5, 15, 0, 0), // May 5, 2025 15:00:00 local time
			duration: "P1DT3H",
		});

		expect(range).toEqual([
			new Date(2025, 4, 1, 3, 0, 0),
			new Date(2025, 4, 2, 3, 0, 0),
			new Date(2025, 4, 3, 3, 0, 0),
			new Date(2025, 4, 4, 3, 0, 0),
			new Date(2025, 4, 5, 3, 0, 0),
			new Date(2025, 4, 6, 3, 0, 0),
		]);
	});

	it("Should handle minute increments (PT15M)", () => {
		const range = getDateDomain({
			min: new Date("2021-08-01T00:07:00Z"),
			max: new Date("2021-08-01T01:02:00Z"),
			duration: "PT15M",
		});
		expect(range).toEqual([
			new Date("2021-08-01T00:00:00Z"),
			new Date("2021-08-01T00:15:00Z"),
			new Date("2021-08-01T00:30:00Z"),
			new Date("2021-08-01T00:45:00Z"),
			new Date("2021-08-01T01:00:00Z"),
			new Date("2021-08-01T01:15:00Z"),
		]);
	});

	it("Should handle seconds increments (PT30S)", () => {
		const range = getDateDomain({
			min: new Date("2020-01-01T00:00:10Z"),
			max: new Date("2020-01-01T00:02:20Z"),
			duration: "PT30S",
		});
		expect(range).toEqual([
			new Date("2020-01-01T00:00:00Z"),
			new Date("2020-01-01T00:00:30Z"),
			new Date("2020-01-01T00:01:00Z"),
			new Date("2020-01-01T00:01:30Z"),
			new Date("2020-01-01T00:02:00Z"),
			new Date("2020-01-01T00:02:30Z"),
		]);
	});
});

describe("src/utils/domain/utils/date-domain.ts - getFloorDateFromDuration", () => {
	it("Should return the correct floor date for P1M", () => {
		const date = new Date(2023, 6, 15, 12, 30, 0);
		const duration = "P1M";
		const result = getFloorDateFromDuration(date, duration);
		expect(result).toEqual(new Date(2023, 6, 1, 0, 0, 0));
	});
	it("Should return the correct floor date for PT5H", () => {
		const date = new Date(2023, 6, 1, 0, 0, 0, 0);
		const duration = "PT5H";
		const result = getFloorDateFromDuration(date, duration);
		expect(result).toEqual(new Date(2023, 6, 1, 0, 0, 0));
	});
});
