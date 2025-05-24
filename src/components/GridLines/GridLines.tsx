import React from "react";
import { cx, tw } from "../../utils/cx/cx";
import { useGraph } from "../../hooks/use-graph/use-graph";

interface Props extends Omit<React.SVGAttributes<SVGSVGElement>, "className"> {
	trendline?: boolean;
	border?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
	className?:
		| string
		| {
				root?: string;
				vertical?: string;
				horizontal?: string;
				border?: string | { top?: string; left?: string; right?: string; bottom?: string };
		  };
}

export const GridLines = ({ border = true, horizontal = true, vertical = true, className }: Props) => {
	const context = useGraph();
	const { x, y } = context.viewbox;
	const { domain } = context;
	return (
		<svg
			viewBox={`0 0 ${x} ${y}`}
			className={cx(
				"[grid-area:graph] h-full w-full",
				typeof className === "string" && className,
				typeof className === "object" && className?.root,
			)}
			preserveAspectRatio="none"
		>
			{border &&
				[
					{ x1: 0, y1: 0, x2: x, y2: 0, side: "top" as const },
					{ x1: x, y1: 0, x2: x, y2: y, side: "right" as const },
					{ x1: x, y1: y, x2: 0, y2: y, side: "bottom" as const },
					{ x1: 0, y1: y, x2: 0, y2: 0, side: "left" as const },
				].map(({ x1, y1, x2, y2, side }, i) => (
					<line
						key={i}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className={tw(
							"stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__border",
							typeof className === "object" && typeof className.border === "object" && className.border[side],
							typeof className === "object" && className?.border,
						)}
					/>
				))}

			{horizontal &&
				domain.y.map(({ coordinate }) => {
					if ((coordinate === 0 || coordinate === y) && border) return null;
					return (
						<line
							key={coordinate}
							x1={0}
							y1={coordinate}
							x2={x}
							y2={coordinate}
							strokeWidth={1}
							vectorEffect="non-scaling-stroke"
							className={tw(
								"stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__horizontal",
								typeof className === "object" && className?.horizontal,
							)}
						/>
					);
				})}

			{vertical &&
				domain.x.map(({ coordinate }) => {
					if ((coordinate === 0 || coordinate === x) && border) return null;
					return (
						<line
							key={coordinate}
							x1={coordinate}
							y1={0}
							x2={coordinate}
							y2={y}
							strokeWidth={1}
							vectorEffect="non-scaling-stroke"
							className={tw(
								"stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__vertical",
								typeof className === "object" && className?.vertical,
							)}
						/>
					);
				})}
		</svg>
	);
};
