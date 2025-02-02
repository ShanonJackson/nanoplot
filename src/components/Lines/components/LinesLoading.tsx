import React from "react";
import { useGraph } from "../../../hooks/use-graph/use-graph";

export const LinesLoading = () => {
	const { viewbox } = useGraph();

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			height={"100%"}
			width={"100%"}
			preserveAspectRatio={"none"}
			className={"[grid-area:graph] stroke-gray-600"}
		>
			<path
				d={`M ${viewbox.x * 0.05} ${viewbox.y * 0.95} L ${viewbox.x * 0.2167} ${viewbox.y * 0.55} L ${viewbox.x * 0.35} ${viewbox.y * 0.75} L ${viewbox.x * 0.55} ${viewbox.y * 0.2833} L ${viewbox.x * 0.7167} ${viewbox.y * 0.5167} L ${viewbox.x * 0.95} ${viewbox.y * 0.05}`}
				strokeWidth={5}
				stroke={"stroke-gray-600"}
				strokeLinecap={"round"}
				fill="none"
				vectorEffect={"non-scaling-stroke"}
			>
				<animate
					attributeName="stroke"
					values="#4b5563; #374151; #4b5563; #4b5563;"
					dur="2s"
					repeatCount="indefinite"
					calcMode="spline"
					keyTimes="0; 0.3; 0.6; 1"
					keySplines="0.15 0.25 0.25 0.15; 0.15 0.25 0.25 0.15; 0 0 0 0"
				/>
			</path>
		</svg>
	);
};
