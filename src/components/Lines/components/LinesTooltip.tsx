"use client";
import * as React from "react";
import { useRef } from "react";
import { useGraph, XYDataset } from "@/hooks/use-graph/use-graph";
import { useStatefulRef } from "@/hooks/use-stateful-ref";
import { GraphUtils } from "@/utils/graph/graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { MathUtils } from "@/utils/math/math";
import { overlay } from "@/components/Overlay/Overlay";
import { useMouseCoordinates } from "@/hooks/use-mouse-coordinates";

type Props = {
	tooltip: (points: Array<XYDataset>, x: number | Date) => React.ReactNode;
	joints?: boolean;
};

const TOOLTIP_MARGIN = 20;
export const LinesTooltip = ({ tooltip, joints = true }: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>();
	const mouse = useMouseCoordinates(ref);
	const {
		data,
		domain,
		viewbox,
		interactions: { pinned, hovered },
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
			.flatMap((line) => {
				const point = line.data.find((d) => +d.x === +closest);
				if (!point) return [];
				return {
					...line,
					data: point,
				};
			})
			.filter(({ name }) => {
				if (pinned.length) return pinned.includes(name) && !hovered.includes(name);
				return true;
			})
			.sort((a, b) => +b.data.y - +a.data.y);
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

	return (
		<>
			<svg
				ref={ref}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				preserveAspectRatio={"none"}
				className={"h-full w-full [grid-area:graph] z-10 absolute overflow-visible"}
			>
				{closest !== undefined && (
					<line
						x1={xForValue(+closest)}
						x2={xForValue(+closest)}
						y1={0}
						y2={viewbox.y}
						stroke={"white"}
						fill={"white"}
						strokeWidth={4}
					/>
				)}
				{joints &&
					points?.map(({ data, stroke }, i) => {
						const xx = xForValue(+data.x);
						const yy = yForValue(data.y);
						return (
							<path
								key={i}
								stroke={stroke}
								fill={stroke}
								d={`M ${xx} ${yy} A 0 0 0 0 1 ${xx} ${yy}`}
								strokeWidth={"10"}
								strokeLinecap={"round"}
								vectorEffect={"non-scaling-stroke"}
							/>
						);
					})}
			</svg>
			{points && closest !== undefined && mouse && (
				<overlay.div ref={setTooltipRef} className={"absolute"} style={{ left, top }}>
					<div
						className={
							"rounded-sm border border-gray-600 bg-gray-600 shadow-[0_0_10px_0_rgba(0,0,0,0.5)] backdrop-blur-sm w-[250px] pb-[6px]"
						}
					>
						<div className="rounded-tl-[4px] rounded-tr-[4px] bg-gradient-to-b from-transparent to-gray-600 backdrop-blur-sm px-2.5 py-1.5 font-extrabold mb-1 text-white">
							{closest.toString()}
						</div>
						{points.map(({ name, data: { x, y }, stroke }, i) => {
							return (
								<div key={i} className={"flex items-center pr-2 text-white"}>
									<div style={{ color: stroke }} className="bg-current h-[14px] w-[14px] mx-2.5 rounded-full" />
									<div className="flex-1 text-[0.875rem] leading-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis mr-1">
										{name}
									</div>
									<div>{(+y).toFixed(2)}</div>
								</div>
							);
						})}
					</div>
				</overlay.div>
			)}
		</>
	);
};
