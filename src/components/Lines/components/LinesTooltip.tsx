"use client";
import * as React from "react";
import { RefObject, useMemo, useRef } from "react";
import { CartesianDataset, useGraph, useIsZooming } from "../../../hooks/use-graph/use-graph";
import { useStatefulRef } from "../../../hooks/use-stateful-ref";
import { useMouseCoordinates } from "../../../hooks/use-mouse-coordinates";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";
import { MathUtils, scale } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ObjectUtils } from "../../../utils/object/object";
import { GradientUtils } from "../../../utils/gradient/gradient";
import { tw } from "../../../utils/cx/cx";
import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { Portal } from "../../Portal/Portal";
import { useBoundingBox } from "../../../hooks/use-bounding-box";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	tooltip?:
		| ((
				points: Array<Omit<CartesianDataset[number], "data"> & { data: CartesianDataset[number]["data"][number] }>,
				x: number | string | Date,
		  ) => React.ReactNode)
		| {
				title?: (x: number | string | Date) => React.ReactNode;
				display?: (point: CartesianDataset[number]["data"][number]) => React.ReactNode;
		  };

	joints?: boolean;
	zoneRef: RefObject<SVGSVGElement | null>;
};

const TOOLTIP_MARGIN = 20;
export const LinesTooltip = ({ tooltip, joints = true, zoneRef: ref, ...rest }: Props) => {
	const rect = useBoundingBox(ref) ?? { width: 0, height: 0, left: 0, top: 0 };
	const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>();
	const mouse = useMouseCoordinates(ref, { x: true, y: false });
	const closest = mouse?.closest?.x;
	const {
		data,
		domain,
		viewbox,
		colors,
		interactions: { pinned, hovered },
	} = useGraph();
	if (!GraphUtils.isXYData(data) || !mouse || closest === undefined) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

	const { width: tooltipWidth, height: tooltipHeight } = tooltipRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
	const { width, height } = ref.current?.getBoundingClientRect() ?? { width: 0, height: 0 };

	const points = (() => {
		/* Turn dataset into a dataset with a single point instead of line of points where that point === value near mouse */
		return data
			.flatMap((line, i) => {
				const point = line.data.find((d) => +d.x === +closest);
				if (!point) return [];

				const stroke = (() => {
					if (line.stroke?.includes("linear-gradient")) {
						return GradientUtils.gradientColorFromValue({
							gradient: line.stroke,
							point: point,
							dataset: line.data,
							viewbox,
							domain,
						});
					}
					return line.stroke ?? colors[i] ?? colors.at(-1);
				})();

				return {
					...line,
					stroke,
					data: point,
				};
			})
			.filter(({ name }) => {
				if (pinned.length) return pinned.includes(name) && !hovered.includes(name);
				return true;
			});
	})();

	const isRightAligned = mouse.px.x > width - tooltipWidth - TOOLTIP_MARGIN;
	const { left, top } = {
		left: Math.round(
			MathUtils.clamp(
				mouse.px.x,
				scale(xForValue(+closest), viewbox.x, width) + TOOLTIP_MARGIN,
				isRightAligned
					? scale(xForValue(+closest), viewbox.x, width) - TOOLTIP_MARGIN - tooltipWidth
					: width - tooltipWidth - TOOLTIP_MARGIN,
			),
		),
		top: Math.round(MathUtils.clamp(mouse.px.y, TOOLTIP_MARGIN, height - tooltipHeight - TOOLTIP_MARGIN)),
	};

	const jointPoints = Object.entries(ObjectUtils.groupBy(points ?? [], ({ group, id, name }) => group ?? id ?? name)).flatMap(
		([, lines]) => {
			return (
				lines
					?.map((line) => {
						return {
							...line,
							data: {
								x: xForValue(line.data.x),
								y: yForValue(line.data.y),
							},
						};
					})
					.map((segment, i, segments) => {
						return {
							...segment,
							data: {
								x: segment.data.x,
								y: segment.data.y - segments.slice(0, i).reduce((acc, { data }) => acc + (viewbox.y - data.y), 0),
							},
						};
					}) ?? []
			);
		},
	);
	const ordered = points?.sort((a, b) => +b.data.y - +a.data.y);
	return (
		<>
			<Portal>
				<svg
					viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
					className={"[grid-area:graph] h-full w-full absolute overflow-visible pointer-events-none"}
					style={{ width: rect.width, height: rect.height, left: rect.left, top: rect.top }}
					preserveAspectRatio={"none"}
				>
					<line
						x1={xForValue(+closest)}
						x2={xForValue(+closest)}
						y1={0}
						y2={viewbox.y}
						className={"stroke-black dark:stroke-white"}
						strokeWidth={4}
					/>
					{joints &&
						jointPoints?.map(({ data: { x, y }, stroke }, i) => {
							return (
								<path
									key={i}
									stroke={stroke}
									fill={stroke}
									d={`M ${x} ${y} h 0.001`}
									strokeWidth={"8"}
									strokeLinecap={"round"}
									vectorEffect={"non-scaling-stroke"}
								/>
							);
						})}
				</svg>
				{ordered && (
					<overlay.div
						{...rest}
						ref={setTooltipRef}
						className={tw("lines-tooltip__tooltip absolute pointer-events-none", rest.className)}
						style={{ left: left + rect.left, top: top + rect.top }}
					>
						{typeof tooltip === "function" ? (
							tooltip(ordered, closest)
						) : (
							<div
								{...rest}
								className={
									"text-[14px] leading-[14px] rounded border bg-opacity-60 shadow-md backdrop-blur-sm w-[250px] pb-1.5 border-gray-200 dark-border-[#454545]"
								}
							>
								<div className="font-medium [background:linear-gradient(transparent,#CFCFCF)] dark:[background:linear-gradient(transparent,#3C3C3C)] pl-2 pr-2 pt-1.5 pb-1 mb-1.5">
									{(() => {
										if (tooltip?.title) return tooltip.title(closest);
										if (closest instanceof Date) {
											return `${closest.getFullYear()}-${closest.getMonth() + 1}-${closest.getDate()}`;
										}
										return closest.toString();
									})()}
								</div>
								<div className={"px-2.5"}>
									{ordered.map(({ name, data, stroke, fill }, i) => {
										const direction = GradientUtils.direction(stroke);
										const percent =
											direction === "to bottom"
												? scale(yForValue(data.y), viewbox.y, 100)
												: scale(xForValue(data.x), viewbox.x, 100);
										const bg = fill ?? stroke;
										const label = (() => {
											const formatter = new Intl.NumberFormat("en-US", {
												minimumFractionDigits: 0,
												maximumFractionDigits: 2,
											});
											if (tooltip?.display) return tooltip.display(data);
											if (data.y instanceof Date) return data.y.toISOString();
											if (typeof data.y === "string") return data.y;
											return formatter.format(data.y);
										})();
										return (
											<div key={i} className={"flex items-center text-black dark:text-white mt-1 mb-1"}>
												<div
													style={{
														background: bg?.includes("linear-gradient")
															? GradientUtils.colorFrom({ gradient: bg, value: percent, viewbox, domain })
															: bg,
													}}
													className="bg-current h-[14px] w-[14px] rounded-full mr-1"
												/>
												<div className="flex-1 text-left text-[0.875rem] leading-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis mr-1">
													{name}
												</div>
												<div className={"font-bold"}>{label}</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</overlay.div>
				)}
			</Portal>
		</>
	);
};
