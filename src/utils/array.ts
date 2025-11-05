export const ArrayUtils = {
	chunk: <T,>(array: T[], size: number): T[][] => {
		const len = array.length;
		if (size <= 0) return len ? [array.slice()] : [];
		const outLen = ((len + size - 1) / size) | 0; // ceil without float
		const out = new Array<T[]>(outLen);
		let o = 0;
		for (let i = 0; i < len; i += size) {
			out[o++] = array.slice(i, i + size);
		}
		return out;
	},

	// Non-copying views for TypedArrays using subarray (near O(chunks))
	chunkTyped<T extends ArrayBufferView & { subarray: (start: number, end: number) => T }>(
		array: T,
		size: number,
	): T[] {
		const len = (array as unknown as { length: number }).length;
		if (size <= 0) return len ? [array.subarray(0, len)] : [];
		const outLen = ((len + size - 1) / size) | 0;
		const out = new Array<T>(outLen);
		let o = 0;
		for (let i = 0; i < len; i += size) {
			out[o++] = array.subarray(i, i + size);
		}
		return out;
	},

	// Indices-only variant to avoid per-element copying entirely
	chunkIndices: (length: number, size: number): [number, number][] => {
		if (size <= 0) return length ? [[0, length]] : [];
		const outLen = ((length + size - 1) / size) | 0;
		const out = new Array<[number, number]>(outLen);
		let o = 0;
		for (let i = 0; i < length; i += size) {
			out[o++] = [i, Math.min(i + size, length)];
		}
		return out;
	},
};

// Standalone export for potential inlining/optimization, mirroring utils pattern
export const chunk = ArrayUtils.chunk;
