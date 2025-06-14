import React, { useId } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { RadarSkeleton } from "./components/RadarSkeleton";
import { MathUtils, scale } from "../../utils/math/math";
import { cx } from "../../utils/cx/cx";
import { PathUtils } from "../../utils/path/path";

const PADDING_PERCENT = 0.8;
const MIN_THRESHOLD = 4; // distance from center to render on graph when value is 0

type Props = {
	loading?: boolean;
	scalars?: number[];
	className?: string;
	labels?: boolean;
};

export const Radar = ({ scalars = [0, 20, 40, 60, 80, 100], labels = true, loading, className }: Props) => {
	const { data, viewbox, colors } = useGraph();
	const pointGlowId = useId();
	const radarDotId = useId();
	const radarShapeId = useId();

	if (!GraphUtils.isXYData(data)) return null;

	const MAX_SCALE = Math.max(...scalars);
	const isEmpty = !loading && data.length == 0;
	const radius = (viewbox.x / 2) * PADDING_PERCENT;
	const categories = new Set(data.flatMap(({ data }) => data.map(({ x }) => x.toString())));
	const points = Array.from(categories);
	const axis = categories.size;
	const angles = Array.from({ length: axis }, (_, index) => (index * 360) / axis);
	const rings = Array.from({ length: scalars.length }, (_, index) => 1 - index * (1 / (scalars.length - 1)));
	const edges = rings.toReversed();
	const arcDegrees = 360 / axis;
	const proportion = MAX_SCALE / (scalars.length - 1);

	if (loading) return <RadarSkeleton radius={radius} rings={rings} className={className} />;

	const scaleValue = (value: number) => {
		if (value === 0) return MIN_THRESHOLD;
		if (value >= MAX_SCALE) return MAX_SCALE;
		const index = scalars.findIndex((num, index, arr) => {
			const next = arr[index + 1];
			return (next !== value && MathUtils.isBetween(value, num, next)) || next === undefined;
		});
		const output: [number, number] = [proportion * index, proportion * Math.min(scalars.length, index + 1)];
		return scale(value, [scalars[index], scalars[index + 1] || scalars[index]], output);
	};

	return (
		<>
			<svg className={cx("h-full w-full", className)} viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}>
				<filter id={pointGlowId} filterUnits="userSpaceOnUse">
					<feDropShadow
						dx="0"
						dy="0"
						stdDeviation="20"
						floodColor="white"
						floodOpacity="1"
						className={"radar__data-point-glow"}
					/>
				</filter>
				<radialGradient id={radarDotId}>
					<stop offset="30%" stopColor={"white"} stopOpacity={0.3} />
					<stop offset="50%" stopColor={"white"} stopOpacity={0.2} />
					<stop offset="60%" stopColor={"white"} stopOpacity={0.15} />
					<stop offset="70%" stopColor={"white"} stopOpacity={0.08} />
					<stop offset="80%" stopColor={"white"} stopOpacity={0.06} />
					<stop offset="100%" stopColor={"white"} stopOpacity={0.03} />
				</radialGradient>
				<path
					d={PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius)}
					className={"radar__ring-odd fill-[#efefef] dark:fill-[#111111]"}
				/>
				<path
					d={rings
						.slice(0, isEmpty ? 2 : Infinity)
						.map((ring) => PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius * ring))
						.join(" ")}
					fillRule="evenodd"
					className={
						"radar__ring-even fill-[#dfdfdf] dark:fill-[#1b1b1b] [vector-effect:non-scaling-stroke] stroke-1 stroke-gray-300 dark:stroke-[#2d2d2d]"
					}
				/>
				{isEmpty ? (
					<text x={viewbox.x / 2} y={viewbox.y / 2}>
						NA
					</text>
				) : (
					<>
						<path
							d={angles
								.map((angle) => {
									const { x, y } = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle);
									return `M ${viewbox.x / 2} ${viewbox.y / 2} L ${x} ${y}`;
								})
								.join(" ")}
						/>
						<path
							d={rings
								.map((ring) => {
									const x = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius * ring, 90).x;
									const y = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, 90).y;
									return `M ${x} ${y} L ${x} ${y + viewbox.y / 100}`;
								})
								.join(" ")}
						/>
						{scalars
							.map((scalar, index) => {
								if (scalar === 0) return "0";
								if (index === scalars.length - 1) return `>${scalar}x`;
								return `${scalar}x`;
							})
							.map((multiplier, index) => (
								<text
									key={index}
									x={PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius * edges[index], 90).x}
									y={PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, 90).y + 135}
									className={"radar__tick-label dark:fill-gray-400 [font-size-adjust:0.2]"}
								>
									{multiplier}
								</text>
							))}
					</>
				)}
				{data
					.map((item) => ({
						...item,
						data: item.data
							.toSorted((a, b) => points.indexOf(a.x.toString()) - points.indexOf(b.x.toString()))
							.map(({ y }) => scaleValue(+y)),
					}))
					.map(({ data, stroke, fill }, i) => {
						const glow = data
							.filter((scaled) => Boolean(scaled))
							.map((scaled, index) => {
								const { x: cx, y: cy } = PathUtils.polarToCartesian(
									viewbox.x / 2,
									viewbox.y / 2,
									(scaled * radius) / MAX_SCALE,
									index * arcDegrees,
								);
								const r = viewbox.x / 100;

								return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
							})
							.join(" ");

						const path = data
							.map((scaled, index) =>
								PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, (scaled * radius) / MAX_SCALE, index * arcDegrees),
							)
							.map(({ x, y }, i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
							.join(" ")
							.concat(" Z");

						const filled = fill ?? stroke ?? colors[i] ?? colors.at(-1);
						return (
							<React.Fragment key={i}>
								<radialGradient id={radarShapeId + i} cx={viewbox.x / 2} cy={viewbox.y / 2} gradientUnits="userSpaceOnUse">
									<stop offset="30%" stopColor={filled} />
									<stop offset="50%" stopColor={filled} stopOpacity={0.7} />
									<stop offset="60%" stopColor={filled} stopOpacity={0.5} />
									<stop offset="70%" stopColor={filled} stopOpacity={0.4} />
									<stop offset="80%" stopColor={filled} stopOpacity={0.3} />
									<stop offset="100%" stopColor={filled} stopOpacity={0.2} />
								</radialGradient>
								<path
									d={glow}
									strokeOpacity="0"
									fillOpacity={0.5}
									filter={`url(#${pointGlowId})`}
									className={"radar__data-point"}
								/>
								<path
									stroke={stroke}
									d={path}
									fill={`url(#${radarShapeId + i}`}
									className={"radar__data-fill stroke-[10] [fill-opacity:0.7]"}
								/>
							</React.Fragment>
						);
					})}
				{labels &&
					angles.map((angle, i) => {
						/* Labels and dots on outer ring */
						const x1 = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle).x;
						const y1 = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle).y;
						const labelX = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius * 1.075, angle).x;
						const labelY = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius * 1.075, angle).y;
						const side = (() => {
							const cx = viewbox.x / 2;
							const cy = viewbox.y / 2;
							if (x1 > cx && y1 < cy) return "top-right";
							if (x1 < cx && y1 < cy) return "top-left";
							if (x1 < cx && y1 > cy) return "bottom-left";
							if (x1 > cx && y1 > cy) return "bottom-right";
							if (x1 === cx && y1 < cy) return "top";
							return "bottom";
						})();
						return (
							<React.Fragment key={i}>
								<text
									x={labelX}
									y={labelY}
									fontSize={"50px"}
									className={cx(
										"radar__axis-label dark:fill-gray-400 [font-size-adjust:0.12]",
										side === "top" && "[dominant-baseline:middle] [text-anchor:middle]",
										side === "top-right" && "[dominant-baseline:hanging] [text-anchor:start]",
										side === "top-left" && "[dominant-baseline:hanging] [text-anchor:end]",
										side === "bottom-right" && "[dominant-baseline:middle] [text-anchor:start]",
										side === "bottom-left" && "[dominant-baseline:middle] [text-anchor:end]",
										side === "bottom" && "[dominant-baseline:hanging] [text-anchor:middle]",
									)}
								>
									{points[i]}
								</text>
								<circle cx={x1} cy={y1} r={viewbox.x * 0.005} className={"radar__axis-dot fill-gray-500 dark:fill-white"} />
							</React.Fragment>
						);
					})}
				{angles.map((point, i) => {
					return (
						<path
							key={i}
							className={
								"radar__wedge [vector-effect:non-scaling-stroke] dark:fill-white [fill-opacity:0] [stroke-opacity:0] hover:[fill-opacity:0.2]"
							}
							d={
								PathUtils.describeArc(
									viewbox.x / 2,
									viewbox.y / 2,
									radius,
									point - arcDegrees / 2,
									point + arcDegrees / 2,
								) + ` L ${viewbox.x / 2} ${viewbox.x / 2} Z`
							}
						/>
					);
				})}
			</svg>
		</>
	);
};
