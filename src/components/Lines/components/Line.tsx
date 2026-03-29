import React, { JSX, useId } from "react";
import { LinearGradient } from "../../LinearGradient/LinearGradient";
import { InternalGraphContext, TemporalDate, useGraph } from "../../../hooks/use-graph/use-graph";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { CurveUtils } from "../../../utils/path/curve";
import { BoxShadow } from "../../BoxShadow/BoxShadow";

type Props = Omit<JSX.IntrinsicElements["path"], "points"> & {
	d?: string;
	stroke: string;
	fill?: string;
	filter?: string;
	disabled?: boolean;
	points?: Array<{ x: number | string | TemporalDate; y: number | string | TemporalDate }>;
	context?: InternalGraphContext;
};

export const Line = ({ stroke, d, disabled, fill, className, points, filter, ...rest }: Props) => {
	const context = useGraph();
	const strokeId = useId();
	const fillId = useId();
	const clipId = useId();
	const boxShadowId = useId();
	const isGradientFill = fill?.includes("linear-gradient");
	const isGradientStroke = stroke?.includes("linear-gradient");
	const isMaskStroke = stroke?.includes("mask");
	const coordinatesFor = CoordinatesUtils.xyCoordinatesForDataset(context);

	const D = (() => {
		if (d) return d;
		if (points) return CurveUtils.linear(coordinatesFor(points));
		return "";
	})();

	return (
		<>
			{filter && <BoxShadow id={boxShadowId} shadow={filter} />}
			{isGradientFill && !disabled && fill && <LinearGradient id={fillId} gradient={fill} />}
			{isGradientStroke && !disabled && stroke && <LinearGradient id={strokeId} gradient={stroke} />}
			{isMaskStroke && (
				<mask id={clipId}>
					<rect width="100%" height="100%" fill="black" />
					<path d={D} fill="none" stroke="white" strokeWidth={1.5} vectorEffect={"non-scaling-stroke"} />
				</mask>
			)}
			{isMaskStroke && <rect width={"100%"} height={"100%"} fill={`url(#${strokeId})`} mask={`url(#${clipId})`} />}
			{!isMaskStroke && (
				<g filter={`url(#${boxShadowId})`}>
					<path
						d={D}
						stroke={isGradientStroke ? `url(#${strokeId})` : stroke}
						fill={isGradientFill ? `url(#${fillId})` : fill}
						vectorEffect={"non-scaling-stroke"}
						strokeWidth={1.5}
						className={className}
						{...rest}
					/>
				</g>
			)}
		</>
	);
};
