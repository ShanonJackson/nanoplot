import React from "react";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { MathUtils } from "../../utils/math/math";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";

interface OverlayRectProps extends React.HTMLAttributes<HTMLDivElement> {
	x1: Date | number | string;
	y1: Date | number | string;
	x2: Date | number | string;
	y2?: Date | number | string;
}

export const OverlayRect: React.FC<OverlayRectProps> = ({ x1, y1, x2, y2 = y1, className, children, ...rest }) => {
	const context = useGraph();

	const viewbox = context.viewbox;
	
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	
	
	const left = MathUtils.scale(Math.min(xForValue(x1), viewbox.x), viewbox.x, 100);
	const width = Math.abs(MathUtils.scale(xForValue(x2) - xForValue(x1), viewbox.x, 100));

	const top = MathUtils.scale(Math.min(yForValue(y1), viewbox.y), viewbox.y, 100);
	const height = Math.abs(MathUtils.scale(yForValue(y2) - yForValue(y1), viewbox.y, 100));

	return (
		<div
			{...rest}
			className={cx("[grid-area:graph] absolute", className)}
			style={{
				left: `${left}%`,
				top: `${top}%`,
				width: `${width}%`,
				height: `${height}%`,
			}}
		>
			{children}
		</div>
	);
};
