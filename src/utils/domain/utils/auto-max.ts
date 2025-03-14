const roundUp = (num: number, nearest: number): number => (num % nearest === 0 ? num + nearest : Math.ceil(num / nearest) * nearest);

export const autoMax = (value: number): number => {
	const thresholds = [0.5, 0.25, 0.2] as const;
	const base = 10 ** Math.floor(Math.log10(value));

	return (
		thresholds
			.map((factor) => ({ factor, nearest: base * factor, rounded: roundUp(value, base * factor) }))
			.find(({ rounded }) => (rounded - value) / value <= 0.2)?.rounded ?? value + value / 10
	);
};
