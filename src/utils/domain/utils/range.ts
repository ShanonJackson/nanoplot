import { GraphContextRaw } from "../../../hooks/use-graph/use-graph";
import { FromToJumps } from "../../../models/domain/domain";
import { GraphUtils } from "../../graph/graph";
import { scale } from "../../math/math";
import { ObjectUtils } from "../../object/object";
import { getDateDomain, getDurationFromMinMax, getDurationFromRange } from "./date-domain";
import { getRangeForSet } from "./auto-minmax";

export const range = (
	{ data, viewbox }: Pick<GraphContextRaw, "data" | "viewbox">,
	{ from = "auto", to = "auto", jumps = "auto" }: FromToJumps = {
		from: "auto",
		to: "auto",
		jumps: "auto",
	},
	dimension: "x" | "y",
) => {
	if (!GraphUtils.isXYData(data) || data.length === 0) return [];
	const isDateTime = data[0]?.data?.[0]?.[dimension] instanceof Date;

	const inverse = dimension === "y" ? "x" : "y";
	const viewb = dimension === "y" ? viewbox.y : viewbox.x;

	if (typeof data[0]?.data?.[0]?.[dimension] === "string" /* Categorical */) {
		const xValues = Array.from(new Set(data.flatMap((line) => line.data.map((d) => d[dimension])))).reverse();
		const tickWidth = viewb / xValues.length;
		return xValues.map((tick, i) => ({
			tick,
			coordinate: i * tickWidth + tickWidth / 2,
		}));
	}

	/* get min/max of dataset in stack safe AND performant way. i.e Math.min(...values) will stack overflow >129_000 or so */
	let datasetMin = typeof from === "number" ? from : Infinity;
	let datasetMax = typeof to === "number" ? to : -Infinity;
	if (dimension === "x" && typeof from !== "number" && typeof to !== "number") {
		/* these are split for JIT performance */
		for (let i = 0; i < data.length; i++) {
			const lineData = data[i].data;
			for (let j = 0; j < lineData.length; j++) {
				const value = lineData[j].x;
				const v = isDateTime ? (value as Date).getTime() : (value as number);
				if (v < datasetMin) datasetMin = v;
				if (v > datasetMax) datasetMax = v;
			}
		}
	}
	if (dimension === "y" && typeof from !== "number" && typeof to !== "number") {
		/* these are split for JIT performance */
		for (let i = 0; i < data.length; i++) {
			const lineData = data[i].data;
			for (let j = 0; j < lineData.length; j++) {
				const value = lineData[j].y;
				const v = isDateTime ? (value as Date).getTime() : (value as number);
				if (v < datasetMin) datasetMin = v;
				if (v > datasetMax) datasetMax = v;
			}
		}
	}

	const min = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isDateTime) return datasetMin;
		/*
			If it's grouped we need to sum the 'y' values for everyone in the same group for the same 'x'
			This is the case for stacked-bars.
			groupBy group; then group by x
			Math.min(Sum y)
		*/
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((min1, [, v]) => {
			const dataset = ObjectUtils.groupBy(v?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const minForDataset = Object.entries(dataset).reduce((min2, [, values2]) => {
				return Math.min(
					min2,
					(values2 ?? []).reduce((total, dp) => {
						if (+dp[dimension] > 0) return total; // only sum negative values togeather for min.
						return total + +[dp[dimension]];
					}, 0),
				);
			}, Infinity);
			return Math.min(min1, minForDataset);
		}, Infinity);
	})();

	const max = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isDateTime) return datasetMax;

		/*
			If it's grouped we need to sum the 'y' values for everyone in the same group for the same 'x'
			This is the case for stacked-bars.
			groupBy group; then group by x
			Math.max(Sum y)
		*/
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((max1, [, v]) => {
			const dataset = ObjectUtils.groupBy(v?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const maxForDataset = Object.entries(dataset).reduce((max2, [, values2]) => {
				return Math.max(
					max2,
					(values2 ?? []).reduce((total, dp) => {
						if (+dp[dimension] < 0) return total; // only sum positive values togeather for min.
						return total + +[dp[dimension]];
					}, 0),
				);
			}, 0);
			return Math.max(max1, maxForDataset);
		}, 0);
	})();

	if (min === max) return [{ tick: min, coordinate: viewb / 2 }];

	const duration = (() => {
		/* ISO 8601 Duration Format - https://en.wikipedia.org/wiki/ISO_8601#Durations */
		if (!isDateTime) return "";
		if (jumps === "auto" || typeof jumps === "number") {
			return getDurationFromMinMax(min, max);
		}
		return jumps;
	})();
	const [MIN, MAX] = getRangeForSet({
		min,
		max,
		duration,
		isDateTime,
		from,
		to,
	});
	if (MIN === MAX) return [{ tick: MIN, coordinate: viewb / 2 }];

	if (typeof jumps === "number" || (jumps === "auto" && !isDateTime)) {
		const mx = Number(MAX);
		const mn = Number(MIN);
		const JUMPS = (() => {
			const distance = mx - mn;
			if (jumps === "auto") {
				const digits = Math.max(0, Math.round(distance).toString().replace("-", "").length - 2);
				const jump =
					[
						parseInt("1" + "0".repeat(digits + 1)) /* i.e for max of 50_000 min of 0 */,
						parseInt(
							"2" + "5" + "0".repeat(Math.max(0, digits - 1)),
						) /* If distance is 1_000_000 this would check if it's divisible by 250_000 */,
						parseInt("2" + "0".repeat(digits)),
						parseInt("5" + "0".repeat(digits)),
						parseInt("3" + "0".repeat(digits)),
						6,
						5,
						7,
						8,
						9,
						5,
						4,
						10,
						11,
					]
						.map((jump) => {
							return distance / jump;
						})
						.find((jump) => {
							if (jump % 1 !== 0) return false;
							return distance % jump === 0 && jump <= 11 && jump >= 5;
						}) ?? 9;
				return jump + 1;
			}
			return jumps;
		})();
		return Array.from({ length: JUMPS }, (_, i) => ({
			tick: scale(i, [0, JUMPS - 1], [mn, mx], 2),
			coordinate: scale(i, [0, JUMPS - 1], [0, viewb], 2),
		}));
	}

	/*
		Datetime Domain.
		min === "auto" -> start the graph from the first datapoint in the dataset. (touching the side of graph)
		min === "min" -> start the graph from the floored date.
		min === "min - P1M" -> start the graph from the floored date - 1 month.
		max === "auto" -> end the graph at the last datapoint in the dataset (touching the side of graph)
		max === "max" -> end the graph at the ceiling date.
		max === "max + P1M" -> end the graph at the ceiling date + 1 month.
	 */
	const domain = getDateDomain({
		min: new Date(MIN),
		max: new Date(MAX),
		duration,
	});
	const minTime = new Date(MIN).getTime();
	const maxTime = new Date(MAX).getTime();
	return domain.map((tick) => ({
		tick,
		coordinate: ((tick.getTime() - minTime) / (maxTime - minTime)) * viewb /* math scale inline for perf. */,
	}));
};
