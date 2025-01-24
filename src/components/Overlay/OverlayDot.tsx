import { FC } from "react";
import { MathUtils } from "@/utils/math/math";
type Props = {
	x: number;
	y: number;
};

export const OverlayDot: FC<Props> = ({ x, y }) => {
	const left = MathUtils.scale(x, 3000, 100);
	const top = MathUtils.scale(y, 3000, 100);
	return (
		<>
			<div
				style={{
					borderRadius: "50%",
					height: "25px",
					width: "25px",
					left: `${left}%`,
					top: `${top}%`,
					backgroundColor: "#bbb",
					position: "absolute",
				}}
				className="[grid-area:graph]"
			></div>
		</>
	);
};
