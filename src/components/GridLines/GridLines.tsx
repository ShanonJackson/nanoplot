import { GraphContext } from "@/export";
import { cx } from "@/utils/cx/cx";
import React from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	context?: GraphContext;
	trendline?: boolean;
	border?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
}

export default function GridLines({ context, border, horizontal, vertical, className }: Props) {
	if (!context) return null;

	const { x, y } = context.viewbox;
	const { domain } = context;
	return (
		<svg viewBox={`0 0 ${x} ${y}`} className={cx("[grid-area:graph] h-full w-full", className)} preserveAspectRatio={"none"}>
			{border && (
				<path
					d={`M 0 0 l${x} 0 l0 ${y} l${-x} 0 Z`}
					strokeWidth={3}
					vectorEffect={"non-scaling-stroke"}
					fill={"transparent"}
					className={cx("stroke-foreground grid-line__border")}
				/>
			)}
			{horizontal && (
				<path
					d={domain.y.map(({ coordinate }) => `M 0 ${coordinate} L ${x} ${coordinate}`).join(" ")}
					strokeWidth={3}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 7"
					className={cx("stroke-foreground grid-line__horizontal")}
				/>
			)}
			{vertical && (
				<path
					d={domain.x.map(({ coordinate }) => `M ${coordinate} 0 L ${coordinate} ${y}`).join(" ")}
					strokeWidth={3}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 10"
					className={cx("stroke-foreground grid-line__vertical")}
				/>
			)}
		</svg>
	);
}
