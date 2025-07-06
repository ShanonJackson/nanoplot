import { describe, expect, it } from "bun:test";
import { CoordinatesUtils } from "./coordinates";
import spec from "./data.spec.json";

describe("Coordinates Utils", () => {
	it("Should be faster than 1ms", () => {
		const dataset = spec.data.map((d) => {
			return {
				...d,
				data: d.data.map((dp) => ({
					...dp,
					x: new Date(dp.x),
				})),
			};
		});

		const xyCoordinatesFor = CoordinatesUtils.xyCoordinatesForDataset({
			domain: {
				x: spec.domain.x.map((x) => ({ tick: new Date(x.tick), coordinate: x.coordinate })),
				y: spec.domain.y,
			},
			viewbox: spec.viewbox,
		});
		const times = Array.from({ length: 400 }, () => {
			const start = performance.now();
			dataset.map((line) => {
				return {
					...line,
					id: String(line.id),
					stroke: line.stroke ?? "red",
					fill: "red",
					data: xyCoordinatesFor(line.data),
				};
			});
			const end = performance.now();
			return end - start;
		});

		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1);
	});
});
