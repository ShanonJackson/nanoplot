import { HTMLAttributes } from "react";

export type CartesianDataset = Array<{
	id?: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string /* string literal used to associate id's with a group */;
	stroke?: string;
	fill?: string;
	data: Array<{
		x: number | Date | string;
		y: number | Date | string;
		z?: number | string | Date;
	}>;
}>;

export type SegmentDataset = Array<{
	id?: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string;
	stroke?: string;
	fill?: string;
	value: string | number | Date;
}>;

export type GraphContext = {
	id: string;
	attributes: HTMLAttributes<HTMLDivElement>;
	gap: { top: number; right: number; bottom: number; left: number };
	viewbox: { x: number; y: number };
	data: CartesianDataset | SegmentDataset;
	layout: { rows: string; columns: string };
	domain: {
		x: Array<{ coordinate: number; tick: string | number | Date }>;
		y: Array<{ coordinate: number; tick: string | number | Date }>;
	};
	colors: string[];
	interactions: { hovered: string[]; pinned: string[] } /* ids of hovered / pinned data points */;
};

export const useGraphColumn = (ctx: GraphContext) => {
	// parse grid-template-columns finding the column index + 1 with the name [graph]
	// return the column index + 1
	return ctx.layout.columns.split(" ").findIndex((col) => col.includes("[graph]")) + 1;
};

export const GraphContextProvider =
	typeof window === "undefined" ? require("./use-server-graph").GraphContextServer : require("./use-client-graph").GraphContextClient;
export const useGraph: () => GraphContext =
	typeof window === "undefined" ? require("./use-server-graph").useGraphServer : require("./use-client-graph").useGraphClient;
