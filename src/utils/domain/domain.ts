/*
	{from: 0}
	{from: 0, to: 100}
	{from: 0, to: 100, jumps: 10}
	{from: 0, to: 100, jumps: 10, format: (x) => x.toFixed(2)}
	{from: "min", to: "max", jumps: 5}
	{from: "min", to: "max + 10%", jumps: 5, rounding: "whole"}
	{from: "min", to: "max", jumps: "1 month"}
	{from: "min - 10%", to: "max + 10%" jumps: "1 month"}
 */
import { XAxis } from "@/components/XAxis/XAxis";
import { ComponentProps } from "react";
import { GraphContext } from "@/hooks/use-graph/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";
import { YAxis } from "@/components/YAxis/YAxis";

const roundUp = (num: number, nearest: number) => Math.ceil(num / nearest) * nearest;
export const DomainUtils = {
	autoFor: (value: number) => {
		/* Auto explained:
		 * 'Auto' = We decide min/max/jumps based on dataset with these goals in mind:
		 *  1. Look at dataset to determine if 0 should be used as min; Prefer 0
		 *  2. Avoid 'max' being the max value in the dataset (or else things would be plotted against roof).
		 *  3. Avoid 'min' being the min value in the dataset (or else things would be plotted against floor).
		 *  4. Avoid prime numbers as max values as they wont be divisble by "jumps" (without remainder) meaning decimal places will occur
		 *  5. 'jumps' - Pick a number of jumps that result in no value in axis being a decimal (prefer whole numbers)
		 * */
		if (value === 0) return [-1, 0, 1];
		const digits = Math.round(value).toString().length;
		const max = (() => {
			const suggested = parseInt("1" + "0".repeat(Math.max(0, digits - 1)));
			if ((roundUp(value, suggested) - value) / value > 0.35) {
				// increase is too large from original number.
				return parseInt("1" + "0".repeat(Math.max(0, digits - 2)));
			}
			return suggested;
		})();
		const yMax = roundUp(roundUp(value, max), parseInt("2" + "0".repeat(Math.max(0, digits - 2)))); /* Prime number avoider */
		const hops = [6, 7, 8, 9, 5, 4, 10, 11].find((jump) => yMax % jump === 0) ?? 9;
		const jumps = hops + 1;
		return Array.from({ length: jumps }, (_, i) => MathUtils.scale(i, [0, jumps - 1], [0, yMax]));
	},
	x: {
		ticks: (
			{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
			{ from = "min", to = "max", jumps = 10 }: ComponentProps<typeof XAxis>["ticks"] = { from: "min", to: "max", jumps: 10 },
		) => {
			if (!GraphUtils.isXYData(data) || data.length === 0) return [];
			if (typeof data[0]?.data?.[0].x === "string" /* categorical dataset */) {
				const xValues = Array.from(new Set(data.flatMap((line) => line.data.map((d) => d.x))));
				const tickWidth = viewbox.x / xValues.length;
				return xValues.map((tick, i) => ({
					tick,
					coordinate: i * tickWidth + tickWidth / 2,
				}));
			}

			const min = Math.min(...data.flatMap((line) => line.data.map((d) => +d.x)));
			const max = Math.max(...data.flatMap((line) => line.data.map((d) => +d.x)));
			if (min === max) return [{ tick: min, coordinate: viewbox.x }];
			if (typeof jumps === "string") {
				/* datetime un-implemented */
				return [];
			}
			const MIN = (() => {
				if (from === "min") return min;
				if (typeof from === "number") return from;
				const operator = from.match(/(\+|-)/)?.[0];
				const isPercentage = from.includes("%");
				const value = +from.replace(/[^0-9]/g, "");
				if (operator === "+") return isPercentage ? min + (min * value) / 100 : min + value;
				if (operator === "-") return isPercentage ? min - (min * value) / 100 : min - value;
				return min;
			})();
			const MAX = (() => {
				if (to === "max") return max;
				if (typeof to === "number") return to;
				const operator = to.match(/(\+|-)/)?.[0];
				const isPercentage = to.includes("%");
				const value = +to.replace(/[^0-9]/g, "");
				if (operator === "+") return isPercentage ? max + (max * value) / 100 : max + value;
				if (operator === "-") return isPercentage ? max - (max * value) / 100 : max - value;
				return max;
			})();
			return Array.from({ length: jumps }, (_, i) => ({
				tick: MathUtils.scale(i, [0, jumps - 1], [MIN, MAX]),
				coordinate: MathUtils.scale(i, [0, jumps - 1], [0, viewbox.x]),
			}));
		},
	},
	y: {
		ticks: ({ data, viewbox }: Pick<GraphContext, "data" | "viewbox">, ticks: ComponentProps<typeof YAxis>["ticks"] = "auto") => {
			const { from = "auto", to = "auto", jumps = "auto" } = ticks === "auto" ? { from: "auto", to: "auto", jumps: "auto" } : ticks;
			if (!GraphUtils.isXYData(data) || data.length === 0) return [];
			const min = Math.min(...data.flatMap((line) => line.data.map((d) => +d.y)));
			const max = Math.max(...data.flatMap((line) => line.data.map((d) => +d.y)));
			if (min === max) return [{ tick: min, coordinate: viewbox.y }];

			if (from === "auto" && to === "auto" && jumps === "auto") {
				const ticksForAuto = DomainUtils.autoFor(max);
				const suggestedMax = Math.max(...ticksForAuto);
				return ticksForAuto.map((tick) => {
					return { tick, coordinate: MathUtils.scale(tick, [0, suggestedMax], [viewbox.y, 0]) };
				});
			}

			if (typeof jumps === "string") {
				/* datetime un-implemented */
				return [];
			}

			const MIN = (() => {
				if (from === "min") return min;
				if (typeof from === "number") return from;
				const operator = from.match(/(\+|-)/)?.[0];
				const isPercentage = from.includes("%");
				const value = +from.replace(/[^0-9]/g, "");
				if (operator === "+") return isPercentage ? min + (min * value) / 100 : min + value;
				if (operator === "-") return isPercentage ? min - (min * value) / 100 : min - value;
				return min;
			})();
			const MAX = (() => {
				if (to === "max") return max;
				if (typeof to === "number") return to;
				const operator = to.match(/(\+|-)/)?.[0];
				const isPercentage = to.includes("%");
				const value = +to.replace(/[^0-9]/g, "");
				if (operator === "+") return isPercentage ? max + (max * value) / 100 : max + value;
				if (operator === "-") return isPercentage ? max - (max * value) / 100 : max - value;
				return max;
			})();
			return Array.from({ length: jumps }, (_, i) => ({
				tick: MathUtils.scale(i, [0, jumps - 1], [MIN, MAX]),
				coordinate: MathUtils.scale(i, [0, jumps - 1], [viewbox.y, 0]),
			}));
		},
	},
};
