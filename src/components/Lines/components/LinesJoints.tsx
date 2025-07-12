import { InternalGraphContext } from "../../../hooks/use-graph/use-graph";
import * as React from "react";
import { GraphUtils } from "../../../utils/graph/graph";
import { GradientUtils } from "../../../utils/gradient/gradient";
import { equals } from "../../../utils/equals/equals";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { cx } from "../../../utils/cx/cx";

type Props = {
	at?: { x: string | number | Date };
	border?: string;
	strokeWidth?: number;
	context: InternalGraphContext;
};

export const LinesJoints = ({ context, border, at, strokeWidth = 8 }: Props) => {
	const {
		interactions: { pinned, hovered },
	} = context;

	if (!GraphUtils.isXYData(context.data)) return null;

	const xyForPoints = CoordinatesUtils.xyCoordinatesForDataset(context);
	return context.data.flatMap(({ data, stroke, id }, i) => {
		const points = xyForPoints(data);
		const isLinearGradient = stroke?.includes("linear-gradient");
		if (isLinearGradient && stroke) {
			return data.map(({ x, y }, ii) => {
				if (at?.x && !equals(x, at.x)) return null;
				const color = GradientUtils.gradientColorFromValue({
					gradient: stroke,
					point: { x, y },
					dataset: data,
					viewbox: context.viewbox,
					domain: context.domain,
				});
				const coordinates = points[ii];
				return (
					<React.Fragment key={i + "|" + ii}>
						{border && (
							<path
								stroke={border}
								fill={border}
								d={`M ${coordinates.x} ${coordinates.y} h 0.001`}
								strokeWidth={strokeWidth + 1}
								strokeLinecap={"round"}
								vectorEffect={"non-scaling-stroke"}
							/>
						)}
						<path
							stroke={color}
							fill={color}
							d={`M ${coordinates.x} ${coordinates.y} h 0.001`}
							strokeWidth={strokeWidth}
							strokeLinecap={"round"}
							vectorEffect={"non-scaling-stroke"}
						/>
					</React.Fragment>
				);
			});
		}
		let path = "";
		for (let i = 0; i < data.length; i++) {
			if (at?.x && !equals(data[i].x, at.x)) continue; /* Skip if at.x is set and data[i].x !== at.x */
			path += `M ${points[i].x} ${points[i].y} h 0.001 `; /* += for perf; see V8 and other engine string types. */
		}
		const disabled = pinned.length && !pinned.includes(id) && !hovered.includes(id);

		return (
			<React.Fragment key={i}>
				{border && (
					<path
						stroke={border}
						fill={border}
						d={path}
						strokeWidth={strokeWidth + 1}
						strokeLinecap={"round"}
						vectorEffect={"non-scaling-stroke"}
						className={cx(disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]")}
					/>
				)}
				<path
					stroke={stroke}
					fill={stroke}
					d={path}
					strokeWidth={strokeWidth}
					strokeLinecap={"round"}
					vectorEffect={"non-scaling-stroke"}
					className={cx(disabled && "stroke-black dark:stroke-white [stroke-opacity:0.1]")}
				/>
			</React.Fragment>
		);
	});
};
