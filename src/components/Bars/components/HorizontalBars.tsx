import { ColorUtils } from "@/export";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { cx } from "@/utils/cx/cx";
import { GraphUtils } from "@/utils/graph/graph";
import React from "react";

type Props = React.SVGAttributes<SVGSVGElement> & {
	children?: React.ReactNode;
};

export const HorizontalBars = ({ children, className }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);

	const bars = context.data.map((bar, i, bars) => {
		return {
			...bar,
			id: bar.id ?? bar.name,
			stroke: bar.stroke ?? ColorUtils.colorFor(i, bars.length),
			fill: bar.fill === true ? (bar.stroke ?? ColorUtils.colorFor(i, bars.length)) : bar.fill,
			bar: bar.group ?? bar.name,
			data: bar.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});

	const barHeight = context.viewbox.y / bars[0].data.length - 80;

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{bars.map((bar, index) =>
				bar.data.map((xy, idx) => {
					const y1 = index === 0 ? xy.y - barHeight / 2 : xy.y;
					const y2 = index === 0 ? xy.y : xy.y + barHeight / 2;
					return (
						<path
							key={idx}
							d={`M 0 ${y1} L ${xy.x} ${y1} L ${xy.x} ${y2} L 0 ${y2}`}
							fill={bar.stroke}
							stroke={bar.stroke}
							vectorEffect={"non-scaling-stroke"}
							strokeWidth={1.5}
						/>
					);
				}),
			)}
			{children}
		</svg>
	);
};
