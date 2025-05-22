import React from "react";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { GraphUtils } from "../../utils/graph/graph";
import { ScatterLoading } from "./components/ScatterLoading";
import { PathUtils } from "../../utils/path/path";
import { ScatterTooltip } from "./components/ScatterTooltip";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { ScatterLabels } from "./components/ScatterLabels";
import { ObjectUtils } from "../../utils/object/object";
import { ScatterQuadrant } from "./components/ScatterQuadrant";

type Props = {
	trendline?: boolean;
	loading?: boolean;
	className?: string;
};

const chunk = <T extends unknown>(array: T[], size: number): T[][] => {
	const chunked = [];
	for (let i = 0; i < array.length; i += size) {
		chunked.push(array.slice(i, i + size));
	}
	return chunked;
};

export const Scatter = ({ loading, trendline, className }: Props) => {
	const context = useGraph();
	const { x, y } = context.viewbox;

	if (loading) return <ScatterLoading className={className} />;
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);

	const points = context.data.flatMap((d, i) => {
		return d.data.map(({ x, y }) => ({
			x: xForValue(x),
			y: yForValue(y),
			stroke: d.stroke ?? context.colors[i] ?? context.colors.at(-1),
		}));
	});
	const colors = ObjectUtils.groupBy(points, (p) => p.stroke);

	return (
		<svg viewBox={`0 0 ${x} ${y}`} className={"[grid-area:graph] h-full w-full"} preserveAspectRatio={"none"}>
			{Object.entries(colors).flatMap(([color, points], i) => {
				return chunk(points ?? [], 3000).map((points, ii) => {
					return (
						<path
							key={i + "|" + ii}
							d={points?.map(({ x, y }) => `M ${x} ${y} h 0.001`).join(" ")}
							strokeWidth={10}
							stroke={color}
							strokeLinecap={"round"}
							strokeLinejoin={"round"}
							vectorEffect={"non-scaling-stroke"}
							className={"scatter__points"}
						/>
					);
				});
			})}
			{trendline && (
				<path
					strokeWidth={3}
					strokeDasharray={"4,4"}
					className={"scatter__trendline stroke-black dark:stroke-white [vector-effect:non-scaling-stroke]"}
					d={PathUtils.trend(points, context.viewbox)}
				/>
			)}
		</svg>
	);
};

Scatter.Tooltip = ScatterTooltip;
Scatter.Labels = ScatterLabels;
Scatter.Quadrant = ScatterQuadrant;
