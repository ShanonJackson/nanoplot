import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph, useGraphColumn } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React, { ReactNode } from "react";
import { DomainUtils } from "@/utils/domain/domain";

type interval = "days" | "months" | "years" | "hours" | "minutes" | "seconds" | "milliseconds";
type From =
	| "auto"
	| "min"
	| `min - ${number}`
	| `min + ${number}`
	| `min + ${number}%`
	| `min - ${number}%`
	| `min - ${number} ${interval}`
	| `min + ${number} ${interval}`
	| number;
type To =
	| "auto"
	| "max"
	| `max - ${number}`
	| `max + ${number}`
	| `max + ${number}%`
	| `max - ${number}%`
	| `max - ${number} ${interval}`
	| `max + ${number} ${interval}`
	| number;
type Jumps = "auto" | `every ${number} ${interval}` | number;

type Props = {
	ticks?: { from?: From; to?: To; jumps?: Jumps };
	title?: ReactNode;
	description?: ReactNode;
	display?: (tick: number | string | Date) => ReactNode;
};

export const XAxis = ({ display, title, description }: Props) => {
	const context = useGraph();
	const column = useGraphColumn(context);
	const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
	return (
		<Graph.Row className={"items-center relative pt-2 text-xs font-normal select-none"} style={{ gridColumn: column }}>
			<div className={"flex"}>
				{context.domain.x.map(({ tick, coordinate }, i) => {
					const label = (() => {
						if (display) return display(tick);
						if (typeof tick === "number") return formatter.format(tick);
						return tick.toString();
					})();
					const x = MathUtils.scale(coordinate, 3000, 100);
					if (x > 100 || x < 0) return null;
					return (
						<React.Fragment key={i}>
							<div
								className={"absolute -translate-x-1/2 text-gray-700 dark:text-gray-300 text-nowrap"}
								style={{ left: `${x}%` }}
							>
								{label}
							</div>
							<div className={"opacity-0 text-nowrap"}>{label}</div>
						</React.Fragment>
					);
				})}
			</div>
			{(title || description) && (
				<div className={"text-center mt-[10px] font-bold"}>
					<div className={"text-[14px] text-gray-700 dark:text-gray-300"}>{title}</div>
					<div className={"text-xs text-gray-500 dark:text-gray-600"}>{description}</div>
				</div>
			)}
		</Graph.Row>
	);
};

XAxis.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows + " min-content",
			columns: ctx.layout.columns,
		},
		domain: {
			...ctx.domain,
			y: ctx.domain.y,
			x: DomainUtils.x.ticks(ctx, props.ticks),
		},
	};
};
