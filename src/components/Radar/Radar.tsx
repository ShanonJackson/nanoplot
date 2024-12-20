import React, { useId } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";
import { PathUtils } from "@/utils/path/path";
import { cx } from "@/utils/cx/cx";
import { RadarSkeleton } from "@/components/Radar/components/RadarSkeleton";

const PADDING_PERCENT = 0.8;
const MIN_THRESHOLD = 4; // distance from center to render on graph when value is 0

type Props = {
	context?: GraphContext;
	loading?: boolean;
	scalars?: number[];
	className?: string;
};

export const Radar = ({ context, scalars = [0, 20, 40, 60, 80, 100], loading, className }: Props) => {
	if (!context || !GraphUtils.isSegmentData(context.data)) return null;
	const { data, viewbox } = context;
	const isEmpty = !loading && context.data.length == 0;
	const radius = (viewbox.x / 2) * PADDING_PERCENT;
	const MAX_SCALE = Math.max(...scalars);
	const axis = data.length;
	const angles = Array.from({ length: axis }, (_, index) => (index * 360) / axis);
	const rings = Array.from({ length: scalars.length }, (_, index) => 1 - index * (1 / (scalars.length - 1)));
	const edges = rings.toReversed();
	const dotColor = "white";
	const arcDegrees = 360 / axis;
	const proportion = MAX_SCALE / (scalars.length - 1);
	const allZero = data.every(({ value }) => !Boolean(value));

	if (loading) return <RadarSkeleton />;

	const scale = (value: number) => {
		if (value === 0) return MIN_THRESHOLD;
		if (value >= MAX_SCALE) return MAX_SCALE;
		const index = scalars.findIndex((num, index, arr) => {
			const next = arr[index + 1];
			return (next !== value && MathUtils.isBetween(value, num, next)) || next === undefined;
		});
		const output: [number, number] = [proportion * index, proportion * Math.min(scalars.length, index + 1)];
		return MathUtils.scale(value, [scalars[index], scalars[index + 1] || scalars[index]], output);
	};

	const scaledData = data.map((item) => ({ ...item, scaled: allZero ? 0 : scale(+item.value) }));

	const path = scaledData
		.map(({ scaled }, index) =>
			PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, (scaled * radius) / MAX_SCALE, index * arcDegrees),
		)
		.map(({ x, y }, i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
		.join(" ")
		.concat(" Z");

	const anglesPath = angles
		.map((angle) => {
			const { x, y } = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle);
			return `M ${viewbox.x / 2} ${viewbox.y / 2} L ${x} ${y}`;
		})
		.join(" ");

	const markersPath = rings
		.map((ring) => {
			const xPosition = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius * ring, 90).x;
			const yPosition = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, 90).y;

			return `M ${xPosition} ${yPosition} 
				L ${xPosition} ${yPosition + viewbox.y / 100}`;
		})
		.join(" ");

	const ringData = rings
		.slice(0, isEmpty ? 2 : Infinity)
		.map((ring) => PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius * ring))
		.join(" ");

	const glowData = scaledData
		.filter(({ scaled }) => Boolean(scaled))
		.map(({ scaled }, index) => {
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

	const radarDotId = useId();
	const radarShapeId = useId();
	const fill = "#11ACAE";
	return (
		<svg className={cx("h-full w-full", className)} viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}>
			<defs>
				<filter id={`radarPointGlow`} filterUnits="userSpaceOnUse">
					<feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="white" floodOpacity="1" />
				</filter>
				<radialGradient id={radarDotId}>
					<stop offset="30%" stopColor={dotColor} stopOpacity={0.3} />
					<stop offset="50%" stopColor={dotColor} stopOpacity={0.2} />
					<stop offset="60%" stopColor={dotColor} stopOpacity={0.15} />
					<stop offset="70%" stopColor={dotColor} stopOpacity={0.08} />
					<stop offset="80%" stopColor={dotColor} stopOpacity={0.06} />
					<stop offset="100%" stopColor={dotColor} stopOpacity={0.03} />
				</radialGradient>
				<radialGradient id={radarShapeId} cx={viewbox.x / 2} cy={viewbox.y / 2} gradientUnits="userSpaceOnUse">
					<stop offset="30%" stopColor={fill} />
					<stop offset="50%" stopColor={fill} stopOpacity={0.7} />
					<stop offset="60%" stopColor={fill} stopOpacity={0.5} />
					<stop offset="70%" stopColor={fill} stopOpacity={0.4} />
					<stop offset="80%" stopColor={fill} stopOpacity={0.3} />
					<stop offset="100%" stopColor={fill} stopOpacity={0.2} />
				</radialGradient>
			</defs>
			<path d={PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius)} fill="#111111" />
			<path
				d={ringData}
				fillRule="evenodd"
				fill="#1b1b1b"
				className={"[vector-effect:non-scaling-stroke] stroke-1 stroke-[#2D2D2D]"}
			/>
			{isEmpty ? (
				<text x={viewbox.x / 2} y={viewbox.y / 2}>
					NA
				</text>
			) : (
				<>
					<path d={anglesPath} />
					<path d={markersPath} />
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
							>
								{multiplier}
							</text>
						))}
				</>
			)}
			<path d={glowData} strokeOpacity="0" fillOpacity={0.5} filter={`url(#radarPointGlow)`} />
			{!isEmpty &&
				angles.map((angle, index) => (
					<circle
						key={index}
						cx={PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle).x}
						cy={PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle).y}
						r={viewbox.x / 150}
						fill="white"
					/>
				))}
			<path stroke={fill} d={path} fill={`url(#${radarShapeId}`} className={"stroke-[10] [fill-opacity:0.7]"} />
			{angles.map((point, index) => {
				return (
					<path
						key={index}
						className={"[vector-effect:non-scaling-stroke] dark:fill-white [fill-opacity:0] [stroke-opacity:0]"}
						d={
							PathUtils.describeArc(viewbox.x / 2, viewbox.y / 2, radius, point - arcDegrees / 2, point + arcDegrees / 2) +
							` L ${viewbox.x / 2} ${viewbox.x / 2} Z`
						}
					/>
				);
			})}
		</svg>
	);
};
