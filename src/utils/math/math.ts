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
};
