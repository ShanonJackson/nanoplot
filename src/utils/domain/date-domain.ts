import { ComponentProps } from "react";
import { XAxis } from "../../components/XAxis/XAxis";

type Jumps = NonNullable<ComponentProps<typeof XAxis>["ticks"]>["jumps"];
type TimeseriesFormats = NonNullable<Exclude<Jumps, number | "auto">>;

/*
Logic for ceil:
	- If we're already rounded (i.e "every 1 years" and we're 2024-01-01) then return same date.
	- If unit is 0, we round to closest possible unit.
	- If unit is 1, we round to next unit.
 */
export const times = {
	milliseconds: {
		getter: "getMilliseconds",
		setter: "setMilliseconds",
		toFloor: (dte: Date, unit: number) => {
			const utc = Date.UTC(
				dte.getUTCFullYear(),
				dte.getUTCMonth(),
				dte.getUTCDate(),
				dte.getUTCHours(),
				dte.getUTCMinutes(),
				dte.getUTCSeconds(),
				dte.getUTCMilliseconds(),
			);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes(),
				stored.getUTCSeconds(),
				stored.getUTCMilliseconds() - unit,
			);
		},
		toCeil: (dte: Date, unit: number) => {
			const utc = Date.UTC(
				dte.getUTCFullYear(),
				dte.getUTCMonth(),
				dte.getUTCDate(),
				dte.getUTCHours(),
				dte.getUTCMinutes(),
				dte.getUTCSeconds(),
				dte.getUTCMilliseconds(),
			);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes(),
				stored.getUTCSeconds(),
				stored.getUTCMilliseconds() + unit,
			);
		},
	},
	seconds: {
		getter: "getSeconds",
		setter: "setSeconds",
		toFloor: (dte: Date, unit: number) => {
			const utc = Date.UTC(
				dte.getUTCFullYear(),
				dte.getUTCMonth(),
				dte.getUTCDate(),
				dte.getUTCHours(),
				dte.getUTCMinutes(),
				dte.getUTCSeconds(),
				0,
			);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes(),
				stored.getUTCSeconds() - unit,
				0,
			);
		},
		toCeil: (dte: Date, unit: number) => {
			const utc = Date.UTC(
				dte.getUTCFullYear(),
				dte.getUTCMonth(),
				dte.getUTCDate(),
				dte.getUTCHours(),
				dte.getUTCMinutes(),
				dte.getUTCSeconds(),
				0,
			);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes(),
				stored.getUTCSeconds() + unit,
				0,
			);
		},
	},
	minutes: {
		getter: "getMinutes",
		setter: "setMinutes",
		toFloor: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), dte.getUTCHours(), dte.getUTCMinutes(), 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes() - unit,
				0,
				0,
			);
		},
		toCeil: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), dte.getUTCHours(), dte.getUTCMinutes(), 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(
				stored.getUTCFullYear(),
				stored.getUTCMonth(),
				stored.getUTCDate(),
				stored.getUTCHours(),
				stored.getUTCMinutes() + unit,
				0,
				0,
			);
		},
	},
	hours: {
		getter: "getHours",
		setter: "setHours",
		toFloor: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), dte.getUTCHours(), 0, 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(stored.getUTCFullYear(), stored.getUTCMonth(), stored.getUTCDate(), stored.getUTCHours() - unit, 0, 0, 0);
		},
		toCeil: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), dte.getUTCHours(), 0, 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(stored.getUTCFullYear(), stored.getUTCMonth(), stored.getUTCDate(), stored.getUTCHours() + unit, 0, 0, 0);
		},
	},
	days: {
		getter: "getDate",
		setter: "setDate",
		toFloor: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), 0, 0, 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(stored.getUTCFullYear(), stored.getUTCMonth(), stored.getUTCDate() - unit, 0, 0, 0, 0);
		},
		toCeil: (dte: Date, unit: number) => {
			const utc = Date.UTC(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate(), 0, 0, 0, 0);
			const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
			return new Date(stored.getUTCFullYear(), stored.getUTCMonth(), stored.getUTCDate() + unit, 0, 0, 0, 0);
		},
	},
	weeks: {
		getter: "getDate",
		setter: "setDate",
		toFloor: (dte: Date, unit: number) => {
			const day = dte.getUTCDay();
			return new Date(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate() - day - unit * 7, 0, 0, 0, 0);
		},
		toCeil: (dte: Date, unit: number) => {
			const day = dte.getUTCDay();
			return new Date(dte.getUTCFullYear(), dte.getUTCMonth(), dte.getUTCDate() + (7 - day) + unit * 7, 0, 0, 0, 0);
		},
	},
	months: {
		getter: "getMonth",
		setter: "setMonth",
		toFloor: (dte: Date, unit: number) => new Date(dte.getFullYear(), dte.getMonth() - unit, 1, 0, 0, 0, 0),
		toCeil: (dte: Date, unit: number) => {
			if (
				unit === 0 &&
				dte.getSeconds() === 0 &&
				dte.getMinutes() === 0 &&
				dte.getHours() === 0 &&
				dte.getMilliseconds() === 0 &&
				dte.getDate() === 1
			) {
				return dte;
			}
			return new Date(dte.getFullYear(), dte.getMonth() + Math.max(unit, 1), 1, 0, 0, 0, 0);
		},
	},
	years: {
		getter: "getFullYear",
		setter: "setFullYear",
		toFloor: (dte: Date, unit: number) => new Date(dte.getFullYear() - unit, 0, 1, 0, 0, 0, 0),
		toCeil: (date: Date, unit: number) => {
			if (
				unit === 0 &&
				date.getSeconds() === 0 &&
				date.getMinutes() === 0 &&
				date.getHours() === 0 &&
				date.getMilliseconds() === 0 &&
				date.getDate() === 1 &&
				date.getMonth() === 0
			) {
				return date;
			}
			return new Date(Date.UTC(date.getUTCFullYear() + Math.max(unit, 1), 0, 1, 0, 0, 0, 0));
		},
	},
} as const;

