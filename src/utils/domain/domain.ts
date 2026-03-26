import { GraphContext } from "../../hooks/use-graph/use-graph";
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
			{ from = "auto", to = "auto", jumps = "auto", type }: FromToJumps = {
				from: "auto",
				to: "auto",
				jumps: "auto",
			},
		) => {
			return range({ data, viewbox }, { from, to, jumps, type }, "x");
		},
	},
	y: {
		ticks: (
			{ data, viewbox }: Pick<GraphContext, "data" | "viewbox">,
			{ from = "auto", to = "auto", jumps = "auto", type }: FromToJumps = {
				from: "auto",
				to: "auto",
				jumps: "auto",
			},
		) => {
			return range({ data, viewbox }, { from, to, jumps, type }, "y").map((tick) => ({
				...tick,
				coordinate: viewbox.y - tick.coordinate,
			}));
		},
	},
};
