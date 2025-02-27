import { useGraph } from "../../../hooks/use-graph/use-graph";
import { Rect } from "../../Bars/components/Rect";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";

type Props = {
	x: number | Date | string;
	y: number | Date | string;
	x1: number | Date | string;
	y1: number | Date | string;
	fill: string | `linear_gradient(${string})`;
};

export const ScatterQuadrant = ({ x, y, x1, y1, fill }: Props) => {
	const { viewbox, domain } = useGraph();

	const xForValue = CoordinatesUtils.xCoordinateFor({ viewbox, domain });
	const yForValue = CoordinatesUtils.yCoordinateFor({ viewbox, domain });

	return (
		<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} preserveAspectRatio={"none"} className={"[grid-area:graph] h-full w-full"}>
			<Rect x1={xForValue(x)} y1={yForValue(y)} y2={yForValue(y1)} x2={xForValue(x1)} fill={fill} />
		</svg>
	);
};
