import { describe, expect, it } from "bun:test";
import { MathUtils } from "./math";

describe("src/utils/math/math", () => {
	it("Should scale correctly for negative values", () => {
		const result = MathUtils.scale(-5, [0, 10], [0, 100]);
		expect(result).toBe(-50);
	});
	it("MathUtils.min on 300_000 elements should be performant", () => {
		const array = Array.from({ length: 300_000 }, (_, i) => i);
		const result = MathUtils.min(array);
		expect(result).toBe(0);

		// the above code run 50x and performance averaged is:
		const times = Array.from({ length: 50 }, () => {
			const start = performance.now();
			MathUtils.min(array);
			const end = performance.now();
			return end - start;
		});
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1.25);
	});

	it("MathUtils.max on 300_000 elements should be performant", () => {
		const array = Array.from({ length: 300_000 }, (_, i) => i);
		const result = MathUtils.max(array);
		expect(result).toBe(299_999);
		const times = Array.from({ length: 50 }, () => {
			const start = performance.now();
			MathUtils.max(array);
			const end = performance.now();
			return end - start;
		});
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1.25);
	});
});
