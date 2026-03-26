import { toEpochMs, toZdt, toKind, getTemporalKind, getTimeZone, largestUnit } from "./temporal";
import { TemporalDate } from "../../../hooks/use-graph/use-graph";

/**
 * Floor a Temporal value down to the nearest duration boundary.
 */
export const getFloorTemporalFromDuration = (v: TemporalDate, duration: string): TemporalDate => {
	const dur = Temporal.Duration.from(duration);
	const largest = largestUnit(dur);
	if (!largest) throw new Error("Duration must have at least one non-zero component");

	const kind = getTemporalKind(v);
	const timeZone = getTimeZone(v);
	const zdt = toZdt(v, timeZone);
	const Y = zdt.year;
	const M = zdt.month;
	const D = zdt.day;
	const h = zdt.hour;
	const m_ = zdt.minute;
	const s = zdt.second;

	let y = Y,
		mo = M,
		da = 1,
		hh = 0,
		mm = 0,
		ss = 0;

	switch (largest) {
		case "years": {
			const N = dur.years;
			y = Math.floor((Y - 1) / N) * N + 1;
			break;
		}
		case "months": {
			const N = dur.months;
			mo = Math.floor((M - 1) / N) * N + 1;
			break;
		}
		case "days": {
			const N = dur.days;
			da = Math.floor((D - 1) / N) * N + 1;
			break;
		}
		case "hours": {
			const N = dur.hours;
			da = D;
			hh = Math.floor(h / N) * N;
			break;
		}
		case "minutes": {
			const N = dur.minutes;
			da = D;
			hh = h;
			mm = Math.floor(m_ / N) * N;
			break;
		}
		case "seconds": {
			const N = dur.seconds;
			da = D;
			hh = h;
			mm = m_;
			ss = Math.floor(s / N) * N;
			break;
		}
	}

	const pdt = Temporal.PlainDateTime.from({ year: y, month: mo, day: da, hour: hh, minute: mm, second: ss });
	return toKind(pdt.toZonedDateTime(timeZone), kind);
};

type ISOUnit = "Y" | "M" | "W" | "D" | "H" | "M" | "S";
interface Candidate {
	iso: string;
	ms: number;
}
const TARGET_TICKS = 10;
export function getDurationFromMinMax(min: number, max: number): string {
	// Convert to numeric ms
	const span = max - min;

	// Candidate intervals in ISO + their ms lengths
	const candidates: Candidate[] = [
		{ iso: "PT1S", ms: 1000 },
		{ iso: "PT5S", ms: 5 * 1000 },
		{ iso: "PT15S", ms: 15 * 1000 },
		{ iso: "PT30S", ms: 30 * 1000 },
		{ iso: "PT1M", ms: 60 * 1000 },
		{ iso: "PT5M", ms: 5 * 60 * 1000 },
		{ iso: "PT15M", ms: 15 * 60 * 1000 },
		{ iso: "PT30M", ms: 30 * 60 * 1000 },
		{ iso: "PT1H", ms: 60 * 60 * 1000 },
		{ iso: "PT3H", ms: 3 * 60 * 60 * 1000 },
		{ iso: "PT6H", ms: 6 * 60 * 60 * 1000 },
		{ iso: "PT12H", ms: 12 * 60 * 60 * 1000 },
		{ iso: "P1D", ms: 24 * 60 * 60 * 1000 },
		{ iso: "P2D", ms: 2 * 24 * 60 * 60 * 1000 },
		{ iso: "P7D", ms: 7 * 24 * 60 * 60 * 1000 },
		{ iso: "P1M", ms: 30 * 24 * 60 * 60 * 1000 }, // ≈30 days
		{ iso: "P3M", ms: 3 * 30 * 24 * 60 * 60 * 1000 },
		{ iso: "P6M", ms: 6 * 30 * 24 * 60 * 60 * 1000 },
		{ iso: "P1Y", ms: 365 * 24 * 60 * 60 * 1000 }, // ≈1 year
	];

	// For each candidate, how many ticks would it give?
	// pick the iso whose tick-count is closest to targetTicks
	let best: Candidate = candidates[0];
	let bestDiff = Infinity;

	for (const cand of candidates) {
		const ticks = span / cand.ms;
		const diff = Math.abs(ticks - TARGET_TICKS);
		if (diff < bestDiff) {
			bestDiff = diff;
			best = cand;
		}
	}
	return best.iso;
}

/**
 * Ceil a Temporal value up to the nearest duration boundary.
 */
