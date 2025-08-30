import { describe, expect, it } from "bun:test";
import { tw } from "./cx";
import { CurveUtils } from "../path/curve";
import data from "../path/data.spec.json";
import { benchmark } from "../benchmark/benchmark";

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

	it("tw merge deduplicates square bracket syntax against matching operation [stroke:#316ff2] against dark:stroke-[#2d2d2d]", () => {
		const result = tw("text-red", "bg-black", "[stroke:#316ff2]", "dark:stroke-[#2d2d2d]");
		expect(result).toBe("text-red bg-black [stroke:#316ff2] dark:stroke-[#2d2d2d]");
	});

	it("Should keep multiple befores with custom properties", () => {
		const result = tw("text-red", "bg-black", "before:[inset:1px] before:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]");
		expect(result).toBe("text-red bg-black before:[inset:1px] before:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]");
	});

	it("Should deduplicate 'known' classes that don't match by name", () => {
		expect(tw("text-red", "block", "hidden")).toBe("text-red hidden");
	});

	it("Should be faster than 0.05ms", () => {
		const className = { vertical: "stroke-red-200" };
		const average = benchmark(() => {
			return tw(
				"stroke-gray-200 dark:stroke-[#2d2d2d] dark:stroke-[#2d2d2d] grid-lines__vertical",
				typeof className === "object" && className?.vertical,
			);
		}, 400);

		expect(average).toBeLessThan(0.05);
	});

	it("Should not filter out flex and flex-col when togeahter", () => {
		const result = tw("flex", "flex-col");
		expect(result).toBe("flex flex-col");
	});
});
