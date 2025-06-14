import { describe, expect, it } from "bun:test";
import { scale } from "./math";

describe("src/utils/math/math", () => {
	it("Should scale correctly for negative values", () => {
		const result = scale(-5, [0, 10], [0, 100]);
		expect(result).toBe(-50);
	});
});
