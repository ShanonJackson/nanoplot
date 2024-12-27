import { cx } from "@/utils/cx/cx";
import React from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	trendline?: boolean;
	border?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
}

export const GridLines = ({ border, horizontal, vertical, className }: Props) => {
	const context = useGraph();
	const { x, y } = context.viewbox;
	const { domain } = context;
	return (
		<svg viewBox={`0 0 ${x} ${y}`} className={cx("[grid-area:graph] h-full w-full", className)} preserveAspectRatio={"none"}>
			{border && (
				<path
					d={`M 0 0 l${x} 0 l0 ${y} l${-x} 0 Z`}
					strokeWidth={1}
					vectorEffect={"non-scaling-stroke"}
					fill={"transparent"}
					className={cx("stroke-[#DFDFDF] dark:stroke-[#2D2D2D] grid-lines__border")}
				/>
			)}
			{horizontal && (
				<path
					d={domain.y.map(({ coordinate }) => `M 0 ${coordinate} L ${x} ${coordinate}`).join(" ")}
					strokeWidth={1}
					vectorEffect={"non-scaling-stroke"}
					//strokeDasharray="4, 7"
					className={cx("stroke-[#DFDFDF] dark:stroke-[#2D2D2D] grid-lines__horizontal")}
				/>
			)}
			{vertical && (
				<path
					d={domain.x.map(({ coordinate }) => `M ${coordinate} 0 L ${coordinate} ${y}`).join(" ")}
					strokeWidth={1}
					vectorEffect={"non-scaling-stroke"}
					//strokeDasharray="4, 10"
					className={cx("stroke-[#DFDFDF] dark:stroke-[#2D2D2D] grid-lines__vertical")}
				/>
			)}
		</svg>
	);
};
