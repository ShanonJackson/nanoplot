import { HTMLAttributes } from "react";
import { GraphContextServer, useGraphServer } from "./use-server-graph";
import { GraphContextClient, useGraphClient } from "./use-client-graph";

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

export type InternalSegmentDataset = Array<{
	id: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string;
	stroke: string /* takes default color if not set */;
	fill: string /* takes default color if not set */;
	value: string | number | Date;
}>;

export type InternalCartesianDataset = Array<{
	id: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string;
	stroke: string /* takes default color if not set */;
	fill: string /* takes default color if not set */;
	data: Array<{
		x: number | Date | string;
		y: number | Date | string;
		z?: number | string | Date;
	}>;
}>;

export type InternalGraphContext = {
	id: string;
	attributes: HTMLAttributes<HTMLDivElement>;
	gap: { top: number; right: number; bottom: number; left: number };
	viewbox: { x: number; y: number };
	data: InternalSegmentDataset | InternalCartesianDataset;
	layout: { rows: string; columns: string };
	zoom: { x: [number, number]; y: [number, number] };
	domain: {
		x: Array<{ coordinate: number; tick: string | number | Date }>;
		y: Array<{ coordinate: number; tick: string | number | Date }>;
	};
	colors: string[];
	interactions: { hovered: string[]; pinned: string[] } /* ids of hovered / pinned data points */;
	datasets: Record<string, Pick<InternalGraphContext, "domain" | "colors" | "data">>;
};

export type GraphContext = {
	id: string;
	attributes: HTMLAttributes<HTMLDivElement>;
	gap: { top: number; right: number; bottom: number; left: number };
	viewbox: { x: number; y: number };
	data: CartesianDataset | SegmentDataset;
	layout: { rows: string; columns: string };
	zoom: { x: [number, number]; y: [number, number] };
	domain: {
		x: Array<{ coordinate: number; tick: string | number | Date }>;
		y: Array<{ coordinate: number; tick: string | number | Date }>;
	};
	colors: string[];
	interactions: { hovered: string[]; pinned: string[] } /* ids of hovered / pinned data points */;
	datasets: Record<string, Pick<GraphContext, "domain" | "colors" | "data">>;
};

export const useGraphColumn = () => {
	const ctx = useGraph();
	const columns = ctx.layout.columns.split(" ");
	return {
		column: columns.findIndex((col) => col.includes("[graph]")) + 1,
		left: columns.findIndex((col) => col.includes("[graph]")),
		right: columns.length - (columns.findIndex((col) => col.includes("[graph]")) + 1),
	};
};

export const GraphContextProvider = typeof window === "undefined" ? GraphContextServer : GraphContextClient;
export const useGraph: () => InternalGraphContext = typeof window === "undefined" ? useGraphServer : useGraphClient;
export const useIsZooming = () => {
	const {
		x: [xmin, xmax],
		y: [ymin, ymax],
	} = useGraph().zoom;
	return !(xmin === 0 && xmax === 100 && ymin === 0 && ymax === 100);
};
export const useDataset = (dataset?: string) => {
	const context = useGraph();
	return dataset ? { ...context, ...context.datasets[dataset] } : context;
};
export const useDatasets = (datasets?: string[]) => {
	const context = useGraph();
	if (!datasets || datasets?.length === 0) return [];
	return datasets.map((dataset) => ({ ...context, ...context.datasets[dataset], datasetName: dataset }));
};

/*
	turns A & B into C so the tooltip for the type is simplified
	i.e {name: string} & {age: number} becomes {name: string, age: number}
*/
export type Simplify<T> = { [K in keyof T]: T[K] };
