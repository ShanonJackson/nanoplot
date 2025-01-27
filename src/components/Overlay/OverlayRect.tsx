import React from "react";
import { cx } from "@/utils/cx/cx";
import { GraphUtils } from "../../utils/graph/graph";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { MathUtils } from "../../utils/math/math";

interface OverlayRectProps extends React.HTMLAttributes<HTMLDivElement> {
	x1: Date | number;
	y1: number;
	x2: Date | number;
	y2?: number;
}

export const OverlayRect: React.FC<OverlayRectProps> = ({ x1, y1, x2, y2 = y1, className, children, ...rest }) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const viewbox = context.viewbox;

	const left = MathUtils.scale(Math.min(xForValue(x1), viewbox.x), viewbox.x, 100);
	const top = MathUtils.scale(Math.min(yForValue(y1), viewbox.y), viewbox.y, 100);
	const width = Math.abs(MathUtils.scale(xForValue(x2) - xForValue(x1), viewbox.x, 100));
	const height = Math.abs(MathUtils.scale(y2, viewbox.y, 100));

	return (
		<div
			{...rest}
			className={cx("[grid-area:graph] absolute bg-green-400/70 -z-10 text-black text-xs py-4", className)}
			style={{
				left: `${left}%`,
				bottom: `${top}%`,
				width: `${width}%`,
				height: `${height}%`,
			}}
		>
			{children}
		</div>
	);
};

