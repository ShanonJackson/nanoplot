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
	labels?:
		| boolean
		| ((value: string | number | Date) => string)
		| { position: "above" | "center"; display: (value: string | number | Date) => string };
	radius?: number;
};

export const VerticalBars = ({ children, size = 50, labels = true, radius = 0, glow, className, loading, ...rest }: Props) => {
	const context = useGraph();

	if (!GraphUtils.isXYData(context.data)) return null;
	if (loading) return <BarsVerticalLoading />;

	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const bars = context.data.flatMap((bar) => bar.data.map((xy) => ({ ...bar, group: bar.group ?? bar.id ?? bar.name, data: xy }))); // bars excl segments.
	const BAR_WIDTH = Math.floor((context.viewbox.x * (size / 100)) / new Set(bars.map((bar) => `${bar.data.x}|${bar.group}`)).size);
	/* dataset is a single array of rect's with x1/x2/y1/y2; rect can be a segment of a bar (grouped) or a bar itself */
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
							y2: context.viewbox.y,
						};
					})
					.map((segment, i, segments) => {
						const previousY = segments.slice(0, i).reduce((acc, { y1 }) => acc + context.viewbox.y - y1, 0);
						return {
							...segment,
							y1: context.viewbox.y - previousY,
							y2: segment.y1 - previousY,
							radius: i === segments.length - 1 ? radius : undefined,
						};
					});
			});
		})
		.filter((x) => !!x);

	return (
		<>
			<svg
				{...rest}
				viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
				className={cx("[grid-area:graph] h-full w-full bars", className)}
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
							className={"bars__rect"}
						/>
					);
				})}
				{children}
			</svg>
			{labels &&
				dataset.map((bar, i) => {
					const width = MathUtils.scale(bar.x2 - bar.x1, context.viewbox.x, 100) + "%";
					const height = MathUtils.scale(bar.y1 - bar.y2, context.viewbox.y, 100)
					const label = (() => {
						if (typeof labels === "object" && "position" in labels) return labels.display(bar.data.y);
						return (labels === true ? bar.data.y : labels(bar.data.y)) ?? "";
					})();
					const position = typeof labels === "object" && "position" in labels ? labels.position : "center";
					const breakpoints = [2, 4, 6, 8, 10, 15, 20];
					const breakpoint = breakpoints.find((bp) => bp >= label.toString().length);
					const top = position === "above" ? 0 : MathUtils.scale(bar.y2, context.viewbox.y, 100) + "%";

					return (
						<overlay.div
							key={i}
							className={"bars__label @container-[size] absolute text-center"}
							style={{
								width,
								height: (position === "above" ? 100 : 0) - height + "%",
								left: `${MathUtils.scale(bar.x1, context.viewbox.x, 100)}%`,
								top: top,
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"text-xs bars__label_text invisible absolute",
										position === "center" && "top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2",
										position === "above" && "text-black dark:text-white bottom-0 left-[50%] transform -translate-x-1/2",
										breakpoint === 2 && "@[width:2ch|height:1.25em]:!visible",
										breakpoint === 4 && "@[width:4ch|height:1.25em]:!visible",
										breakpoint === 6 && "@[width:6ch|height:1.25em]:!visible",
										breakpoint === 8 && "@[width:8ch|height:1.25em]:!visible",
										breakpoint === 10 && "@[width:10ch|height:1.25em]:!visible",
										breakpoint === 15 && "@[width:15ch|height:1.25em]:!visible",
										breakpoint === 20 && "@[width:20ch|height:1.25em]:!visible",
									)}
									style={{ color: position === "center" ? ColorUtils.textFor(String(bar.fill)) : undefined }}
								>
									{label}
								</span>
							</div>
						</overlay.div>
					);
				})}
		</>
	);
};
