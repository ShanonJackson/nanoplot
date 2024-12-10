import React, { HTMLAttributes, ReactNode, useId } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { ChildrenUtils } from "@/utils/children/children";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";
import { DomainUtils } from "@/utils/domain/domain";

type Props = {
	data: GraphContext["data"];
	gap?: { top?: number; right?: number; bottom?: number; left?: number };
	interactions?: { hovered?: string[]; pinned?: string[] } /* array of names or ids */;
	children: ReactNode;
};

export const Graph = ({ data, gap, children }: Props) => {
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
	});

	return (
		<div
			id={id}
			{...ctx.attributes}
			style={{
				...ctx.attributes.style,
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
				padding: `${ctx.gap.top}px ${ctx.gap.right}px ${ctx.gap.bottom}px : ${ctx.gap.top}`,
			}}
		>
			{React.Children.toArray(children).map((child) => {
				/*
					React.createContext but for server components via prop injecting works both server and client side.
					React's 'cache' API which can perform similar functionality only works server side.
				*/
				if (!React.isValidElement(child)) return child;
				return React.cloneElement(child, { context: ctx } as never);
			})}
		</div>
	);
};

Graph.Row = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...rest} style={{ gridColumn: "1 / -1", ...rest.style }}>
			{children}
		</div>
	);
};

Graph.Column = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return <div {...rest}>{children}</div>;
};
