/*
	{from: 0}
	{from: 0, to: 100}
	{from: 0, to: 100, jumps: 10}
	{from: 0, to: 100, jumps: 10, format: (x) => x.toFixed(2)}
	{from: "min", to: "max", jumps: 5}
	{from: "min", to: "max + 10%", jumps: 5, rounding: "whole"}
	{from: "min", to: "max", jumps: "1 month"}
	{from: "min - 1 month", to: "max + 1 month" jumps: "1 month"}
 */
import { ComponentProps } from "react";
import { GraphContext } from "../../hooks/use-graph/use-graph";
import { XAxis } from "../../components/XAxis/XAxis";
import { range } from "./utils/range";
import { autoMin } from "./utils/auto-min";
import { autoMax } from "./utils/auto-max";
import { FromToJumps } from "../../models/domain/domain";

export const DomainUtils = {
	autoMinFor: autoMin,
	autoMaxFor: autoMax,
	x: {
		ticks: (
			{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
			{ from = "auto", to = "auto", jumps = "auto" }: FromToJumps = {
				from: "auto",
				to: "auto",
				jumps: "auto",
			},
		) => range({ data, viewbox }, { from, to, jumps }, "x"),
	},
	y: {
		ticks: (
			{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
			{ from = "auto", to = "auto", jumps = "auto" }: FromToJumps = {
				from: "auto",
				to: "auto",
				jumps: "auto",
			},
		) => {
			return range({ data, viewbox }, { from, to, jumps }, "y").map((tick) => ({ ...tick, coordinate: viewbox.y - tick.coordinate }));
		},
	},
	expression: (expression: NonNullable<ComponentProps<typeof XAxis>["ticks"]>["from"]) => {},
};
