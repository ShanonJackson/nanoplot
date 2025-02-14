import React from "react";
import { GraphContext, useGraph, useGraphColumn } from "../../../hooks/use-graph/use-graph";
import { MathUtils } from "../../../utils/math/math";
import { cx } from "../../../utils/cx/cx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	position: "top" | "bottom";
	alignment?: "start" | "center" | "end";
	gradient: `linear-gradient(${string})`;
	scalars: number[] | Array<{ tick: number; percent: number }>;
	labels?: boolean | ((value: string | number | Date) => string);
};

export const GradientLegend = ({ position, alignment = "center", gradient, scalars, labels = true, ...rest }: Props) => {
	const context = useGraph();
	const column = useGraphColumn(context);

	const ticks = scalars.map((tick, i, ticks) => {
		if (typeof tick === "number") return { label: tick, left: MathUtils.scale(i, ticks.length - 1, 100) + "%" };
		return { label: tick.tick, left: tick.percent + "%" };
	});

	return (
		<div
			className={cx(
				"gradient-legend w-[80%]",
				alignment === "center" && "mx-auto",
				alignment === "start" && "mr-auto",
				alignment === "end" && "ml-auto",
			)}
			style={{ gridColumn: column, ...rest.style }}
		>
			<div className="relative mb-[40px]">
				<div className="text-xs text-gray-500">Value →</div>
				<div className="gradient-legend__gradient h-[8px] rounded-sm" style={{ background: gradient }} />
				<div className={"gradient-legend__labels relative mx-1"}>
					<div className="flex items-center justify-between">
						{ticks.map((tick, i) => (
							<div
								key={i}
								className="gradient-legend__tick absolute -translate-x-1/2 top-[100%] flex flex-col items-center"
								style={{ left: tick.left }}
							>
								<div className="h-2 w-[1px] bg-gray-400" />
								<span className="gradient-legend__label text-[10px] text-gray-600 mt-1">
									{(() => {
										if (!labels) return null;
										if (typeof labels === "function") return labels(tick.label);
										return tick.label;
									})()}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

GradientLegend.context = (ctx: GraphContext, props: Props) => {
	const rows = (() => {
		if (props.position === "top") return "max-content " + ctx.layout.rows;
		if (props.position === "bottom") return ctx.layout.rows + " max-content";
		return ctx.layout.rows;
	})();
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows,
			columns: ctx.layout.columns,
		},
	};
};
