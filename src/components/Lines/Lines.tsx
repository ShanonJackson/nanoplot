import React, { ReactNode } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	children?: ReactNode;
}

export const Lines = ({ className, children }: Props) => {
	const context = useGraph();
	if (!GraphUtils.isXYData(context.data)) return null;
	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);
	const lines = context.data.map((line, i, lines) => {
		return {
			...line,
			id: line.id ?? line.name,
			stroke: line.stroke ?? ColorUtils.colorFor(i, lines.length),
			fill: line.fill === true ? (line.stroke ?? ColorUtils.colorFor(i, lines.length)) : line.fill,
			data: line.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});
	const { pinned, hovered } = context.interactions;
	const { viewbox } = context;
	return (
		<svg
			viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`}
			height={"100%"}
			width={"100%"}
			preserveAspectRatio={"none"}
			className={cx("[grid-area:graph]", className)}
		>
			{lines.map(({ id, stroke, data, fill }, i) => {
				const path = data.map((xy, index) => `${index === 0 ? "M" : "L"} ${xy.x} ${xy.y}`).join(" ");
				const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
				const filled = fill || hovered.includes(id) || (pinned.includes(id) && !disabled);
				const identifier = id.replace(/[^a-zA-Z0-9]/g, "");
				return (
					<React.Fragment key={i}>
						{filled && !disabled && (
							<linearGradient id={identifier} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={stroke} stopOpacity={"0.5"} />
								<stop offset="95%" stopColor={stroke} stopOpacity={"0"} />
							</linearGradient>
						)}
						<path
							key={i}
							d={path}
							fill={"transparent"}
							stroke={stroke}
							className={cx(disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1] lines__outlined")}
							vectorEffect={"non-scaling-stroke"}
							strokeWidth={1.5}
						/>
						{filled && (
							<path
								d={path + `L ${viewbox.x} ${viewbox.y} L 0 ${viewbox.y} Z`}
								stroke={stroke}
								fill={(() => {
									if (typeof fill === "string") return fill;
									if (filled) return `url(#${identifier})`;
									return undefined;
								})()}
								strokeOpacity={0}
								className="lines__filled"
							/>
						)}
					</React.Fragment>
				);
			})}

			{children}
		</svg>
	);
};
