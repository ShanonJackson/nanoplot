const roundDown = (num: number, nearest: number) =>
	nearest > 0 ? Math.floor(num / nearest) * nearest : Math.ceil(num / nearest) * nearest;
export const autoMin = ({ min: value, max }: { min: number; max: number }) => {
	if (value >= 0) return 0;
	const distanceDigits = Math.max(
		0,
		Math.round(max - value)
			.toString()
			.replace("-", "").length - 2,
	);

	const nearest = [
		parseInt("2" + "5" + "0".repeat(Math.max(0, distanceDigits - 1))),
		parseInt("2" + "0".repeat(distanceDigits)),
		parseInt("5" + "0".repeat(distanceDigits)),
		parseInt("3" + "0".repeat(distanceDigits)),
	].find((factor) => max % factor === 0);
	if (nearest) return roundDown(value, nearest);
	const digits = Math.round(value).toString().length;
	const min = (() => {
		const suggested = -parseInt("1" + "0".repeat(Math.max(0, digits - 1)));
		if (suggested === value) return value - parseInt("1" + "0".repeat(Math.max(0, digits - 2)));
		return suggested;
	})();
	/* Prime number avoid er */
	return roundDown(roundDown(value, min), parseInt("2" + "0".repeat(Math.max(0, digits - 2))));
};
