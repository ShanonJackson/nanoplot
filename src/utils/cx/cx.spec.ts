import { describe, expect, it } from "bun:test";
import { toUniqueIdentifier, tw } from "./cx";

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
	it("tw merge deduplicates square bracket syntax against matching operation [stroke:red] against stroke-gray-100", () => {
		const result = tw("text-red", "bg-black", "[stroke:red]", "stroke-gray-100");
		expect(result).toBe("text-red bg-black stroke-gray-100");
	});

	it("tw merge deduplicates square bracket syntax against matching operation [stroke:#316ff2] against dark:stroke-dark-priority-100", () => {
		const result = tw("text-red", "bg-black", "[stroke:#316ff2]", "dark:stroke-dark-priority-100");
		expect(result).toBe("text-red bg-black [stroke:#316ff2] dark:stroke-dark-priority-100");
	});

	it("Should keep multiple befores with custom properties", () => {
		const result = tw("text-red", "bg-black", "before:[inset:1px] before:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]");
		expect(result).toBe("text-red bg-black before:[inset:1px] before:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]");
	});

	it("Should return stroke for [stroke:red] and stroke-gray-100", () => {
		expect(toUniqueIdentifier("[stroke:red]")).toBe("stroke");
		expect(toUniqueIdentifier("stroke-gray-100")).toBe("stroke");
	});

	it("Should return before:inset for before:[inset:1px] and before:inset-1", () => {
		expect(toUniqueIdentifier("before:[inset:1px]")).toBe("before:inset");
		expect(toUniqueIdentifier("before:inset-1")).toBe("before:inset");
	});

	it("Should return all modifiers in both syntaxes", () => {
		expect(toUniqueIdentifier("dark:before:[inset:1px]")).toBe("dark:before:inset");
		expect(toUniqueIdentifier("dark:before:inset-1")).toBe("dark:before:inset");
		expect(toUniqueIdentifier("hover:before:[inset:1px]")).toBe("hover:before:inset");
		expect(toUniqueIdentifier("hover:before:inset-1")).toBe("hover:before:inset");
		expect(toUniqueIdentifier("peer-hover:before:[inset:1px]")).toBe("peer-hover:before:inset");
		expect(toUniqueIdentifier("peer-hover:before:inset-1")).toBe("peer-hover:before:inset");
		expect(toUniqueIdentifier("inset-1")).toBe("inset");
	});

	it("Should deduplicate 'known' classes that don't match by name", () => {
		expect(tw("text-red", "block", "hidden")).toBe("text-red hidden");
	});
});
