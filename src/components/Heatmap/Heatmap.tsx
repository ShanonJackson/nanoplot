import { useGraph } from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";
import { Rect } from "../Bars/components/Rect";
import { GraphUtils } from "../../utils/graph/graph";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { MathUtils } from "../../utils/math/math";
import { colorFromGradient } from "../../utils/gradient/gradient";
import { overlay } from "../Overlay/Overlay";
import { ColorUtils } from "../../utils/color/color";
import React from "react";
import { ScalarUtils } from "../../utils/scalars/scalars";

type Props = React.HTMLAttributes<SVGSVGElement> & {
	gradient: `linear-gradient(${string})`;
	scalars: number[] | Array<{ tick: number; percent: number }>;
	labels?:
		| boolean
		| ((value: string | number | Date) => string)
		| { collision?: boolean; display: (value: string | number | Date) => string };
};

export const Heatmap = ({ labels = true, scalars, gradient, className, ...rest }: Props) => {
	const context = useGraph();
	const { viewbox, data } = context;
	if (!GraphUtils.isXYData(data)) return null;

	const xCoordinateFor = CoordinatesUtils.xCoordinateFor(context);
	const yCoordinateFor = CoordinatesUtils.yCoordinateFor(context);

	const xCategories = new Set(data.flatMap(({ data }) => data.map(({ x }) => x)));
	const yCategories = new Set(data.flatMap(({ data }) => data.map(({ y }) => y)));
	const width = viewbox.x / xCategories.size;
	const height = viewbox.y / yCategories.size;
	const ticks = scalars.map((tick, i) => {
		if (typeof tick === "number") return { tick: tick, percent: MathUtils.scale(i, scalars.length - 1, 100) };
		return tick;
	});

	const dataset = data.flatMap(({ data }) => {
		return data.map(({ x, y, z }) => {
			const percent = ScalarUtils.percentFor(+z, ticks);
			return {
				x1: xCoordinateFor(x) - width / 2,
				x2: xCoordinateFor(x) + width / 2,
				y1: yCoordinateFor(y) - height / 2,
				y2: yCoordinateFor(y) + height / 2,
				fill: colorFromGradient(gradient, percent),
				data: { x, y, z },
			};
		});
	});

	return (
		<>
			<svg
				{...rest}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				className={cx("heatmap [grid-area:graph] h-full w-full bars", className)}
				preserveAspectRatio={"none"}
			>
				{dataset.flatMap(({ x1, x2, y1, y2, fill }, i) => {
					return <Rect key={i} x1={x1} x2={x2} y1={y1} y2={y2} fill={fill} />;
				})}
			</svg>
			{labels &&
				dataset.map((rect, i) => {
					const collision = typeof labels === "object" && "collision" in labels ? labels.collision : true;
					const width = MathUtils.scale(rect.x2 - rect.x1, context.viewbox.x, 100) + "%";
					const height = MathUtils.scale(rect.y2 - rect.y1, context.viewbox.y, 100);
					const top = MathUtils.scale(rect.y1, context.viewbox.y, 100);
					const label = (() => {
						if (typeof labels === "object") return labels.display(rect.data.z);
						return (labels === true ? rect.data.z.toString() : labels(rect.data.z)) ?? "";
					})();
					const breakpoint = [2, 4, 6, 8, 10, 15, 20].find((bp) => bp >= label.toString().length);

					return (
						<overlay.div
							key={i}
							className={"heatmap__labels @container-[size] absolute text-center"}
							style={{
								width,
								height: height + "%",
								left: `${MathUtils.scale(rect.x1, context.viewbox.x, 100)}%`,
								top: top + "%",
							}}
						>
							<div className={"h-full w-full relative"}>
								<span
									className={cx(
										"text-xs horizontal-bars__label-text absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2",
										collision && "invisible",
										breakpoint === 2 && collision && "@[width:2ch|height:1.25em]:!visible",
										breakpoint === 4 && collision && "@[width:4ch|height:1.25em]:!visible",
										breakpoint === 6 && collision && "@[width:6ch|height:1.25em]:!visible",
										breakpoint === 8 && collision && "@[width:8ch|height:1.25em]:!visible",
										breakpoint === 10 && collision && "@[width:10ch|height:1.25em]:!visible",
										breakpoint === 15 && collision && "@[width:15ch|height:1.25em]:!visible",
										breakpoint === 20 && collision && "@[width:20ch|height:1.25em]:!visible",
									)}
									style={{ color: ColorUtils.textFor(String(rect.fill)) }}
								>
									{label}
								</span>
							</div>
						</overlay.div>
					);
				})}
		</>
	);
};
