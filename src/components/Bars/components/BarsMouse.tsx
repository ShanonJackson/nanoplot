"use client";

import { useMouseCoordinates } from "../../../hooks/use-mouse-coordinates";
import { MouseEvent, useRef } from "react";
import { useGraph, useIsZooming } from "../../../hooks/use-graph/use-graph";
import { tw } from "../../../utils/cx/cx";

type Props = {
	className?: string;
	onMove?: (
		mouse: null | {
			coordinates: SVGPoint;
			px: { x: number; y: number };
			closest: {
				datapoint: { x: Date | string | number; y: Date | string | number };
				tick: { x: string | number | Date; y: string | number | Date };
			};
		},
		e: MouseEvent<SVGSVGElement>,
	) => void;
	onEnter?: (e: MouseEvent<SVGSVGElement>) => void;
	onLeave?: (e: MouseEvent<SVGSVGElement>) => void;
};

export const BarsMouse = ({ onMove, onLeave, onEnter, className }: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const isZooming = useIsZooming();
	const { viewbox } = useGraph();
	const mouse = useMouseCoordinates(ref, { x: true, y: true, lazy: true });

	return (
		<svg
			ref={ref}
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={tw(
				"bars-mouse h-full w-full [grid-area:graph] absolute overflow-visible [backface-visibility:hidden]",
				isZooming && "block overflow-hidden",
				className,
			)}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onMouseMove={(e) => onMove?.(mouse, e)}
		/>
	);
};
