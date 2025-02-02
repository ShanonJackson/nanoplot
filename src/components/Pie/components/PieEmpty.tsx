import React, { useId } from "react";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { cx } from "../../../utils/cx/cx";

type Props = {
	donut: boolean;
	center: number;
	className?: string;
};

export const PieEmpty = ({ donut, center, className }: Props) => {
	const { viewbox } = useGraph();
	const maskId = useId();
	const emptyId = useId();
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;
	return (
		<svg
			data-testid="pie-empty-state"
			role="img"
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			className={cx("h-full w-full pie__empty", className)}
		>
			<path
				d="M 1500 1500 m 800, 1.9594348786357651e-13 a 800, 800 0 1,0 -1600, -3.9188697572715303e-13 a 800, 800 0 1,0 1600, 3.9188697572715303e-13"
				fill={`url(#${emptyId})`}
				mask={donut ? `url(#${maskId})` : undefined}
				className={"[filter:invert(1)] dark:[filter:invert(0)] pie__empty-path"}
			/>
			<linearGradient id={emptyId} gradientTransform="rotate(90)">
				<stop offset="0%" stopColor="#3c3c3c" />
				<stop offset="100%" stopColor="#3c3c3c" stopOpacity="0.2" />
			</linearGradient>
			{donut && (
				<mask id={maskId}>
					<rect width="100%" height="100%" fill="white" />
					<circle cx={CX} cy={CY} r={center} fill="black" />
				</mask>
			)}
		</svg>
	);
};
