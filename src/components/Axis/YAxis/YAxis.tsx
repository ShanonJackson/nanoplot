import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";
import styles from "./YAxis.module.scss";
import { MathUtils } from "@/utils/math/math";
import React from "react";

type Props = {
	context?: GraphContext;
};

export const YAxis = ({ context }: Props) => {
	return (
		<Graph.Column className={"relative"} style={{ border: "1px solid pink" }}>
			{context?.domain.y.map((dp, i) => {
				const top = 100 - MathUtils.scale(dp.coordinate, 3000, 100);
				return (
					<React.Fragment key={i}>
						<div className={styles.tick} style={{ top: `${top}%` }}>
							{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
						</div>
						<div className={styles.tickOpacity} style={{ top: `${top}%` }}>
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
