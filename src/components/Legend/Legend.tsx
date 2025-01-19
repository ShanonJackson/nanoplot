import React from "react";
import { GraphContext, useGraph, useGraphColumn } from "@/hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { ReactNode } from "react";
import { ColorUtils } from "@/utils/color/color";
import { cx } from "@/utils/cx/cx";

type Props = {
	position?: "top" | "bottom" | "left" | "right";
	alignment?: "center" | "start" | "end";
	children?: ReactNode;
};

export const Legend = ({ position = "top", alignment = "center" }: Props) => {
	const context = useGraph();
	const Element = position === "top" || position === "bottom" ? Graph.Row : Graph.Column;
	const column = useGraphColumn(context);
	return (
		<Element
			className={cx(
				"flex",
				"gap-2",
				(position === "left" || position === "right") && "flex-col",
				position === "right" && "pl-4",
				position === "left" && "pr-4",
				alignment === "start" && "justify-start",
				alignment === "end" && "justify-end",
				alignment === "center" && "justify-center",
			)}
			style={position === "top" || position === "bottom" ? { gridColumn: column } : undefined}
		>
			{context.data?.map(({ name, stroke }, i, dps) => {
				return (
					<div key={i} className={"flex items-center"}>
						<div className={"size-4 mr-1 rounded-full"} style={{ background: stroke ?? ColorUtils.colorFor(i, dps.length) }} />
						<div className={"text-nowrap"}>{name}</div>
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
