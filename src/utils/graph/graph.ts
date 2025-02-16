import { SegmentDataset, CartesianDataset } from "../../hooks/use-graph/use-graph";

export const GraphUtils = {
	isSegmentData: (data: SegmentDataset | CartesianDataset): data is SegmentDataset => {
		return data.length === 0 || "value" in data[0];
	},
	isXYData: (data: SegmentDataset | CartesianDataset): data is CartesianDataset => {
		return data.length === 0 || ("data" in data[0] && "x" in (data[0].data[0] ?? {}));
	},
};
