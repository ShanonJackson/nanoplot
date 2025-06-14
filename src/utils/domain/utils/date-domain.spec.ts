import { describe, expect, it } from "bun:test";
import { getCeilDateFromDuration, getDateDomain, getFloorDateFromDuration } from "./date-domain";

describe("src/utils/domain/utils/date-domain.ts", () => {
	it("Should complete in <1.5ms", () => {
		const start = performance.now();
		getDateDomain({
			min: new Date(2019, 7, 22, 6, 0, 0),
			max: new Date(2019, 8, 29, 19, 49, 0),
			duration: "P2D",
		});
		const end = performance.now();
		expect(end - start).toBeLessThan(1.5);
	});

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
describe("src/utils/domain/utils/date-domain.ts - getCeilDateFromDuration", () => {
	it("Should round when december 1st 2024 0:00 when ceil'ed to P5M", () => {
		const result = getCeilDateFromDuration(new Date(2024, 11, 1, 0, 0, 0), "P5M");
		expect(result).toEqual(new Date(2025, 2, 1, 0, 0, 0));
	});

	it("Should round up when it's november 1st 2024 0:00 when ceil'ed to P2M", () => {
		const result = getCeilDateFromDuration(new Date(2024, 10, 1, 0, 0, 0), "P2M");
		expect(result).toEqual(new Date(2024, 11, 1, 0, 0, 0));
	});

	it("Should round up when it's january 1st 2024 0:00 when ceil'ed to P2D", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 1, 0, 0, 0), "P2D");
		expect(result).toEqual(new Date(2024, 0, 2, 0, 0, 0));
	});

	it("Should round up when it's january 1st 2024 0:00 when ceil'ed to PT2H", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 1, 1, 0, 0), "PT2H");
		expect(result).toEqual(new Date(2024, 0, 1, 2, 0, 0));
	});

	it("Should round correctly when PT5H is used on 1:00", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 1, 1, 0, 0), "PT5H");
		expect(result).toEqual(new Date(2024, 0, 1, 5, 0, 0));
	});

	it("Should round correctly when PT5H is used on 6:00", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 1, 6, 0, 0), "PT5H");
		expect(result).toEqual(new Date(2024, 0, 1, 10, 0, 0));
	});

	it("Should round correctly when PT5H is used on 6:00", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 1, 23, 0, 0), "PT5H");
		expect(result).toEqual(new Date(2024, 0, 2, 1, 0, 0));
	});

	it("Should round correctly when crossing boundary when P1D is used on Jan 31th 2AM", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 31, 2, 0, 0), "P1D");
		expect(result).toEqual(new Date(2024, 1, 1, 0, 0, 0));
	});

	it("Should round correctly when crossing boundary when P5D is used on Jan 31th 2AM", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 31, 2, 0, 0), "P5D");
		expect(result).toEqual(new Date(2024, 1, 4, 0, 0, 0));
	});

	it("Should round correctly when crossing boundary when PT5H is used on Jan 31th 23:00", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 31, 23, 0, 0), "PT5H");
		expect(result).toEqual(new Date(2024, 1, 1, 1, 0, 0));
	});

	it("Should round correctly when crossing boundary when PT8M is used on Jan 31th 23:58", () => {
		const result = getCeilDateFromDuration(new Date(2024, 0, 31, 23, 57, 0), "PT8M");
		expect(result).toEqual(new Date(2024, 1, 1, 0, 4, 0));
	});

	it("Should round correctly when crossing boundary when PT8M is used on Feb 28th 23:58", () => {
		const result = getCeilDateFromDuration(new Date(2025, 1, 28, 23, 57, 0), "PT8M");
		expect(result).toEqual(new Date(2025, 2, 1, 0, 4, 0));
	});
});

describe("src/utils/domain/utils/date-domain.ts - getFloorDateFromDuration", () => {
	it("Should floor when December 1 2024 00:00 is floored to P5M", () => {
		const result = getFloorDateFromDuration(new Date(2024, 11, 1, 0, 0, 0), "P5M");
		// 5‑month buckets start at Jan, Jun, Nov → December falls back to November 1
		expect(result).toEqual(new Date(2024, 10, 1, 0, 0, 0));
	});

	it("Should floor when November 1 2024 00:00 is floored to P2M", () => {
		const result = getFloorDateFromDuration(new Date(2024, 10, 1, 0, 0, 0), "P2M");
		expect(result).toEqual(new Date(2024, 10, 1, 0, 0, 0));
	});

	it("Should floor when January 1 2024 00:00 is floored to P2D", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 1, 0, 0, 0), "P2D");
		expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0));
	});

	it("Should floor when January 1 2024 01:00 is floored to PT2H", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 1, 1, 0, 0), "PT2H");
		// 2‑hour buckets at 0:00, 2:00, 4:00… → 1 AM falls back to midnight
		expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0));
	});

	it("Should floor when PT5H is used on 01:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 1, 1, 0, 0), "PT5H");
		// 5‑hour buckets at 0:00, 5:00, 10:00… → 1 AM falls back to 0:00
		expect(result).toEqual(new Date(2024, 0, 1, 0, 0, 0));
	});

	it("Should floor when PT5H is used on 06:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 1, 6, 0, 0), "PT5H");
		// floor(6/5)*5 = 5 → 05:00
		expect(result).toEqual(new Date(2024, 0, 1, 5, 0, 0));
	});

	it("Should floor when PT5H is used on 23:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 1, 23, 0, 0), "PT5H");
		// floor(23/5)*5 = 20 → 20:00 same day
		expect(result).toEqual(new Date(2024, 0, 1, 20, 0, 0));
	});

	it("Should floor when crossing boundary with P1D on Jan 31 02:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 31, 2, 0, 0), "P1D");
		// 1‑day buckets at each midnight → 2 AM falls back to Jan 31 00:00
		expect(result).toEqual(new Date(2024, 0, 31, 0, 0, 0));
	});

	it("Should floor when crossing boundary with P5D on Jan 31 2:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 31, 2, 0, 0), "P5D");
		expect(result).toEqual(new Date(2024, 0, 31, 0, 0, 0));
	});

	it("Should floor when crossing boundary with PT5H on Jan 31 23:00", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 31, 23, 0, 0), "PT5H");
		expect(result).toEqual(new Date(2024, 0, 31, 20, 0, 0));
	});

	it("Should floor when crossing boundary with PT8M on Jan 31 23:57", () => {
		const result = getFloorDateFromDuration(new Date(2024, 0, 31, 23, 57, 0), "PT8M");
		expect(result).toEqual(new Date(2024, 0, 31, 23, 56, 0));
	});

	it("Should floor when crossing boundary with PT8M on Feb 1 0:02 2025", () => {
		const result = getFloorDateFromDuration(new Date(2025, 1, 1, 0, 2, 0), "PT4M");
		expect(result).toEqual(new Date(2025, 1, 1, 0, 0, 0));
	});
});
