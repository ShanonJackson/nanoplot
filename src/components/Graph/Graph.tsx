import React, { CSSProperties, HTMLAttributes, ReactNode, useId } from "react";
import { GraphContext, GraphContextProvider } from "@/hooks/use-graph/use-graph";
import { ChildrenUtils } from "@/utils/children/children";
import { DomainUtils } from "@/utils/domain/domain";
import { cx } from "@/utils/cx/cx";
import { ColorUtils } from "@/utils/color/color";
import { GraphUtils } from "@/utils/graph/graph";

type Props = {
	data?: GraphContext["data"];
	gap?: { top?: number; right?: number; bottom?: number; left?: number };
	interactions?: { hovered?: string[]; pinned?: string[] } /* array of ids */;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
};

export const Graph = ({ data = [], gap, children, interactions, style, className }: Props) => {
	const id = useId();
	const X_SCALE = 3000;
	const Y_SCALE = 3000;

	const ctx: GraphContext = ChildrenUtils.context(children, {
		id,
		layout: { rows: "[graph] auto", columns: "[graph] auto" },
		viewbox: { x: X_SCALE, y: Y_SCALE },
		data: GraphUtils.isXYData(data)
			? data.map((dp, i, dps) => {
					return {
						id: dp.id ?? dp.name,
						stroke: dp.stroke ?? ColorUtils.colorFor(i, dps.length),
						fill: dp.fill === true ? (dp.stroke ?? ColorUtils.colorFor(i, dps.length)) : dp.fill,
						...dp,
					};
				})
			: data.map((dp, i, dps) => {
					return {
						id: dp.id ?? dp.name,
						stroke: dp.stroke ?? ColorUtils.colorFor(i, dps.length),
						fill: dp.fill === true ? (dp.stroke ?? ColorUtils.colorFor(i, dps.length)) : dp.fill,
						...dp,
					};
				}),
		gap: { top: gap?.top ?? 0, left: gap?.left ?? 0, right: gap?.right ?? 0, bottom: gap?.bottom ?? 0 },
		attributes: {
			className: "@container/graph relative grid h-full w-full isolate",
		},
		domain: {
			x: DomainUtils.x.ticks({ data, viewbox: { x: X_SCALE, y: Y_SCALE } }),
			y: DomainUtils.y.ticks({ data, viewbox: { x: X_SCALE, y: Y_SCALE } }),
		},
		interactions: { hovered: interactions?.hovered ?? [], pinned: interactions?.pinned ?? [] },
	});
	return (
		<div
			id={id}
			{...ctx.attributes}
			style={{
				...style,
				...ctx.attributes.style,
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
				padding: `${ctx.gap.top}px ${ctx.gap.right}px ${ctx.gap.bottom}px ${ctx.gap.left}px`,
			}}
			className={cx(ctx.attributes.className, className)}
		>
			<GraphContextProvider value={ctx}>{children}</GraphContextProvider>
		</div>
	);
};

Graph.Row = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...rest} className={cx("col-span-full", rest.className)}>
			{children}
		</div>
	);
};

Graph.Column = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return <div {...rest}>{children}</div>;
};
