const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;
const DESIRED_STEPS = 11;
export function autoMin({ min, max }: { min: number; max: number }): number {
	if (min >= 0) return 0;
	const range = max - min;
	if (range <= 0) return min;
	const raw = range / DESIRED_STEPS;
	const magnitude = 10 ** Math.floor(Math.log10(raw));
	const step = NICE_STEPS.map((n) => n * magnitude).find((n) => n >= raw);
	if (!step) return 0;
	return Math.floor(min / step) * step;
}
