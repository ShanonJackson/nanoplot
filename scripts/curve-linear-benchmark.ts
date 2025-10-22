#!/usr/bin/env bun

import data from "../src/utils/path/data.spec.json";
import {
        CurveUtils,
        disposeCurveLinearWasm,
        hasCurveLinearWasm,
        initializeCurveLinearWasmSync,
} from "../src/utils/path/curve";
import { linearFallback, linearJS } from "../src/utils/path/linear-js";
import * as fs from "node:fs";

const iterationsEnv = process.env.ITERATIONS;
const parsedIterations = iterationsEnv ? Number(iterationsEnv) : NaN;
const iterations = Number.isFinite(parsedIterations) && parsedIterations > 0
        ? Math.floor(parsedIterations)
        : 1000;

function formatNumber(value: number) {
        return value.toFixed(3).replace(/\.000$/, ".0");
}

interface Summary {
        label: string;
        iterations: number;
        average: number;
        median: number;
        min: number;
        max: number;
}

function summarize(label: string, durations: Float64Array): Summary {
        let total = 0;
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < durations.length; i += 1) {
                const duration = durations[i];
                total += duration;
                if (duration < min) min = duration;
                if (duration > max) max = duration;
        }
        const average = total / durations.length;
        const sorted = Array.from(durations).sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median =
                sorted.length % 2 === 0
                        ? (sorted[mid - 1] + sorted[mid]) / 2
                        : sorted[mid];

        return {
                label,
                iterations: durations.length,
                average,
                median,
                min,
                max,
        };
}

function logSummary(summary: Summary) {
        console.log(`${summary.label}`);
        console.log(`  iterations: ${summary.iterations}`);
        console.log(`  average:    ${formatNumber(summary.average)} ms`);
        console.log(`  median:     ${formatNumber(summary.median)} ms`);
        console.log(`  min:        ${formatNumber(summary.min)} ms`);
        console.log(`  max:        ${formatNumber(summary.max)} ms`);
}

function measure(label: string, fn: () => void): Summary {
        // Warm up once before timing.
        fn();
        const durations = new Float64Array(iterations);
        for (let i = 0; i < iterations; i += 1) {
                const start = performance.now();
                fn();
                const end = performance.now();
                durations[i] = end - start;
        }
        const summary = summarize(label, durations);
        logSummary(summary);
        return summary;
}

function tryInitializeWasm() {
        const wasmPath = process.env.CURVE_LINEAR_WASM;
        if (!wasmPath) return false;
        try {
                const bytes = fs.readFileSync(wasmPath);
                initializeCurveLinearWasmSync(bytes);
                return hasCurveLinearWasm();
        } catch (error) {
                console.warn(`Failed to initialize wasm: ${error instanceof Error ? error.message : String(error)}`);
                return false;
        }
}

const usingWasm = tryInitializeWasm();

const fallbackSummary = measure("linearFallback (JS legacy)", () => {
        linearFallback(data);
});

const optimizedSummary = measure("linearJS (JS optimized)", () => {
        linearJS(data);
});

const jsDelta = optimizedSummary.average - fallbackSummary.average;
const jsPercent = (jsDelta / fallbackSummary.average) * 100;
const jsAdjective = jsDelta < 0 ? "faster" : "slower";
const jsPercentText = Math.abs(jsPercent).toFixed(2);
const jsDifferenceText = formatNumber(Math.abs(jsDelta));
console.log(`linearJS is ${jsPercentText}% ${jsAdjective} than linearFallback on average (${jsDifferenceText} ms difference).`);

if (usingWasm) {
        const wasmSummary = measure("CurveUtils.linear (WASM)", () => {
                CurveUtils.linear(data);
        });
        const deltaVsFallback = wasmSummary.average - fallbackSummary.average;
        const percentVsFallback = (deltaVsFallback / fallbackSummary.average) * 100;
        const adjectiveVsFallback = deltaVsFallback < 0 ? "faster" : "slower";
        const percentFallbackText = Math.abs(percentVsFallback).toFixed(2);
        const differenceFallbackText = formatNumber(Math.abs(deltaVsFallback));
        console.log(
                `WASM is ${percentFallbackText}% ${adjectiveVsFallback} than linearFallback on average (${differenceFallbackText} ms difference).`,
        );

        const deltaVsOptimized = wasmSummary.average - optimizedSummary.average;
        const percentVsOptimized = (deltaVsOptimized / optimizedSummary.average) * 100;
        const adjectiveVsOptimized = deltaVsOptimized < 0 ? "faster" : "slower";
        const percentOptimizedText = Math.abs(percentVsOptimized).toFixed(2);
        const differenceOptimizedText = formatNumber(Math.abs(deltaVsOptimized));
        console.log(
                `WASM is ${percentOptimizedText}% ${adjectiveVsOptimized} than linearJS on average (${differenceOptimizedText} ms difference).`,
        );
        disposeCurveLinearWasm();
} else {
        console.log("WASM module not initialized; skipping CurveUtils.linear measurement.");
}
