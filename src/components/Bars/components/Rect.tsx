import React, { JSX, useId } from "react";
import { LinearGradient } from "../../LinearGradient/LinearGradient";
import { PathUtils } from "../../../utils/path/path";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { MathUtils } from "../../../utils/math/math";

type Props = JSX.IntrinsicElements["rect"] & {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
	radius?: number; // in degrees
	horizontal?: boolean;
	glow?: boolean;
};

export const Rect = ({ x1, y1, x2, y2, radius, glow, horizontal = false, ...rest }: Props) => {
	const fillId = useId();
	const strokeId = useId();
	const clip = useId();
	const clipId = useId();
	const glowId = useId();

	const isFillGradient = rest.fill?.includes("gradient");
	const isFillMasked = rest.fill?.includes("mask");
	const isGradientStroke = rest.stroke?.includes("gradient");
	const path = PathUtils.borderRadius({ x: x1, y: y1 }, { x: x2, y: y2 }, radius ?? 0, horizontal);
	return (
		<>
			{isFillGradient && rest.fill && <LinearGradient id={fillId} gradient={rest.fill} />}
			{isGradientStroke && rest.stroke && <LinearGradient id={strokeId} gradient={rest.stroke} />}
			<path
				id={clipId}
				d={path}
				fill={isFillGradient ? `url(#${fillId})` : rest.fill}
				stroke={isGradientStroke ? `url(#${strokeId})` : rest.stroke}
			/>
			<clipPath id={clip}>
				<use xlinkHref={"#" + clipId} />
			</clipPath>
			{glow && (
				<>
					<use xlinkHref={`#${glowId}`} filter={"blur(45px)"} opacity={0.5} />
					<g id={glowId}>
						<path
							fill={isFillGradient ? `url(#${fillId})` : rest.fill}
							stroke={"transparent"}
							d={path}
							vectorEffect={"non-scaling-stroke"}
							className={rest.className}
							strokeWidth={5}
						/>
					</g>
				</>
			)}
			{isFillMasked ? (
				<rect {...rest} x={x1} y={0} width={x2 - x1} height={"100%"} fill={`url(#${fillId})`} clipPath={`url(#${clip})`} />
			) : (
				<path
					{...rest}
					fill={isFillGradient ? `url(#${fillId})` : rest.fill}
					stroke={isGradientStroke ? `url(#${strokeId})` : rest.stroke}
					d={path}
					vectorEffect={"non-scaling-stroke"}
					strokeWidth={rest.strokeWidth ?? 10}
					className={rest.className}
					clipPath={`url(#${clip})`}
				/>
			)}
		</>
	);
};
