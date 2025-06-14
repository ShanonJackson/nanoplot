import { describe, it, expect } from "bun:test";
import { DomainUtils } from "../domain";

describe("src/utils/domain/range.ts", () => {
	it.each([
		{ min: -140_000, max: 1_450_000, expectedMin: -250_000, expectedMax: 1_500_000 },
		{ min: 20, max: 145, expectedMin: 0, expectedMax: 150 },
	])("Should return correct range for the following examples", ({ min, max, expectedMin, expectedMax }) => {
		const dataset = [
			{
				name: "Line 1",
				data: [
					{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: min },
					{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: max },
				],
			},
		];
		const yDomain = DomainUtils.y.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } });
		expect(yDomain[0].tick).toBe(expectedMin);
		expect(yDomain[yDomain.length - 1].tick).toBe(expectedMax);
	});

	it("Should return min 0 and max 150 for this dataset", () => {
		const set = [
			{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
			{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
			{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
			{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
			{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
			{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
			{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
			{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 102 },
			{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
			{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
			{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
			{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
		];
		const dataset = [{ name: "Line 1", data: set }];
		const yDomain = DomainUtils.y.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } });
		expect(yDomain[0].tick).toBe(0);
		expect(yDomain[yDomain.length - 1].tick).toBe(120);
	});

	it("Should return min 0 max 55", () => {
		const set = [
			{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 1 },
			{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 13 },
			{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 13 },
			{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 13 },
			{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 13 },
			{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
		];
		const dataset = [{ name: "Line 1", data: set }];
		const yDomain = DomainUtils.y.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } });

		expect(yDomain[0].tick).toBe(0);
		expect(yDomain[yDomain.length - 1].tick).toBe(55);
	});
});
