import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";

type Props = {};

export const YAxis = ({}: Props) => {
	return <Graph.Column style={{ border: "1px solid pink" }}>Y AXIS</Graph.Column>;
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
