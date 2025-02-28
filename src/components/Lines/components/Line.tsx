import React, { JSX, useId } from "react";
import { LinearGradient } from "../../LinearGradient/LinearGradient";

type Props = JSX.IntrinsicElements["path"] & {
	d: string;
	stroke: string;
	fill?: string;
	disabled?: boolean;
};

export const Line = ({ stroke, d, disabled, fill, className }: Props) => {
	const strokeId = useId();
	const fillId = useId();
	const clipId = useId();

	const isGradientFill = fill?.includes("linear-gradient");
	const isGradientStroke = stroke?.includes("linear-gradient");
	const isMaskStroke = stroke?.includes("mask");
	console.log({ isGradientStroke, stroke, disabled });
	return (
		<>
			{isGradientFill && !disabled && fill && <LinearGradient id={fillId} gradient={fill} />}
			{isGradientStroke && !disabled && stroke && <LinearGradient id={strokeId} gradient={stroke} />}
			{isMaskStroke && (
				<mask id={clipId}>
					<rect width="100%" height="100%" fill="black" />
					<path d={d} fill="none" stroke="white" strokeWidth={1.5} vectorEffect={"non-scaling-stroke"} />
				</mask>
			)}
			{isMaskStroke && <rect width={"100%"} height={"100%"} fill={`url(#${strokeId})`} mask={`url(#${clipId})`} />}
			{!isMaskStroke && (
				<path
					d={d}
					stroke={isGradientStroke ? `url(#${strokeId})` : stroke}
					fill={isGradientFill ? `url(#${fillId})` : fill}
					vectorEffect={"non-scaling-stroke"}
					strokeWidth={1.5}
					className={className}
				/>
			)}
		</>
	);
};
