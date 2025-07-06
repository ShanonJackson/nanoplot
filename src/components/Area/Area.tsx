import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { GraphContext, useGraph } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { cx } from "../../utils/cx/cx";
import { ObjectUtils } from "../../utils/object/object";
import { Line } from "../Lines/components/Line";
import { ColorUtils } from "../../utils/color/color";
import { LinesTooltipZone } from "../Lines/components/LinesTooltipZone";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	children?: ReactNode;
	curve?: keyof typeof CurveUtils;
	loading?: boolean;
}

export const Area = ({ className, curve = "linear", children, loading }: Props) => {
	const {
		interactions: { pinned, hovered },
		data,
		viewbox,
		domain,
		colors,
	} = useGraph();

	if (!GraphUtils.isXYData(data)) return null;
	if (loading) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
	const lines = data.map((line) => {
		return {
			...line,
			id: String(line.id),
			fill: line.fill,
			data: line.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});

	const grouped = Object.entries(ObjectUtils.groupBy(lines, ({ group, id }) => group ?? id));

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={cx("area h-full w-full [grid-area:graph]", className)}
		>
			{grouped.flatMap(([, lines], index) => {
				return lines
					?.map((line, i) => {
						const data = line.data.map(({ x, y }, ii) => {
							return {
								x: x,
								y: y - lines.slice(0, i).reduce((acc, { data }) => acc + (viewbox.y - data[ii].y), 0),
							};
						});
						return {
							...line,
							data,
							stroke: line.stroke ?? colors[i] ?? colors.at(-1),
							path: CurveUtils[curve](data),
						};
					})
					.map(({ id, stroke, data, path, fill }, i, segments) => {
						const previous = segments[i - 1] ? CurveUtils[curve](segments[i - 1]?.data.reverse()).replace("M", "L") : undefined;
						const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
						const filled = (() => {
							if (fill) return fill;
							if (stroke.includes("linear-gradient")) return "transparent";
							return stroke;
						})();
						return (
							<React.Fragment key={i + "|" + index}>
								<Line
									d={path}
									disabled={Boolean(disabled)}
									stroke={stroke}
									fill={"transparent"}
									className={"area__stroke"}
								/>
								<Line
									d={path + (previous ?? ` L ${viewbox.x} ${viewbox.y} L 0 ${viewbox.y} L ${data[0]?.x} ${viewbox.y} Z`)}
									disabled={Boolean(disabled)}
									stroke={"transparent"}
									fill={filled}
									className={"area__fill"}
								/>
							</React.Fragment>
						);
					});
			})}
			{children}
		</svg>
	);
};

Area.context = (ctx: GraphContext): GraphContext => {
	return {
		...ctx,
		colors: ColorUtils.scheme.sunset,
	};
};

Area.Tooltip = LinesTooltipZone;
