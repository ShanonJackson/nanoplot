import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph, useGraphColumn } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React, { ReactNode } from "react";
import { DomainUtils } from "@/utils/domain/domain";

type From = "min" | `min - ${number}` | `min + ${number}` | `min + ${number}%` | `min - ${number}%` | number;
type To = "max" | `max - ${number}` | `max + ${number}` | `max + ${number}%` | `max - ${number}%` | number;
type interval = "days" | "months" | "years" | "hours" | "minutes" | "seconds" | "milliseconds";
type Jumps = `every ${number} ${interval}` | number;

type Props = {
	ticks?: { from?: From; to?: To; jumps?: Jumps };
	title?: ReactNode;
	description?: ReactNode;
};

export const XAxis = ({ title, description }: Props) => {
	const context = useGraph();
	const column = useGraphColumn(context);
	return (
		<Graph.Row className={"items-center relative pt-2 text-xs font-normal select-none"} style={{ gridColumn: column }}>
			<div className={"flex"}>
				{context.domain.x.map(({ tick, coordinate }, i) => {
					return (
						<React.Fragment key={i}>
							<div
								className={"absolute -translate-x-1/2 text-gray-700 dark:text-gray-300"}
								style={{ left: `${MathUtils.scale(coordinate, 3000, 100)}%` }}
							>
								{typeof tick === "number" ? +(Math.round(+(tick.toString() + "e+2")) + "e-2") : tick.toString()}
							</div>
							<div className={"opacity-0"}>
								{typeof tick === "number" ? +(Math.round(+(tick.toString() + "e+2")) + "e-2") : tick.toString()}
							</div>
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
