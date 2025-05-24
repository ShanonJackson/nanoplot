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
		expect(result).toBe("dark:text-green bg-black");
	});
	it("tw merge deduplicates square bracket syntax against matching operation [stroke:red] against stroke-gray-100", () => {
		const result = tw("text-red", "bg-black", "[stroke:red]", "stroke-gray-100");
		expect(result).toBe("text-red bg-black stroke-gray-100");
	});

	it("tw merge deduplicates square bracket syntax against matching operation [stroke:#316ff2] against dark:stroke-dark-priority-100", () => {
		const result = tw("text-red", "bg-black", "[stroke:#316ff2]", "dark:stroke-dark-priority-100");
		expect(result).toBe("text-red bg-black dark:stroke-dark-priority-100");
	});
});
