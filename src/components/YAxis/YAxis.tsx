import React, { ReactNode } from "react";
import { GraphContext, useDataset, useGraph } from "../../hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { MathUtils, scale } from "../../utils/math/math";
import { DomainUtils } from "../../utils/domain/domain";
import { cx } from "../../utils/cx/cx";
import { FromToJumps } from "../../models/domain/domain";

type Props = {
	ticks?: FromToJumps;
	title?: ReactNode;
	display?: (tick: string | number | Date) => ReactNode;
	description?: ReactNode;
	position?: "left" | "right";
	dataset?: string /* dataset property key */;
};

export const YAxis = ({ title, description, display, dataset, position = "left" }: Props) => {
	const { domain } = useDataset(dataset);
	const { viewbox } = useGraph();
	const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
	return (
		<Graph.Column className={"yaxis flex relative text-xs font-normal select-none"}>
			{(title || description) && (
				<div className={"yaxis__labels flex text-center rotate-180 font-bold"}>
					<div className={"yaxis__description text-xs text-gray-500 dark:text-gray-600 [writing-mode:vertical-rl] ml-[10px]"}>
						{description}
					</div>
					<div className={"yaxis__title text-[14px] text-gray-700 dark:text-gray-300 [writing-mode:vertical-rl]"}>{title}</div>
				</div>
			)}
			<div className={"yaxis__ticks mr-2"}>
				{domain.y.map(({ tick, coordinate }, i) => {
					const label = (() => {
						if (display) return display(tick);
						if (typeof tick === "number") return formatter.format(tick);
						return tick.toString();
					})();
					const isVisible = Math.round(coordinate) >= 0 && Math.round(coordinate) <= viewbox.y;
					return (
						<React.Fragment key={i}>
							<div
								className={cx(
									`yaxis__tick absolute right-2 [transform:translateY(-50%)] text-gray-700 dark:text-gray-300`,
									!isVisible && "opacity-0",
								)}
								data-coordinate={coordinate}
								style={{ top: `${scale(coordinate, 3000, 100)}%` }}
							>
								{label}
							</div>
							<div className={`yaxis__tick opacity-0`} aria-hidden={true}>
								{label}
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</Graph.Column>
	);
};

YAxis.context = (ctx: GraphContext, props: Props): GraphContext => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows,
			columns: props.position === "right" ? ctx.layout.columns + " min-content" : "min-content " + ctx.layout.columns,
		},
		domain: props.dataset
			? ctx.domain
			: {
					...ctx.domain,
					x: ctx.domain.x,
					y: DomainUtils.y.ticks(ctx, props.ticks),
				},
		datasets: Object.fromEntries(
			Object.entries(ctx.datasets).map(([datasetId, dataset]) => {
				if (datasetId === props.dataset)
					return [
						datasetId,
						{
							...dataset,
							domain: {
								...dataset.domain,
								x: dataset.domain.x,
								y: DomainUtils.y.ticks({ viewbox: ctx.viewbox, data: dataset.data }, props.ticks),
							},
						},
					];
				return [datasetId, dataset];
			}),
		),
	};
};
