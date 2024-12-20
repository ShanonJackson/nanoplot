import React, { useId } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";
import { PathUtils } from "@/utils/path/path";
import { cx } from "@/utils/cx/cx";

const PADDING_PERCENT = 0.8;
const SCALARS = [0, 0.01, 2, 8, 32, 100];
const BREAKPOINT = 320;
const MIN_THRESHOLD = 4; // distance from center to render on graph when value is 0

type Props = {
	context?: GraphContext;
	loading?: boolean;
	className?: string;
};

export const Radar = ({ context, loading, className }: Props) => {
	// const segment = active && GraphUtils.isDistributionData(data) ? data.find((item) => item.name === active) : undefined;
	// const [hovered, setHovered] = useState<DistributionSegment | undefined>(segment);
	if (!context || !GraphUtils.isSegmentData(context.data)) return null;
	const { data, viewbox } = context;

	/*
		Empty can't be determined by all zeros (as in profile pages this is a valid state) that can't have N/A text.
		Empty can't be determined by length === 0 of data because then we wont be able to render the circles and lines.
		So empty is it's own state passed via parent.
	 */
	const isEmpty = !loading && context.data.length == 0;
	const hoveredSegment = ""; // fixme.
	const radius = (viewbox.x / 2) * PADDING_PERCENT;
	const maxScale = Math.max(...SCALARS);
	const axis = data.length;
	const angles = Array.from({ length: axis }, (_, index) => (index * 360) / axis);
	const rings = Array.from({ length: SCALARS.length }, (_, index) => 1 - index * (1 / (SCALARS.length - 1)));
	const edges = rings.toReversed();
	const dotColor = "white";
	const arcDegrees = 360 / axis;

	if (loading) return <Radar.Skeleton />;

	const scale = (value: number) => {
		if (value === 0) return MIN_THRESHOLD;
		if (value >= maxScale) return maxScale;

		const index = SCALARS.findIndex((num, index, arr) => {
			const next = arr[index + 1];
			return (next !== value && MathUtils.isBetween(num, next, value)) || next === undefined;
		});

		const output: [number, number] = [scalarProportion * index, scalarProportion * Math.min(SCALARS.length, index + 1)];

		return MathUtils.scale(value, [SCALARS[index], SCALARS[index + 1] || SCALARS[index]], output);
	};

	const scalarProportion = maxScale / (SCALARS.length - 1);
	const allZero = data.every(({ value }) => !Boolean(value));
	const scaledData = data.map((item) => ({ ...item, scaled: allZero ? 0 : scale(+item.value) }));

	const path = scaledData
		.map<[number, number]>((point, index) => {
			const { scaled } = point;
			const cartesian = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, (scaled * radius) / maxScale, index * arcDegrees);
			return [cartesian.x, cartesian.y];
		})
		.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
		.join(" ")
		.concat(" Z");

	const anglesPath = angles
		.map((angle) => {
			const position = PathUtils.polarToCartesian(viewbox.x / 2, viewbox.y / 2, radius, angle);
			return `M ${viewbox.x / 2} ${viewbox.y / 2} L ${position.x} ${position.y}`;
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
				(scaled * radius) / maxScale,
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
				<radialGradient id={`radarShapeFill_${fill}`} cx={viewbox.x / 2} cy={viewbox.y / 2} gradientUnits="userSpaceOnUse">
					<stop offset="30%" stopColor={fill} />
					<stop offset="50%" stopColor={fill} stopOpacity={0.7} />
					<stop offset="60%" stopColor={fill} stopOpacity={0.5} />
					<stop offset="70%" stopColor={fill} stopOpacity={0.4} />
					<stop offset="80%" stopColor={fill} stopOpacity={0.3} />
					<stop offset="100%" stopColor={fill} stopOpacity={0.2} />
				</radialGradient>
			</defs>
			<path d={PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius)} fill="#111111" />
			<path d={ringData} fillRule="evenodd" fill="#1b1b1b" />
			{isEmpty ? (
				<text x={viewbox.x / 2} y={viewbox.y / 2}>
					NA
				</text>
			) : (
				<>
					<path d={anglesPath} />
					<path d={markersPath} />
					{SCALARS.map((scalar, index) => {
						if (scalar === 0) return "0";
						if (index === SCALARS.length - 1) return `>${scalar}x`;
						return `${scalar}x`;
					}).map((multiplier, index) => (
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
			<g>
				<path stroke={fill} d={path} fill={radarShapeId} />
				{angles.map((point, index) => {
					return (
						<path
							key={index}
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
			</g>
		</svg>
	);
};

Radar.Skeleton = () => {
	return <div>loading</div>;
	const LOADING_DATA = [95, 80, 100, 90, 80, 90];
	const { x, y } = useGraph();

	const radius = (viewbox.x / 2) * PADDING_PERCENT;

	const rings = Array.from({ length: SCALARS.length }, (_, index) => 1 - index * (1 / (SCALARS.length - 1)));
	return (
		<Viewbox data-testid="radar-loading-state" preserve={true}>
			{rings.map((ring, index) => (
				<path
					key={`ring_${index}`}
					className={cx(styles.ring, index % 2 === 0 && styles.ringAlternate)}
					d={MathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, radius * ring)}
				>
					<animate
						attributeName="fill"
						values={index % 2 === 0 ? "#2b2b2b; #2b2b2b; #000000; #2b2b2b;" : "#111111; #1b1b1b; #000000; #111111;"}
						dur="2s"
						repeatCount="indefinite"
						calcMode="spline"
						keyTimes="0; 0.3; 0.6; 1"
						keySplines="0.15 0.25 0.25 0.15; 0.15 0.25 0.25 0.15; 0 0 0 0"
					/>
				</path>
			))}
			{LOADING_DATA.map((_, index) => (
				<path
					key={`angle_${index}`}
					d={`M ${viewbox.x / 2} ${viewbox.y / 2} L ${viewbox.x / 2} ${viewbox.y / 2 + radius}`}
					transform={`rotate(${(360 / LOADING_DATA.length) * index} ${viewbox.x / 2} ${viewbox.y / 2})`}
				/>
			))}
		</Viewbox>
	);
};
