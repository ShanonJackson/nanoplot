import React, { ReactNode } from "react";
import { GraphContext, XYDataset } from "@/hooks/use-graph";

type Props = {
	children?: ReactNode;
	context?: GraphContext;
};

const X_SCALE = 3000;
const Y_SCALE = 3000;
export const LineGraph = ({ children, context }: Props) => {
	return (
		<svg viewBox={"0 0 3000 3000"} height={"100%"} width={"100%"} preserveAspectRatio={"none"}>
			<path d={"M 0 1500 L 3000 1500"} stroke={"red"} vectorEffect={"non-scaling-stroke"} />
			{children}
		</svg>
	);
};

LineGraph.layout = "row";
