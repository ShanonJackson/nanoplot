import React, { ReactNode, useId } from "react";
import { GraphContext, useGraph } from "../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../utils/graph/graph";
import { PieLoading } from "./components/PieLoading";
import { PieEmpty } from "./components/PieEmpty";
import { MathUtils } from "../../utils/math/math";
import { PathUtils } from "../../utils/path/path";
import { cx } from "../../utils/cx/cx";
import { overlay } from "../Overlay/Overlay";
import { ColorUtils } from "../../utils/color/color";

type Props = {
	loading?: boolean;
	donut?: boolean | number /* radius as percentage */;
	labels?: boolean;
	glow?: boolean;
	total?: number;
	className?: string;
	children?: ReactNode;
};

export const Pie = ({ glow = true, donut, labels = true, total, loading, className, children }: Props) => {
	const glowId = useId();
	const maskId = useId();
	const { data, viewbox, colors } = useGraph();

	if (!GraphUtils.isSegmentData(data)) return null;

	const PIE_RADIUS = viewbox.x * 0.3; /* 30% */
	const DONUT_RADIUS = viewbox.x * (typeof donut === "number" ? donut / 100 : 0.16); /* 16% */
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;
	const isSinglePie = data.length === 1;
	const sum = total ?? data.reduce((sum, { value }) => sum + Number(value), 0);

	if (loading) {
		return <PieLoading donut={Boolean(donut)} center={DONUT_RADIUS} radius={PIE_RADIUS} className={className} />;
	}
	if (!data.length) {
		return <PieEmpty donut={Boolean(donut)} center={DONUT_RADIUS} className={className} />;
	}

	const paths = data
		.toSorted((a, b) => Number(b.value) - Number(a.value))
		.map((segment, i) => ({
			...segment,
			value: Number(segment.value),
			fill: colors[i],
		}))
		.map((segment, i, segments) => {
			return {
				...segment,
				previousTotalDegrees: segments
					.slice(0, i)
					.map(({ value }) => MathUtils.scale(value, sum, 360))
					.reduce((sum, value) => sum + value, 180),
				degrees: MathUtils.scale(segment.value, sum, 360),
			};
		})
		.map((segment, i, dataset) => {
			const startLabelLine = PathUtils.polarToCartesian(
				CX,
				CX,
				PIE_RADIUS,
				segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
			);
			const collisionPosition = dataset
				.slice(0, i + 1)
				.map((segment) => {
					return {
						name: segment.name,
						position: PathUtils.polarToCartesian(
							CX,
							CX,
							PIE_RADIUS * 1.2,
							segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
						),
					};
				})
				.filter((segment, i, segments) => {
					if (!segments[i - 1]) return false;
					const { y, x } = segment.position;
					const { y: nextY, x: nextX } = segments[i - 1].position;
					// collision threshold roughly 15%;
					return MathUtils.isBetween(y, nextY * 0.85, nextY * 1.15) && MathUtils.isBetween(x, nextX * 0.7, nextX * 1.3);
				})
				.map((segment) => segment.name)
				.findIndex((str) => segment.name === str);
			const isCollisionFlipped = collisionPosition > 2;
			const endLabelLine = PathUtils.polarToCartesian(
				CX,
				CX,
				PIE_RADIUS * (1.2 + 0.1 * ((isCollisionFlipped ? collisionPosition - 4 : collisionPosition) + 1)),
				segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + 180,
			);
			const isRightAligned = isCollisionFlipped || MathUtils.scale(endLabelLine.x, viewbox.x, 100) > 50;
			const label = labels && (
				<>
					<path
						className={`stroke-[5] fill-transparent group-hover:stroke-[15] transform origin-center [rotate:180deg] pie__segment-${segment.name}-path`}
						key={segment.name}
						d={`M ${startLabelLine.x} ${startLabelLine.y} L ${endLabelLine.x} ${endLabelLine.y} ${
							isRightAligned ? "l 100 0" : "l -100 0"
						}`}
						stroke={String(segment.fill)}
					/>
					<g
						className={cx(
							`text-7xl font-bold pointer-events-auto transform origin-center [rotate:180deg] pie__segment-${segment.name}-label`,
						)}
					>
						<text
							aria-label={`${segment.name}-label`}
							y={endLabelLine.y}
							x={endLabelLine.x}
							stroke={segment.stroke}
							fill={String(segment.fill)}
							dx={isRightAligned ? 140 : -140}
							className={cx("text-[93px]", isRightAligned ? "[text-anchor:start]" : "[text-anchor:end]")}
						>
							<tspan>{segment.name.length > 20 ? segment.name.slice(0, 20) + "..." : segment.name}</tspan>
							<tspan dx={25}>
								{new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(
									(segment.value / sum) * 100,
								)}
								%
							</tspan>
						</text>
					</g>
				</>
			);

			const path = (
				<g className={"transform origin-center [rotate:180deg]"} key={i}>
					<path
						className={cx(
							`transition-all duration-200 ease-in-out [scale:1] origin-center pointer-events-auto pie__segment-${segment.name}-path`,
							!donut && `group-hover:drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:[scale:1.02]`,
						)}
						d={
							PathUtils.describeArc(
								CX,
								CX,
								PIE_RADIUS,
								segment.previousTotalDegrees,
								segment.previousTotalDegrees + segment.degrees,
							) + ` L ${CX} ${CX} Z`
						}
						fill={String(segment.fill)}
						data-degrees={segment.degrees}
					/>
				</g>
			);
			return {
				id: segment.id,
				path,
				label,
			};
		});

	return (
		<>
			{donut && <overlay.div className="absolute inset-0 flex items-center justify-center">{children}</overlay.div>}
			<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} className={cx("h-full w-full [grid-area:graph]", className)}>
				<g className={"transform origin-center [rotate:180deg]"}>
					{donut && (
						<mask id={maskId}>
							<rect width="80%" height="80%" fill="white" />
							<circle cx={CX} cy={CY} r={DONUT_RADIUS} fill="black" />
						</mask>
					)}
					<path
						className={cx(`origin-center fill-gray-200 dark:fill-dark-priority-100`)}
						d={PathUtils.describeArc(CX, CX, PIE_RADIUS, 0, 360) + ` L ${CX} ${CX} Z`}
						mask={donut ? `url(#${maskId})` : undefined}
					/>
				</g>
			</svg>
			{paths.map(({ path, label, id }, i) => {
				return (
					<svg
						viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
						role={"img"}
						className={cx(
							"transition-all duration-200 ease-in-out [grid-area:graph] pointer-events-none h-full w-full brightness-100 has-[path:hover]:z-[1] has-[path:hover]:[&_.label-path]:stroke-current has-[path:hover]:brightness-110 pie__segment",
							className,
						)}
						key={i}
					>
						{glow && <use xlinkHref={`#${glowId + id}`} filter={"blur(150px)"} opacity={0.5} scale={0.9} />}
						<g className={"pie__slice group"}>
							<g className={`pie__segment-${id}`} id={glowId + id} mask={donut ? `url(#${maskId})` : undefined}>
								{path}
							</g>
							<g className={"transform origin-center rotate-180 invisible @[width:400px]:!visible "}>{label}</g>
						</g>
						{donut && (
							<mask id={maskId}>
								<rect width="80%" height="80%" fill="white" />
								<circle cx={CX} cy={CY} r={DONUT_RADIUS} fill="black" />
							</mask>
						)}
					</svg>
				);
			})}
		</>
	);
};

Pie.context = (ctx: GraphContext): GraphContext => {
	return {
		...ctx,
		colors: ColorUtils.scheme.contrast,
	};
};
