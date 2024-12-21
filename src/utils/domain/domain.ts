/*
	{from: 0}
	{from: 0, to: 100}
	{from: 0, to: 100, jumps: 10}
	{from: 0, to: 100, jumps: 10, format: (x) => x.toFixed(2)}
	{from: "min", to: "max", jumps: 5}
	{from: "min", to: "max+10%", jumps: 5, rounding: "whole"}
	{from: "min", to: "max", jumps: "1 month"}
	{from: "min - 10%", to: "max + 10%" jumps: "1 month"}
 */
import { XAxis } from "@/components/Axis/XAxis/XAxis";
import { ComponentProps } from "react";
import { GraphContext } from "@/hooks/use-graph/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";

export const DomainUtils = {
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
		ticks: (
			{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
			{ from = "min - 10%", to = "max + 10%", jumps = 5 }: ComponentProps<typeof XAxis>["ticks"] = {
				from: "min - 10%",
				to: "max + 10%",
				jumps: 5,
			},
		) => {
			if (!GraphUtils.isXYData(data) || data.length === 0) return [];
			const min = Math.min(...data.flatMap((line) => line.data.map((d) => +d.y)));
			const max = Math.max(...data.flatMap((line) => line.data.map((d) => +d.y)));
			if (min === max) return [{ tick: min, coordinate: viewbox.y }];
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
