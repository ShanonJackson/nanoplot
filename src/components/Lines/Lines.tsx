import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { InternalGraphContext, useDatasets, useGraph, useIsZooming } from "../../hooks/use-graph/use-graph";
import { CurveUtils, linearRange } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { ArrayUtils } from "../../utils/array";
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

const chunk = <T,>(array: T[], size: number): T[][] => {
	const len = array.length;
	const outLen = Math.ceil(len / size);
	const out = new Array(outLen);
	for (let i = 0, o = 0; o < outLen; o++, i += size) {
		const chunk = new Array(Math.min(size, len - i));
		for (let j = 0; j < chunk.length; j++) {
			chunk[j] = array[i + j];
		}
		out[o] = chunk;
	}
	return out;
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
	} = context;

	if (!GraphUtils.isXYData(data)) return null;
	const xyForDataset = CoordinatesUtils.xyCoordinatesForDataset(context);

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
				{data.map(({ id, stroke, fill, data: dps }, i) => {
					/* chunking is for high-performance rendering, when chunked GPU performance can improve by 3x+ at cost of allocating more DOM nodes */
					const isChunkingCandidate = !stroke.includes("linear-gradient") && dps.length > 5_000 && curve === "linear";
					const coordinates = isChunkingCandidate ? new Float32Array() : xyForDataset(dps);
					const path = isChunkingCandidate ? "" : CurveUtils[curve](coordinates!);
					const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
					const isInteractiveFill = hovered.includes(id) || (pinned.includes(id) && !disabled);
					// identifier used only when interactive fill is active

					return (
						<React.Fragment key={i}>
							{isInteractiveFill && !disabled && (
								<linearGradient id={id.replace(/[^a-zA-Z0-9]/g, "")} x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={stroke} stopOpacity={"0.5"} />
									<stop offset="95%" stopColor={stroke} stopOpacity={"0"} />
								</linearGradient>
							)}
							{isChunkingCandidate ? (
								(() => {
									const xy = xyForDataset(dps);
									const ranges = ArrayUtils.chunkIndices(dps.length, 2000);
									return (
										<g
											stroke={stroke}
											fill={"none"}
											className={cx(
												"lines__stroke",
												disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]",
											)}
											strokeWidth={2}
										>
											{ranges.map(([s, e], ci) => (
												<path key={ci} d={linearRange(xy, s, e)} vectorEffect={"non-scaling-stroke"} />
											))}
										</g>
									);
								})()
							) : (
								<>
									<Line
										d={path}
										stroke={stroke}
										fill={"transparent"}
										className={cx("lines__stroke", disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]")}
									/>
									{isInteractiveFill && coordinates[0] && (
										<Line
											d={
												path +
												`L ${coordinates.at(-2) ?? 0} ${viewbox.y} L 0 ${viewbox.y} L ${coordinates[0]} ${viewbox.y} Z`
											}
											stroke={"transparent"}
											fill={`linear-gradient(to bottom, ${toRgb(stroke, 0.5)}, ${toRgb(stroke, 0)})`}
											strokeOpacity={0}
											className={"lines__fill"}
										/>
									)}
								</>
							)}
							{/*{joints && (*/}
							{/*	<Lines.Joints context={context} border={typeof joints === "object" ? joints["border"] : undefined} />*/}
							{/*)}*/}
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
