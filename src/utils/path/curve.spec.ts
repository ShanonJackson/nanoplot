import { describe, expect, it } from "bun:test";
import data from "./data.spec.json";
import { CurveUtils, linear2 } from "./curve";

describe("CurveUtils", () => {
	it("Should never take longer than 1ms on 50 runs for dataset.", () => {
		// .linear is a super hotpath for high performance rendering.
		// data is a x/y array, change it to interleaved Float32Array for perf.

		const dataArray = data.map((d) => [d.x, d.y]);
		const ddd = new Float32Array(dataArray.flat());
		const times = Array.from({ length: 400 }, () => {
			const start = performance.now();
			// CurveUtils.linear2(data);
			CurveUtils.linear(ddd);
			const end = performance.now();
			return end - start;
		});
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		const max = Math.max(...times);
		const min = Math.min(...times);
		console.log({ max, min });
		expect(average).toBeLessThan(0.0001);
	});
});
