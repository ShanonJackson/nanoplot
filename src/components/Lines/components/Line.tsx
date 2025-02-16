import { cx } from "../../../utils/cx/cx";
import React, { useId } from "react";
import { LinearGradient } from "../../LinearGradient/LinearGradient";

type Props = React.HTMLAttributes<SVGPathElement> & {
	d: string;
	stroke: string;
	fill?: string;
	disabled?: boolean;
};

export const Line = ({ stroke, d, disabled, fill, className }: Props) => {
	const strokeId = useId();
	const fillId = useId();
	const isGradientFill = fill?.includes("linear-gradient");
	const isGradientStroke = stroke?.includes("linear-gradient");
	return (
		<>
			{isGradientFill && !disabled && fill && <LinearGradient id={fillId} gradient={fill} />}
			{isGradientStroke && !disabled && stroke && <LinearGradient id={strokeId} gradient={stroke} />}
			<path
				d={d}
				stroke={isGradientStroke ? `url(#${strokeId})` : stroke}
				fill={isGradientFill ? `url(#${fillId})` : fill}
				vectorEffect={"non-scaling-stroke"}
				strokeWidth={1.5}
				className={className}
			/>
		</>
	);
};
