import React, { JSX, ReactNode } from "react";
import { Graph } from "../Graph/Graph";
import {
	InternalCartesianDataset,
	InternalGraphContext,
	InternalSegmentDataset,
	useDatasets,
	useGraph,
} from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";
import { GradientUtils } from "../../utils/gradient/gradient";

type Props = Omit<JSX.IntrinsicElements["div"], "onClick" | "onMouseEnter" | "onMouseLeave"> & {
	position?: "top" | "bottom" | "left" | "right";
	alignment?: "center" | "start" | "end";
	onClick?: (datapoint: InternalCartesianDataset[number] | InternalSegmentDataset[number]) => void;
	onMouseEnter?: (datapoint: InternalCartesianDataset[number] | InternalSegmentDataset[number]) => void;
	onMouseLeave?: (datapoint: InternalCartesianDataset[number] | InternalSegmentDataset[number]) => void;
	onMouseMove?: (datapoint: InternalCartesianDataset[number] | InternalSegmentDataset[number]) => void;
	children?: ReactNode;
	datasets?: string[];
};

export const Legend = ({
	position = "top",
	alignment = "center",
	onClick,
	onMouseEnter,
	onMouseMove,
	onMouseLeave,
	datasets,
	...rest
}: Props) => {
	const context = useGraph();
	const dsets = useDatasets(datasets);
	const Element = position === "top" || position === "bottom" ? Graph.Row : Graph.Column;
	const {
		interactions: { pinned, hovered },
	} = context;

	const render = (ctx: InternalGraphContext) => {
		return ctx.data
			.map((dp) => ({ ...dp, group: dp.group ?? "" }))
			.sort((a, b) => a.group.localeCompare(b.group))
			.map((datapoint, i, datapoints) => {
				const { id, name, fill, stroke } = datapoint;
				const disabled = pinned.length && !pinned.includes(String(id)) && !hovered.includes(String(id));
				const isLastInGroup = datapoints[i + 1]?.group ? datapoints[i + 1].group !== datapoint.group : false;
				const bg = fill ?? stroke;
				const deserialized = bg?.replace("mask:", "")?.includes("linear-gradient")
					? GradientUtils.deserialize({
							gradient: bg.replace("mask:", ""),
							viewbox: ctx.viewbox,
							domain: ctx.domain,
						})
					: bg;
				return (
					<div
						key={i}
						className={cx(
							"flex items-center",
							(onClick || onMouseEnter || onMouseLeave || onMouseMove) && "cursor-pointer user-select-none",
						)}
						onClick={() => onClick?.(datapoint)}
						onMouseEnter={() => onMouseEnter?.(datapoint)}
						onMouseLeave={() => onMouseLeave?.(datapoint)}
						onMouseMove={() => onMouseMove?.(datapoint)}
					>
						<div
							className={cx("size-4 mr-1 rounded-full", disabled && "bg-gray-400 opacity-[0.8]")}
							style={disabled ? undefined : { background: deserialized }}
						/>
						<div className={cx("text-nowrap", disabled && "text-gray-400")}>{name}</div>
						{isLastInGroup && <div className={"h-[16px] bg-gray-700 w-[1px] ml-[10px]"} />}
					</div>
				);
			});
	};

	return (
		<Element
			{...rest}
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
				rest.className,
			)}
		>
			{render(context)}
			{dsets.map((d) => render(d))}
		</Element>
	);
};

Legend.context = (ctx: InternalGraphContext, { position = "top" }: Props) => {
	const rows = (() => {
		if (position === "top") return "max-content " + ctx.layout.rows;
		if (position === "bottom") return ctx.layout.rows + " max-content";
		return ctx.layout.rows;
	})();
	const columns = (() => {
		if (position === "left") return "max-content " + ctx.layout.columns;
		if (position === "right") return ctx.layout.columns + " max-content";
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
