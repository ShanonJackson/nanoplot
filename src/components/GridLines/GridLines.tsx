import { GraphContext } from "@/export";
import React from "react";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	context?: GraphContext;
	trendline?: boolean;
	border?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
	strokeWidth?: number;
}

export default function GridLines({ context, border, horizontal, vertical, strokeWidth = 25, children }: Props) {
	if (!context) return null;

	const { x, y } = context.viewbox;
	const { domain } = context;
	return (
		<svg viewBox={`0 0 ${x} ${y}`} className={"h-full w-full"} preserveAspectRatio={"none"}>
			{border && (
				<path
					d={`M 0 0 L ${x} 0 M 0 0 L 0 ${y} M ${x} 0 L ${x} ${y} M ${x} ${y} L ${0} ${y}`}
					strokeWidth={2}
					vectorEffect={"non-scaling-stroke"}
					className="stroke-foreground"
				/>
			)}
			{horizontal && (
				<path
					d={domain.y.map(({ coordinate }) => `M 0 ${coordinate} L ${x} ${coordinate}`).join(" ")}
					strokeWidth={(2 * strokeWidth) / 100}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 7"
					className="stroke-foreground"
				/>
			)}
			{vertical && (
				<path
					d={domain.x.map(({ coordinate }) => `M ${coordinate} 0 L ${coordinate} ${y}`).join(" ")}
					strokeWidth={(2 * strokeWidth) / 100}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 10"
					className="stroke-foreground"
				/>
			)}
		</svg>
	);
}
