import { Graph } from "@/components/Graph/Graph";
import { GraphContext } from "@/hooks/use-graph";

type Props = {};

export const XAxis = ({}: Props) => {
	return <Graph.Row>PLACEHOLDER X AXIS</Graph.Row>;
};

XAxis.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: "min-content " + ctx.layout.rows,
			columns: ctx.layout.columns,
		},
	};
};
