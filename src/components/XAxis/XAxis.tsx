import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph, useGraphColumn } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React from "react";
import { DomainUtils } from "@/utils/domain/domain";

type From = "min" | `min - ${number}` | `min + ${number}` | `min + ${number}%` | `min - ${number}%` | number;
type To = "max" | `max - ${number}` | `max + ${number}` | `max + ${number}%` | `max - ${number}%` | number;
type interval = "days" | "months" | "years" | "hours" | "minutes" | "seconds" | "milliseconds";
type Jumps = `every ${number} ${interval}` | number;

type Props = {
	ticks?: { from?: From; to?: To; jumps?: Jumps };
};

export const XAxis = ({}: Props) => {
	const context = useGraph();
	const column = useGraphColumn(context);
	return (
		<Graph.Row className={"flex items-center relative pt-2 text-xs font-normal select-none"} style={{ gridColumn: column }}>
			{context.domain.x.map((dp, i) => {
				return (
					<React.Fragment key={i}>
						<div
							className={"absolute -translate-x-1/2 dark:text-white"}
							style={{ left: `${MathUtils.scale(dp.coordinate, 3000, 100)}%` }}
						>
							{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
						</div>
						<div className={"opacity-0"}>{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}</div>
					</React.Fragment>
				);
			})}
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
