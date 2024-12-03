import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";
import styles from "./XAxis.module.scss";
import { MathUtils } from "@/utils/math/math";
import React from "react";

type Props = {
	context?: GraphContext;
};

export const XAxis = ({ context }: Props) => {
	return <Graph.Row className={styles.base}>
		{context?.domain.x.map((dp, i) => {
			const left = MathUtils.scale(dp.coordinate, 3000, 100)
			return (
				<React.Fragment key={i}>
					<div className={styles.tick} style={{left: `${left}%`}}>
						{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
					</div>
					<div className={styles.tickOpacity}>
						{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
					</div>
				</React.Fragment>
			);
		})}
	</Graph.Row>;
};

XAxis.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows + " min-content",
			columns: ctx.layout.columns,
		},
	};
};
