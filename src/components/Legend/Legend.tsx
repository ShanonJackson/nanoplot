import React, { ReactNode } from "react";
import { Graph } from "../Graph/Graph";
import { GraphContext, useGraph, useGraphColumn } from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";

type Props = {
	position?: "top" | "bottom" | "left" | "right";
	alignment?: "center" | "start" | "end";
	children?: ReactNode;
};

export const Legend = ({ position = "top", alignment = "center" }: Props) => {
	const context = useGraph();
	const Element = position === "top" || position === "bottom" ? Graph.Row : Graph.Column;
	const column = useGraphColumn(context);
	const {
		interactions: { pinned, hovered },
	} = context;

	return (
		<Element
			className={cx(
				"flex gap-3",
				(position === "left" || position === "right") && "flex-col",
				position === "right" && "pl-4",
				position === "left" && "pr-4",
				position === "top" && "pb-3 pt-2",
				position === "bottom" && "pt-3 pb-2",
				alignment === "start" && "justify-start",
				alignment === "end" && "justify-end",
				alignment === "center" && "justify-center",
			)}
			style={position === "top" || position === "bottom" ? { gridColumn: column } : undefined}
		>
			{context.data
				.map((dp) => ({ ...dp, group: dp.group ?? "" }))
				.sort((a, b) => a.group.localeCompare(b.group))
				.map(({ id, name, fill, stroke, ...datapoint }, i, datapoints) => {
					const disabled = pinned.length && !pinned.includes(String(id)) && !hovered.includes(String(id));
					const isLastInGroup = datapoints[i + 1]?.group ? datapoints[i + 1].group !== datapoint.group : false;
					const bg = fill ?? stroke;

					return (
						<div key={i} className={"flex items-center"}>
							<div
								className={cx("size-4 mr-1 rounded-full", disabled && "bg-gray-400 opacity-[0.8]")}
								style={disabled ? undefined : { background: bg?.replace("mask:", "") }}
							/>
							<div className={cx("text-nowrap", disabled && "text-gray-400")}>{name}</div>
							{isLastInGroup && <div className={"h-[16px] bg-gray-700 w-[1px] ml-[10px]"} />}
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
