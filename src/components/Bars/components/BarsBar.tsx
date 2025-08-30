import { Rect } from "./Rect";
import { cx } from "../../../utils/cx/cx";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";

type Props = {
	x: number | string | Date | "auto";
	y: number | string | Date | "auto";
	fill?: string;
	stroke?: string;
	/*
	 * Size of the bar as percentage 0-100
	 */
	size?: number;
	anchor?: number;
	horizontal?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	className?: string;
};

export const BarsBar = ({ x, y, fill, stroke, size = 100, horizontal, onMouseEnter, onMouseLeave, className }: Props) => {
	const context = useGraph();
	const xCoordinateFor = CoordinatesUtils.xCoordinateFor(context);
	const yCoordinateFor = CoordinatesUtils.yCoordinateFor(context);
	const x1 = x === "auto" ? context.viewbox.x : xCoordinateFor(x);
	const y1 = y === "auto" ? context.viewbox.y : yCoordinateFor(y);
	if (!GraphUtils.isXYData(context.data)) return null;
	const BAR_SIZE = Math.floor(context.viewbox.x / context.domain.x.length) * (size / 100);

	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			className={cx("bars-bar [grid-area:graph] h-full w-full bars", className)}
			preserveAspectRatio={"none"}
		>
			<Rect
				x1={horizontal ? 0 : x1 - BAR_SIZE / 2}
				x2={horizontal ? x1 : x1 + BAR_SIZE / 2}
				y1={horizontal ? y1 - BAR_SIZE / 2 : 0}
				y2={horizontal ? y1 + BAR_SIZE / 2 : y1}
				fill={fill}
				stroke={stroke}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		</svg>
	);
};
