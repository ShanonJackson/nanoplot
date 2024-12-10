import React, { ReactNode } from "react";
import { GraphContext, XYDataset } from "@/hooks/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";

type Props = {
	children?: ReactNode;
	context?: GraphContext;
};

export const LineGraph = ({ children, context }: Props) => {
	console.log(context?.data);
	if(!context) return null;
	if(!GraphUtils.isXYData(context.data)) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const lines = context.data.map((line) => {
		return {
			...line,
			data: line.data.map((xy) => {
				return {
					x: xForValue(xy.x),
					y: yForValue(xy.y)
				}
			}),
		};
	})
	return (
		<svg viewBox={"0 0 3000 3000"} height={"100%"} width={"100%"} preserveAspectRatio={"none"}>
			{lines.map((line, i) => {
				const d = line.data.map((xy, index) => {
					if (index === 0) {
						return "M " + xy.x + " " + xy.y
					} else {
						return "L " + xy.x + " " + xy.y
					}
				}).join(" ");
				return <path 
					key={i}
					d={d}
					fill={"transparent"}
					stroke={"black"}
					vectorEffect={"non-scaling-stroke"}
					strokeWidth={1.5}
				/>
			})}
			{children}
		</svg>
	);
};

LineGraph.layout = "row";
