import React, { ComponentProps, ReactNode } from "react";
import { InternalGraphContext, useDataset, useGraph } from "../../hooks/use-graph/use-graph";
import { Graph } from "../Graph/Graph";
import { DomainUtils } from "../../utils/domain/domain";
import { scale } from "../../utils/math/math";
import { cx, tw } from "../../utils/cx/cx";
import { FromToJumps } from "../../models/domain/domain";

type Props = Omit<ComponentProps<"div">, "title"> & {
	ticks?: FromToJumps;
	title?: ReactNode;
	description?: ReactNode;
	dataset?: string;
	display?: (tick: number | string | Date) => ReactNode;
};

export const XAxis = ({ display, title, ticks, description, dataset, ...rest }: Props) => {
	const { domain, viewbox } = useDataset(dataset);
	const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

	const labels = domain.x.map(({ tick, coordinate }) => {
		const label = (() => {
			if (display) return display(tick);
			if (typeof tick === "number") return formatter.format(tick);
			return tick.toString();
		})();
		return { tick, coordinate, label };
	});

	const characters = labels.reduce((acc, { label, coordinate }) => {
		if (coordinate > viewbox.x || coordinate < 0) return acc;
		return acc + (typeof label === "string" ? label.length : 0);
	}, 0);
	const breakpoint = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 130, 160, 190].find((bp) => bp >= characters);
	return (
		<Graph.Row {...rest} className={tw("xaxis items-center relative pt-2 text-xs font-normal select-none", rest.className)}>
			<div className={"xaxis__ticks @container-[inline-size] text-center"}>
				<div className={"flex h-full w-full relative"}>
					{labels.map(({ label }, i) => {
						return (
							<div
								className={cx(
									"xaxis__tick text-nowrap invisible [writing-mode:vertical-lr]",
									breakpoint === 10 && "@[width:10ch]:[writing-mode:unset]",
									breakpoint === 20 && "@[width:20ch]:[writing-mode:unset]",
									breakpoint === 30 && "@[width:30ch]:[writing-mode:unset]",
									breakpoint === 40 && "@[width:40ch]:[writing-mode:unset]",
									breakpoint === 50 && "@[width:50ch]:[writing-mode:unset]",
									breakpoint === 60 && "@[width:60ch]:[writing-mode:unset]",
									breakpoint === 70 && "@[width:70ch]:[writing-mode:unset]",
									breakpoint === 80 && "@[width:80ch]:[writing-mode:unset]",
									breakpoint === 90 && "@[width:90ch]:[writing-mode:unset]",
									breakpoint === 100 && "@[width:100ch]:[writing-mode:unset]",
									breakpoint === 130 && "@[width:130ch]:[writing-mode:unset]",
									breakpoint === 160 && "@[width:160ch]:[writing-mode:unset]",
									breakpoint === 190 && "@[width:190ch]:[writing-mode:unset]",
								)}
								key={i}
							>
								{label}
							</div>
						);
					})}
					{labels.map(({ coordinate, label }, i) => {
						const x = scale(coordinate, 3000, 100);
						if (x > 100 || x < 0) return null;
						return (
							<React.Fragment key={i}>
								<div
									className={cx(
										"xaxis__tick absolute top-0 text-gray-700 dark:text-gray-300 text-nowrap",
										"[writing-mode:vertical-lr] [transform:rotate(20deg)_translateX(50%)_scale(-1,_-1)_translateY(calc(-100%_-_5px))] [transform-origin:0_0]",
										breakpoint === 10 &&
											"@[width:10ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:10ch]:![writing-mode:unset]",
										breakpoint === 20 &&
											"@[width:20ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:20ch]:![writing-mode:unset]",
										breakpoint === 30 &&
											"@[width:30ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:30ch]:![writing-mode:unset]",
										breakpoint === 40 &&
											"@[width:40ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:40ch]:![writing-mode:unset]",
										breakpoint === 50 &&
											"@[width:50ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:50ch]:![writing-mode:unset]",
										breakpoint === 60 &&
											"@[width:60ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:60ch]:![writing-mode:unset]",
										breakpoint === 70 &&
											"@[width:70ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:70ch]:![writing-mode:unset]",
										breakpoint === 80 &&
											"@[width:80ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:80ch]:![writing-mode:unset]",
										breakpoint === 90 &&
											"@[width:90ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:90ch]:![writing-mode:unset]",
										breakpoint === 100 &&
											"@[width:100ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:100ch]:![writing-mode:unset]",
										breakpoint === 130 &&
											"@[width:130ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:130ch]:![writing-mode:unset]",
										breakpoint === 160 &&
											"@[width:160ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:160ch]:![writing-mode:unset]",
										breakpoint === 190 &&
											"@[width:190ch]:![transform:rotate(0deg)_translateX(-50%)] @[width:190ch]:![writing-mode:unset]",
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
			{(title || description) && (
				<div className={"xaxis__labels text-center mt-[10px] font-bold"}>
					<div className={"text-[14px] text-gray-700 dark:text-gray-300"}>{title}</div>
					<div className={"text-xs text-gray-500 dark:text-gray-600"}>{description}</div>
				</div>
			)}
		</Graph.Row>
	);
};

XAxis.context = (ctx: InternalGraphContext, props: Props): InternalGraphContext => {
	const dset = props.dataset ? (ctx.datasets[props.dataset] ?? ctx) : ctx;
	const domain = DomainUtils.x.ticks({ ...dset, viewbox: ctx.viewbox }, props.ticks);

	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: ctx.layout.rows + " min-content",
			columns: ctx.layout.columns,
		},
		domain: {
			y: ctx.domain.y,
			x: props.dataset ? ctx.domain.x : domain,
		},
		datasets: Object.fromEntries(
			Object.entries(ctx.datasets).map(([dsetId, dataset]) => {
				return [dsetId, { ...dataset, domain: { ...dataset.domain, x: domain } }];
			}),
		),
	};
};
