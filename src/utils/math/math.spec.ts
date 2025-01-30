import { describe, it, expect } from "bun:test";
import { MathUtils } from "@/utils/math/math";

describe("src/utils/math/math", () => {
	it("Should scale correctly for negative values", () => {
		const result = MathUtils.scale(-5, [0, 10], [0, 100]);
		expect(result).toBe(-50);
	});
});
