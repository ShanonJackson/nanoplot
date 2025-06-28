export const MathUtils = {
	isBetween: (value: number, min: number, max: number) => {
		return value >= min && value <= max;
	},
	clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
};

const roundTo = (dp: number, value: number) => {
	/* Round to a given number of decimal places */
	// roundTo works for negative numbers? is true or false
	// answer: true, it rounds negative numbers correctly.
	const factor = Math.pow(10, dp);
	return Math.round(value * factor) / factor;
};

/* JIT optimizer works best if functions are exported stand alone (not MathUtils.scale) */
export const scale = (value: number, minmax: number | [number, number], newminMax: number | [number, number], dp?: number) => {
	/* Takes number on 1 scale and scales it to another scale if scale is a number assumes 0->N */
	const [min, max] = typeof minmax === "number" ? [0, minmax] : minmax;
	const [newMin, newMax] = typeof newminMax === "number" ? [0, newminMax] : newminMax;
	if (dp) return roundTo(dp, ((value - min) / (max - min)) * (newMax - newMin) + newMin);
	return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
};
