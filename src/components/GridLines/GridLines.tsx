import React from "react";
import { cx } from "../../utils/cx/cx";
import { useGraph } from "../../hooks/use-graph/use-graph";

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
		<svg viewBox={`0 0 ${x} ${y}`} className={cx("[grid-area:graph] h-full w-full", className)} preserveAspectRatio="none">
			{border && (
				<>
					<line
						x1={0}
						y1={0}
						x2={x}
						y2={0}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__border"
					/>
					<line
						x1={x}
						y1={0}
						x2={x}
						y2={y}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__border"
					/>
					<line
						x1={x}
						y1={y}
						x2={0}
						y2={y}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__border"
					/>
					<line
						x1={0}
						y1={y}
						x2={0}
						y2={0}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__border"
					/>
				</>
			)}

			{horizontal &&
				domain.y.map(({ coordinate }) => (
					<line
						key={coordinate}
						x1={0}
						y1={coordinate}
						x2={x}
						y2={coordinate}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__horizontal"
					/>
				))}

			{vertical &&
				domain.x.map(({ coordinate }) => (
					<line
						key={coordinate}
						x1={coordinate}
						y1={0}
						x2={coordinate}
						y2={y}
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
						className="stroke-gray-200 dark:stroke-dark-priority-100 dark:stroke-dark-priority-100 grid-lines__vertical"
					/>
				))}
		</svg>
	);
};
