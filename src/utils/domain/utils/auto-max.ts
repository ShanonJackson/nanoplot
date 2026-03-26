const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;

export function autoMax({ min, max }: { min: number; max: number }): number {
	const effectiveMin = max > min ? min : 0;
	const span = max - effectiveMin;
	if (span <= 0) return max;

	const rawStep = span / 11;
	const magnitude = 10 ** Math.floor(Math.log10(rawStep));
	const step = NICE_STEPS.map((n) => n * magnitude).find((candidate) => candidate >= rawStep)!;

	return Math.ceil(max / step) * step;
}
