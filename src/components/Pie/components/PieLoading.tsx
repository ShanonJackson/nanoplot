import { cx } from "@/utils/cx/cx";
import { PathUtils } from "@/utils/path/path";
import React, { useId } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = {
	donut: boolean;
	center: number;
	radius: number;
	className?: string;
};

export const PieLoading = ({ donut, center, radius, className }: Props) => {
	const { viewbox } = useGraph();
	const maskId = useId();
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			role="status"
			aria-busy={true}
			className={cx("h-full w-full pie__loading", className)}
		>
			{donut && (
				<mask id={maskId}>
					<rect width="100%" height="100%" fill="white" />
					<circle cx={CX} cy={CY} r={center} fill="black" />
				</mask>
			)}
			<path
				d={PathUtils.circleArc(CX, CY, radius)}
				className={"[filter:brightness(300%)] dark:[filter:brightness(100%)] pie__loading-path"}
				mask={`url(#${maskId})`}
			>
				<animate
					attributeName="fill"
					values="#2d2d2d; #3c3c3c; #2d2d2d; #2d2d2d;"
					dur="2s"
					repeatCount="indefinite"
					calcMode="spline"
					keyTimes="0; 0.3; 0.6; 1"
					keySplines="0.15 0.25 0.25 0.15; 0.15 0.25 0.25 0.15; 0 0 0 0"
					mask={`url(#${maskId})`}
				/>
			</path>
		</svg>
	);
};
