import { ColorUtils } from "@/export";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { cx } from "@/utils/cx/cx";
import { GraphUtils } from "@/utils/graph/graph";
import React, { ReactNode } from "react";

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
	const groups = [...new Set(bars.map((bar) => bar.group))];

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{groups?.map((group, g) => {
				const groupBars = bars.filter((b) => b.group === group);
				const coordinate: number[] = [];

				return groupBars.map((bar, index) => {
					if (bar.group === group)
						return bar.data?.map((xy, idx) => {
							const y1 = xy.y + barHeight * g - barHeight * (groups.length / 2);
							const y2 = y1 + barHeight;
							const x1 = index === 0 ? 0 : coordinate[idx];
							const x2 = index === 0 ? xy.x : coordinate[idx] + (0 + xy.x);
							// recorde the combined x coordinate (use for next stacked bar)
							coordinate[idx] = index === 0 ? xy.x : coordinate[idx] + xy.x;
							return (
								<path
									key={idx + index + xy.y + xy.x}
									d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y1}`}
									fill={bar.stroke}
									stroke={bar.stroke}
									vectorEffect={"non-scaling-stroke"}
									strokeWidth={1.5}
								/>
							);
						});
				});
			})}
			{children}
		</svg>
	);
};
