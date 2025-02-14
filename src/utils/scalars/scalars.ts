export const ScalarUtils = {
	/**
	 * Returns a percentage through a range of scalars that could be on non-linear scales i.e (0 0%, 50 80%, 100 100%)
	 * @param scalars - Array of scalar values
	 * @param value - Percentage value (0-100)
	 * @returns - Percentage value (0-100)
	 */
	percentFor: (value: number, scalars: Array<{ tick: number; percent: number }>): number => {
		if (scalars.length === 0) return 0;
		const ticks = [...scalars].sort((a, b) => a.tick - b.tick);
		if (value <= ticks[0].tick) return ticks[0].percent;
		if (value >= ticks[ticks.length - 1].tick) return ticks[ticks.length - 1].percent;
		const relevantTicks = ticks.findIndex((tick, i) => value >= tick.tick && value <= ticks[i + 1]?.tick);
		if (relevantTicks !== -1) {
			const lower = ticks[relevantTicks];
			const upper = ticks[relevantTicks + 1];
			const ratio = (value - lower.tick) / (upper.tick - lower.tick);
			return lower.percent + ratio * (upper.percent - lower.percent);
		}
		return 0;
	},
};
