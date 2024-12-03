import { SegmentDataset, XYDataset } from "@/hooks/use-graph";

export const GraphUtils = {
	isSegmentData: (data: SegmentDataset | XYDataset): data is SegmentDataset => {
		return data.length === 0 || "value" in data[0];
	},
	isXYData: (data: SegmentDataset | XYDataset): data is XYDataset => {
		return data.length === 0 || ("data" in data[0] && "x" in (data[0].data[0] ?? {}));
	},
};
