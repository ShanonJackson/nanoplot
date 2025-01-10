import React, { ReactNode } from "react";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = React.SVGAttributes<SVGSVGElement> & {
	stacked?: boolean;
	children?: ReactNode;
};

export const VerticalBars = ({ stacked, children, className }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);

	const bars = context.data.map((bar, i, bars) => {
		return {
			...bar,
			id: bar.id ?? bar.name,
			group: bar.group ?? bar.id ?? bar.name,
			stroke: bar.stroke ?? ColorUtils.colorFor(i, bars.length),
			fill: bar.fill === true ? (bar.stroke ?? ColorUtils.colorFor(i, bars.length)) : bar.fill,
			bar: bar.group ?? bar.name,
			data: bar.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});
	// stacked AND unstacked bars is the same code path.
	// always setting a group (which is how you stack).
	// and because group is defaulted to id or name stacks will be commonly 1/1
	// if consumers of the library use 'group' it will be stacked for members of that group.
	const gap = context.viewbox.x * 0.16; // 16% gap
	const categories = new Set(bars.flatMap((bar) => bar.data.map((xy) => xy.x)));
	const barWidth = Math.floor((context.viewbox.x - gap) / categories.size / bars.length);
	const groups = [...new Set(bars.map((bar) => bar.group))];

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			{stacked
				? groups?.map((group, g) => {
						const groupBars = bars.filter((b) => b.group === group);
						console.log("groupBars", groupBars);
						let coordinate: number[] = [];
						const paths: ReactNode[] = [];

						groupBars.map((bar, index) => {
							bar.group === group &&
								bar.data?.map((xy, idx) => {
									const x1 = xy.x - barWidth + (barWidth + 30) * g;
									const x2 = x1 + barWidth;
									const y1 = index === 0 ? context.viewbox.y : coordinate[idx];
									const y2 = index === 0 ? xy.y : coordinate[idx] - (context.viewbox.y - xy.y);

									// recorde the combined y coordinate (use for next stacked bar)
									coordinate[idx] = index === 0 ? xy.y : coordinate[idx] - (context.viewbox.y - xy.y);
									paths.push(
										<path
											key={idx + index + xy.y + xy.x}
											d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y1}`}
											fill={bar.stroke}
											stroke={bar.stroke}
											vectorEffect={"non-scaling-stroke"}
											strokeWidth={1.5}
										/>,
									);
								});
						});
						return paths.map((path) => path);
					})
				: bars.map((bar, index) =>
						bar.data?.map((xy, idx) => {
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
