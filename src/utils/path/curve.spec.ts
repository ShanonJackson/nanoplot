import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import data from "./data.spec.json";
import {
        CurveUtils,
        disposeCurveLinearWasm,
        hasCurveLinearWasm,
        initializeCurveLinearWasmSync,
} from "./curve";
import { linearFallback, linearJS } from "./linear-js";
import * as fs from "node:fs";

describe("CurveUtils", () => {
        let wasmEnabled = false;
        const maxAverageDurationMs = 2;

        beforeAll(() => {
                const wasmPath = process.env.CURVE_LINEAR_WASM;
                if (!wasmPath) return;
                try {
                        const bytes = fs.readFileSync(wasmPath);
                        initializeCurveLinearWasmSync(bytes);
                        wasmEnabled = hasCurveLinearWasm();
                } catch (error) {
                        wasmEnabled = false;
                }
        });

        afterAll(() => {
                if (wasmEnabled) {
                        disposeCurveLinearWasm();
                }
        });

        it(`JS fallback linear should average under ${maxAverageDurationMs}ms over multiple runs.`, () => {
                const times = Array.from({ length: 400 }, () => {
                        const start = performance.now();
                        linearFallback(data);
                        const end = performance.now();
                        return end - start;
                });
                const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
                expect(average).toBeLessThan(maxAverageDurationMs);
        });

        it("Optimized JS linear matches legacy fallback output.", () => {
                const fallbackResult = linearFallback(data);
                const optimizedResult = linearJS(data);
                expect(optimizedResult).toBe(fallbackResult);
        });

        it("WASM linear matches JS output when enabled.", () => {
                if (!wasmEnabled) return;
                const jsResult = linearFallback(data);
                const wasmResult = CurveUtils.linear(data);
                expect(wasmResult).toBe(jsResult);
        });

        it("WASM linear runs without significant regression when enabled.", () => {
                if (!wasmEnabled) return;
                const times = Array.from({ length: 400 }, () => {
                        const start = performance.now();
                        CurveUtils.linear(data);
                        const end = performance.now();
                        return end - start;
                });
                const average = times.reduce((acc, curr) => acc + curr, 0) / times.length;
                expect(average).toBeLessThan(maxAverageDurationMs);
        });
});
