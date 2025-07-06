import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { InternalGraphContext, useDatasets, useGraph, useIsZooming } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { LinesLoading } from "./components/LinesLoading";
import { cx, tw } from "../../utils/cx/cx";
import { Line } from "./components/Line";
import { toRgb } from "../../utils/color/to-rgb";
import { LinesTooltipZone } from "./components/LinesTooltipZone";
import { LinesMouse } from "./components/LinesMouse";
import { LinesJoints } from "./components/LinesJoints";
import { LinesReference } from "./components/LinesReference";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	children?: ReactNode;
	curve?: keyof typeof CurveUtils;
	joints?: boolean | { border: string };
	loading?: boolean;
	datasets?: string[];
	context?: InternalGraphContext;
}

const chunk = (a: { x: number; y: number }[], s: number) => {
	const len = Math.ceil(a.length / s);
	const r = new Array(len);
	for (let i = 0, j = 0; i < a.length; i += s, j++) {
		r[j] = a.slice(i, i + s);
	}
	return r;
};

export const Lines = (props: Props) => {
	const { children, className, curve = "linear", joints, loading = false, datasets, context: ctx } = props;
	const graph = useGraph();
	const dsets = useDatasets(datasets);
	const isZooming = useIsZooming();
	const context = ctx ?? graph;
	const {
		data,
		viewbox,
		interactions: { pinned, hovered },
		colors,
	} = context;

	if (!GraphUtils.isXYData(data)) return null;
	const xyForDataset = CoordinatesUtils.xyCoordinatesForDataset(context);
	const lines = data.map((line, i) => {
		return {
			...line,
			id: String(line.id),
			stroke: line.stroke ?? colors[i] ?? colors.at(-1),
			fill: line.fill,
			coordinates: xyForDataset(line.data),
		};
	});

	if (loading) return <LinesLoading />;
	return (
		<>
			{dsets.map((dset, i) => {
				return <Lines {...props} datasets={undefined} context={dset} key={i} />; // recurse for each dataset.
			})}
			{/* Empty svg because lines lines need to be absolute to allow overflow-visible; But if it's absolute and the only child the Graph collapses in height. */}
			<svg className={"h-full w-full [grid-area:graph]"} viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} />
			<svg
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				preserveAspectRatio={"none"}
				className={tw(
					"absolute overflow-visible lines h-full w-full [grid-area:graph] will-change-transform [transform:translateZ(0)]",
					isZooming && "block overflow-hidden",
					className,
				)}
			>
				{lines.map(({ id, stroke, fill, coordinates: points }, i) => {
					/* chunking is for high-performance rendering, when chunked GPU performance can improve by 3x+ at cost of allocating more DOM nodes */
					const isChunkingCandidate = !stroke.includes("linear-gradient") && points.length > 5_000 && curve === "linear";
					const path = isChunkingCandidate ? "" : CurveUtils[curve](points);
					const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
					const isInteractiveFill = hovered.includes(id) || (pinned.includes(id) && !disabled);
					const identifier = id.replace(/[^a-zA-Z0-9]/g, "");

					return (
						<React.Fragment key={i}>
							{isInteractiveFill && !disabled && (
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
											className={cx(
												"lines__stroke",
												disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]",
											)}
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
									{isInteractiveFill && points[0] && (
										<Line
											d={
												path +
												`L ${points.at(-1)?.x ?? 0} ${viewbox.y} L 0 ${viewbox.y} L ${points[0].x} ${viewbox.y} Z`
											}
											stroke={"transparent"}
											fill={fill || `linear-gradient(to bottom, ${toRgb(stroke, 0.5)}, ${toRgb(stroke, 0)})`}
											strokeOpacity={0}
											className={"lines__fill"}
										/>
									)}
								</>
							)}
							{joints && (
								<Lines.Joints context={context} border={typeof joints === "object" ? joints["border"] : undefined} />
							)}
						</React.Fragment>
					);
				})}
				{children}
			</svg>
		</>
	);
};

Lines.Tooltip = LinesTooltipZone;
Lines.Mouse = LinesMouse;
Lines.Joints = LinesJoints;
Lines.Reference = LinesReference;
