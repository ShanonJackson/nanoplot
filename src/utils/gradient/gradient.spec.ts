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
	// it("Should return correct color for a hex gradient", () => {
	// 	//  GradientUtils.parse({ gradient, viewbox, domain })
	// 	const gradient = "mask:linear-gradient(to right, rgb(255, 0, 0) 400, rgb(0, 0, 255) 400.1, rgb(0, 0, 255) 1500)";
	// 	// 50% should yield a mid-gray: rgba(128, 128, 128, 1)
	//
	// 	const color = GradientUtils.parse({
	// 		gradient,
	// 		...MOCK_CONTEXT,
	// 	});
	// });
	//
	// it("Should work with shorthand hex stops", () => {
	// 	const gradient = "linear-gradient(to right, #000 0%, #fff 100%)";
	// 	// At 25%, interpolation yields roughly 25% of white: rgba(64, 64, 64, 1)
	// 	const color = GradientUtils.colorFrom(gradient, 25);
	// 	expect(color).toBe("rgba(64, 64, 64, 1.00)");
	// });
	//
	// it("Should work with rgb stops", () => {
	// 	const gradient = "linear-gradient(to right, rgb(0, 0, 255) 0%, rgb(0, 255, 0) 100%)";
	// 	// At 50%, interpolation between blue and green yields: rgba(0, 128, 128, 1)
	// 	const color = GradientUtils.colorFrom(gradient, 50);
	// 	expect(color).toBe("rgba(0, 128, 128, 1.00)");
	// });
	//
	// it("Should work with hsl stops", () => {
	// 	const gradient = "linear-gradient(to right, hsl(0, 100%, 50%) 0%, hsl(120, 100%, 50%) 100%)";
	// 	// hsl(0,100%,50%) = rgb(255,0,0) and hsl(120,100%,50%) = rgb(0,255,0)
	// 	// 50% interpolation yields: rgba(128, 128, 0, 1)
	// 	const color = GradientUtils.colorFrom(gradient, 50);
	// 	expect(color).toBe("rgba(128, 128, 0, 1.00)");
	// });
	//
	// it("Should interpolate missing positions", () => {
	// 	const gradient = "linear-gradient(to right, #000 0%, #555, #fff 100%)";
	// 	const color = GradientUtils.colorFrom(gradient, 50);
	// 	expect(color).toBe("rgba(85, 85, 85, 1.00)");
	// });
	//
	// it("Should return the last color when percent is above 100", () => {
	// 	const gradient = "linear-gradient(to right, #123 0%, #456 50%, #789 100%)";
	// 	// When percent is beyond the gradient range, the last stop color is used.
	// 	// #789 expands to "rgb(119, 136, 153)"
	// 	const color = GradientUtils.colorFrom(gradient, 150);
	// 	expect(color).toBe("rgb(119, 136, 153)"); // last stop color as rgb
	// });
	//
	// it("Should turn unsupported colors to rgb(0,0,0)", () => {
	// 	expect(GradientUtils.colorFrom("invalid", 50)).toBe("rgb(0, 0, 0)");
	// });
	//
	// it("Should give you a color between red/blue at 50%", () => {
	// 	const gradient = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(0, 0, 255) 100%)";
	// 	const color = GradientUtils.colorFrom(gradient, 50);
	// 	expect(color).toBe("rgba(128, 0, 128, 1.00)");
	// });
	//
	// it("Should give you a color between red/blue at 25%", () => {
	// 	const gradient = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(0, 0, 255) 100%)";
	// 	const color = GradientUtils.colorFrom(gradient, 25);
	// 	expect(color).toBe("rgba(191, 0, 64, 1.00)");
	// });
});
