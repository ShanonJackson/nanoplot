import React, { ReactNode } from "react";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { cx } from "@/utils/cx/cx";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { BarsVerticalLoading } from "./BarsVerticalLoading";
import { Rect } from "@/app/bar-graph/components/Rect";
import { ObjectUtils } from "@/utils/object/object";
import { overlay } from "@/components/Overlay/Overlay";
import { MathUtils } from "@/utils/math/math";

type Props = React.SVGAttributes<SVGSVGElement> & {
	children?: ReactNode;
	loading?: boolean;
	glow?: boolean;
	size?: number;
	radius?: number;
};

export const VerticalBars = ({ children, size = 45, radius = 0, glow, className, loading }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const yForValue = CoordinatesUtils.yCoordinateFor(context);

	const bars = context.data.map((bar, i, bars) => {
		return {
			...bar,
			group: bar.group ?? bar.id ?? bar.name,
		};
	});
	if (loading) return <BarsVerticalLoading />;

	const dataset = context.domain.x.map(({ tick, coordinate }) => {
		return {
			domain: { tick, coordinate },
			groups: ObjectUtils.groupBy(
				bars
					.filter((b) => b.data.some(({ x }) => x === tick))
					.flatMap((bar) => {
						const d = bar.data.find(({ x }) => x === tick);
						if (!d) return [];
						return {
							...bar,
							data: d,
						};
					}),
				({ group }) => group,
			),
		};
	});

	const uniqueBars = dataset.reduce((total, { groups }) => total + Object.keys(groups).length, 0);
	const barWidth = Math.floor((context.viewbox.x * (size / 100)) / uniqueBars);

	const dset = dataset
		.flatMap(({ domain: { coordinate }, groups }) => {
			return Object.entries(groups).flatMap(([_, bars], groupIndex) => {
				return bars
					?.map((bar) => {
						const x1 = coordinate + barWidth * groupIndex - (barWidth * Object.keys(groups).length) / 2;
						return {
							...bar,
							x1,
							x2: x1 + barWidth,
							y1: yForValue(bar.data.y),
							y2: context.viewbox.y,
						};
					})
					.map(({ x1, x2, y1, y2, ...bar }, index, segments) => {
						const previousY = segments.slice(0, index).reduce((acc, { y1 }) => acc + context.viewbox.y - y1, 0);
						return {
							...bar,
							x1,
							x2,
							y1: context.viewbox.y - previousY,
							y2: y1 - previousY,
							radius: index === segments.length - 1 ? radius : undefined,
						};
					});
			});
		})
		.filter((bar) => !!bar);

	return (
		<>
			<svg
				viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
				className={cx("[grid-area:graph] h-full w-full", className)}
				preserveAspectRatio={"none"}
			>
				{dset.map(({ x1, x2, y1, y2, ...bar }, index) => {
					return (
						<Rect
							key={index}
							x1={x1}
							x2={x2}
							y2={y2}
							y1={y1}
							fill={String(bar.fill)}
							stroke={bar.stroke}
							radius={bar.radius}
							glow={glow}
						/>
					);
				})}
				{children}
			</svg>
			{dset.map((bar, i) => {
				const width = MathUtils.scale(bar.x2 - bar.x1, context.viewbox.x, 100) + "%";
				const height = MathUtils.scale(bar.y1 - bar.y2, context.viewbox.y, 100) + "%";
				const breakpoints = [2, 4, 6, 8, 10, 15, 20];
				const breakpoint = breakpoints.find((bp) => bp >= bar.data.y.toString().length);
				return (
					<overlay.div
						x={{ coordinate: bar.x1 }}
						y={{ coordinate: bar.y2 }}
						key={i}
						className={"@container-[size] text-center"}
						style={{ width, height }}
					>
						<div className={"h-full w-full relative"}>
							<span
								className={cx(
									"invisible absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2",
									breakpoint === 2 && "@[width:2ch|height:1.25em]:!visible",
									breakpoint === 4 && "@[width:4ch|height:1.25em]:!visible",
									breakpoint === 6 && "@[width:6ch|height:1.25em]:!visible",
									breakpoint === 8 && "@[width:8ch|height:1.25em]:!visible",
									breakpoint === 10 && "@[width:10ch|height:1.25em]:!visible",
									breakpoint === 15 && "@[width:15ch|height:1.25em]:!visible",
									breakpoint === 20 && "@[width:20ch|height:1.25em]:!visible",
								)}
							>
								{bar.data.y}
							</span>
						</div>
					</overlay.div>
				);
			})}
		</>
	);
};
