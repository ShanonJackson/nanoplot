import { FC } from "react";
import { MathUtils } from "@/utils/math/math";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { useGraph } from "@/hooks/use-graph/use-graph";

type Props = {
	x: number | string | Date;
	y: number;
};

export const OverlayDot: FC<Props> = ({ x, y }) => {
	const context = useGraph();
	const xCoordinateFor = CoordinatesUtils.xCoordinateFor(context);
	const yCoordinateFor = CoordinatesUtils.yCoordinateFor(context);
	return (
		<>
			<div
				style={{
					borderRadius: "50%",
					height: "25px",
					width: "25px",
					left: `${MathUtils.scale(xCoordinateFor(x), 3000, 100)}%`,
					top: `${MathUtils.scale(yCoordinateFor(y), 3000, 100)}%`,
					backgroundColor: "blue",
					position: "absolute",
				}}
				className="[grid-area:graph]"
			></div>
		</>
	);
};
