import React, { ReactNode } from "react";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = React.SVGAttributes<SVGSVGElement> & {
	children?: ReactNode;
};

export const VerticalBars = ({ children, className }: Props) => {
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
	const categories = new Set(bars.flatMap((bar) => bar.data.map((xy) => xy.x)));
	const barWidth = Math.floor((context.viewbox.x - gap) / categories.size / bars.length);

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{bars.map((bar, index) =>
				bar.data.map((xy, idx) => {
					const x1 = xy.x - barWidth * (bars.length / 2) + barWidth * index;
					const x2 = x1 + barWidth;
					return (
						<path
							key={idx}
							d={`M ${x1} ${context.viewbox.y} L ${x1} ${xy.y} L ${x2} ${xy.y} L ${x2} ${context.viewbox.y}`}
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
