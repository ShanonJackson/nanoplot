import React, { MouseEvent } from "react";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";
import { InternalCartesianDataset, Simplify, useGraph } from "../../../hooks/use-graph/use-graph";
import { cx } from "../../../utils/cx/cx";
import { ObjectUtils } from "../../../utils/object/object";
import { Rect } from "./Rect";
import { scale } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ColorUtils } from "../../../utils/color/color";
import { LinearGradient } from "../../LinearGradient/LinearGradient";

type Segment = Simplify<Omit<InternalCartesianDataset[number], "data"> & { data: InternalCartesianDataset[number]["data"][number] }>;
type Props = Omit<React.SVGAttributes<SVGSVGElement>, "onMouseEnter" | "onMouseLeave" | "fill" | "stroke"> & {
	children?: React.ReactNode;
	size?: number;
	radius?: number;
	anchor?: number;
	labels?:
		| boolean
		| ((segment: Segment) => string)
		| { position: "above" | "center"; collision?: boolean; display: (segment: Segment) => string };
	/**
	 * Function that can change the 'fill' for individual segments based on some condition.
	 */
	fill?: (segment: Segment) => string;
	stroke?: (segment: Segment) => string;
	/*
	 * `{ interactions: { y: number | string | Date } }` can be used to highlight a specific bar segments matching the x value.
	 * `{ interactions: { y: number | string | Date, shadow: boolean } }` shadow effect behind bar.
	 */
	interactions?: { y?: number | string | Date; shadow?: boolean };
	onMouseEnter?: (rect: Segment, event: MouseEvent) => void;
	onMouseLeave?: (event: MouseEvent) => void;
};

export const HorizontalBars = ({
	children,
	fill,
	stroke,
	labels,
	size = 50,
	radius = 0,
	anchor = 0,
	interactions,
	onMouseEnter,
	onMouseLeave,
	className,
}: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const bars = context.data.flatMap((bar, i) =>
		bar.data.map((xy) => ({
			...bar,
			group: bar.group ?? bar.id,
			data: xy,
		})),
	);
	const BAR_HEIGHT =
		Math.floor(context.viewbox.y / context.domain.y.length / new Set(bars.map((bar) => bar.group ?? "no-group")).size) * (size / 100);
	const yValues = new Set(bars.map((bar) => (bar.data.y instanceof Date ? bar.data.y.getTime() : bar.data.y)));

	const dataset = Array.from(yValues)
		.flatMap((y) => {
			const coordinate = yForValue(y);
			const barsForTick = bars.filter((bar) => (bar.data.y instanceof Date ? bar.data.y.getTime() : bar.data.y) === y);
			return Object.entries(ObjectUtils.groupBy(barsForTick, ({ group }) => group)).flatMap(([, barsForGroup], i, groups) => {
				const y1 = coordinate + BAR_HEIGHT * i - (BAR_HEIGHT * Object.keys(groups).length) / 2;
				return barsForGroup
					?.map((bar) => ({
						...bar,
						x1: xForValue(anchor),
						x2: xForValue(bar.data.x),
						y1,
						y2: y1 + BAR_HEIGHT,
					}))
					.map((segment, ii, segments) => {
						const isAboveAnchor = Math.min(segment.x1, segment.x2) < xForValue(anchor);
						const prevWidth = segments.slice(0, ii).reduce((acc, { x1, x2 }) => {
							if (isAboveAnchor ? x1 >= xForValue(anchor) : xForValue(anchor) >= x1) return acc;
							return isAboveAnchor ? acc + Math.abs(x1 - x2) : acc - Math.abs(x1 - x2);
						}, 0);
						const x1 = segment.x1 - prevWidth;
						const x2 = segment.x2 - prevWidth;
						return {
							...segment,
							x1: Math.max(x1, x2),
							x2: Math.min(x1, x2),
							radius: ii === segments.length - 1 ? radius : undefined,
						};
					});
			});
		})
		.filter((x) => !!x);

	return (
		<>
			<svg
				viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
				className={cx("horizontal-bars [grid-area:graph] h-full w-full", className)}
				preserveAspectRatio={"none"}
			>
				<LinearGradient
					gradient={"linear-gradient(to left, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.35) 65%, rgba(45, 45, 45, 1) 100%)"}
					id={"bar-shadow-dark"}
				/>
				<LinearGradient
					gradient={
						"linear-gradient(to left, rgba(180, 180, 180, 0) 0%, rgba(180, 180, 180, 0.15) 65%, rgba(180, 180, 180, 0.2) 100%)"
					}
					id={"bar-shadow-light"}
				/>
				{context.domain.y.map(({ coordinate }, i) => {
					const isShadowed = interactions?.shadow && interactions?.y && yForValue(interactions.y) === coordinate;

					if (!interactions?.shadow) return null;

					return (
						<Rect
							key={i}
							x1={0}
							x2={context.viewbox.x}
							y2={coordinate + context.viewbox.x / context.domain.x.length / 2}
							y1={coordinate - context.viewbox.x / context.domain.x.length / 2}
							stroke={"transparent"}
							className={cx(
								"bars__bar bars__bar--shadow transition-all duration-300 opacity-0 fill-[url(#bar-shadow-light)]",
								isShadowed && "opacity-1",
								`dark:fill-[url(#bar-shadow-dark)]`,
							)}
						/>
					);
				})}
				{dataset.map(({ x1, x2, y1, y2, ...bar }, index) => {
					const fillColor = fill ? fill(bar) : bar.fill;
					const strokeColor = stroke ? stroke(bar) : bar.stroke;
					return (
						<Rect
							key={index}
							x1={x1}
							x2={x2}
							y2={y2}
							y1={y1}
							fill={fillColor}
							stroke={strokeColor}
							radius={bar.radius}
							glow={false}
							horizontal={true}
							onMouseEnter={onMouseEnter ? (event) => onMouseEnter?.(bar, event) : undefined}
							onMouseLeave={onMouseLeave}
							className={"bars__bar"}
						/>
					);
				})}
				{children}
			</svg>
			{labels &&
				dataset.map((bar, i) => {
					const position = typeof labels === "object" && "position" in labels ? labels.position : "center";
					const collision = typeof labels === "object" && "collision" in labels ? labels.collision : true;
					const width = Math.abs(scale(bar.x2 - bar.x1, context.viewbox.x, 100) - (position === "above" ? 100 : 0)) + "%";
					const height = scale(bar.y2 - bar.y1, context.viewbox.y, 100);
					const top = scale(bar.y1, context.viewbox.y, 100);
					const label = (() => {
						if (typeof labels === "object" && "position" in labels) return labels.display(bar);
						return (labels === true ? bar.data.y : labels(bar)) ?? "";
					})();
					const breakpoint = [2, 4, 6, 8, 10, 15, 20].find((bp) => bp >= label.toString().length);

					return (
						<overlay.div
							key={i}
							className={"bars__label @container-[size] absolute text-center"}
							style={{
								width,
								height: height + "%",
								left: position === "above" ? "unset" : scale(Math.min(bar.x1, bar.x2), context.viewbox.x, 100) + "%",
								right: position === "above" ? 0 : "unset",
								top: top + "%",
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"bars__label-text text-xs absolute",
										position === "center" && "top-[50%] left-[50%] [transform:translate(-50%,-50%)]",
										position === "above" && "top-[50%] left-2 [transform:translate(0,-50%)]",
										collision && "invisible",
										breakpoint === 2 && collision && "@[width:2ch|height:1.25em]:!visible",
										breakpoint === 4 && collision && "@[width:4ch|height:1.25em]:!visible",
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
