import React, { useId } from "react";
import { GraphContext } from "../../../hooks/use-graph/use-graph";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { GraphUtils } from "../../../utils/graph/graph";
import { MathUtils } from "../../../utils/math/math";
import { overlay } from "../../Overlay/Overlay";

const ALL_TIME_TREND_TEXT_WIDTH_PX = 82; /* hardcoded width, as calculated VIA DOM inspector */
const TEXT_WIDTH_PADDING = 15; // units of padding either side of text.
export const DemandScatterTrendLine = ({ context }: { context: GraphContext }) => {
	const { data } = context;
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const height = 385;
	const width = 1005;
	const maskId = useId();

	const TEXT_WIDTH_UNITS = MathUtils.scale(ALL_TIME_TREND_TEXT_WIDTH_PX, width ?? 0, context.viewbox.x);

	if (!GraphUtils.isXYData(data) || data.length === 0) return null;

	/* Translated from: https://study.com/learn/lesson/trend-line-formula-examples.html */
	const dataset = data.flatMap((d) => d.data.map(({ x: x1, y: y1 }) => ({ x: xForValue(+x1), y: yForValue(y1) })));
	const xAvg = dataset.reduce((acc, { x }) => acc + +x, 0) / dataset.length;
	const yAvg = dataset.reduce((acc, { y }) => acc + y, 0) / dataset.length;
	const m =
		dataset.reduce((acc, { x, y }) => acc + (+x - xAvg) * (y - yAvg), 0) / dataset.reduce((acc, { x }) => acc + (+x - xAvg) ** 2, 0);
	const b = yAvg - m * xAvg;

	const x1 = 0;
	const y1 = m * x1 + b;
	const x2 = context.viewbox.x;
	const y2 = m * x2 + b;

	return (
		<>
			<mask id={maskId} maskUnits="userSpaceOnUse">
				<rect x="0" y="0" height={context.viewbox.y} width={context.viewbox.x} fill="white" />
				<rect
					x={context.viewbox.x / 2 - (TEXT_WIDTH_UNITS / 2 + TEXT_WIDTH_PADDING)}
					width={TEXT_WIDTH_UNITS + TEXT_WIDTH_PADDING * 2}
					y={0}
					height={context.viewbox.y}
					fill="black"
				/>
			</mask>
			<path d={`M 0 ${y1} L ${x2} ${y2}`} mask={`url(#${maskId})`} className={"styles.dots"} />
			<overlay.div>
				<div
					style={{
						offsetPath: `path("M 0 ${MathUtils.scale(y1, context.viewbox.y, height)} L ${width} ${MathUtils.scale(
							y2,
							context.viewbox.y,
							height,
						)}")`,
					}}
					className={"styles.base"}
				>
					TIMELINE TREND
				</div>
			</overlay.div>
		</>
	);
};
