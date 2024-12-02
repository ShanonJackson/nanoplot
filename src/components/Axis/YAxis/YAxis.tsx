import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";
import styles from "./YAxis.module.scss";
import { MathUtils } from "@/utils/math/math";

type Props = {
	context?: GraphContext;
};

export const YAxis = ({ context }: Props) => {
	return <Graph.Column style={{ border: "1px solid pink" }}>
		{context?.domain.y.map((dp, i) => {
			const top = 100 - MathUtils.scale(dp.coordinate, 3000, 100)
			return (
				<div className={styles.tick} key={i} style={{top: `${top}%`}}>
					{typeof dp.tick === "number" ? dp.tick.toFixed(2) : dp.tick.toString()}
				</div>
			)
		})}
	</Graph.Column>;
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
