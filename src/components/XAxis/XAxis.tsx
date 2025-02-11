import React, { ReactNode } from "react";
import { GraphContext, useGraph, useGraphColumn } from "../../hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { DomainUtils } from "../../utils/domain/domain";
import { MathUtils } from "../../utils/math/math";

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
		<Graph.Row className={"xaxis items-center relative pt-2 text-xs font-normal select-none"} style={{ gridColumn: column }}>
			<div className={"xaxis__ticks flex"}>
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
								className={"xaxis__tick absolute -translate-x-1/2 text-gray-700 dark:text-gray-300 text-nowrap"}
								style={{ left: `${x}%` }}
							>
								{label}
							</div>
							<div className={"xaxis__tick opacity-0 text-nowrap"}>{label}</div>
						</React.Fragment>
					);
				})}
			</div>
			{(title || description) && (
				<div className={"xaxis__labels text-center mt-[10px] font-bold"}>
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
