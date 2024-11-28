import { SegmentDataset, XYDataset } from "@/hooks/use-graph";

export const GraphUtils = {
	isSegmentData: (data: SegmentDataset | XYDataset): data is SegmentDataset => {
		return data.length === 0 || "value" in data[0];
	},
};
