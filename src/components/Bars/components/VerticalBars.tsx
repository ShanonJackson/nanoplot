import React, { ReactNode } from "react";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../../utils/graph/graph";
import { BarsVerticalLoading } from "./BarsVerticalLoading";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { ObjectUtils } from "../../../utils/object/object";
import { Rect } from "./Rect";
import { cx } from "../../../utils/cx/cx";
import { MathUtils } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ColorUtils } from "../../../utils/color/color";

type Props = React.SVGAttributes<SVGSVGElement> & {
	children?: ReactNode;
	loading?: boolean;
	glow?: boolean;
	size?: number;
	radius?: number;
	anchor?: number;
	labels?:
		| boolean
		| ((value: string | number | Date) => string)
		| { position: "above" | "center"; collision?: boolean; display: (value: string | number | Date) => string };
};

export const VerticalBars = ({ children, size = 50, anchor = 0, labels = true, radius = 0, glow, className, loading, ...rest }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;
	if (loading) return <BarsVerticalLoading />;

	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const bars = context.data.flatMap((bar, i) =>
		bar.data.map((xy) => ({
			...bar,
			fill: bar.fill ?? bar.stroke ?? context.colors[i] ?? context.colors.at(-1),
			group: bar.group ?? bar.id ?? bar.name,
			data: xy,
		})),
	);
	const BAR_WIDTH = Math.floor((context.viewbox.x * (size / 100)) / new Set(bars.map((bar) => `${bar.data.x}|${bar.group}`)).size);
	const dataset = context.domain.x
		.flatMap(({ tick, coordinate }) => {
			return Object.entries(
				ObjectUtils.groupBy(
					bars.filter((d) => d.data.x === tick),
					({ group }) => group,
				),
			).flatMap(([, barsForGroup], i, groups) => {
				const x1 = coordinate + BAR_WIDTH * i - (BAR_WIDTH * Object.keys(groups).length) / 2;
				return barsForGroup
					?.map((bar) => {
						return {
							...bar,
							x1,
							x2: x1 + BAR_WIDTH,
							y1: yForValue(bar.data.y),
							y2: yForValue(anchor),
						};
					})
					.map((segment, ii, segments) => {
						const isAboveAnchor = Math.min(segment.y1, segment.y2) < yForValue(anchor);
						const prevHeight = segments.slice(0, ii).reduce((acc, { y1, y2 }) => {
							if (isAboveAnchor ? y1 >= yForValue(anchor) : yForValue(anchor) >= y1) return acc;
							return isAboveAnchor ? acc + Math.abs(y1 - y2) : acc - Math.abs(y1 - y2);
						}, 0);
						const y1 = segment.y1 - prevHeight;
						const y2 = segment.y2 - prevHeight;
						return {
							...segment,
							y1: Math.max(y1, y2),
							y2: Math.min(y1, y2),
							radius: ii === segments.length - 1 ? radius : undefined,
						};
					});
			});
		})
		.filter((x) => !!x);

	const isBelowAnchor = bars.some((bar) => +bar.data.y < anchor); /* is any bar below the anchor */

	return (
		<>
			<svg
				{...rest}
				viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
				className={cx("horizontal-bars [grid-area:graph] h-full w-full bars", className)}
				preserveAspectRatio={"none"}
			>
				{dataset.map(({ x1, x2, y1, y2, ...bar }, index) => {
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
							className={"bars__bar"}
						/>
					);
				})}
				{isBelowAnchor && (
					<path
						strokeWidth={2}
						vectorEffect={"non-scaling-stroke"}
						stroke={"red"}
						className={"stroke-dark-priority-100"}
						d={`M 0 ${yForValue(anchor)} L ${context.viewbox.x} ${yForValue(anchor)}`}
					/>
				)}
				{children}
			</svg>
			{labels &&
				dataset.map((bar, i) => {
					const position = typeof labels === "object" && "position" in labels ? labels.position : "center";
					const collision = typeof labels === "object" && "collision" in labels ? labels.collision : true;
					const width = MathUtils.scale(bar.x2 - bar.x1, context.viewbox.x, 100) + "%";
					const height = MathUtils.scale(Math.abs(bar.y1 - bar.y2), context.viewbox.y, 100);
					const top = position === "above" ? -4 : MathUtils.scale(Math.min(bar.y2, bar.y1), context.viewbox.y, 100) + "%";
					const label = (() => {
						if (typeof labels === "object" && "position" in labels) return labels.display(bar.data.y);
						return (labels === true ? bar.data.y : labels(bar.data.y)) ?? "";
					})();
					const breakpoint = [2, 4, 5, 6, 8, 10, 15, 20].find((bp) => bp >= label.toString().replace(".", "").length);
					return (
						<overlay.div
							key={i}
							className={"bars__label @container-[size] absolute text-center"}
							style={{
								width,
								height: Math.abs(height - (position === "above" ? 100 : 0)) + "%",
								left: `${MathUtils.scale(bar.x1, context.viewbox.x, 100)}%`,
								top: top,
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"bars__label-text text-xs absolute",
										position === "center" && "top-[50%] left-[50%] [transform:translate(-50%,-50%)]",
										position === "above" &&
											"text-black dark:text-white bottom-0 left-[50%] [transform:translate(-50%,0)]",
										collision && "invisible",
										breakpoint === 2 && collision && "@[width:2ch|height:1.25em]:!visible",
										breakpoint === 4 && collision && "@[width:4ch|height:1.25em]:!visible",
										breakpoint === 5 && collision && "@[width:5ch|height:1.25em]:!visible",
										breakpoint === 6 && collision && "@[width:6ch|height:1.25em]:!visible",
										breakpoint === 8 && collision && "@[width:8ch|height:1.25em]:!visible",
										breakpoint === 10 && collision && "@[width:10ch|height:1.25em]:!visible",
										breakpoint === 15 && collision && "@[width:15ch|height:1.25em]:!visible",
										breakpoint === 20 && collision && "@[width:20ch|height:1.25em]:!visible",
									)}
									style={{ color: position === "center" ? ColorUtils.textFor(String(bar.fill)) : undefined }}
								>
									{label.toString()}
								</span>
							</div>
						</overlay.div>
					);
				})}
		</>
	);
};
