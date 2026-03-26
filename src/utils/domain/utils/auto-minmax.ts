import { FromToJumps } from "../../../models/domain/domain";
import { TemporalKind, fromEpochMs, toEpochMs, toZdt, toKind } from "./temporal";
import { getCeilTemporalFromDuration, getFloorTemporalFromDuration } from "./temporal-domain";
import { DomainUtils } from "../domain";
import { TemporalDate } from "../../../hooks/use-graph/use-graph";

const NICE_STEPS = [1, 2, 2.5, 5, 10] as const;
const DESIRED_STEPS = 11;
const MIN_TICKS = 4;
const MAX_GAP_RATIO = 0.375;
const MAX_INDIVIDUAL_GAP = 0.2;

export const getRangeForSet = ({
	min,
	max,
	from = "auto",
	to = "auto",
	isTemporal: isTemp,
	duration,
	kind,
	timeZone,
}: {
	from: FromToJumps["from"];
	to: FromToJumps["to"];
	duration: string;
	isTemporal: boolean;
	min: number;
	max: number;
	kind: TemporalKind;
	timeZone: string;
}): { min: number | TemporalDate; max: number | TemporalDate; jumps?: number } => {
	if (from === "auto" && to === "auto" && !isTemp) {
		const zeroedMin = min >= 0 ? 0 : min;

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

	if (from !== "auto") {
		const MIN = minFor({ min, max, from, isTemporal: isTemp, duration, kind, timeZone });
		const MAX = maxFor({ min: typeof MIN === "number" ? MIN : toEpochMs(MIN), max, to, isTemporal: isTemp, duration, kind, timeZone });
		return { min: MIN, max: MAX };
	}

	const MAX = maxFor({ min, max, to, isTemporal: isTemp, duration, kind, timeZone });
	const MIN = minFor({ min, max, from, isTemporal: isTemp, duration, kind, timeZone });
	return { min: MIN, max: MAX };
};

const minFor = ({
	min,
	max,
	from = "auto",
	isTemporal: isTemp,
	duration,
	kind,
	timeZone,
}: {
	min: number;
	max: number;
	from: NonNullable<FromToJumps["from"]>;
	isTemporal: boolean;
	duration: string;
	kind: TemporalKind;
	timeZone: string;
}) => {
	if (from === "min" || from === "auto") {
		if (isTemp) {
			const v = fromEpochMs(min, kind, timeZone);
			return from === "auto" ? v : getFloorTemporalFromDuration(v, duration);
		}
		return from === "min" ? min : DomainUtils.autoMinFor({ min, max });
	}
	if (typeof from === "number") return from;
	const isAuto = from.includes("auto");
	const operator = from.match(/(\+|-)/)?.[0];
	const isPercentage = from.includes("%");
	const value = +from.replace(/[^0-9]/g, "");
	const modifyDuration = from.match(/P(?:\d+[YMD])*(?:T\d+[HMS]*)?/)?.[0];
	if (operator === "+" && modifyDuration) {
		const base = isAuto ? fromEpochMs(min, kind, timeZone) : getCeilTemporalFromDuration(fromEpochMs(min, kind, timeZone), duration);
		return toKind(toZdt(base, timeZone).add(Temporal.Duration.from(modifyDuration)), kind);
	}
	if (operator === "-" && modifyDuration) {
		const base = isAuto ? fromEpochMs(min, kind, timeZone) : getFloorTemporalFromDuration(fromEpochMs(min, kind, timeZone), duration);
		return toKind(toZdt(base, timeZone).subtract(Temporal.Duration.from(modifyDuration)), kind);
	}
	if (operator === "+") return isPercentage ? min + (min * value) / 100 : min + value;
	if (operator === "-") return isPercentage ? min - (min * value) / 100 : min - value;
	return min;
};

const maxFor = ({
	min,
	max,
	to = "auto",
	isTemporal: isTemp,
	duration,
	kind,
	timeZone,
}: {
	min: number;
	max: number;
	to: NonNullable<FromToJumps["to"]>;
	isTemporal: boolean;
	duration: string;
	kind: TemporalKind;
	timeZone: string;
}) => {
	if (to === "max" || to === "auto") {
		if (isTemp) {
			const v = fromEpochMs(max, kind, timeZone);
			return to === "auto" ? v : getCeilTemporalFromDuration(v, duration);
		}
		return to === "max" ? max : DomainUtils.autoMaxFor({ max, min });
	}
	if (typeof to === "number") return to;
	const isAuto = to.includes("auto");
	const operator = to.match(/(\+|-)/)?.[0];
	const isPercentage = to.includes("%");
	const value = +to.replace(/[^0-9]/g, "");
	const modifyDuration = to.match(/P(?:\d+[YMD])*(?:T\d+[HMS]*)?/)?.[0];
	if (operator === "+" && modifyDuration) {
		const base = isAuto ? fromEpochMs(max, kind, timeZone) : getCeilTemporalFromDuration(fromEpochMs(max, kind, timeZone), duration);
		return toKind(toZdt(base, timeZone).add(Temporal.Duration.from(modifyDuration)), kind);
	}
	if (operator === "-" && modifyDuration) {
		const base = isAuto ? fromEpochMs(max, kind, timeZone) : getFloorTemporalFromDuration(fromEpochMs(max, kind, timeZone), duration);
		return toKind(toZdt(base, timeZone).subtract(Temporal.Duration.from(modifyDuration)), kind);
	}
	if (operator === "+") return isPercentage ? max + (max * value) / 100 : max + value;
	if (operator === "-") return isPercentage ? max - (max * value) / 100 : max - value;
	return max;
};
