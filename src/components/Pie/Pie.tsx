import React from "react";
import { ReactNode, useId } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import { PathUtils } from "@/utils/path/path";
import { cx } from "@/utils/cx/cx";
import { ColorUtils } from "@/utils/color/color";
import { GraphUtils } from "@/utils/graph/graph";
import { overlay } from "../Overlay/Overlay";

type Props = {
	loading?: boolean;
	donut?: boolean;
	labels?: boolean;
	children?: ReactNode;
};

const X_SCALE = 3000;
const Y_SCALE = 3000;
const PADDING_PERCENT = 0.8;
export const Pie = ({ donut, labels = true, loading, children }: Props) => {
	const glowId = useId();
	const emptyId = useId();
	const context = useGraph();

	if (!context || !GraphUtils.isSegmentData(context.data)) return null;
	const { data } = context;

	const PIE_RADIUS = (X_SCALE / 3) * PADDING_PERCENT;
	const isSinglePie = data.length === 1;
	const total = data.reduce((sum, { value }) => sum + Number(value), 0);

	if (loading) {
		return (
			<svg
				viewBox={`0 0 3000 3000`}
				role="status"
				aria-busy={loading}
				className={cx(
					"h-full w-full",
					donut &&
						"mask-radial [mask-position:50%_50%] [mask-repeat:no-repeat] [mask-image:radial-gradient(circle,transparent_11%,black_11.1%)]",
				)}
			>
				<path
					d={PathUtils.circleArc(X_SCALE / 2, Y_SCALE / 2, PIE_RADIUS)}
					className={"[filter:brightness(300%)] dark:[filter:brightness(100%)]"}
				>
					<animate
						attributeName="fill"
						values="#2d2d2d; #3c3c3c; #2d2d2d; #2d2d2d;"
						dur="2s"
						repeatCount="indefinite"
						calcMode="spline"
						keyTimes="0; 0.3; 0.6; 1"
						keySplines="0.15 0.25 0.25 0.15; 0.15 0.25 0.25 0.15; 0 0 0 0"
					/>
				</path>
			</svg>
		);
	}

	if (!context.data.length) {
		return (
			<svg
				data-testid="pie-empty-state"
				role="img"
				viewBox="0 0 3000 3000"
				height="100%"
				width="100%"
				className={cx(
					donut &&
						"mask-radial [mask-position:50%_50%] [mask-repeat:no-repeat] [mask-image:radial-gradient(circle,transparent_11%,black_11.1%",
				)}
			>
				<path
					d="M 1500 1500 m 800, 1.9594348786357651e-13 a 800, 800 0 1,0 -1600, -3.9188697572715303e-13 a 800, 800 0 1,0 1600, 3.9188697572715303e-13"
					fill={`url(#${emptyId})`}
					className={"[filter:invert(1)] dark:[filter:invert(0)]"}
				/>
				<linearGradient id={emptyId} gradientTransform="rotate(90)">
					<stop offset="0%" stop-color="#3c3c3c"></stop>
					<stop offset="100%" stop-color="#3c3c3c" stop-opacity="0.2"></stop>
				</linearGradient>
			</svg>
		);
	}

	const paths = data
		.map((segment, i, segments) => ({
			...segment,
			id: segment.name ?? segment.name,
			value: Number(segment.value),
			stroke: segment.stroke ?? ColorUtils.colorFor(i, segments.length),
			fill:
				typeof segment.fill === "string" ? segment.fill : ColorUtils.colorFor(i, segments.length) /* boolean fill not supported */,
		}))
		.sort((a, b) => b.value - a.value)
		.map((segment, i, segments) => {
			return {
				...segment,
				previousTotalDegrees: segments
					.slice(0, i)
					.map(({ value }) => MathUtils.scale(value, total, 360))
					.reduce((sum, value) => sum + value, 180),
				degrees: MathUtils.scale(segment.value, total, 360),
			};
		})
		.map((segment, i, dataset) => {
			const startLabelLine = PathUtils.polarToCartesian(
				X_SCALE / 2,
				Y_SCALE / 2,
				PIE_RADIUS,
				segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
			);

			const collisionPosition = dataset
				.slice(0, i + 1)
				.map((segment) => {
					return {
						name: segment.name,
						position: PathUtils.polarToCartesian(
							X_SCALE / 2,
							Y_SCALE / 2,
							PIE_RADIUS * 1.2,
							segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
						),
					};
				})
				.filter((segment, i, segments) => {
					if (!segments[i - 1]) return false;
					const COLLISION_THRESHOLD = 0.15; /* 10% */
					const { y, x } = segment.position;
					const { y: nextY, x: nextX } = segments[i - 1].position;
					return (
						MathUtils.isBetween(nextY * (1 - COLLISION_THRESHOLD), nextY * (1 + COLLISION_THRESHOLD), y) &&
						MathUtils.isBetween(nextX * 0.7, nextX * 1.3, x)
					);
				})
				.map((segment) => segment.name)
				.findIndex((str) => segment.name === str);

			const isCollisionFlipped = collisionPosition > 4;
			const endLabelLine = PathUtils.polarToCartesian(
				X_SCALE / 2,
				Y_SCALE / 2,
				PIE_RADIUS * (1.2 + 0.1 * ((isCollisionFlipped ? collisionPosition - 4 : collisionPosition) + 1)),
				segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
			);
			const isRightAligned = isCollisionFlipped || MathUtils.scale(endLabelLine.x, X_SCALE, 100) > 50;

			const path = (
				<g className={"transform origin-center rotate-180 group"} key={i}>
					{labels && (
						<>
							<path
								className={`stroke-2 fill-transparent group-hover:stroke-[15] transform origin-center rotate-180`}
								key={segment.name}
								d={`M ${startLabelLine.x} ${startLabelLine.y} L ${endLabelLine.x} ${endLabelLine.y} ${
									isRightAligned ? "l 100 0" : "l -100 0"
								}`}
								stroke={segment.stroke}
							/>
							<g className={cx("text-7xl font-bold pointer-events-auto transform origin-center rotate-180")}>
								<text
									aria-label={`${segment.name}-label`}
									y={endLabelLine.y}
									x={endLabelLine.x}
									stroke={segment.stroke}
									fill={segment.fill}
									dx={isRightAligned ? 140 : -140}
									style={{ textAnchor: isRightAligned ? "start" : "end" }}
								>
									<tspan>{segment.name.length > 20 ? segment.name.slice(0, 20) + "..." : segment.name}</tspan>
									<tspan dx={25}>{+(Math.round(+(((segment.value / total) * 100).toFixed(1) + "e+2")) + "e-2")}%</tspan>
								</text>
							</g>
						</>
					)}
					<path
						className={cx(
							"transition-all duration-200 ease-in-out scale-100 origin-center pointer-events-auto",
							!donut && `group-hover:drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:scale-[1.02]`,
						)}
						d={
							PathUtils.describeArc(
								X_SCALE / 2,
								Y_SCALE / 2,
								PIE_RADIUS,
								segment.previousTotalDegrees,
								segment.previousTotalDegrees + segment.degrees,
							) + ` L ${X_SCALE / 2} ${X_SCALE / 2} Z`
						}
						fill={segment.fill}
						data-degrees={segment.degrees}
					/>
				</g>
			);
			return {
				id: segment.id,
				path,
			};
		});

	return (
		<>
			{donut && <overlay.div className="absolute inset-0 flex items-center justify-center">{children}</overlay.div>}
			{paths.map(({ path, id }, index) => {
				/* Each path is it's own SVG because z-index on hover is required so that shadows work. */
				return (
					<svg
						key={index}
						viewBox={`0 0 ${X_SCALE} ${Y_SCALE}`}
						role={"img"}
						className={cx(
							"transition-all duration-200 ease-in-out [grid-area:graph] pointer-events-none h-full w-full brightness-100 has-[path:hover]:z-[1] has-[path:hover]:[&_.label-path]:stroke-current has-[path:hover]:brightness-110",
							donut &&
								"mask-radial [mask-position:50%_50%] [mask-repeat:no-repeat] [mask-image:radial-gradient(circle,transparent_11%,black_11.1%)]",
						)}
					>
						<use xlinkHref={`#${glowId + id}`} filter={"blur(150px)"} opacity={0.5} scale={0.9} />
						<g id={glowId + id}>{path}</g>
					</svg>
				);
			})}
		</>
	);
};
