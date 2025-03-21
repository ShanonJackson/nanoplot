import { describe, it, expect } from "bun:test";
import { DomainUtils } from "../domain";

describe("src/utils/domain/range.ts", () => {
	it("Should complete in <3ms on large datasets", () => {
		const now = new Date();
		const gen = (min: number, max: number) => {
			return Array.from({ length: 6 * 60 * 60 }, (_, i) => ({
				x: new Date(now.getTime() - (6 * 60 * 60 - i) * 1000),
				y: Math.random() * (max - min) + min,
			}));
		};
		
		const dataset = [
			{ name: "Line 1", data: gen(1, 5) },
			{ name: "Line 2", data: gen(6, 10) },
			{ name: "Line 3", data: gen(11, 15) },
			{ name: "Line 4", data: gen(16, 20) },
			{ name: "Line 5", data: gen(21, 25) },
		];
		

		const times = Array.from({ length: 150 }, () => {
			const start = performance.now();
			const xDomain = DomainUtils.y.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } });
			const end = performance.now();
			return end - start;
		});
		
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1.25);
	})
})