export const SUPPORTED_TIMES: Array<keyof typeof times> = [
	"milliseconds",
	"seconds",
	"minutes",
	"hours",
	"days",
	"weeks",
	"months",
	"years",
];
const regex = new RegExp(`^every\\s*(\\d+)?\\s*(${SUPPORTED_TIMES.join("|")})s?$`, "i");
export const dateRange = (every: TimeseriesFormats, min: Date, max: Date) => {
	const [, , interval] = every.match(regex) || ["", "1", "days"];
	const { toFloor, toCeil } = times[interval as keyof typeof times];
	const floored = toFloor(min, 0);
	const ceiled = toCeil(max, 0);
	return (function range(dte: Date): Date[] {
		if (dte >= ceiled) return [dte];
		const next = toCeil(new Date(dte.getTime() + 1), 0); /* just add 1, and ceil it to next */
		return [dte].concat(range(next));
	})(floored);
};

export const DateDomain = {
	intervalForJumps: (jumps: string) => {
		const [, , interval] = jumps.match(regex) || ["", "1", "days"];
		return interval;
	},
	floor: ({ date, unit, interval }: { date: Date; unit: number; interval: string }) => {
		const { toFloor } = times[interval as keyof typeof times];
		return toFloor(date, unit);
	},
	ceil: ({ date, unit, interval }: { date: Date; unit: number; interval: string }) => {
		const { toCeil } = times[interval as keyof typeof times];
		return toCeil(date, unit);
	},
	domainFor: ({ min, max, jumps }: { min: Date; max: Date; jumps: TimeseriesFormats }) => {
		return dateRange(jumps, min, max);
	},
	jumpsFor: ({}: { jumps: Jumps }) => {},
};
