import React, { ReactNode } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";
import { LinesTooltip } from "@/components/Lines/components/LinesTooltip";
import { CurveUtils } from "@/utils/path/curve";

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
	const lines = data.map((line, i, lines) => {
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

	// kate loading state
	if (loading) {
		//return <div className={"[grid-area:graph]"}>loading</div>;
		return (
			<svg height={"100%"} width={"100%"} className={"[grid-area:graph] stroke-gray-600"}>
				<path d="M10 380 L150 300 L220 330 L350 200 L450 160" strokeWidth="5" fill="none" />
			</svg>
		);
	}

	return (
		<svg
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			height={"100%"}
			width={"100%"}
			preserveAspectRatio={"none"}
			className={cx("[grid-area:graph]", className)}
		>
			{lines.map(({ id, stroke, data, fill }, i) => {
				const path = CurveUtils[curve](data);
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

/*
	Chart composition
*/

Lines.Tooltip = LinesTooltip;
