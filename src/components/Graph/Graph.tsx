import React, { CSSProperties, HTMLAttributes, memo, ReactNode, useId } from "react";
import { GraphContext, GraphContextProvider, useGraphColumn } from "../../hooks/use-graph/use-graph";
import { ChildrenUtils } from "../../utils/children/children";
import { GraphUtils } from "../../utils/graph/graph";
import { ColorUtils } from "../../utils/color/color";
import { DomainUtils } from "../../utils/domain/domain";
import { cx, tw } from "../../utils/cx/cx";
import { useIsServerComponent } from "../../hooks/use-is-server-component";

type Props = {
	data?: GraphContext["data"];
	datasets?: Record<string, GraphContext["data"]> /* multiple datasets */;
	gap?: { top?: number; right?: number; bottom?: number; left?: number };
	interactions?: { hovered?: string[]; pinned?: string[] } /* array of ids */;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
};

const GraphComponent = ({ data = [], gap, children, interactions, datasets = {}, style, className }: Props) => {
	const id = useId();
	const X_SCALE = 3000;
	const Y_SCALE = 3000;
	const isServerComponent = useIsServerComponent();
	const ctx: GraphContext = ChildrenUtils.context(children, {
		id,
		layout: { rows: "[graph]auto", columns: "[graph]auto" },
		viewbox: { x: X_SCALE, y: Y_SCALE },
		data: data,
		gap: { top: gap?.top ?? 0, left: gap?.left ?? 0, right: gap?.right ?? 0, bottom: gap?.bottom ?? 0 },
		attributes: {
			className: "@container/graph nanoplot relative grid h-full w-full isolate",
		},
		domain: {
			x: [],
			y: [],
		},
		colors: ColorUtils.scheme.contrast,
		interactions: { hovered: interactions?.hovered ?? [], pinned: interactions?.pinned ?? [] },
		datasets: Object.fromEntries(
			Object.entries(datasets).map(([datasetId, dataset]) => {
				return [
					datasetId,
					{
						colors: ColorUtils.scheme.contrast,
						domain: {
							x: [],
							y: [],
						},
						data: dataset,
					},
				] as const;
			}),
		),
	});

	const setDefaults = <T extends Pick<GraphContext, "data" | "colors" | "domain">>(dataset: T): T => {
		console.log(
			"Y",
			dataset.domain.y.length === 0,
			DomainUtils.y.ticks({ data: dataset.data, viewbox: { x: X_SCALE, y: Y_SCALE } }),
			dataset.domain.y,
		);
		return {
			...dataset,
			domain: {
				x:
					dataset.domain.x.length === 0
						? DomainUtils.x.ticks({ data: dataset.data, viewbox: { x: X_SCALE, y: Y_SCALE } })
						: dataset.domain.x,
				y:
					dataset.domain.y.length === 0
						? DomainUtils.y.ticks({ data: dataset.data, viewbox: { x: X_SCALE, y: Y_SCALE } })
						: dataset.domain.y,
			},
			data: GraphUtils.isXYData(dataset.data)
				? dataset.data.map((dp, i) => {
						/* if there's a fill and no stroke, use fill as the stroke, otherwise use stroke color, or default color */
						return {
							id: dp.id ?? dp.name,
							stroke:
								typeof dp.fill === "string" && !dp.stroke
									? dp.fill
									: (dp.stroke ?? dataset.colors[i] ?? dataset.colors.at(-1)),
							...dp,
						};
					})
				: [...dataset.data]
						.sort((a, b) => Number(b.value) - Number(a.value))
						.map((dp, i) => {
							/* if there's a fill and no stroke, use fill as the stroke, otherwise use stroke color, or default color */
							return {
								id: dp.id ?? dp.name,
								stroke:
									typeof dp.fill === "string" && !dp.stroke
										? dp.fill
										: (dp.stroke ?? dataset.colors[i] ?? dataset.colors.at(-1)),
								...dp,
							};
						}),
			datasets: Object.fromEntries(
				Object.entries("datasets" in dataset ? dataset["datasets"] : {}).map(([datasetId, dctx]) => {
					console.log(setDefaults(dctx));
					return [datasetId, setDefaults(dctx)];
				}),
			),
		};
	};

	const colorized = setDefaults(ctx);

	return (
		<div
			id={id}
			data-ctx={"graph"}
			{...ctx.attributes}
			style={{
				...style,
				...ctx.attributes.style,
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
				padding: `${ctx.gap.top}px ${ctx.gap.right}px ${ctx.gap.bottom}px ${ctx.gap.left}px`,
			}}
			className={tw(ctx.attributes.className, className)}
		>
			{isServerComponent && (
				/* CTX for server components. */
				<script id={id + "-context"} type={"application/json"} dangerouslySetInnerHTML={{ __html: JSON.stringify(colorized) }} />
			)}
			<GraphContextProvider value={colorized}>{children}</GraphContextProvider>
		</div>
	);
};

export const Graph = Object.assign(GraphComponent, {
	Row: ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
		const column = useGraphColumn();

		return (
			<>
				{new Array(column.left).fill(null).map((_, i) => (
					<div key={i} />
				))}
				<div {...rest}>{children}</div>
				{new Array(column.right).fill(null).map((_, i) => (
					<div key={i} />
				))}
			</>
		);
	},
	Column: ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
		return <div {...rest}>{children}</div>;
	},
});
