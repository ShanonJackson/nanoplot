const chunk = <T>(arr: T[], size: number): T[][] => {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
};
export const MathUtils = {
	isBetween: (value: number, min: number, max: number) => {
		return value >= min && value <= max;
	},
	scale: (value: number, minmax: number | [number, number], newminMax: number | [number, number]) => {
		/* Takes number on 1 scale and scales it to another scale if scale is a number assumes 0->N */
		const [min, max] = typeof minmax === "number" ? [0, minmax] : minmax;
		const [newMin, newMax] = typeof newminMax === "number" ? [0, newminMax] : newminMax;
		return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
	},
	clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
	min: (values: number[]) => {
		/* Math.min is limited to 124_980 arguments in chrome via spread; chunking to 100_000 makes it both performant (native code) AND stack safe*/
		return chunk(values, 100_000).reduce((acc, val) => Math.min(acc, Math.min(...val)), Infinity);
	},
	max: (values: number[]) => {
		/* Math.max is limited to 124_980 arguments in chrome via spread; chunking to 100_000 makes it both performant (native code) AND stack safe*/
		return chunk(values, 100_000).reduce((acc, val) => Math.max(acc, Math.max(...val)), -Infinity);
	},
};
