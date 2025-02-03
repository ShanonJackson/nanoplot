import React, { ReactNode } from "react";
import { GraphContext, useGraph } from "../../hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { MathUtils } from "../../utils/math/math";
import { DomainUtils } from "../../utils/domain/domain";

type From = "auto" | "min" | `min - ${number}` | `min + ${number}` | `min + ${number}%` | `min - ${number}%` | number;
type To = "auto" | "max" | `max - ${number}` | `max + ${number}` | `max + ${number}%` | `max - ${number}%` | number;
type Jumps = "auto" | number;

type Props = {
	ticks?: { from?: From; to?: To; jumps?: Jumps };
	title?: ReactNode;
	display?: (tick: string | number | Date) => ReactNode;
	description?: ReactNode;
};

export const YAxis = ({ title, description, display }: Props) => {
	const context = useGraph();
	const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
	return (
		<Graph.Column className={"flex relative text-xs font-normal select-none"}>
			{(title || description) && (
				<div className={"flex text-center rotate-180 font-bold"}>
					<div className={"text-xs text-gray-500 dark:text-gray-600 [writing-mode:vertical-rl] ml-[10px]"}>{description}</div>
					<div className={"text-[14px] text-gray-700 dark:text-gray-300 [writing-mode:vertical-rl]"}>{title}</div>
				</div>
			)}
			<div className={"mr-2"}>
				{context.domain.y.map(({ tick, coordinate }, i) => {
					const label = (() => {
						if (display) return display(tick);
						if (typeof tick === "number") return formatter.format(tick);
						return tick.toString();
					})();
					return (
						<React.Fragment key={i}>
							<div
								className={`absolute right-2 -translate-y-1/2 text-gray-700 dark:text-gray-300`}
								style={{ top: `${MathUtils.scale(coordinate, 3000, 100)}%` }}
							>
								{label}
							</div>
							<div className={`opacity-0`}>{label}</div>
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
