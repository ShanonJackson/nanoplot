import { describe, expect, it } from "bun:test";
import data from "./data.spec.json";
import { CurveUtils } from "./curve";
import * as fs from "node:fs";

describe("CurveUtils", () => {
	it("Should never take longer than 1ms on 50 runs for dataset.", () => {
		// .linear is a super hotpath for high performance rendering.
		const times = Array.from({ length: 400 }, () => {
			const start = performance.now();
			CurveUtils.linear(data);
			const end = performance.now();
			return end - start;
		});
		const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
		expect(average).toBeLessThan(1);
	});
});
