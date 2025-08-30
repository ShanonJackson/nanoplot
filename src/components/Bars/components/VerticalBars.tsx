import React, { MouseEvent, ReactNode, useId } from "react";
import { InternalCartesianDataset, Simplify, useGraph } from "../../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../../utils/graph/graph";
import { BarsVerticalLoading } from "./BarsVerticalLoading";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { ObjectUtils } from "../../../utils/object/object";
import { Rect } from "./Rect";
import { cx } from "../../../utils/cx/cx";
import { scale } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ColorUtils } from "../../../utils/color/color";
import { LinearGradient } from "../../LinearGradient/LinearGradient";

type Segment = Simplify<Omit<InternalCartesianDataset[number], "data"> & { data: InternalCartesianDataset[number]["data"][number] }>;
type Props = Omit<React.SVGAttributes<SVGSVGElement>, "onMouseEnter" | "onMouseLeave" | "fill" | "stroke"> & {
	/*
	 * Percentage of the width of the bars (50 by default).
	 */
	size?: number;
	/*
	 * Applies a glow effect to the bars.
	 */
	glow?: boolean;
	/*
	 * The radius of the corners of the bars (0 by default).
	 * Effects top/left and top/right corners of the bars.
	 */
	radius?: number;
	/*
	 * The y value where the bars should be anchored to (0 by default).
	 * This is useful for positive/negative bar charts.
	 */
	anchor?: number;
	labels?:
		| boolean
		| ((segment: Segment) => string)
		| { position: "above" | "center"; collision?: boolean; display: (segment: Segment) => string };
	loading?: boolean;
	children?: ReactNode;
	/**
	 * Function that can change the 'fill' for individual bar segments based on some condition.
	 */
	fill?: (segment: Segment) => string;
	/**
	 * Function that can change the 'stroke' for individual bar segments based on some condition.
	 */
	stroke?: (segment: Segment) => string;
	/*
	 * `{ interactions: { x: number | string | Date } }` can be used to highlight a specific bar segments matching the x value.
	 */
	interactions?: { x?: number | string | Date };
	onMouseEnter?: (rect: Segment, event: MouseEvent) => void;
	onMouseLeave?: (event: MouseEvent) => void;
};

export const VerticalBars = ({
	children,
	fill,
	stroke,
	size = 50,
	anchor = 0,
	labels,
	radius = 0,
	glow,
	className,
	loading,
	interactions,
	onMouseEnter,
	onMouseLeave,
	...rest
}: Props) => {
	const context = useGraph();
	const {
		interactions: { hovered, pinned },
	} = context;
	if (!GraphUtils.isXYData(context.data)) return null;
	if (loading) return <BarsVerticalLoading />;

	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const bars = context.data.flatMap((bar, i) =>
		bar.data.map((xy) => ({
			...bar,
			group: bar.group ?? bar.id /* grouped unique if no group is defined */,
			data: xy,
		})),
	);

	const BAR_WIDTH = Math.floor(context.viewbox.x / context.domain.x.length / new Set(bars.map((bar) => bar.group)).size) * (size / 100); // this divided by number of unique groups?
	const xValues = new Set(bars.map((bar) => (bar.data.x instanceof Date ? bar.data.x.getTime() : bar.data.x)));

	const dataset = Array.from(xValues)
		.flatMap((x) => {
			const coordinate = xForValue(x);
			const barsForTick = bars.filter((bar) => (bar.data.x instanceof Date ? bar.data.x.getTime() : bar.data.x) === x);
			return Object.entries(ObjectUtils.groupBy(barsForTick, ({ group }) => group)).flatMap(([, barsForGroup], i, groups) => {
				const x1 = coordinate + BAR_WIDTH * i - (BAR_WIDTH * Object.keys(groups).length) / 2;
				return barsForGroup
					?.map((bar) => ({
						...bar,
						x1,
						x2: x1 + BAR_WIDTH,
						y1: yForValue(bar.data.y),
						y2: yForValue(anchor),
					}))
					.map((segment, ii, segments) => {
						/* this stacks segments in same group */
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
				className={cx("vertical-bars [grid-area:graph] h-full w-full bars", className)}
				preserveAspectRatio={"none"}
			>
				{dataset.map(({ x1, x2, y1, y2, ...bar }, index) => {
					const disabled =
						Boolean(pinned.concat(hovered).length && !pinned.includes(bar.id) && !hovered.includes(bar.id)) ||
						(interactions?.x ? xForValue(interactions.x) !== xForValue(bar.data.x) : false);
					const fillColor = fill ? fill(bar) : bar.fill;
					const strokeColor = stroke ? stroke(bar) : bar.stroke;
					return (
						<React.Fragment key={index}>
							<Rect
								key={index}
								x1={x1}
								x2={x2}
								y2={y2}
								y1={y1}
								fill={fillColor}
								stroke={strokeColor}
								radius={bar.radius}
								glow={glow}
								onMouseEnter={onMouseEnter ? (event) => onMouseEnter?.(bar, event) : undefined}
								onMouseLeave={onMouseLeave}
								className={cx(
									"bars__bar transition-all duration-300",
									disabled && "opacity-40",
									onMouseEnter && "cursor-pointer",
								)}
							/>
						</React.Fragment>
					);
				})}
				{isBelowAnchor && (
					<path
						strokeWidth={2}
						vectorEffect={"non-scaling-stroke"}
						stroke={"red"}
						className={"stroke-[#2d2d2d]"}
						d={`M 0 ${yForValue(anchor)} L ${context.viewbox.x} ${yForValue(anchor)}`}
					/>
				)}
				{children}
			</svg>
			{labels &&
				dataset.map((bar, i) => {
					const position = typeof labels === "object" && "position" in labels ? labels.position : "center";
					const collision = typeof labels === "object" && "collision" in labels ? labels.collision : true;
					const width = scale(bar.x2 - bar.x1, context.viewbox.x, 100) + "%";
					const height = scale(Math.abs(bar.y1 - bar.y2), context.viewbox.y, 100);
					const top = position === "above" ? -4 : scale(Math.min(bar.y2, bar.y1), context.viewbox.y, 100) + "%";
					const label = (() => {
						if (typeof labels === "object" && "position" in labels) return labels.display(bar);
						return (labels === true ? bar.data.y : labels(bar)) ?? "";
					})();
					const breakpoint = [2, 4, 5, 6, 8, 10, 15, 20].find((bp) => bp >= label.toString().replace(".", "").length);
					return (
						<overlay.div
							key={i}
							className={"bars__label @container-[size] absolute text-center"}
							style={{
								width,
								height: Math.abs(height - (position === "above" ? 100 : 0)) + "%",
								left: scale(bar.x1, context.viewbox.x, 100) + "%",
								top: top,
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"bars__label-text [font-size:0.75rem] [line-height:1rem] absolute",
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
