import { cx } from "@/utils/cx/cx";
import { PathUtils } from "@/utils/path/path";
import React from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = {
	className?: string;
	radius: number;
	rings: number[];
};

export const RadarSkeleton = ({ radius, rings, className }: Props) => {
	const { viewbox } = useGraph();
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			role="status"
			aria-busy={true}
			className={cx("h-full w-full radar__skeleton", className)}
		>
			<path
				d={PathUtils.circleArc(CX, CY, radius)}
				className={"animate-pulse fill-[#efefef] dark:fill-[#111111] radar__skeleton-background"}
			/>
			<path
				d={rings.map((ring) => PathUtils.circleArc(CX, CY, radius * ring)).join(" ")}
				fillRule="evenodd"
				strokeWidth="1"
				className={
					"animate-pulse fill-[#dfdfdf] dark:fill-[#1b1b1b] [vector-effect:non-scaling-stroke] stroke-1 stroke-gray-300 dark:stroke-[#2d2d2d] radar__skeleton-ring"
				}
			></path>
		</svg>
	);
};
