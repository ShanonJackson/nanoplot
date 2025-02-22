import { describe, expect, it } from "bun:test";
import { GradientUtils } from "./gradient";

describe("src/utils/gradient", () => {
	// it("Should return correct color for a hex gradient", () => {
	// 	const gradient = "linear-gradient(to right, #000000 0%, #ffffff 100%)";
	// 	// 50% should yield a mid-gray: rgba(128, 128, 128, 1)
	// 	const color = GradientUtils.colorFrom(gradient, 50);
	// 	expect(color).toBe("rgba(128, 128, 128, 1.00)");
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
