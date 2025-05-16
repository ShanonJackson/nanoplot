import { HTMLAttributes, useLayoutEffect } from "react";
import { GraphContextServer, useGraphServer } from "./use-server-graph";
import { GraphContextClient, useGraphClient } from "./use-client-graph";
import { useStatefulRef } from "../use-stateful-ref";

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
export const useGraph: () => GraphContext = typeof window === "undefined" ? useGraphServer : useGraphClient;
export const useDataset = (dataset?: string) => {
	const context = useGraph();
	return dataset ? context.datasets[dataset] : context;
};
export const useGraphRef = () => {
	const [ref, setRef] = useStatefulRef<HTMLDivElement>();
	const { id } = useGraph();
	useLayoutEffect(() => {
		const element = document.getElementById(id);
		if (!element || !(element instanceof HTMLDivElement)) return;
		setRef(element);
	}, []);
	return ref;
};
