import { HTMLAttributes } from "react";

export type XYDataset = Array<{
	id?: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string /* string literal used to associate id's with a group */;
	stroke?: string;
	fill?: string | boolean; // true = fill opaque same as stroke color, string = fill opaque color
	data: Array<{
		x: number | Date | string;
		y: number | string;
	}>;
}>;

export type SegmentDataset = Array<{
	id?: string /* name is id, if undefined */;
	name: string;
	description?: string;
	group?: string;
	stroke?: string;
	fill?: string | boolean; // true = fill opaque same as stroke color, string = fill opaque color
	value: string | number | Date;
}>;

export type GraphContext = {
	id: string;
	attributes: HTMLAttributes<HTMLDivElement>;
	viewbox: { x: number; y: number };
	data: XYDataset | SegmentDataset;
	layout: { rows: string; columns: string };
	domain: {
		x: Array<{ coordinate: number; tick: string | number | Date }>;
		y: Array<{ coordinate: number; tick: string | number | Date }>;
	};
};
