import React from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = {
	className?: string;
};

export const ScatterSkeleton = ({ className }: Props) => {
	const context = useGraph();
	const { x, y } = context.viewbox;

	const randomPositions = Array.from({ length: 30 }, () => ({
		cx: Math.random() * x,
		cy: Math.random() * y,
	}));

	return (
		<div className="relative [grid-area:graph] h-full w-full">
			<svg
				viewBox={`0 0 ${x} ${y}`}
				className={`h-full w-full absolute inset-0 scatter__skeleton ${className} `}
				preserveAspectRatio="none"
			>
				<path
					d={randomPositions.map(({ cx, cy }) => `M ${cx} ${cy} L ${cx} ${cy}`).join(" ")}
					strokeWidth={10}
					strokeLinecap="round"
					strokeLinejoin="round"
					vectorEffect="non-scaling-stroke"
					className="animate-pulse z-10 stroke-gray-300 dark:stroke-[#2d2d2d] scatter__skeleton-dots"
				/>
			</svg>
		</div>
	);
};
