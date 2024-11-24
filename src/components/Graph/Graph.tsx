import React, { HTMLAttributes, ReactNode, useId } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { ChildrenUtils } from "@/utils/children/children";

type Props = {
	children: ReactNode;
};

export const Graph = ({ children }: Props) => {
	const id = useId();
	const ctx: GraphContext = ChildrenUtils.context(children, {
		id,
		layout: { rows: "[graph] auto", columns: "[graph] auto" },
		domain: { x: [], y: [] },
		viewbox: { x: 3000, y: 3000 },
		dataset: [],
	});

	return (
		<div
			id={id}
			className={"grid h-full w-full"}
			style={{
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
			}}
		>
			{React.Children.toArray(children).map((child) => {
				/* React.createContext but for server components via prop injecting */
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
