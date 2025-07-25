import React, { ReactNode, useId } from "react";
import { InternalGraphContext, InternalSegmentDataset, useGraph } from "../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../utils/graph/graph";
import { PieLoading } from "./components/PieLoading";
import { PieEmpty } from "./components/PieEmpty";
import { MathUtils, scale } from "../../utils/math/math";
import { PathUtils } from "../../utils/path/path";
import { cx } from "../../utils/cx/cx";
import { overlay } from "../Overlay/Overlay";
import { ColorUtils } from "../../utils/color/color";
import { PieTooltip } from "./components/PieTooltip";

type Props = {
	/*
	 * If `true`, the pie chart will be rendered with a loading state.
	 */
	loading?: boolean;
	/*
	 * If `true`, the pie chart will be rendered as a donut chart.
	 * If a number is provided, it will be used as the radius of the donut in percentage (e.g., 50 for 50%).
	 */
	donut?: boolean | number /* radius as percentage */;
	/*
	 * Gap between the segments in `stroke-width` units.
	 */
	gap?: number;
	radius?: number;
	/*
	 * Position of the labels.
	 * - `true` will display labels outside the pie chart.
	 * - `false` will not display labels.
	 * - `{ position: "center"; display: (segment) => ReactNode }` requires a 1/1 aspect ratio on the pie.
	 * - `{ position: "outside"; display: (segment) => ReactNode }` will display labels outside the pie chart.
	 */
	labels?: boolean | { position: "outside" | "center"; display: (value: InternalSegmentDataset[number]) => ReactNode };
	/*
	 * If `true`, the pie chart will have a glow effect.
	 */
	glow?: boolean;
	/*
	 * Total value of the pie chart, used for percentage calculations.
	 * If not provided, it will be calculated from the dataset.
	 */
	total?: number;
	className?: string;
	onMouseEnter?: (segment: InternalSegmentDataset[number] & { degrees: number }, event: React.MouseEvent<SVGPathElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
	children?: ReactNode;
};

export const Pie = ({ glow, donut, labels, radius, gap = 0, total, loading, className, onMouseEnter, onMouseLeave, children }: Props) => {
	const glowId = useId();
	const maskId = useId();
	const gapId = useId();
	const { data, viewbox } = useGraph();

	if (!GraphUtils.isSegmentData(data)) return null;

	const isLabelsCentered = typeof labels === "object" && labels.position === "center";
	const isLabelsOutside = labels === true || (typeof labels === "object" && labels.position === "outside");
	const PIE_RADIUS = (() => {
		if (radius) return viewbox.x * (radius / 100);
		if (isLabelsOutside) return viewbox.x * (30 / 100);
		return viewbox.x * (50 / 100);
	})();
	const DONUT_RADIUS = viewbox.x * (typeof donut === "number" ? donut / 100 : 0.16); /* 16% */
	const ROTATION_DEGREES = 180; /* start everyone at 0:00 at top/right side */
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

	const dataset = data
		.map((segment) => ({
			...segment,
			value: Number(segment.value),
		}))
		.map((segment, i, segments) => {
			return {
				...segment,
				previousTotalDegrees: segments
					.slice(0, i)
					.map(({ value }) => scale(value, sum, 360))
					.reduce((sum, value) => sum + value, ROTATION_DEGREES),
				degrees: scale(segment.value, sum, 360),
			};
		});

	return (
		<>
			{donut && children && (
				<overlay.div className="pie__children absolute inset-0 flex items-center justify-center">{children}</overlay.div>
			)}
			{total !== undefined && (
				<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} className={cx("pie__track h-full w-full [grid-area:graph]", className)}>
					{donut && (
						<mask id={maskId}>
							<rect x={0} height={viewbox.y} y={0} width={viewbox.x} fill="white" />
							<circle cx={CX} cy={CY} r={DONUT_RADIUS} fill="black" />
						</mask>
					)}
					<path
						className={cx(`origin-center fill-gray-200 dark:fill-dark-priority-100`)}
						d={PathUtils.describeArc(CX, CX, PIE_RADIUS, 0, 360) + ` L ${CX} ${CX} Z`}
						mask={donut ? `url(#${maskId})` : undefined}
					/>
				</svg>
			)}
			{dataset.map((segment, i, dataset) => {
				const startLabelLine = PathUtils.polarToCartesian(
					CX,
					CX,
					PIE_RADIUS,
					segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + ROTATION_DEGREES,
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
								segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + ROTATION_DEGREES,
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
					segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + ROTATION_DEGREES,
				);
				const isRightAligned = isCollisionFlipped || scale(endLabelLine.x, viewbox.x, 100) > 50;

				const center = PathUtils.polarToCartesian(
					CX,
					CX,
					PIE_RADIUS / 2,
					segment.previousTotalDegrees + segment.degrees / (isSinglePie ? 0.75 : 2) + ROTATION_DEGREES,
				);

				const label = (() => {
					if (typeof labels === "object") return labels.display(segment);
					return (
						<>
							<tspan>{segment.name.length > 20 ? segment.name.slice(0, 20) + "..." : segment.name}</tspan>
							<tspan dx={25}>
								{new Intl.NumberFormat("en-US", {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2,
								}).format((segment.value / sum) * 100)}
								%
							</tspan>
						</>
					);
				})();

				return (
					<React.Fragment key={i}>
						{isLabelsCentered && (
							<overlay.div
								x={{ coordinate: center.x }}
								y={{ coordinate: center.y }}
								className={"z-[2] [transform:translate(-50%,-50%)]"}
							>
								{label}
							</overlay.div>
						)}
						<svg
							viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
							role={"img"}
							className={cx(
								"pie__segment-group group absolute overflow-visible transition-all duration-200 ease-in-out [grid-area:graph] pointer-events-none h-full w-full brightness-100 has-[path:hover]:z-[1] has-[path:hover]:[&_.label-path]:stroke-current has-[path:hover]:brightness-110",
								className,
							)}
						>
							{glow && <use xlinkHref={`#${glowId + segment.id}`} filter={"blur(150px)"} opacity={0.5} scale={0.9} />}
							<g mask={gap ? `url(#${gapId + i})` : undefined}>
								<g
									className={"transform origin-center"}
									id={glowId + segment.id}
									mask={donut ? `url(#${maskId})` : undefined}
								>
									<path
										data-pie-id={segment.id /* used for client component tooltip to hook into */}
										className={cx(
											`pie__segment transition-all duration-200 ease-in-out [scale:1] origin-center pointer-events-auto`,
											!donut && `group-hover:[filter:drop-shadow(0_0_50px_rgba(0,0,0,0.5))] hover:[scale:1.02]`,
										)}
										d={
											PathUtils.describeArc(
												CX,
												CX,
												PIE_RADIUS,
												segment.previousTotalDegrees + ROTATION_DEGREES,
												segment.previousTotalDegrees + ROTATION_DEGREES + segment.degrees,
											) + ` L ${CX} ${CX} Z`
										}
										fill={segment.fill}
										data-degrees={segment.degrees}
										onMouseEnter={onMouseEnter ? (event) => onMouseEnter(segment, event) : undefined}
										onMouseLeave={onMouseLeave}
									/>
								</g>
							</g>

							{isLabelsOutside && (
								<g className={"invisible @[width:400px]:!visible"}>
									<>
										<path
											className={"pie__label-connector stroke-[5] fill-transparent group-hover:stroke-[15]"}
											key={segment.name}
											d={`M ${startLabelLine.x} ${startLabelLine.y} L ${endLabelLine.x} ${endLabelLine.y} ${
												isRightAligned ? "l 100 0" : "l -100 0"
											}`}
											stroke={segment.fill}
										/>
										<g className={"pie__label text-7xl font-bold pointer-events-auto"}>
											<text
												aria-label={`${segment.name}-label`}
												y={endLabelLine.y}
												x={endLabelLine.x}
												stroke={segment.stroke}
												fill={String(segment.fill)}
												dx={isRightAligned ? 140 : -140}
												className={cx(
													"[--hundred-cqh:100cqh] [font-size:calc((13.5px_/_tan(atan2(var(--hundred-cqh),_1px)))*_3000)]",
													isRightAligned ? "[text-anchor:start]" : "[text-anchor:end]",
												)}
											>
												{label}
											</text>
										</g>
									</>
								</g>
							)}
							{donut && (
								<mask id={maskId}>
									<rect x={0} height={viewbox.y} y={0} width={viewbox.x} fill="white" />
									<circle cx={CX} cy={CY} r={DONUT_RADIUS} fill="black" />
								</mask>
							)}
							<mask id={gapId + i}>
								<rect x={0} height={viewbox.y} y={0} width={viewbox.x} fill="white" />
								{dataset
									.map((segment) => {
										const polarStart = PathUtils.polarToCartesian(
											CX,
											CX,
											PIE_RADIUS * 1.1,
											segment.previousTotalDegrees + ROTATION_DEGREES,
										);
										const polarEnd = PathUtils.polarToCartesian(
											CX,
											CX,
											PIE_RADIUS * 1.1,
											segment.previousTotalDegrees + segment.degrees + ROTATION_DEGREES,
										);
										return {
											start: polarStart,
											end: polarEnd,
										};
									})
									.map(({ start, end }, i) => {
										return (
											<React.Fragment key={i}>
												<path strokeWidth={gap} d={`M ${CX} ${CY} L ${start.x} ${start.y}`} stroke={"black"} />
												<path strokeWidth={gap} d={`M ${CX} ${CY} L ${end.x} ${end.y}`} stroke={"black"} />
											</React.Fragment>
										);
									})}
							</mask>
						</svg>
					</React.Fragment>
				);
			})}
		</>
	);
};

Pie.Tooltip = PieTooltip;
Pie.context = (ctx: InternalGraphContext, props: Props): InternalGraphContext => {
	const isLabelsOutside = props.labels === true || (typeof props.labels === "object" && props.labels.position === "outside");
	return {
		...ctx,
		attributes: {
			className: cx(ctx.attributes.className, isLabelsOutside && "[container-type:size_!important]"),
		},
		colors: ColorUtils.scheme.contrast,
	};
};
