import React from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = {
	className?: string;
};

const random = (seed: number) => {
	let value = seed;
	return () => {
		value = (value * 9301 + 49297) % 233280;
		return value / 233280;
	};
};

const SEED = 15; // You can change this base to get different but consistent patterns
export const ScatterLoading = ({ className }: Props) => {
	const context = useGraph();
	const { x, y } = context.viewbox;
	const rand = random(SEED);
	const path = Array.from({ length: 100 }, () => {
		const factor = rand();
		const offsetX = (rand() - 0.5) * 0.2 * x;
		const offsetY = (rand() - 0.5) * 0.2 * y;
		return {
			cx: (1 - factor) * x + offsetX,
			cy: factor * y + offsetY,
		};
	});

	return (
		<div className="relative [grid-area:graph] h-full w-full">
			<svg
				viewBox={`0 0 ${x} ${y}`}
				className={`h-full w-full absolute inset-0 scatter__skeleton ${className}`}
				preserveAspectRatio="none"
			>
				<path
					d={path.map(({ cx, cy }) => `M ${cx} ${cy} L ${cx} ${cy}`).join(" ")}
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
