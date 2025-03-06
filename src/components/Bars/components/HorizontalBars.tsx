import React from "react";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { cx } from "../../../utils/cx/cx";
import { ObjectUtils } from "../../../utils/object/object";
import { Rect } from "./Rect";
import { MathUtils } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ColorUtils } from "../../../utils/color/color";

type Props = React.SVGAttributes<SVGSVGElement> & {
	children?: React.ReactNode;
	size?: number;
	radius?: number;
	anchor?: number;
	labels?:
		| boolean
		| ((value: string | number | Date) => string)
		| { position: "above" | "center"; collision?: boolean; display: (value: string | number | Date) => string };
};

export const HorizontalBars = ({ children, labels, size = 50, radius = 0, anchor = 0, className }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);

	const bars = context.data.flatMap((bar, i) =>
		bar.data.map((xy) => ({
			...bar,
			fill: bar.fill ?? bar.stroke ?? context.colors[i] ?? context.colors.at(-1),
			group: bar.group ?? bar.id ?? bar.name,
			data: xy,
		})),
	); // bars excl segments.
	const BAR_WIDTH = Math.floor((context.viewbox.y * (size / 100)) / new Set(bars.map((bar) => `${bar.data.y}|${bar.group}`)).size);
	/* dataset is a single array of rect's with x1/x2/y1/y2; rect can be a segment of a bar (grouped) or a bar itself */
	const dataset = context.domain.y
		.flatMap(({ tick, coordinate }) => {
			return Object.entries(
				ObjectUtils.groupBy(
					bars.filter((d) => d.data.y === tick),
					({ group }) => group,
				),
			).flatMap(([, barsForGroup], i, groups) => {
				const y1 = coordinate + BAR_WIDTH * i - (BAR_WIDTH * Object.keys(groups).length) / 2;
				return barsForGroup
					?.map((bar) => {
						return {
							...bar,
							x1: xForValue(anchor),
							x2: xForValue(bar.data.x),
							y1,
							y2: y1 + BAR_WIDTH,
						};
					})
					.map((segment, i, segments) => {
						const previousX = segments.slice(0, i).reduce((acc, { x2 }) => acc + x2, xForValue(anchor));
						return {
							...segment,
							x1: previousX,
							x2: segment.x2 - previousX ? segment.x2 : segment.x2 + previousX,
							radius: i === segments.length - 1 ? radius : undefined,
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
							glow={false}
							horizontal={true}
							className={"horizontal-bars__rect"}
						/>
					);
				})}
				{children}
			</svg>
			{labels &&
				dataset.map((bar, i) => {
					const position = typeof labels === "object" && "position" in labels ? labels.position : "center";
					const collision = typeof labels === "object" && "collision" in labels ? labels.collision : true;
					const width =
						Math.abs(MathUtils.scale(bar.x2 - bar.x1, context.viewbox.x, 100) - (position === "above" ? 100 : 0)) + "%";
					const height = MathUtils.scale(bar.y2 - bar.y1, context.viewbox.y, 100);
					const top = MathUtils.scale(bar.y1, context.viewbox.y, 100);
					const label = (() => {
						if (typeof labels === "object" && "position" in labels) return labels.display(bar.data.x);
						return (labels === true ? bar.data.y : labels(bar.data.y)) ?? "";
					})();
					const breakpoint = [2, 4, 6, 8, 10, 15, 20].find((bp) => bp >= label.toString().length);

					return (
						<overlay.div
							key={i}
							className={"horizontal-bars__label @container-[size] absolute text-center"}
							style={{
								width,
								height: height + "%",
								left:
									position === "above"
										? "unset"
										: MathUtils.scale(Math.min(bar.x1, bar.x2), context.viewbox.x, 100) + "%",
								right: position === "above" ? 0 : "unset",
								top: top + "%",
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"text-xs horizontal-bars__label-text absolute",
										position === "center" && "top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2",
										position === "above" && "top-[50%] left-2 transform -translate-y-1/2",
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
