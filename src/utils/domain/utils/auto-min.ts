const roundUp = (num: number, nearest: number) => Math.ceil(num / nearest) * nearest;
const roundDown = (num: number, nearest: number) => Math.floor(num / nearest) * nearest;

export const autoMin = (value: number) => {
	if (value >= 0) return 0;
	const digits = Math.round(value).toString().length;
	const min = (() => {
		const suggested = -parseInt("1" + "0".repeat(Math.max(0, digits - 1)));
		if ((roundUp(value, suggested) - value) / value > 0.35) {
			// increase is too large from original number.
			return parseInt("1" + "0".repeat(Math.max(0, digits - 2)));
		}
		if (suggested === value) return value - parseInt("1" + "0".repeat(Math.max(0, digits - 2)));
		return suggested;
	})();
	/* Prime number avoid er */
	return roundDown(roundDown(value, min), parseInt("2" + "0".repeat(Math.max(0, digits - 2))));
};
