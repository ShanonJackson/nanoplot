import { describe, it, expect } from "bun:test";

import { CoordinatesUtils } from "../coordinates/coordinates";
import { DomainUtils } from "../domain/domain";
import { CurveUtils } from "./curve";
import { MathUtils } from "../math/math";


const chunk = (points: Array<{ x: number; y: number }>, size: number) => {
	const chunks = [];
	for (let i = 0; i < points.length; i += size) {
		chunks.push(points.slice(i, i + size));
	}
	return chunks;
}

describe("src/utils/path/path.ts", () => {
	it("Should complete in <3 ms for large datasets", () => {
		const now = new Date();
		const gen = (min: number, max: number) => {
			return Array.from({ length: 6 * 60 * 60 }, (_, i) => ({
				x: new Date(now.getTime() - (6 * 60 * 60 - i) * 1000),
				y: Math.random() * (max - min) + min,
			}));
		};
		
		const dataset = [
			{ name: "Line 1", data: gen(1, 5) },
		];
		const randx = () => Math.random() * 1000;
		const randy = () => Math.random() * 1000;
		
		const domain = {x: DomainUtils.x.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } }), y:  DomainUtils.y.ticks({ data: dataset, viewbox: { x: 3000, y: 3000 } })}
		const xForValue = CoordinatesUtils.xCoordinateFor({domain, viewbox: {x: 3000, y: 3000}});
		const yForValue = CoordinatesUtils.yCoordinateFor({domain, viewbox: {x: 3000, y: 3000}});
		const times = Array.from({ length: 150 }, () => {
			const points = dataset[0].data.map((d) => {
				return {
					x: xForValue(d.x),
					y: yForValue(d.y),
				}
			});
			const start = performance.now();
			const chunks = CurveUtils.linear(points);
			const end = performance.now();
			return end - start;
		});
		
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1.5);
	})
})