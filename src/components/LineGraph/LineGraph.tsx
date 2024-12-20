import React, { ReactNode } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";

type Props = {
	children?: ReactNode;
	context?: GraphContext;
};

export const LineGraph = ({ children, context }: Props) => {
	if (!context) return null;
	if (!GraphUtils.isXYData(context.data)) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const lines = context.data.map((line, i, lines) => {
		return {
			...line,
			id: line.id ?? line.name,
			stroke: line.stroke ?? ColorUtils.colorFor(i, lines.length),
			fill: line.fill === true ? (line.stroke ?? ColorUtils.colorFor(i, lines.length)) : line.fill,
			data: line.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});
	return (
		<svg viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`} height={"100%"} width={"100%"} preserveAspectRatio={"none"}>
			{lines.map((line, i) => {
				const d = line.data.map((xy, index) => `${index === 0 ? "M" : "L"} ${xy.x} ${xy.y}`).join(" ");
				return (
					<path key={i} d={d} fill={"transparent"} stroke={line.stroke} vectorEffect={"non-scaling-stroke"} strokeWidth={1.5} />
				);
			})}
			{children}
		</svg>
	);
};

