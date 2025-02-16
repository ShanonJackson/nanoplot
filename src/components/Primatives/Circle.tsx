import * as React from "react";
import { useId } from "react";
import { LinearGradient } from "../LinearGradient/LinearGradient";
import { GradientUtils } from "../../utils/gradient/gradient";
import { MathUtils } from "../../utils/math/math";
import { useGraph } from "../../hooks/use-graph/use-graph";

type Props = React.HTMLAttributes<SVGPathElement> & {
	stroke: string;
	fill: string;
	x: number;
	y: number;
};

export const Circle = ({ x, y, stroke, fill }: Props) => {
	const { viewbox } = useGraph();
	const strokeId = useId();
	const fillId = useId();
	const isGradientFill = fill?.includes("linear-gradient");
	const isGradientStroke = stroke?.includes("linear-gradient");
	const percent = MathUtils.scale(x, viewbox.x, 100);
	const colorsFromGradient = isGradientStroke ? GradientUtils.colorFrom(stroke, percent) : stroke;
	return (
		<>
			{isGradientFill && fill && <LinearGradient id={fillId} gradient={fill} />}
			{isGradientStroke && stroke && <LinearGradient id={strokeId} gradient={stroke} />}
			<path
				stroke={colorsFromGradient}
				fill={colorsFromGradient}
				d={`M ${x} ${y} A 0 0 0 0 1 ${x} ${y}`}
				strokeWidth={"10"}
				strokeLinecap={"round"}
				vectorEffect={"non-scaling-stroke"}
			/>
		</>
	);
};
