import React from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { Segment } from "./Sunburst";

const RING_COUNT = 5;
const RING_DEGREES = 360 / RING_COUNT;

export const SunburstLoading = () => {
	const { viewbox } = useGraph();

	return (
		<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} className="h-full w-full animate-spin">
			{[...Array(RING_COUNT)].map((_, i) => (
				<Segment
					key={i}
					degrees={i * RING_DEGREES}
					previousDegrees={i * RING_DEGREES}
					ring={i}
					stroke="currentColor"
					className={"animate-pulse fill-[#dfdfdf] dark:fill-[#2d2d2d]  "}
				/>
			))}
		</svg>
	);
};
