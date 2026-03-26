import { GraphContext, TemporalDate } from "../../../hooks/use-graph/use-graph";
import { FromToJumps } from "../../../models/domain/domain";
import { GraphUtils } from "../../graph/graph";
import { scale } from "../../math/math";
import { ObjectUtils } from "../../object/object";
import { isTemporal, toEpochMs, getTemporalKind, getTimeZone, fromEpochMs, TemporalKind } from "./temporal";
import { getDurationFromMinMax, getTemporalDomain } from "./temporal-domain";
import { getRangeForSet } from "./auto-minmax";

export const range = (
	{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
	{ from = "auto", to = "auto", jumps = "auto", type }: FromToJumps = {
		from: "auto",
		to: "auto",
		jumps: "auto",
	},
	dimension: "x" | "y",
) => {
	if (!GraphUtils.isXYData(data) || data.length === 0) return [];
	const firstValue = data[0]?.data?.[0]?.[dimension];
	const isTemp = isTemporal(firstValue);

	const inverse = dimension === "y" ? "x" : "y";
	const viewb = dimension === "y" ? viewbox.y : viewbox.x;

	if (typeof firstValue === "string" /* Categorical */) {
		const xValues = Array.from(new Set(data.flatMap((line) => line.data.map((d) => d[dimension])))).reverse();
		const tickWidth = viewb / xValues.length;
		return xValues.map((tick, i) => ({
			tick,
			coordinate: i * tickWidth + tickWidth / 2,
		}));
	}

	const kind: TemporalKind = isTemp ? getTemporalKind(firstValue) : "Instant";
	const timeZone: string = isTemp ? getTimeZone(firstValue) : "UTC";

	/* get min/max of dataset in stack safe AND performant way */
	let datasetMin = typeof from === "number" ? from : Infinity;
	let datasetMax = typeof to === "number" ? to : -Infinity;

	if (dimension === "x" && (typeof from !== "number" || typeof to !== "number")) {
		for (let i = 0; i < data.length; i++) {
			const lineData = data[i].data;
			for (let j = 0; j < lineData.length; j++) {
				const value = lineData[j].x;
				const v = isTemp ? toEpochMs(value as TemporalDate) : (value as number);
				if (v < datasetMin) datasetMin = v;
				if (v > datasetMax) datasetMax = v;
			}
		}
	}
	if (dimension === "y" && (typeof from !== "number" || typeof to !== "number")) {
		for (let i = 0; i < data.length; i++) {
			const lineData = data[i].data;
			for (let j = 0; j < lineData.length; j++) {
				const value = lineData[j].y;
				const v = isTemp ? toEpochMs(value as TemporalDate) : (value as number);
				if (v < datasetMin) datasetMin = v;
				if (v > datasetMax) datasetMax = v;
			}
		}
	}

	const min = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isTemp) return datasetMin;
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((min1, [, v]) => {
			const dataset = ObjectUtils.groupBy(v?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const minForDataset = Object.entries(dataset).reduce((min2, [, values2]) => {
				return Math.min(
					min2,
					(values2 ?? []).reduce((total, dp) => {
						if (+dp[dimension] > 0) return total;
						return total + +[dp[dimension]];
					}, 0),
				);
			}, Infinity);
			return Math.min(min1, minForDataset);
		}, Infinity);
	})();

	const max = (() => {
		const grouped = data.some((d) => Boolean(d.group));
		if (!grouped || isTemp) return datasetMax;
		return Object.entries(ObjectUtils.groupBy(data, ({ group }, index) => group ?? `|i${index}`)).reduce((max1, [, v]) => {
			const dataset = ObjectUtils.groupBy(v?.flatMap(({ data }) => data) ?? [], (dp) => dp[inverse].toString());
			const maxForDataset = Object.entries(dataset).reduce((max2, [, values2]) => {
				return Math.max(
					max2,
					(values2 ?? []).reduce((total, dp) => {
						if (+dp[dimension] < 0) return total;
						return total + +[dp[dimension]];
					}, 0),
				);
			}, 0);
			return Math.max(max1, maxForDataset);
		}, 0);
	})();

	if (min === max) return [{ tick: min, coordinate: viewb / 2 }];

	const duration = (() => {
		if (!isTemp) return "";
		if (jumps === "auto" || typeof jumps === "number") return getDurationFromMinMax(min, max);
		return jumps;
	})();
	const {
		min: MIN,
		max: MAX,
		jumps: RECOMMENDED_JUMPS,
	} = getRangeForSet({ min, max, duration, isTemporal: isTemp, from, to, kind, timeZone });
	if (MIN === MAX) return [{ tick: MIN, coordinate: viewb / 2 }];
	if (typeof jumps === "number" || (jumps === "auto" && !isTemp)) {
		const mx = Number(MAX);
		const mn = Number(MIN);
		const JUMPS = (() => {
			if (RECOMMENDED_JUMPS) return RECOMMENDED_JUMPS + 1;
			const distance = mx - mn;
			if (jumps === "auto") {
				const digits = Math.max(0, Math.round(distance).toString().replace("-", "").length - 2);
				const jump =
					[
						parseInt("1" + "0".repeat(digits + 1)),
						parseInt("2" + "5" + "0".repeat(Math.max(0, digits - 1))),
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
						.map((jump) => distance / jump)
						.find((jump) => distance % jump === 0 && jump <= 11 && jump >= 5) ?? 9;
				return jump + 1;
			}
			return jumps;
		})();
		return Array.from({ length: JUMPS }, (_, i) => ({
			tick: scale(i, [0, JUMPS - 1], [mn, mx]),
			coordinate: scale(i, [0, JUMPS - 1], [0, viewb]),
		}));
	}
	/* Temporal Domain */
	if (typeof MIN === "number" || typeof MAX === "number") return []; /* not possible */
	const domain = getTemporalDomain({ min: MIN, max: MAX, duration });

	const minTime = toEpochMs(MIN);
	const maxTime = toEpochMs(MAX);

	if (type === "categorical") {
		return domain.map((tick, i, arr) => ({
			tick,
			coordinate: (viewbox[dimension] / arr.length) * (i + 0.5),
		}));
	}

	return domain.map((tick) => ({
		tick,
		coordinate: ((toEpochMs(tick) - minTime) / (maxTime - minTime)) * viewb,
	}));
};
