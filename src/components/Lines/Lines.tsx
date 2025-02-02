import React, { ReactNode } from "react";
import { GraphUtils } from "../../utils/graph/graph";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { CurveUtils } from "../../utils/path/curve";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { LinesLoading } from "./components/LinesLoading";
import { cx } from "../../utils/cx/cx";
import { LinesTooltip } from "./components/LinesTooltip";

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
	} = useGraph();
	if (!GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
	const lines = data.map((line) => {
		return {
			...line,
			id: String(line.id),
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
			className={cx("h-full w-full [grid-area:graph]", className)}
		>
			{lines.map(({ id, stroke, data, fill }, i) => {
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
								fill={filled ? `url(#${identifier})` : undefined}
								strokeOpacity={0}
								className="lines__fill"
							/>
						)}
					</React.Fragment>
				);
			})}
			{children}
		</svg>
	);
};

Lines.Tooltip = LinesTooltip;
