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
	})[0];

	const barHeight = context.viewbox.y / bars.data.length - 80;

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{bars.data.map((bar, index) => {
				const y1 = bar.y - barHeight / 2;
				const y2 = bar.y + barHeight / 2;
				return (
					<path
						key={index}
						d={`M 0 ${y1} L ${bar.x} ${y1} L ${bar.x} ${y2} L 0 ${y2}`}
						fill={"transparent"}
						stroke={bars.stroke}
						vectorEffect={"non-scaling-stroke"}
						strokeWidth={1.5}
					/>
				);
			})}
			{children}
		</svg>
	);
};
