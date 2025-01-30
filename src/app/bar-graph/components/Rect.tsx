import React, { JSX, useId } from "react";
import { LinearGradient } from "@/components/LinearGradient/LinearGradient";
import { PathUtils } from "@/utils/path/path";

type Props = JSX.IntrinsicElements["path"] & {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
	radius?: number; // in degrees
};

export const Rect = ({ x1, x2, y1, y2, radius, ...rest }: Props) => {
	const id = useId();
	const isFillGradient = rest.fill?.includes("gradient");
	const path = radius
		? PathUtils.borderRadius({ x: x1, y: y1 }, { x: x2, y: y2 }, radius)
		: `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y1}`;
	return (
		<>
			{isFillGradient && rest.fill && <LinearGradient id={id} gradient={rest.fill} />}
			<path
				fill={isFillGradient ? `url(#${id})` : rest.fill}
				stroke={rest.stroke}
				d={path}
				vectorEffect={"non-scaling-stroke"}
				strokeWidth={1.5}
			/>
		</>
	);
};