export const getCeilTemporalFromDuration = (v: TemporalDate, duration: string): TemporalDate => {
	const dur = Temporal.Duration.from(duration);
	const largest = largestUnit(dur);
	if (!largest) throw new Error("Duration must have at least one non-zero component");

	const kind = getTemporalKind(v);
	const timeZone = getTimeZone(v);
	const zdt = toZdt(v, timeZone);
	const Y = zdt.year;
	const M = zdt.month;
	const D = zdt.day;
	const h = zdt.hour;
	const m_ = zdt.minute;
	const s = zdt.second;

	let pdt: Temporal.PlainDateTime;

	switch (largest) {
		case "years": {
			const N = dur.years!;
			pdt = Temporal.PlainDateTime.from({ year: Math.ceil(Y / N) * N, month: 1, day: 1 });
			break;
		}
		case "months": {
			const N = dur.months!;
			const blockEnd = Math.ceil(M / N) * N;
			pdt =
				blockEnd <= 12
					? Temporal.PlainDateTime.from({ year: Y, month: blockEnd, day: 1 })
					: Temporal.PlainDateTime.from({ year: Y + 1, month: blockEnd - 12, day: 1 });
			break;
		}
		case "days": {
			const N = dur.days!;
			const effDay = D + (h || m_ || s ? 1 : 0);
			const target = Temporal.PlainDate.from({ year: Y, month: M, day: 1 }).add({ days: Math.ceil(effDay / N) * N - 1 });
			pdt = target.toPlainDateTime(new Temporal.PlainTime());
			break;
		}
		case "hours": {
			const N = dur.hours!;
			const blockEnd = Math.ceil(h / N) * N;
			const base = Temporal.PlainDate.from({ year: Y, month: M, day: D }).add({ days: Math.floor(blockEnd / 24) });
			pdt = base.toPlainDateTime(Temporal.PlainTime.from({ hour: blockEnd % 24 }));
			break;
		}
		case "minutes": {
			const N = dur.minutes!;
			const blockEnd = Math.ceil(m_ / N) * N;
			const totalHours = h + Math.floor(blockEnd / 60);
			const base = Temporal.PlainDate.from({ year: Y, month: M, day: D }).add({ days: Math.floor(totalHours / 24) });
			pdt = base.toPlainDateTime(Temporal.PlainTime.from({ hour: totalHours % 24, minute: blockEnd % 60 }));
			break;
		}
		case "seconds": {
			const N = dur.seconds!;
			const blockEnd = Math.ceil(s / N) * N;
			const totalMinutes = m_ + Math.floor(blockEnd / 60);
			const totalHours = h + Math.floor(totalMinutes / 60);
			const base = Temporal.PlainDate.from({ year: Y, month: M, day: D }).add({ days: Math.floor(totalHours / 24) });
			pdt = base.toPlainDateTime(
				Temporal.PlainTime.from({ hour: totalHours % 24, minute: totalMinutes % 60, second: blockEnd % 60 }),
			);
			break;
		}
		default:
			throw new Error(`Unsupported unit: ${largest}`);
	}

	return toKind(pdt.toZonedDateTime(timeZone), kind);
};

/**
 * Generate an array of Temporal tick values between min and max at the given duration interval.
 *
 * Composite durations like "P1MT5H" are split: step by the largest unit (1 month),
 * offset by the remainder (5 hours). Temporal.Duration.add() handles all calendar arithmetic.
 */
export const getTemporalDomain = ({ min, max, duration }: { min: TemporalDate; max: TemporalDate; duration: string }): TemporalDate[] => {
	const dur = Temporal.Duration.from(duration);
	const largest = largestUnit(dur);
	if (!largest) throw new Error("Duration must have at least one non-zero component");

	const kind = getTemporalKind(min);
	const timeZone = getTimeZone(min);

	/* Split into step (largest unit only) and offset (remaining smaller units) */
	const stepDur = Temporal.Duration.from({ [largest]: dur[largest] });
	const offsetDur = Temporal.Duration.from({
		years: largest === "years" ? 0 : dur.years,
		months: largest === "months" ? 0 : dur.months,
		days: largest === "days" ? 0 : dur.days,
		hours: largest === "hours" ? 0 : dur.hours,
		minutes: largest === "minutes" ? 0 : dur.minutes,
		seconds: largest === "seconds" ? 0 : dur.seconds,
	});

	const start = toZdt(getFloorTemporalFromDuration(min, duration), timeZone).add(offsetDur);
	const maxEpoch = toEpochMs(max);
	const result: TemporalDate[] = [];
	let current = start;
	while (true) {
		result.push(toKind(current, kind));
		if (current.epochMilliseconds >= maxEpoch) break;
		current = current.add(stepDur);
	}
	return result;
};
