"use client";
import React from "react";
import { tw } from "../../../utils/cx/cx";
import { useGraph, useIsZooming } from "../../../hooks/use-graph/use-graph";
import { ComponentProps, useRef, useState } from "react";
import { LinesTooltip } from "./LinesTooltip";
import { HydrateContext } from "../../HydrateContext/HydrateContext";

const LinesTooltipZoneComponent = (props: Omit<ComponentProps<typeof LinesTooltip>, "zoneRef">) => {
	const ref = useRef<SVGSVGElement>(null);
	const isZooming = useIsZooming();
	const { viewbox } = useGraph();
	const [inside, setInside] = useState(false);
	return (
		<svg
			ref={ref}
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={tw(
				"lines-tooltip h-full w-full [grid-area:graph] absolute overflow-visible [backface-visibility:hidden]",
				isZooming && "block overflow-hidden",
			)}
			onMouseEnter={() => setInside(true)}
			onMouseLeave={() => setInside(false)}
		>
			{inside && <LinesTooltip {...props} zoneRef={ref} />}
		</svg>
	);
};

export const LinesTooltipZone = HydrateContext(LinesTooltipZoneComponent);
