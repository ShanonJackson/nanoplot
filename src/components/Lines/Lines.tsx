import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { useGraph } from "../../hooks/use-graph/use-graph";
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
}
function mapDatapointsToCoordinates(
	datapoints: { x: number | Date; y: number | Date }[],
	domain: { x: Array<{ tick: number | Date; coordinate: number }>; y: Array<{ tick: number | Date; coordinate: number }> },
	viewbox: { x: number; y: number }
): { x: number; y: number }[] {
	// Optimized binary search (fastest implementation)
	function binarySearch(arr: { tick: number | Date; coordinate: number }[], value: number | Date): number {
		let low = 0, high = arr.length - 1;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if (arr[mid].tick < value) low = mid + 1;
			else high = mid;
		}
		return low;
	}
	
	const mappedCoordinates = new Array(datapoints.length);
	const xDomain = domain.x, yDomain = domain.y;
	const xViewbox = viewbox.x, yViewbox = viewbox.y;
	
	for (let i = 0; i < datapoints.length; i++) {
		const { x, y } = datapoints[i];
		
		// X Mapping
		const xIdx = binarySearch(xDomain, x);
		const x1 = xDomain[xIdx - 1] || xDomain[xIdx];
		const x2 = xDomain[xIdx] || xDomain[xIdx - 1];
		const xRatio = x1.tick === x2.tick ? 0 : (+x - +x1.tick) / (+x2.tick - +x1.tick);
		const mappedX = x1.coordinate + xRatio * (x2.coordinate - x1.coordinate) + xViewbox;
		
		// Y Mapping
		const yIdx = binarySearch(yDomain, y);
		const y1 = yDomain[yIdx - 1] || yDomain[yIdx];
		const y2 = yDomain[yIdx] || yDomain[yIdx - 1];
		const yRatio = y1.tick === y2.tick ? 0 : (+y - +y1.tick) / (+y2.tick - +y1.tick);
		const mappedY = y1.coordinate + yRatio * (y2.coordinate - y1.coordinate) + yViewbox;
		
		mappedCoordinates[i] = { x: mappedX, y: mappedY };
	}
	
	return mappedCoordinates;
}


export const Lines = ({ className, curve = "linear", joints, children, loading }: Props) => {
	const {
		interactions: { pinned, hovered },
		data,
		viewbox,
		domain,
		colors,
	} = useGraph();
	if (!GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
	
	console.time("map-all");
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
	console.timeEnd("map-all")

	
	if (loading) return <LinesLoading />;
	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={cx("lines h-full w-full [grid-area:graph] will-change-transform [transform:translateZ(0)]", className)}
		>
			{lines.map(({ id, stroke, data: points }, i) => {
				// Function to chunk the points into batches of 1000
				const chunkPoints = (points: Array<{ x: number; y: number }>, chunkSize: number) => {
					const chunks = [];
					for (let i = 0; i < points.length; i += chunkSize) {
						chunks.push(points.slice(i, i + chunkSize));
					}
					return chunks;
				};
				
				const pathChunks = chunkPoints(points, 1000); // Chunk the points into batches of 1000
				const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
				const filled = hovered.includes(id) || (pinned.includes(id) && !disabled);
				const identifier = id.replace(/[^a-zA-Z0-9]/g, "");
				
				return (
					<React.Fragment key={i}>
						{/* Gradient Rendering */}
						{filled && !disabled && (
							<linearGradient id={identifier} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={stroke} stopOpacity={"0.5"} />
								<stop offset="95%" stopColor={stroke} stopOpacity={"0"} />
							</linearGradient>
						)}
						
						{/* Render each chunk of the path */}
						{pathChunks.map((chunk, chunkIndex) => {
							const chunkPath = CurveUtils[curve](chunk); // Generate path for this chunk
							return (
								<Line
									key={`path-${i}-chunk-${chunkIndex}`}
									d={chunkPath}
									stroke={stroke}
									fill={"transparent"}
									className={cx(disabled && "lines__stroke stroke-black dark:stroke-white [stroke-opacity:0.1]")}
								/>
							);
						})}
						
						{/* Joints */}
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
									/>
								);
							})}
						
						{/* Filled Area */}
						{filled && points[0] && (
							<Line
								d={pathChunks[0] ? pathChunks[0].map(p => `M ${p.x} ${p.y}`).join(" ") + `L ${viewbox.x} ${viewbox.y} L 0 ${viewbox.y} L ${points[0].x} ${viewbox.y} Z` : ""}
								stroke={"transparent"}
								fill={`linear-gradient(to bottom, ${toRgb(stroke, 0.5)}, ${toRgb(stroke, 0)})`}
								strokeOpacity={0}
								className={"lines__fill"}
							/>
						)}
					</React.Fragment>
				);
			})}
			{children}
		</svg>
	);
};

Lines.Tooltip = LinesTooltip;
