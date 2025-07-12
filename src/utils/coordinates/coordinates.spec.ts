import { describe, expect, it } from "bun:test";
import { CoordinatesUtils } from "./coordinates";
import spec from "./data.spec.json";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";

const MOCK_CONTEXT: InternalGraphContext = {
	id: "a",
	data: [],
	attributes: {},
	gap: { top: 0, right: 0, bottom: 0, left: 0 },
	layout: { columns: "", rows: "" },
	viewbox: { x: 3000, y: 3000 },
	zoom: { x: [0, 100], y: [0, 100] },
	datasets: {},
	domain: {
		x: [
			{ coordinate: 0, tick: 0 },
			{ coordinate: 500, tick: 500 },
			{ coordinate: 1_000, tick: 1000 },
		],
		y: [
			{ coordinate: 0, tick: 1_000 },
			{ coordinate: 500, tick: 500 },
			{ coordinate: 1_000, tick: 0 },
		],
	},
	colors: [],
	interactions: { hovered: [], pinned: [] },
};

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
