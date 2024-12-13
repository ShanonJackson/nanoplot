import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";
import { MathUtils } from "@/utils/math/math";
import React from "react";

type Props = {
	context?: GraphContext;
};

export const YAxis = ({ context }: Props) => {
	return (
		<Graph.Column className={"relative text-xs font-normal select-none dark:text-white"}>
			{context?.domain.y.map((dp, i) => {
				const top = MathUtils.scale(dp.coordinate, 3000, 95);
				return (
					<React.Fragment key={i}>
						<div className={`absolute pl-1`} style={{ top: `${top - 5}%` }}>
							{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
						</div>
						<div className={`opacity-0 top-[${top}%]`}>
							{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
						</div>
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
