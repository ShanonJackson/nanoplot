"use client";
import * as React from "react";
import { useRef } from "react";
import { CartesianDataset, useGraph } from "../../../hooks/use-graph/use-graph";
import { useStatefulRef } from "../../../hooks/use-stateful-ref";
import { useMouseCoordinates } from "../../../hooks/use-mouse-coordinates";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";
import { MathUtils } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";
import { ObjectUtils } from "../../../utils/object/object";
import { GradientUtils } from "../../../utils/gradient/gradient";
import { tw } from "../../../utils/cx/cx";
import { HydrateContext } from "../../HydrateContext/HydrateContext";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	tooltip?: (
		points: Array<Omit<CartesianDataset[number], "data"> & { data: CartesianDataset[number]["data"][number] }>,
		x: number | string | Date,
	) => React.ReactNode;
	joints?: boolean;
};

const TOOLTIP_MARGIN = 20;
const LinesTooltipComponent = ({ tooltip, joints = true, ...rest }: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>();
	const mouse = useMouseCoordinates(ref);
	const {
		data,
		domain,
		viewbox,
		colors,
		interactions: { pinned, hovered },
		...rrez
	} = useGraph();
	if (!GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

	const { width: tooltipWidth, height: tooltipHeight } = tooltipRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
	const { width, height } = ref.current?.getBoundingClientRect() ?? { width: 0, height: 0 };

	const closest = (() => {
		/* Get closest 'x' value in dataset to mouse position - This doesn't neccessarily mean 'tick' */
		if (!mouse) return undefined;
		const isCategorical = typeof data[0]?.data[0]?.x === "string";
		if (isCategorical) {
			if (!domain.x.length) return undefined;
			return domain.x
				.map((d) => ({ tick: d.tick, distance: Math.abs(d.coordinate - mouse.coordinates.x) }))
				.reduce((a, b) => (a.distance < b.distance ? a : b))?.tick;
		}
		return data
			.flatMap((d) => d.data)
			.reduce<number | Date | undefined>((closest, { x }) => {
				const normalized = typeof x === "string" ? +x : x;
				if (closest === undefined) return normalized;
				return Math.abs(xForValue(+closest) - mouse.coordinates.x) < Math.abs(xForValue(+x) - mouse.coordinates.x)
					? closest
					: normalized;
			}, undefined);
	})();

	const points = (() => {
		/* Turn dataset into a dataset with a single point instead of line of points where that point === value near mouse */
		if (!mouse || closest === undefined) return undefined;
		return data
			.flatMap((line, i, lines) => {
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

	// Check tooltip dimensions can fit inside SVG.
	const isRightAligned = (mouse?.px.x ?? 0) > width - tooltipWidth - TOOLTIP_MARGIN;
	const { left, top } = (closest !== undefined &&
		mouse && {
			left: Math.round(
				MathUtils.clamp(
					mouse?.px.x,
					MathUtils.scale(xForValue(+closest), viewbox.x, width) + TOOLTIP_MARGIN,
					isRightAligned
						? MathUtils.scale(xForValue(+closest), viewbox.x, width) - TOOLTIP_MARGIN - tooltipWidth
						: width - tooltipWidth - TOOLTIP_MARGIN,
				),
			),
			top: Math.round(MathUtils.clamp(mouse?.px.y, TOOLTIP_MARGIN, height - tooltipHeight - TOOLTIP_MARGIN)),
		}) || { left: 0, top: 0 };

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
			<svg
				ref={ref}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				preserveAspectRatio={"none"}
				className={"h-full w-full [grid-area:graph] absolute overflow-visible"}
			>
				{closest !== undefined && (
					<line
						x1={xForValue(+closest)}
						x2={xForValue(+closest)}
						y1={0}
						y2={viewbox.y}
						className={"stroke-black dark:stroke-white"}
						strokeWidth={4}
					/>
				)}
				{joints &&
					jointPoints?.map(({ data: { x, y }, stroke }, i) => {
						return (
							<path
								key={i}
								stroke={stroke}
								fill={stroke}
								d={`M ${x} ${y} A 0 0 0 0 1 ${x} ${y}`}
								strokeWidth={"10"}
								strokeLinecap={"round"}
								vectorEffect={"non-scaling-stroke"}
							/>
						);
					})}
			</svg>
			{ordered && closest !== undefined && mouse && (
				<overlay.div
					{...rest}
					ref={setTooltipRef}
					className={tw("lines-tooltip__tooltip absolute pointer-events-none", rest.className)}
					style={{ left, top }}
				>
					{tooltip ? (
						tooltip(ordered, closest)
					) : (
						<div
							{...rest}
							className={
								"text-[14px] leading-[14px] rounded border bg-opacity-60 shadow-md backdrop-blur-sm w-[250px] pb-1.5 border-gray-200 dark-border-[#454545]"
							}
						>
							<div className="font-medium bg-gradient-to-b from-transparent to-[#CFCFCF] dark:to-[#3C3C3C] pl-2 pr-2 pt-1.5 pb-1 mb-1.5">
								{(() => {
									if (closest instanceof Date) {
										return `${closest.getFullYear()}-${closest.getMonth() + 1}-${closest.getDate()}`;
									}
									return closest.toString();
								})()}
							</div>
							<div className={"px-2.5"}>
								{ordered.map(({ name, data: { x, y }, stroke, fill }, i) => {
									const direction = GradientUtils.direction(stroke);
									const percent =
										direction === "to bottom"
											? MathUtils.scale(yForValue(y), viewbox.y, 100)
											: MathUtils.scale(xForValue(x), viewbox.x, 100);
									const bg = fill ?? stroke;
									return (
										<div key={i} className={"flex items-center text-black dark:text-white mt-1 mb-1"}>
											<div
												style={{
													background: bg?.includes("linear-gradient")
														? GradientUtils.colorFrom({ gradient: bg, percent, viewbox, domain })
														: bg,
												}}
												className="bg-current h-[14px] w-[14px] rounded-full mr-1"
											/>
											<div className="flex-1 text-[0.875rem] leading-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis mr-1">
												{name}
											</div>
											<div className={"font-bold"}>{+(Math.round(+(y.toString() + "e+2")) + "e-2")}</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</overlay.div>
			)}
		</>
	);
};

export const LinesTooltip = HydrateContext(LinesTooltipComponent);
