import { FromToJumps } from "../../../models/domain/domain";
import { addDurationToDate, getCeilDateFromDuration, getFloorDateFromDuration, removeDurationFromDate } from "./date-domain";
import { DomainUtils } from "../domain";

const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;
const DESIRED_STEPS = 11;
const MIN_TICKS = 4;
const MAX_GAP_RATIO = 0.375; // maximum 37.5% gap at ends COMBINED
const MAX_INDIVIDUAL_GAP = 0.2; // maximum 20% gap at either end of the range

export const getRangeForSet = ({
	min,
	max,
	from = "auto",
	to = "auto",
	isDateTime,
	duration,
}: {
	from: FromToJumps["from"];
	to: FromToJumps["to"];
	duration: string;
	isDateTime: boolean;
	min: number;
	max: number;
}): { min: number | Date; max: number | Date; jumps?: number } => {
	/*
	 * If "from/to" are both "auto" and it's not date domain we need to calculate both at same time in order to get the best looking axes.
	 *      - Also; Favor taking less jumps, and favor taking jumps that don't result in a gap of >20% at either the start of end of the range.
	 *
	 * If "from" is unknown and "to" is auto then calculate "min" first then "max"
	 * If "to" is known and "from" is auto then calculate "max" first then "min"
	 */
	if (from === "auto" && to === "auto" && !isDateTime) {
		const zeroedMin = min >= 0 ? 0 : min;

		// if (max <= zeroedMin) return { min: zeroedMin, max: to }; don't think this is possible. removing it.
		const rawStep = (max - zeroedMin) / DESIRED_STEPS;
		const exp = Math.floor(Math.log10(rawStep));
		const possibleSteps: number[] = [];
		for (let e = exp - 1; e <= exp + 1; e++) {
			NICE_STEPS.forEach((n) => possibleSteps.push(n * Math.pow(10, e)));
		}
		const uniqueSteps = Array.from(new Set(possibleSteps)).sort((a, b) => a - b);
		const range = max - zeroedMin;
		const candidates = uniqueSteps.map((step) => {
			const minTick = Math.floor(zeroedMin / step) * step;
			const maxTick = Math.ceil(max / step) * step;
			return {
				step,
				minTick,
				maxTick,
				jumps: (maxTick - minTick) / step,
				gapBottom: (min - minTick) / range,
				gapTop: (maxTick - max) / range,
			};
		});
		const valid = candidates.filter((c) => {
			return (
				c.jumps >= MIN_TICKS &&
				c.jumps <= DESIRED_STEPS &&
				c.gapBottom + c.gapTop <= MAX_GAP_RATIO &&
				c.gapTop <= MAX_INDIVIDUAL_GAP &&
				c.gapBottom <= MAX_INDIVIDUAL_GAP
			);
		});

		let chosen;
		if (valid.length > 0) {
			chosen = valid.reduce((acc, c) => (c.jumps < acc.jumps ? c : acc), valid[0]);
		} else {
			const larger = candidates.filter((c) => c.step >= rawStep);
			if (larger.length > 0) {
				chosen = larger.reduce((acc, c) => (c.step < acc.step ? c : acc), larger[0]);
			} else {
				const smaller = candidates.filter((c) => c.step <= rawStep);
				chosen = smaller.reduce((acc, c) => (c.step > acc.step ? c : acc), smaller[0]);
			}
		}
		return {
			min: chosen.minTick,
			max: chosen.maxTick,
			jumps: chosen.jumps,
		};
	}

	if (from !== "auto" /* i have a known from */) {
		//* I have a known 'to' but not a known from.
		const MIN = minFor({ min, max, from, isDateTime, duration });
		const MAX = maxFor({ min: +MIN, max, to, isDateTime, duration });
		return {
			min: MIN,
			max: MAX,
		};
	}

	// i have a known from and a known to.
	const MAX = maxFor({ min, max, to, isDateTime, duration });
	const MIN = minFor({ min, max, from, isDateTime, duration });
	return {
		min: MIN,
		max: MAX,
	};
};

const minFor = ({
	min,
	max,
	from = "auto",
	isDateTime,
	duration,
}: {
	min: number;
	max: number;
	from: NonNullable<FromToJumps["from"]>;
	isDateTime: boolean;
	duration: string;
}) => {
	if (from === "min" || from === "auto") {
		if (isDateTime) {
			return from === "auto" ? new Date(min) : getFloorDateFromDuration(new Date(min), duration);
		}
		return from === "min" ? min : DomainUtils.autoMinFor({ min, max });
	}
	if (typeof from === "number") return from;
	const isAuto = from.includes("auto");
	const operator = from.match(/(\+|-)/)?.[0];
	const isPercentage = from.includes("%");
	const value = +from.replace(/[^0-9]/g, "");
	const modifyDuration = from.match(/P(?:\d+[YMD])*(?:T\d+[HMS]*)?/)?.[0];
	if (operator === "+") {
		if (modifyDuration) {
			const dte = isAuto ? new Date(min) : getCeilDateFromDuration(new Date(min), duration);
			return addDurationToDate(dte, modifyDuration);
		}
		return isPercentage ? min + (min * value) / 100 : min + value;
	}
	if (operator === "-") {
		if (modifyDuration) {
			const dte = isAuto ? new Date(min) : getFloorDateFromDuration(new Date(min), duration);
			return removeDurationFromDate(dte, modifyDuration);
		}
		return isPercentage ? min - (min * value) / 100 : min - value;
	}
	return min;
};

const maxFor = ({
	min,
	max,
	to = "auto",
	isDateTime,
	duration,
}: {
	min: number;
	max: number;
	to: NonNullable<FromToJumps["to"]>;
	isDateTime: boolean;
	duration: string;
}) => {
	if (to === "max" || to === "auto") {
		if (isDateTime) {
			return to === "auto" ? new Date(max) : getCeilDateFromDuration(new Date(max), duration);
		}
		return to === "max" ? max : DomainUtils.autoMaxFor({ max, min });
	}
	if (typeof to === "number") return to;
	const isAuto = to.includes("auto");
	const operator = to.match(/(\+|-)/)?.[0];
	const isPercentage = to.includes("%");
	const value = +to.replace(/[^0-9]/g, "");
	const modifyDuration = to.match(/P(?:\d+[YMD])*(?:T\d+[HMS]*)?/)?.[0];
	if (operator === "+") {
		if (modifyDuration) {
			const dte = isAuto ? new Date(max) : getCeilDateFromDuration(new Date(max), duration);
			return addDurationToDate(dte, modifyDuration);
		}
		return isPercentage ? max + (max * value) / 100 : max + value;
	}
	if (operator === "-") {
		if (modifyDuration) {
			const dte = isAuto ? new Date(max) : getFloorDateFromDuration(new Date(max), duration);
			return removeDurationFromDate(dte, modifyDuration);
		}
		return isPercentage ? max - (max * value) / 100 : max - value;
	}
	return max;
};
