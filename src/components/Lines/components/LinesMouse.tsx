"use client";

import { useMouseCoordinates } from "../../../hooks/use-mouse-coordinates";
import { MouseEvent, useRef } from "react";
import { useDatasets, useGraph, useIsZooming } from "../../../hooks/use-graph/use-graph";
import { tw } from "../../../utils/cx/cx";
import { Lines } from "../Lines";

type Props = {
	cross?: { x: true; y: true };
	joints?: boolean | { border: string };
	className?: string;
	datasets?: string[];
	onMove?: (e: MouseEvent<SVGSVGElement>, mouse: ReturnType<typeof useMouseCoordinates>) => void;
	onEnter?: (e: MouseEvent<SVGSVGElement>) => void;
	onLeave?: (e: MouseEvent<SVGSVGElement>) => void;
};

export const LinesMouse = ({ joints, datasets, onMove, onLeave, onEnter, className }: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const isZooming = useIsZooming();
	const context = useGraph();
	const { viewbox } = context;
	const dsets = useDatasets(datasets);
	const mouse = useMouseCoordinates(ref, { x: true, lazy: true });

	return (
		<svg
			ref={ref}
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={tw(
				"lines-mouse h-full w-full [grid-area:graph] absolute overflow-visible [backface-visibility:hidden]",
				isZooming && "block overflow-hidden",
				className,
			)}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onMouseMove={(e) => onMove?.(e, mouse)}
		>
			{mouse?.closest.x && joints && (
				<Lines.Joints
					context={context}
					at={{ x: mouse.closest.x }}
					border={typeof joints === "object" ? joints["border"] : undefined}
				/>
			)}
			{mouse?.closest.x &&
				joints &&
				dsets.map((dataset, i) => {
					return (
						<Lines.Joints
							context={dataset}
							at={{ x: mouse.closest.x }}
							border={typeof joints === "object" ? joints["border"] : undefined}
							key={i}
						/>
					);
				})}
			{mouse && (
				<>
					<line
						x1={0}
						y1={mouse.coordinates.y}
						x2={viewbox.x}
						y2={mouse.coordinates.y}
						stroke="currentColor"
						strokeDasharray={"4,4"}
						strokeWidth={10}
						className={"stroke-gray-200 dark:stroke-white"}
					/>
					<line
						x1={mouse.coordinates.x}
						y1={viewbox.y}
						x2={mouse.coordinates.x}
						y2={0}
						strokeDasharray={"6,6"}
						className={"stroke-gray-200 dark:stroke-white"}
						strokeWidth={5}
					/>
				</>
			)}
		</svg>
	);
};
