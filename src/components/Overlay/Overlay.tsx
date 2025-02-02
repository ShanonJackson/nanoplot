import React, { ReactNode, Ref } from "react";
import { OverlayRect } from "./OverlayRect";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { MathUtils } from "../../utils/math/math";
import { useGraph } from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";

type HTMLElements = keyof React.JSX.IntrinsicElements;
type Props = React.HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
	tag: HTMLElements;
	x?: { coordinate: number } | { tick: number | Date | string };
	y?: { coordinate: number } | { tick: number | Date | string };
};

export const Overlay = ({ children, tag, ref, x, y, ...rest }: Props) => {
	if (tag === "rect") {
		return <OverlayRect {...(rest as any)}>{children}</OverlayRect>;
	}
	const { domain, viewbox } = useGraph();
	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

	const x1 = (() => {
		if (!x) return undefined;
		if ("coordinate" in x) return MathUtils.scale(x.coordinate, viewbox.x, 100) + "%";
		if ("tick" in x) return xForValue(x.tick);
		return undefined;
	})();
	const y1 = (() => {
		if (!y) return undefined;
		if ("coordinate" in y) return MathUtils.scale(y.coordinate, viewbox.y, 100) + "%";
		if ("tick" in y) return yForValue(y.tick);
		return undefined;
	})();

	return (
		<div
			{...rest}
			className={cx("[grid-area:graph]", rest.className)}
			ref={ref}
			style={x1 && y1 ? { position: "absolute", left: x1, top: y1, ...rest.style } : rest.style}
		>
			{children}
		</div>
	);
};

let cache: Partial<Record<HTMLElements, ({ children, ...rest }: Omit<Props, "tag">) => any>> = {};
export const overlay = new Proxy<Record<HTMLElements, (props: Omit<Props, "tag">) => ReactNode> & { rect: typeof OverlayRect }>(
	Overlay as never,
	{
		get: function (_, prop: HTMLElements) {
			if (cache[prop]) return cache[prop];
			/* 
			Ensures this component identity is only created once, this is important because react's remount logic
			will check element.type === lastrender.type, if this is not the same, it will remount the component.
			because overlay.div will run this function every time 'component' will recieve a new function identity
		*/
			const component = ({ children, ...rest }: Omit<Props, "tag">) => {
				return (
					<Overlay {...rest} tag={prop}>
						{children}
					</Overlay>
				);
			};
			cache[prop] = component;
			return component;
		},
	},
);
