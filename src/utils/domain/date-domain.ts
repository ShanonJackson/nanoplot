import { ComponentProps } from "react";
import { XAxis } from "nanoplot/xaxis";

type Jumps = NonNullable<ComponentProps<typeof XAxis>["ticks"]>["jumps"];
type TimeseriesFormats = NonNullable<Exclude<Jumps, number | "auto">>;

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
		toCeil: (date: Date, unit: number) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + unit + 1, 0, 0, 0, 0, 0)),
	},
	years: {
		getter: "getFullYear",
		setter: "setFullYear",
		toFloor: (dte: Date, unit: number) => new Date(dte.getFullYear() - unit, 0, 1, 0, 0, 0, 0),
		toCeil: (date: Date, unit: number) => new Date(Date.UTC(date.getUTCFullYear() + unit + 1, 0, 0, 0, 0, 0, 0)),
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
	const [, unit, interval] = every.match(regex) || ["", "1", "days"];
	const { getter, setter, toFloor } = times[interval as keyof typeof times];
	const MIN = new Date(new Date(min)[setter](min[getter]()));
	const MAX = new Date(new Date(max)[setter](max[getter]()));
	const floored = toFloor(MIN, 0);
	const rangeStart = new Date(
		new Date(Date.UTC(floored.getFullYear(), floored.getMonth(), floored.getDate(), 0, 0, 0, 0)).toISOString().replace("Z", ""),
	);

	return (function range(dte: Date): Date[] {
		if (dte > MAX) return [dte];
		const next = new Date(new Date(dte)[setter](dte[getter]() + parseFloat(unit)));
		const utc = Date.UTC(next.getFullYear(), next.getMonth(), next.getDate(), 0, 0, 0, 0);
		const stored = new Date(new Date(utc).toISOString().replace("Z", ""));
		return [dte].concat(range(stored));
	})(rangeStart);
};

export const DateDomain = {
	floor: ({ date, unit, interval }: { date: Date; unit: number; interval: string }) => {
		const { getter, setter, toFloor } = times[interval as keyof typeof times];
		return toFloor(new Date(new Date(date)[setter](date[getter]())), unit);
	},
	ceil: ({ date, unit, interval }: { date: Date; unit: number; interval: string }) => {
		const { getter, setter, toCeil } = times[interval as keyof typeof times];
		return toCeil(new Date(new Date(date)[setter](date[getter]())), unit);
	},
	domainFor: ({ min, max, jumps }: { min: Date; max: Date; jumps: TimeseriesFormats }) => {
		return dateRange(jumps, min, max);
	},
};
