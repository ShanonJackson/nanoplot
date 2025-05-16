const roundUp = (num: number, nearest: number): number => (num % nearest === 0 ? num + nearest : Math.ceil(num / nearest) * nearest);
export const autoMax = (value: number): number => {
	const thresholds = [1, 0.5, 0.25, 0.2] as const;
	const base = 10 ** Math.floor(Math.log10(value));

	/* Special case, 89_000_00 should be rounded to 100_000_000 (TENTH) */
	const tenth = 10 ** Math.ceil(Math.log10(value));
	const tenthDiff = (tenth - value) / value;
	if (tenthDiff <= 0.2 && tenthDiff >= 0.05) return tenth;

	const suggested = thresholds
		.map((factor) => ({ factor, nearest: base * factor, rounded: roundUp(value, base * factor) }))
		.find(({ rounded }) => {
			const diff = (rounded - value) / value;
			return diff <= 0.225 && diff >= 0.05;
		})?.rounded;
	if (!suggested) return autoMax(value * 1.05); // Try again increasing by 5%;
	return suggested;
};
