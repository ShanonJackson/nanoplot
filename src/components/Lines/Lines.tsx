import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { LinesLoading } from "./components/LinesLoading";
import { cx } from "../../utils/cx/cx";
import { LinesTooltip } from "./components/LinesTooltip";
import { Line } from "./components/Line";
import { toRgb } from "../../utils/color/to-rgb";

interface Props extends React.SVGAttributes<SVGSVGElement> {
	children?: ReactNode;
	curve?: keyof typeof CurveUtils;
	loading?: boolean;
}

export const Lines = ({ className, curve = "linear", children, loading }: Props) => {
	const {
		interactions: { pinned, hovered },
		data,
		viewbox,
		domain,
		colorFor,
	} = useGraph();
	if (!GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
	const lines = data.map((line, i, lines) => {
		return {
			...line,
			id: String(line.id),
			stroke: line.stroke ?? colorFor(i, lines.length),
			fill: String(line.fill),
			data: line.data.map((xy) => ({
				x: xForValue(xy.x),
				y: yForValue(xy.y),
			})),
		};
	});

	if (loading) return <LinesLoading />;

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			preserveAspectRatio={"none"}
			className={cx("lines h-full w-full [grid-area:graph]", className)}
		>
			{lines.map(({ id, stroke, data }, i) => {
				const path = CurveUtils[curve](data);
				const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);
				const filled = hovered.includes(id) || (pinned.includes(id) && !disabled);
				const identifier = id.replace(/[^a-zA-Z0-9]/g, "");
				return (
					<React.Fragment key={i}>
						{filled && !disabled && (
							<linearGradient id={identifier} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={stroke} stopOpacity={"0.5"} />
								<stop offset="95%" stopColor={stroke} stopOpacity={"0"} />
							</linearGradient>
						)}
						<Line
							d={path}
							stroke={stroke}
							fill={"transparent"}
							className={cx(disabled && "lines__stroke stroke-black dark:stroke-white [stroke-opacity:0.1]")}
						/>
						{filled && data[0] && (
							<Line
								d={path + `L ${viewbox.x} ${viewbox.y} L 0 ${viewbox.y} L ${data[0].x} ${viewbox.y} Z`}
								stroke={"transparent"}
								fill={filled ? `linear-gradient(to bottom, ${toRgb(stroke, 0.5)}, ${toRgb(stroke, 0)})` : undefined}
								strokeOpacity={0}
								className={"lines__fill"}
							/>
						)}
						<path strokeOpacity={0} />
					</React.Fragment>
				);
			})}
			{children}
		</svg>
	);
};

Lines.Tooltip = LinesTooltip;
