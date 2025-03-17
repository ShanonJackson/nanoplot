import { describe, expect, it } from "bun:test";
import { autoMax } from "./auto-max";

describe("src/utils/domain/auto-max", () => {
	it.each([
		[89_000_500, 100_000_000], // rounds to tenth
		[120, 140], // 130 ineligible, 150 ineligible, 140 eligible (2nd's) (20ths) (so jumps COULD be 20,40,60,80,100,120,140
		[24.99, 30], // 25 ineligible, 30 eligible (5ths)
	])("Should autoMax(%i) should return %i", (max, expected) => {
		expect(autoMax(max)).toBe(expected);
	});
});