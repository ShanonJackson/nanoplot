import React, { ReactNode } from "react";
import { GraphContext, useGraph, useGraphColumn } from "../../hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { DomainUtils } from "../../utils/domain/domain";
import { MathUtils } from "../../utils/math/math";
import { cx } from "../../utils/cx/cx";
import { FromToJumps } from "../../models/domain/domain";

type Props = {
	ticks?: FromToJumps;
	title?: ReactNode;
	description?: ReactNode;
	display?: (tick: number | string | Date) => ReactNode;
};

export const XAxis = ({ display, title, description }: Props) => {
	const context = useGraph();
	const column = useGraphColumn(context);
	const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

	const labels = context.domain.x.map(({ tick, coordinate }) => {
		const label = (() => {
			if (display) return display(tick);
			if (typeof tick === "number") return formatter.format(tick);
			return tick.toString();
		})();
		return { tick, coordinate, label };
	});

	const characters = labels.reduce((acc, { label }) => acc + (typeof label === "string" ? label.length : 0), 0);
	const breakpoint = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].find((bp) => bp >= characters);

	return (
		<Graph.Row className={"xaxis items-center relative pt-2 text-xs font-normal select-none"} style={{ gridColumn: column }}>
			<div className={"xaxis__ticks flex relative"}>
				{labels.map(({ label }, i) => {
					return (
						<div className={"xaxis__tick opacity-0 text-nowrap"} key={i}>
							{label}
						</div>
					);
				})}
				<div className={"xaxis__ticks absolute top-0 left-0 flex @container-[size] h-[1.25em] w-full"}>
					<div className={"w-full relative"}>
						{labels.map(({ coordinate, label }, i) => {
							const x = MathUtils.scale(coordinate, 3000, 100);
							if (x > 100 || x < 0) return null;
							return (
								<React.Fragment key={i}>
									<div
										className={cx(
											"xaxis__tick absolute top-0 -translate-x-1/2 text-gray-700 dark:text-gray-300 text-nowrap",
											"rotate-[-60deg] translate-y-calc(-100% - 5px)",
											breakpoint === 10 && "@[width:10ch]:!rotate-0",
											breakpoint === 20 && "@[width:20ch]:!rotate-0",
											breakpoint === 30 && "@[width:30ch]:!rotate-0",
											breakpoint === 40 && "@[width:40ch]:!rotate-0",
											breakpoint === 50 && "@[width:50ch]:!rotate-0",
											breakpoint === 60 && "@[width:60ch]:!rotate-0",
											breakpoint === 70 && "@[width:70ch]:!rotate-0",
											breakpoint === 80 && "@[width:80ch]:!rotate-0",
											breakpoint === 90 && "@[width:90ch]:!rotate-0",
											breakpoint === 100 && "@[width:100ch]:!rotate-0",
										)}
										style={{ left: `${x}%` }}
									>
										{label}
									</div>
								</React.Fragment>
							);
						})}
					</div>
				</div>
			</div>
			{(title || description) && (
				<div className={"xaxis__labels text-center mt-[10px] font-bold"}>
					<div className={"text-[14px] text-gray-700 dark:text-gray-300"}>{title}</div>
					<div className={"text-xs text-gray-500 dark:text-gray-600"}>{description}</div>
				</div>
			)}
		</Graph.Row>
	);
};

XAxis.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows + " min-content",
			columns: ctx.layout.columns,
		},
		domain: {
			...ctx.domain,
			y: ctx.domain.y,
			x: DomainUtils.x.ticks(ctx, props.ticks),
		},
	};
};
