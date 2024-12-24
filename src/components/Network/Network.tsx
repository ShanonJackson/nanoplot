import React, { ReactNode } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";

type Props = React.SVGAttributes<SVGElement> & {
	children?: ReactNode;
};

export const Network = ({ children, className }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const nodes = context.data.map((node, i, nodes) => {
		return {
			...node,
			id: node.id ?? node.name,
			stroke: node.stroke ?? ColorUtils.colorFor(i, nodes.length),
			fill: node.fill === true ? (node.stroke ?? ColorUtils.colorFor(i, nodes.length)) : node.fill,
			data: node.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});
	console.log("nodes", nodes);
	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${1500}`}
			className={cx("[grid-area:graph] h-full w-full", className)}
			preserveAspectRatio={"none"}
		>
			<Circle
				cx={context.viewbox.x / 2}
				cy={context.viewbox.y / 4}
				r={50}
				className="stroke-[10] stroke-[hsl(210.5deg,68.97%,65.88%)] transition duration-5000 ease-in-out hover:stroke-[50]"
			/>

			{nodes.map(({ id, stroke, data, fill }, i) => {
				return (
					<React.Fragment key={i}>
						{/* <Circle cx={context.viewbox.x / 2} cy={context.viewbox.y / 2} r={100} /> */}
					</React.Fragment>
				);
			})}
			{children}
		</svg>
	);
};

const Circle = ({ className, ...props }: React.SVGAttributes<SVGCircleElement>) => {
	return (
		<circle
			className={cx(
				"fill-[hsl(14.2deg,70.71%,53.14%)] dark:fill-[hsl(210.5deg,68.97%,65.88%)] stroke-[hsl(14.2deg,70.71%,53.14%)] dark:stroke-[hsl(210.5deg,68.97%,65.88%)]",
				className,
			)}
			r="100"
			{...props}
		/>
	);
};
