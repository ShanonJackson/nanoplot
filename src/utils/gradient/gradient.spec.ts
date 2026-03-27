import { describe, expect, it } from "bun:test";
import { GradientUtils } from "./gradient";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";

const MOCK_CONTEXT: InternalGraphContext = {
	id: "a",
	data: [],
	attributes: {},
	gap: { top: 0, right: 0, bottom: 0, left: 0 },
	layout: { columns: "", rows: "" },
	viewbox: { x: 1_000, y: 1_000 },
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

describe("src/utils/gradient", () => {
	describe("BUG: gradientColorFromValue returns wrong color for mask gradient with percent stops", () => {
		// Y axis domain: 0..120, viewbox 1000x1000
		// Gradient: below 40% = red, above 40% = green
		// 40% of the axis (0..120) = y value 48
		// So y=20 should be RED, y=75 should be GREEN
		const GRAPH_CONTEXT = {
			viewbox: { x: 1_000, y: 1_000 },
			domain: {
				x: Array.from({ length: 12 }, (_, i) => ({
					coordinate: (i / 11) * 1000,
					tick: i,
				})),
				y: [
					{ coordinate: 1_000, tick: 0 },
					{ coordinate: 833, tick: 20 },
					{ coordinate: 667, tick: 40 },
					{ coordinate: 500, tick: 60 },
					{ coordinate: 333, tick: 80 },
					{ coordinate: 167, tick: 100 },
					{ coordinate: 0, tick: 120 },
				],
			},
		};

		const gradient = "mask:linear-gradient(to top, #d93025 40%, rgb(52, 168, 83) 40.001%, rgb(52, 168, 83))";
		const dataset = [
			{ x: 0, y: 20 },
			{ x: 1, y: 25 },
			{ x: 2, y: 50 },
			{ x: 3, y: 45 },
			{ x: 4, y: 35 },
			{ x: 5, y: 55 },
			{ x: 6, y: 55 },
			{ x: 7, y: 102 },
			{ x: 8, y: 85 },
			{ x: 9, y: 70 },
			{ x: 10, y: 72 },
			{ x: 11, y: 75 },
		];

		it("BUG: parse() produces NaN .value for stops without explicit offset", () => {
			const { stops } = GradientUtils.parse({ gradient, ...GRAPH_CONTEXT });
			const values = stops.map((s) => s.value);
			// The last stop "rgb(52, 168, 83)" has no explicit offset
			// parseFloat(undefined) = NaN, which leaks through `?? 0` (nullish coalescing doesn't catch NaN)
			const hasNaN = values.some((v) => Number.isNaN(v));
			expect(hasNaN).toBe(true); // Demonstrates the bug: NaN is present
		});

		it("colorFrom with point returns red for y=20", () => {
			const color = GradientUtils.colorFrom({
				gradient,
				point: { x: 0, y: 20 },
				...GRAPH_CONTEXT,
			});
			expect(color).toContain("217");
		});

		it("colorFrom with point returns green for y=75", () => {
			const color = GradientUtils.colorFrom({
				gradient,
				point: { x: 11, y: 75 },
				...GRAPH_CONTEXT,
			});
			expect(color).toContain("52");
		});

		it("gradientColorFromValue returns red for y=20", () => {
			const color = GradientUtils.gradientColorFromValue({
				gradient,
				point: { x: 0, y: 20 },
				dataset,
				...GRAPH_CONTEXT,
			});
			// y=20 is below the 40% mark of the 0..120 axis, so should be red
			expect(color).toContain("217");
		});

		it("gradientColorFromValue returns green for y=75", () => {
			const color = GradientUtils.gradientColorFromValue({
				gradient,
				point: { x: 11, y: 75 },
				dataset,
				...GRAPH_CONTEXT,
			});
			// y=75 is above the 40% mark, so should be green
			expect(color).toContain("52");
		});
	});
});
