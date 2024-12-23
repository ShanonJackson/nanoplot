import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React, { JSX, ReactNode } from "react";
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

export const YAxis = ({ title, description }: Props) => {
	const context = useGraph();
	return (
		<Graph.Column className={"flex relative text-xs font-normal select-none"}>
			{(title || description) && (
				<div className={"flex text-center rotate-180 font-bold"}>
					<div className={"text-xs text-gray-500 dark:text-gray-600 [writing-mode:vertical-rl] ml-[10px]"}>{description}</div>
					<div className={"text-[14px] text-gray-700 dark:text-gray-300 [writing-mode:vertical-rl]"}>{title}</div>
				</div>
			)}
			<div>
				{context.domain.y.map((dp, i) => {
					return (
						<React.Fragment key={i}>
							<div
								className={`absolute -translate-y-1/2 text-gray-700 dark:text-gray-300`}
								style={{ top: `${MathUtils.scale(dp.coordinate, 3000, 100)}%` }}
							>
								{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
							</div>
							<div className={`opacity-0`}>{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}</div>
						</React.Fragment>
					);
				})}
			</div>
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
