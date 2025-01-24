import { ComponentProps } from "react";
import { XAxis } from "nanoplot/xaxis";

type Jumps = NonNullable<ComponentProps<typeof XAxis>["ticks"]>["jumps"];
type TimeseriesFormats = NonNullable<Exclude<Jumps, number | "auto">>;

const floor = (coeff: number) => (date: Date, unit: number) => new Date(Math.floor(date.getTime() / (coeff * unit)) * (coeff * unit));
const fmonth = (dte: Date, _: number) => new Date(dte.getFullYear(), dte.getMonth(), 1, 0, 0, 0, 0);
const pmonth = (dte: Date, _: number) => new Date(dte.getFullYear(), dte.getMonth() - 1, 1, 0, 0, 0, 0);
const fyear = (dte: Date, _: number) => new Date(dte.getFullYear(), 0, 1, 0, 0, 0, 0);

export const times = {
	hours: { getter: "getHours", setter: "setHours", toFloor: floor(1000 * 60 * 60) },
	minutes: { getter: "getMinutes", setter: "setMinutes", toFloor: floor(1000 * 60) },
	seconds: { getter: "getSeconds", setter: "setSeconds", toFloor: floor(1000) },
	milliseconds: { getter: "getMilliseconds", setter: "setMilliseconds", toFloor: floor(1), multiplier: 1000 },
	days: {
		getter: "getDate",
		setter: "setDate",
		toFloor: (dte: Date) => new Date(dte.getFullYear(), dte.getMonth(), dte.getDate(), 0, 0, 0, 0),
	},
	weeks: {
		getter: "getDate",
		setter: "setDate",
		toFloor: floor(1000 * 60 * 60 * 24 * 7),
		multiplier: 7,
	},
	months: { getter: "getMonth", setter: "setMonth", toFloor: fmonth },
	"end of months": { getter: "getMonth", setter: "setDate", toFloor: pmonth },
	years: { getter: "getFullYear", setter: "setFullYear", toFloor: fyear },
} as const;

export const SUPPORTED_TIMES = ["days", "weeks", "months", "years"] as const;
const regex = new RegExp(`^every\\s*(\\d+)?\\s*(${SUPPORTED_TIMES.join("|")})s?$`, "i");
export const dateRange = (every: TimeseriesFormats, min: Date, max: Date) => {
	const [, unit, interval] = every.match(regex) || ["", "1", "days"];
	const { getter, setter, toFloor } = times[interval as keyof typeof times];
	const MIN = new Date(new Date(min)[setter](min[getter]()));
	const MAX = new Date(new Date(max)[setter](max[getter]()));
	const floored = toFloor(MIN, parseFloat(unit));
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
	domainFor: ({ min, max, jumps }: { min: Date; max: Date; jumps: TimeseriesFormats }) => {
		return dateRange(jumps, min, max);
	},
};
