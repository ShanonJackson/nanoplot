import { GraphContext } from "@/hooks/use-graph";
import { Graph } from "../Graph/Graph";

type Props = {
	position?: "top" | "bottom" | "left" | "right";
	context?: GraphContext;
};

export const Legend = ({ context, position = "top" }: Props) => {
	if (position === "left" || position === "right") return <Graph.Column>placeholder</Graph.Column>;
	return <Graph.Row>placeholder</Graph.Row>;
};

Legend.context = (ctx: GraphContext, props: Props) => {
	const rows = (() => {
		if (props.position === "top") return "max-content " + ctx.layout.rows;
		if (props.position === "bottom") return ctx.layout.rows + " max-content";
		return ctx.layout.rows;
	})();
	const columns = (() => {
		if (props.position === "left") return "max-content " + ctx.layout.columns;
		if (props.position === "right") return ctx.layout.columns + " max-content";
		return ctx.layout.columns;
	})();
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows,
			columns,
		},
	};
};
