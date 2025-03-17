import { expect, describe, it } from "bun:test";
import data from "./data.spec.json";
import { CurveUtils } from "./curve";

// javascript function to measure performance
describe("CurveUtils", () => {
	it("Should be performant", () => {
		// measure CurveUtils.linear performance using data as argument
		// if average performance <20ms it's pass.
		// if average performance >20ms it's fail.
		// measure Curve
		const start = performance.now();
		CurveUtils.linear(data);
		const end = performance.now();
		const time = end - start;
		expect(time).toBeLessThan(1);
	})
})