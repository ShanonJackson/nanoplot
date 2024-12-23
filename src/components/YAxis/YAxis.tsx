import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React from "react";
import { DomainUtils } from "@/utils/domain/domain";

type From = "auto" | "min" | `min - ${number}` | `min + ${number}` | `min + ${number}%` | `min - ${number}%` | number;
type To = "auto" | "max" | `max - ${number}` | `max + ${number}` | `max + ${number}%` | `max - ${number}%` | number;
type interval = "days" | "months" | "years" | "hours" | "minutes" | "seconds" | "milliseconds";
type Jumps = `every ${number} ${interval}` | number;

type Props = {
	ticks?: { from?: From; to?: To; jumps?: Jumps };
};

export const YAxis = ({}: Props) => {
	const context = useGraph();
	return (
		<Graph.Column className={"relative text-xs font-normal select-none dark:text-white"}>
			{context.domain.y.map((dp, i) => {
				return (
					<React.Fragment key={i}>
						<div className={`absolute -translate-y-1/2`} style={{ top: `${MathUtils.scale(dp.coordinate, 3000, 100)}%` }}>
							{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
						</div>
						<div className={`opacity-0`}>{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}</div>
					</React.Fragment>
				);
			})}
		</Graph.Column>
	);
};

YAxis.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows,
			columns: "min-content " + ctx.layout.columns,
		},
		domain: {
			...ctx.domain,
			x: ctx.domain.x,
			y: DomainUtils.y.ticks(ctx, props.ticks),
		},
	};
};
