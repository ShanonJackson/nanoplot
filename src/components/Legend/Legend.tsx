import { GraphContext } from "@/hooks/use-graph";
import { Graph } from "../Graph/Graph";
import { ReactNode } from "react";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";

type Props = {
	position?: "top" | "bottom" | "left" | "right";
	alignment?: "center" | "left" | "right";
	children?: ReactNode;
	context?: GraphContext;
};

export const Legend = ({ context, position = "top", alignment = "left" }: Props) => {
	const Element = position === "top" || position === "bottom" ? Graph.Row : Graph.Column;
	return (
		<Element
			className={cx(
				"absolute",
				"flex",
				"gap-2",
				position === "right" && "flex-col top-0 bottom-0 right-0",
				position === "left" && "flex-col top-0 bottom-0 left-0",
				position === "bottom" && "bottom-0 left-0 right-0",
				position === "top" && "top-0 left-0 right-0",
				alignment === "left" && "justify-start",
				alignment === "right" && "justify-end",
				alignment === "center" && "justify-center",
			)}
		>
			{context?.data?.map(({ name, stroke }, i, dps) => {
				return (
					<div key={i} className={"flex items-center"}>
						<div className={"size-4 mr-1 rounded-full"} style={{ background: stroke ?? ColorUtils.colorFor(i, dps.length) }} />
						<div>{name}</div>
					</div>
				);
			})}
		</Element>
	);
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
