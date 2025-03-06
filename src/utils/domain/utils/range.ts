import { GraphContext } from "../../../hooks/use-graph/use-graph";
import { FromToJumps } from "../../../models/domain/domain";
import { GraphUtils } from "../../graph/graph";
import { DateDomain } from "../date-domain";
import { DomainUtils } from "../domain";
import { MathUtils } from "../../math/math";
import { ObjectUtils } from "../../object/object";

export const range = (
	{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
	{ from = "auto", to = "auto", jumps = "auto" }: FromToJumps = {
		from: "auto",
		to: "auto",
		jumps: "auto",
	},
	dimension: "x" | "y",
) => {
	const inverse = dimension === "y" ? "x" : "y";
	const viewb = dimension === "y" ? viewbox.y : viewbox.x;

	if (!GraphUtils.isXYData(data) || data.length === 0) return [];
	const isDateTime = data[0]?.data?.[0]?.[dimension] instanceof Date;

	if (typeof data[0]?.data?.[0]?.[dimension] === "string" /* Categorical */) {
		const xValues = Array.from(new Set(data.flatMap((line) => line.data.map((d) => d[dimension]))));
		const tickWidth = viewb / xValues.length;
		return xValues.map((tick, i) => ({
			tick,
			coordinate: i * tickWidth + tickWidth / 2,
		}));
	}

	const min = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isDateTime) return Math.min(...data.flatMap((line) => line.data.map((d) => +d[dimension])));
		/*
			If it's grouped we need to sum the 'y' values for everyone in the same group for the same 'x'
			This is the case for stacked-bars.
			groupBy group; then group by x
			Math.min(Sum y)
		*/
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((min1, [, values]) => {
			const dataset = ObjectUtils.groupBy(values?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const minForDataset = Object.entries(dataset).reduce((min2, [, values2]) => {
				return Math.min(
					min2,
					(values2 ?? []).reduce((total, dp) => total + +[dp[dimension]], 0),
				);
			}, Infinity);
			return Math.min(min1, minForDataset);
		}, Infinity);
	})();

	const max = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isDateTime) return Math.max(...data.flatMap((line) => line.data.map((d) => +d[dimension])));
		/*
			If it's grouped we need to sum the 'y' values for everyone in the same group for the same 'x'
			This is the case for stacked-bars.
			groupBy group; then group by x
			Math.max(Sum y)
		*/
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((max1, [, values]) => {
			const dataset = ObjectUtils.groupBy(values?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const maxForDataset = Object.entries(dataset).reduce((max2, [, values2]) => {
				return Math.max(
					max2,
					(values2 ?? []).reduce((total, dp) => total + +[dp[dimension]], 0),
				);
			}, 0);
			return Math.max(max1, maxForDataset);
		}, 0);
	})();

	if (min === max) return [{ tick: min, coordinate: viewb / 2 }];
	const MIN = (() => {
		if (from === "min" || from === "auto") {
			if (isDateTime) {
				const jumpsInterval = typeof jumps === "string" ? DateDomain.intervalForJumps(jumps) : "days";
				return from === "auto" ? new Date(min) : DateDomain.floor({ date: new Date(min), unit: 0, interval: jumpsInterval });
			}
			return from === "min" ? min : DomainUtils.autoMinFor(min);
		}
		if (typeof from === "number") return from;
		const operator = from.match(/(\+|-)/)?.[0];
		const isPercentage = from.includes("%");
		const value = +from.replace(/[^0-9]/g, "");
		const interval = from.match(/(?<=\d+\s)\w+/)?.[0]; /* Time interval i.e 'months', 'years' etc. */
		if (operator === "+") {
			if (interval) {
				return DateDomain.floor({ date: new Date(min), unit: value, interval });
			}
			return isPercentage ? min + (min * value) / 100 : min + value;
		}
		if (operator === "-") {
			if (interval) {
				return DateDomain.floor({ date: new Date(min), unit: value, interval });
			}
			return isPercentage ? min - (min * value) / 100 : min - value;
		}
		return min;
	})();
	const MAX = (() => {
		if (to === "max" || to === "auto") {
			if (isDateTime) {
				const jumpsInterval = typeof jumps === "string" ? DateDomain.intervalForJumps(jumps) : "days";
				return to === "auto" ? new Date(max) : DateDomain.ceil({ date: new Date(max), unit: 0, interval: jumpsInterval });
			}
			return to === "max" ? max : DomainUtils.autoMaxFor(max);
		}
		if (typeof to === "number") return to;
		const operator = to.match(/(\+|-)/)?.[0];
		const isPercentage = to.includes("%");
		const value = +to.replace(/[^0-9]/g, "");
		const interval = to.match(/(?<=\d+\s)\w+/)?.[0]; /* Time interval i.e 'months', 'years' etc. */

		if (operator === "+") {
			if (interval) {
				return DateDomain.ceil({ date: new Date(max), unit: value, interval });
			}
			return isPercentage ? max + (max * value) / 100 : max + value;
		}
		if (operator === "-") {
			if (interval) {
				return DateDomain.ceil({ date: new Date(max), unit: value, interval });
			}
			return isPercentage ? max - (max * value) / 100 : max - value;
		}
		return max;
	})();

	if (typeof jumps === "number" || jumps === "auto") {
		const mx = Number(MAX);
		const mn = Number(MIN);
		const JUMPS = (() => {
			const distance = mx - mn;
			if (jumps === "auto") {
				/* pick number of jumps that doesn't result in a 'tick' being a decimal value if possible */
				return ([6, 5, 7, 8, 9, 5, 4, 10, 11].find((jump) => distance % jump === 0) ?? 9) + 1;
			}
			return jumps;
		})();

		return Array.from({ length: JUMPS }, (_, i) => ({
			tick: MathUtils.scale(i, [0, JUMPS - 1], [mn, mx]),
			coordinate: MathUtils.scale(i, [0, JUMPS - 1], [0, viewb]),
		}));
	}
	/*
		Datetime Domain.
		min === "auto" -> start the graph from the first datapoint in the dataset. (touching the side of graph)
		min === "min" -> start the graph from the floored date.
		min === "min - 1 month" -> start the graph from the floored date - 1 month.
		max === "auto" -> end the graph at the last datapoint in the dataset (touching the side of graph)
		max === "max" -> end the graph at the ceiling date.
		max === "max + 1 month" -> end the graph at the ceiling date + 1 month.
	 */
	const domain = DateDomain.domainFor({
		min: new Date(MIN),
		max: new Date(MAX),
		jumps: jumps,
	});
	return domain.map((tick) => ({
		tick,
		coordinate: MathUtils.scale(tick.getTime(), [new Date(MIN).getTime(), new Date(MAX).getTime()], [0, viewb]),
	}));
};
