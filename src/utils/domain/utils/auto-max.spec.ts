import { describe, expect, it } from "bun:test";
import { autoMax } from "./auto-max";

describe("src/utils/domain/auto-max", () => {
	it.each([
		[89_000_500, 90_000_000], // rounds to tenth
		[120, 140], // 130 ineligible, 150 ineligible, 140 eligible (2nd's) (20ths) (so jumps COULD be 20,40,60,80,100,120,140
		[24.99, 30], // 25 ineligible, 30 eligible (5ths)
		[99.8, 100], // 100 ineligible, 120 eligible (20ths)
		[100.001, 110], // 100 ineligible, 110 eligible (10ths)
		[49.99, 50], // 50 ineligible, 60 eligible (10ths)
		[0.444445, 0.5], // 0.5 ineligible, 0.6 eligible (10ths)
		[121, 140],
		[121_000, 140_000],
		[100, 110],
		[99.13, 100],
	])("Should autoMax(%i) should return %i", (max, expected) => {
		expect(autoMax(max)).toBe(expected);
	});
});
