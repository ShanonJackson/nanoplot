"use client";

import { GraphUtils } from "../../../utils/graph/graph";
import { MathUtils } from "../../../utils/math/math";
import React, { ReactNode, useId, useMemo, useRef, useState } from "react";
import { CartesianDataset, useGraph } from "../../../hooks/use-graph/use-graph";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { Portal } from "../../Portal/Portal";
import { useBoundingBox } from "../../../hooks/use-bounding-box";
import { Tooltip } from "../../Tooltip/Tooltip";
import { HydrateContext } from "../../HydrateContext/HydrateContext";

type Point = Omit<CartesianDataset[number], "data"> & {
	data: CartesianDataset[number]["data"][number];
	coordinates: { x: number; y: number };
};
type Props = {
	tooltip: (point: Point) => ReactNode;
};

const ScatterTooltipComponent = ({ tooltip }: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const rect = useBoundingBox(ref) ?? { width: 0, height: 0, left: 0, top: 0 };
	const shadowId = useId();
	const { data, viewbox, domain } = useGraph();
	const [closest, setClosest] = useState<Point>();
	if (!GraphUtils.isXYData(data)) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

	// memo, just so we don't re-create this as we drag mouse around, but if it re-renders from parent that's fine.
	const points = useMemo(() => {
		return data.flatMap((d) => d.data.map(({ x, y }) => ({ ...d, coordinates: { x: xForValue(x), y: yForValue(y) }, data: { x, y } })));
	}, [data]);

	/*
		Before editing this file:
		- This code is structured in a way that prevents the GPU doing work recalculating (not re-rendering) the svg elements in sibling components.
		- If you change this code, make sure you open the profiler and ensure the tooltip can re-render at 120FPS while dragging the mouse around.
		- backface-visibility:hidden AND Portal (outside grid) trigger certain code paths in the engine that prevent other SVG's recalculating.
	 */
	return (
		<>
			<svg
				ref={ref}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				className={"[grid-area:graph] h-full w-full absolute overflow-visible [backface-visibility:hidden]"}
				preserveAspectRatio={"none"}
				onMouseMove={(e) => {
					const {
						left: graphLeft,
						top: graphTop,
						height: graphHeight,
						width: graphWidth,
					} = ref.current?.getBoundingClientRect() ?? { height: 0, width: 0, top: 0, left: 0 };
					const x1 = MathUtils.scale(e.nativeEvent.x - graphLeft, graphWidth, viewbox.x);
					const y1 = MathUtils.scale(e.nativeEvent.y - graphTop, graphHeight, viewbox.y);
					const closest = points.reduce((prev, curr) => {
						const current = Math.sqrt((x1 - curr.coordinates.x) ** 2 + (y1 - curr.coordinates.y) ** 2);
						return Math.sqrt((x1 - prev.coordinates.x) ** 2 + (y1 - prev.coordinates.y) ** 2) < current ? prev : curr;
					});
					if (!closest) return;
					const radiusX = MathUtils.scale(20, graphWidth, viewbox.x);
					const radiusY = MathUtils.scale(20, graphHeight, viewbox.y);
					const isMouseOntop = Math.abs(x1 - closest.coordinates.x) < radiusX && Math.abs(y1 - closest.coordinates.y) < radiusY;
					setClosest((c) => (isMouseOntop ? closest : undefined));
				}}
				onMouseLeave={() => setClosest(undefined)}
			>
				<Portal>
					<svg
						viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
						className={"[grid-area:graph] h-full w-full absolute overflow-visible"}
						style={{ width: rect.width, height: rect.height, left: rect.left, top: rect.top }}
						preserveAspectRatio={"none"}
					>
						<filter id={shadowId} filterUnits="userSpaceOnUse">
							<feGaussianBlur in="SourceAlpha" stdDeviation="35 100" result="blur" />
							<feFlood floodColor={closest?.stroke ?? "white"} floodOpacity="0" result="color">
								<animate attributeName="flood-opacity" from="0" to="1" dur="5s" fill="freeze" />
							</feFlood>
							<feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
						{closest && (
							<path
								d={`M ${closest?.coordinates.x} ${closest?.coordinates.y} h 0.001`}
								strokeWidth={12}
								stroke={"white"}
								strokeLinecap={"round"}
								strokeLinejoin={"round"}
								filter={`url(#${shadowId})`}
								vectorEffect={"non-scaling-stroke"}
							/>
						)}
						<Tooltip
							active={true}
							trigger={(ref) => {
								return (
									<path
										d={`M ${closest?.coordinates.x} ${closest?.coordinates.y} h 0.001`}
										strokeWidth={10}
										stroke={closest?.stroke}
										strokeLinecap={"round"}
										strokeLinejoin={"round"}
										filter={`url(#${shadowId})`}
										vectorEffect={"non-scaling-stroke"}
										ref={ref}
									/>
								);
							}}
							border={"rgb(45, 45, 45)"}
						>
							{closest && tooltip(closest)}
						</Tooltip>
					</svg>
				</Portal>
			</svg>
		</>
	);
};

export const ScatterTooltip = HydrateContext(ScatterTooltipComponent);
