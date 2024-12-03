import React, { HTMLAttributes, ReactNode, useId } from "react";
import { GraphContext } from "@/hooks/use-graph";
import { ChildrenUtils } from "@/utils/children/children";
import { GraphUtils } from "@/utils/graph/graph";
import { MathUtils } from "@/utils/math/math";

type Props = {
	data: GraphContext["data"];
	children: ReactNode;
};

export const Graph = ({ data, children }: Props) => {
	const id = useId();
	const X_SCALE = 3000;
	const Y_SCALE = 3000;

	const yMax = GraphUtils.isXYData(data) ? Math.max(...data.flatMap((line) => line.data.map((d) => +d.y))) : 0;
	const yDomain = [0, 25, 50, 75, 100].map((percent) => ({
		tick: MathUtils.scale(percent, 100, yMax),
		coordinate: Y_SCALE * (percent / 100),
	}));

	const xMax = GraphUtils.isXYData(data) ? Math.max(...data.flatMap((line) => line.data.map((d) => +d.x))) : 0;
	const xMin = GraphUtils.isXYData(data) ? Math.min(...data.flatMap((line) => line.data.map((d) => +d.x))) : 0;
	// generate 10 ticks between xmin and xmax
	const xDomain = Array.from({ length: 10 }, (_, i) => ({
		tick: MathUtils.scale(i, [0, 9], [xMin, xMax]),
		coordinate: MathUtils.scale(i, [0, 9], [0, X_SCALE]),
	}));
	console.log({ xMin, xMax, yMax });

	const ctx: GraphContext = ChildrenUtils.context(children, {
		id,
		layout: { rows: "[graph] auto", columns: "[graph] auto" },
		domain: { x: xDomain, y: yDomain },
		viewbox: { x: X_SCALE, y: Y_SCALE },
		data,
		attributes: {
			className: "relative grid h-full w-full",
		},
	});

	console.log({
		xDomain,
		yDomain,
	});

	return (
		<div
			id={id}
			{...ctx.attributes}
			style={{
				...ctx.attributes.style,
				gridTemplateColumns: ctx.layout.columns,
				gridTemplateRows: ctx.layout.rows,
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
