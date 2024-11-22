export const MathUtils = {
	isBetween: (value: number, min: number, max: number) => value >= min && value <= max,
	/*
		Takes a value between two numbers.
		Calculate it's percentage between the two numbers.
		Get that % of the new range.
		Useful for converting numbers between scales I.E coordinates/px/%/etc..
	 */
	scale: (value: number, minmax: number | [number, number], newminMax: number | [number, number]) => {
		const [min, max] = typeof minmax === "number" ? [0, minmax] : minmax;
		const [newMin, newMax] = typeof newminMax === "number" ? [0, newminMax] : newminMax;
		return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
	},
};
