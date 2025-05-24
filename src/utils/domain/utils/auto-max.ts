type Bounds = { min: number; max: number };

const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;

export function autoMax({ min, max }: Bounds): number {
	// if max ≤ min, treat min as 0 so we still get a 0–max axis
	const effectiveMin = max > min ? min : 0;
	const span = max - effectiveMin;
	if (span <= 0) return max;

	// → now targeting 11 jumps instead of 10
	const rawStep = span / 11;

	// figure out its order-of-magnitude
	const magnitude = 10 ** Math.floor(Math.log10(rawStep));

	// pick the first “nice” multiple ≥ rawStep
	const step = NICE_STEPS.map((n) => n * magnitude).find((candidate) => candidate >= rawStep)!;

	// round max *up* to that grid
	return Math.ceil(max / step) * step;
}
