import { describe, expect, it } from "bun:test";
import { ArrayUtils, chunk } from "./array";
import { benchmark } from "./benchmark/benchmark";

describe("src/utils/array/ArrayUtils.chunk", () => {
	it("chunks evenly and preserves order", () => {
		const input = [1, 2, 3, 4];
		expect(ArrayUtils.chunk(input, 2)).toEqual([
			[1, 2],
			[3, 4],
		]);
	});

	it("handles last partial chunk", () => {
		const input = [1, 2, 3, 4, 5];
		expect(chunk(input, 2)).toEqual([[1, 2], [3, 4], [5]]);
	});

	it("returns empty array for empty input", () => {
		expect(ArrayUtils.chunk([], 3)).toEqual([]);
	});

	it("size <= 0 returns a single full copy (or empty)", () => {
		const arr = [1, 2, 3];
		expect(ArrayUtils.chunk(arr, 0)).toEqual([[1, 2, 3]]);
		expect(ArrayUtils.chunk([], 0)).toEqual([]);
	});

	// Simple perf measurements using local benchmark helper
	it("perf: runs fast on large arrays (copy-chunk)", () => {
		const big = Array.from({ length: 100_000 }, (_, i) => i);
		const t1 = benchmark(() => {
			ArrayUtils.chunk(big, 1_000);
		}, 50);
		const t2 = benchmark(() => {
			ArrayUtils.chunk(big, 2_000);
		}, 50);
		const t3 = benchmark(() => {
			ArrayUtils.chunk(big, 5_000);
		}, 50);
		console.log("ArrayUtils.chunk avg ms (copy, size=1k,2k,5k):", t1.toFixed(4), t2.toFixed(4), t3.toFixed(4));
		expect(Number.isFinite(t1 + t2 + t3)).toBe(true);
	});

	it("perf: typed views & indices", () => {
		const big = new Float32Array(100_000);
		for (let i = 0; i < big.length; i++) big[i] = i;
		const tTyped = benchmark(() => {
			ArrayUtils.chunkTyped(big, 2_000);
		}, 50);
		const tIdx = benchmark(() => {
			ArrayUtils.chunkIndices(100_000, 2_000);
		}, 50);
		console.log("ArrayUtils.chunkTyped avg ms (views):", tTyped.toFixed(4));
		console.log("ArrayUtils.chunkIndices avg ms (ranges):", tIdx.toFixed(4));
		expect(Number.isFinite(tTyped + tIdx)).toBe(true);
	});

	it("perf: object array — indices+slice vs direct", () => {
		const bigObjs = Array.from({ length: 100_000 }, (_, i) => ({ x: i, y: i * 2 }));
		const size = 2_000;
		const tDirect = benchmark(() => {
			ArrayUtils.chunk(bigObjs, size);
		}, 30);
		const tIdxSlice = benchmark(() => {
			const ranges = ArrayUtils.chunkIndices(bigObjs.length, size);
			for (let r = 0; r < ranges.length; r++) {
				const [s, e] = ranges[r];
				bigObjs.slice(s, e);
			}
		}, 30);
		console.log("object array avg ms — direct slice:", tDirect.toFixed(4));
		console.log("object array avg ms — indices+slice:", tIdxSlice.toFixed(4));
		expect(Number.isFinite(tDirect + tIdxSlice)).toBe(true);
	});
});
