const roundUp = (num: number, nearest: number): number => (num % nearest === 0 ? num + nearest : Math.ceil(num / nearest) * nearest);

const getLeadingDigits = (n: number, digits = 2): number => Math.floor(n / 10 ** (Math.floor(Math.log10(n)) + 1 - digits));

const isSemiOddRelativeToBase = (rounded: number): boolean => {
	const prefix = getLeadingDigits(rounded);
	return prefix !== 11 && prefix % 2 !== 0;
};

export const autoMax = (value: number): number => {
	const base = 10 ** Math.floor(Math.log10(value));
	return (
		([1, 0.5, 0.25, 0.1, 0.2] as const)
			.map((factor) => ({ factor, nearest: base * factor, rounded: roundUp(value, base * factor) }))
			.find(({ rounded }) => {
				const diff = (rounded - value) / value;
				/* > 5% difference but less than 22.5% difference */
				return diff <= 0.225 && diff >= 0.05 && !isSemiOddRelativeToBase(rounded);
			})?.rounded ?? roundUp(value, base)
	);
};
