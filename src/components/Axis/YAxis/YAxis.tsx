import { Graph } from "@/components/Graph/Graph";
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import React from "react";

type Props = {};

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
			columns: "max-content " + ctx.layout.columns,
		},
	};
};
