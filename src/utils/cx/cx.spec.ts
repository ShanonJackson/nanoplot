import { expect, describe, it } from "bun:test";
import { tw } from "./cx";

describe("src/utils/cx", () => {
	it("tw merge to deduplicate classes - first instance of duplicate dictates order", () => {
		const result = tw("text-red", "b", "text-blue");
		expect(result).toBe("text-blue b");
	});
	it("tw merge to deduplicate classes - last in wins", () => {
		const result = tw("text-red", "b", "text-blue");
		expect(result).toBe("text-blue b");
	});
	it("tw merge deduplicates modifiers (duplicate dark:)", () => {
		const result = tw("text-red", "bg-black", "dark:text-red", "dark:text-green");
		expect(result).toBe("text-red bg-black dark:text-green");
	});
});
