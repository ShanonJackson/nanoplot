import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { useDataset, useGraph } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { LinesLoading } from "./components/LinesLoading";
import { cx } from "../../utils/cx/cx";
import { LinesTooltip } from "./components/LinesTooltip";
import { Line } from "./components/Line";
import { toRgb } from "../../utils/color/to-rgb";
import { GradientUtils } from "../../utils/gradient/gradient";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	children?: ReactNode;
	curve?: keyof typeof CurveUtils;
	joints?: boolean;
	loading?: boolean;
	dataset?: string;
}

const chunk = (points: Array<{ x: number; y: number }>, size: number) => {
	const chunks = [];
	for (let i = 0; i < points.length; i += size) {
		chunks.push(points.slice(i, i + size));
	}
	return chunks;
};

export const Lines = ({ className, curve = "linear", joints, children, loading, dataset }: Props) => {
	const {
		interactions: { pinned, hovered },
		viewbox,
	} = useGraph();
	const { data, domain, colors } = useDataset(dataset);
	if (!GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

	const lines = data.map((line, i) => {
		return {
			...line,
			id: String(line.id),
			stroke: line.stroke ?? colors[i] ?? colors.at(-1),
			fill: String(line.fill),
			data: line.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
				xValue: xy.x,
				yValue: xy.y,
			})),
		};
	});

	if (loading) return <LinesLoading />;
	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={cx("lines h-full w-full [grid-area:graph] will-change-transform [transform:translateZ(0)]", className)}
		>
			{lines.map(({ id, stroke, data: points }, i) => {
				const isChunkingCandidate =
					!stroke.includes("linear-gradient") &&
					curve ===
						"linear"; /* chunking is for high-performance rendering, when chunked GPU performance can improve by 3x+ at cost of allocating more DOM nodes */
				const path = isChunkingCandidate ? "" : CurveUtils[curve](points);
				const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
				const filled = hovered.includes(id) || (pinned.includes(id) && !disabled);
				const identifier = id.replace(/[^a-zA-Z0-9]/g, "");

				return (
					<React.Fragment key={i}>
						{filled && !disabled && (
							<linearGradient id={identifier} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={stroke} stopOpacity={"0.5"} />
								<stop offset="95%" stopColor={stroke} stopOpacity={"0"} />
							</linearGradient>
						)}
						{isChunkingCandidate ? (
							chunk(points, 1000 /* chunk size determined by GPU benchmarking */).map((chunk, i) => {
								const chunkedPath = CurveUtils[curve](chunk);
								return (
									<Line
										key={i}
										d={chunkedPath}
										stroke={stroke}
										fill={"transparent"}
										className={cx("lines__stroke", disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]")}
									/>
								);
							})
						) : (
							<>
								<Line
									d={path}
									stroke={stroke}
									fill={"transparent"}
									className={cx("lines__stroke", disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]")}
								/>
								{filled && points[0] && (
									<Line
										d={
											path +
											`L ${points[points.length - 1]?.x ?? 0} ${viewbox.y} L 0 ${viewbox.y} L ${points[0].x} ${viewbox.y} Z`
										}
										stroke={"transparent"}
										fill={`linear-gradient(to bottom, ${toRgb(stroke, 0.5)}, ${toRgb(stroke, 0)})`}
										strokeOpacity={0}
										className={"lines__fill"}
									/>
								)}
							</>
						)}
						{joints &&
							points.map(({ x, y, xValue, yValue }, i) => {
								const color = stroke.includes("linear-gradient")
									? GradientUtils.gradientColorFromValue({
											viewbox,
											domain,
											point: { x: xValue, y: yValue },
											gradient: stroke,
											dataset: points,
										})
									: stroke;
								return (
									<path
										key={i}
										d={`M ${x} ${y} A 0 0 0 0 1 ${x} ${y}`}
										strokeWidth={7}
										stroke={color}
										strokeLinecap={"round"}
										strokeLinejoin={"round"}
										vectorEffect={"non-scaling-stroke"}
										className={"lines__joints"}
									/>
								);
							})}
					</React.Fragment>
				);
			})}
			{children}
		</svg>
	);
};

Lines.Tooltip = LinesTooltip;
