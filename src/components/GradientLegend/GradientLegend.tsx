import React, { useContext } from "react";
import { InternalGraphContext, useGraph, useGraphColumn } from "../../hooks/use-graph/use-graph";
import { MathUtils, scale } from "../../utils/math/math";
import { cx } from "../../utils/cx/cx";
import { GradientUtils } from "../../utils/gradient/gradient";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	position: "top" | "bottom";
	alignment?: "start" | "center" | "end";
	gradient: `linear-gradient(${string})`;
	labels?: boolean | ((value: string | number | Date) => string);
};

export const GradientLegend = ({ position, alignment = "center", gradient, labels = true, ...rest }: Props) => {
	const context = useGraph();
	const column = useGraphColumn().column;
	const css = GradientUtils.deserialize({ gradient, viewbox: context.viewbox });
	const parsed = GradientUtils.parse({ gradient, viewbox: context.viewbox });
	const ticks = parsed.stops.map((stop) => {
		const label = (() => {
			if (!labels) return undefined;
			if (typeof labels === "function") return labels(stop.value);
			return stop.value;
		})();
		return { left: (stop.offset ?? 0) * 100 + "%", label };
	});

	return (
		<div
			{...rest}
			className={cx(
				"gradient-legend w-[100%] px-[20px]",
				alignment === "center" && "mx-auto",
				alignment === "start" && "mr-auto",
				alignment === "end" && "ml-auto",
				rest.className,
			)}
			style={{ gridColumn: column, ...rest.style }}
		>
			<div className="relative mb-[40px]">
				<div className="text-xs text-gray-500">Value →</div>
				<div className="gradient-legend__gradient h-[8px] rounded-sm" style={{ background: css }} />
				<div className={"gradient-legend__labels relative mx-1"}>
					<div className="flex items-center justify-between">
						{ticks.map(({ left, label }, i) => (
							<div
								key={i}
								className="gradient-legend__tick absolute -translate-x-1/2 top-[100%] flex flex-col items-center"
								style={{ left }}
							>
								<div className="h-2 w-[1px] bg-gray-400" />
								{label !== undefined && (
									<span className="gradient-legend__label text-[10px] text-gray-600 mt-1">{label}</span>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

GradientLegend.context = (ctx: InternalGraphContext, props: Props) => {
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
