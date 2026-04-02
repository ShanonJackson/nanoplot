import React from "react";
import { TemporalDate, useGraph } from "../../../hooks/use-graph/use-graph";
import { Rect } from "../../Bars/components/Rect";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";

type Props = {
	x1: number | TemporalDate | string;
	y1: number | TemporalDate | string;
	x2: number | TemporalDate | string;
	y2: number | TemporalDate | string;
	fill: string | `linear_gradient(${string})`;
};

export const ScatterQuadrant = ({ x1, y1, x2, y2, fill }: Props) => {
	const { viewbox, domain } = useGraph();

	const xForValue = CoordinatesUtils.xCoordinateFor({ viewbox, domain });
	const yForValue = CoordinatesUtils.yCoordinateFor({ viewbox, domain });

	return (
		<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} preserveAspectRatio={"none"} className={"[grid-area:graph] h-full w-full"}>
			<Rect x1={xForValue(x1)} y1={yForValue(y1)} y2={yForValue(y2)} x2={xForValue(x2)} fill={fill} />
		</svg>
	);
};
