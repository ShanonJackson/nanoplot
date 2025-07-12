import React from "react";
import { GradientUtils } from "../../utils/gradient/gradient";
import { useGraph } from "../../hooks/use-graph/use-graph";

type Props = React.HTMLAttributes<SVGLinearGradientElement> & {
	id: string;
	gradient: string;
};

export const LinearGradient = ({ id, gradient, ...rest }: Props) => {
	const { viewbox, domain } = useGraph();
	const { direction, stops } = GradientUtils.parse({ gradient, viewbox, domain });
	console.log({ gradient, viewbox, domain });
	const { x1, y1, x2, y2 } = (() => {
		if (direction.includes("to ")) {
			switch (direction.replace("to ", "").trim()) {
				case "top":
					return { x1: 0, y1: 1, x2: 0, y2: 0 };
				case "right":
					return { x1: 0, y1: 0, x2: 1, y2: 0 };
				case "bottom":
					return { x1: 0, y1: 0, x2: 0, y2: 1 };
				case "left":
					return { x1: 1, y1: 0, x2: 0, y2: 0 };
				case "top left":
					return { x1: 1, y1: 1, x2: 0, y2: 0 };
				case "top right":
					return { x1: 0, y1: 1, x2: 1, y2: 0 };
				case "bottom left":
					return { x1: 1, y1: 0, x2: 0, y2: 1 };
				case "bottom right":
					return { x1: 0, y1: 0, x2: 1, y2: 1 };
			}
		} else if (direction.match(/\d+deg/)) {
			const angle = parseFloat(direction) * (Math.PI / 180);
			return {
				x1: 0.5 - 0.5 * Math.cos(angle),
				y1: 0.5 - 0.5 * Math.sin(angle),
				x2: 0.5 + 0.5 * Math.cos(angle),
				y2: 0.5 + 0.5 * Math.sin(angle),
			};
		}
		return { x1: 0, y1: 0, x2: 0, y2: 1 }; // Default to "to bottom"
	})();

	return (
		<linearGradient {...rest} id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
			{stops.map(({ color, opacity, offset }, i) => (
				<stop key={i} stopColor={color} stopOpacity={opacity} offset={(offset ?? 0) * 100 + "%"} />
			))}
		</linearGradient>
	);
};
