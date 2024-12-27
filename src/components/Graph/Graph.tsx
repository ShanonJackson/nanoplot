import React, { HTMLAttributes, ReactNode, useId } from "react";
import { GraphContext, GraphContextProvider } from "@/hooks/use-graph/use-graph";
import { ChildrenUtils } from "@/utils/children/children";
import { DomainUtils } from "@/utils/domain/domain";
import { cx } from "@/utils/cx/cx";

type Props = {
	data: GraphContext["data"];
	gap?: { top?: number; right?: number; bottom?: number; left?: number };
	interactions?: { hovered?: string[]; pinned?: string[] } /* array of ids */;
	children: ReactNode;
};

export const Graph = ({ data, gap, children, interactions }: Props) => {
	const id = useId();
	const X_SCALE = 3000;
	const Y_SCALE = 3000;

	const ctx: GraphContext = ChildrenUtils.context(children, {
		id,
		layout: { rows: "[graph] auto", columns: "[graph] auto" },
		viewbox: { x: X_SCALE, y: Y_SCALE },
		data,
		gap: { top: gap?.top ?? 0, left: gap?.left ?? 0, right: gap?.right ?? 0, bottom: gap?.bottom ?? 0 },
		attributes: {
			className: "relative grid h-full w-full",
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
				...ctx.attributes.style,
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
				padding: `${ctx.gap.top}px ${ctx.gap.right}px ${ctx.gap.bottom}px ${ctx.gap.left}px`,
			}}
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
