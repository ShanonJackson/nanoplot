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

	const gap = context.viewbox.x * 0.16; // 16% gap
	const categories = new Set(bars.flatMap((bar) => bar.data.map((xy) => xy.y)));
	const barHeight = Math.floor((context.viewbox.y - gap) / categories.size / bars.length);

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{bars.map((bar, index) =>
				bar.data.map((xy, idx) => {
					const y1 = xy.y - barHeight * (bars.length / 2) + barHeight * index;
					const y2 = y1 + barHeight;
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
