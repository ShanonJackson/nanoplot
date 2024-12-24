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

	if (!context) return null;
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

	const barHeight = context.viewbox.y / bars.data.length - 100;

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{bars.data.map((bar, index) => {
				return (
					<path
						key={index}
						d={`M 0 ${bar.x - barHeight / 2} l${bar.y} 0 l0 ${barHeight} l${-bar.y} 0`}
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
