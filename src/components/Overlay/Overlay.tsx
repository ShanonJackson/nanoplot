import React, { ComponentPropsWithRef, ReactNode, Ref } from "react";
import { OverlayRect } from "./OverlayRect";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { scale } from "../../utils/math/math";
import { TemporalDate, useGraph } from "../../hooks/use-graph/use-graph";
import { cx } from "../../utils/cx/cx";
import { OverlayTriangle } from "./OverlayTriangle";
import { OverlayCross } from "./OverlayCross";
import { OverlayDiamond } from "./OverlayDiamond";
import { OverlayCircle } from "./OverlayCircle";

type HTMLElements = keyof React.JSX.IntrinsicElements;
type Props = React.HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
	tag: HTMLElements;
	x?: { coordinate: number } | { tick: number | TemporalDate | string };
	y?: { coordinate: number } | { tick: number | TemporalDate | string };
};

const Components = {
	rect: OverlayRect,
	triangle: OverlayTriangle,
	cross: OverlayCross,
	diamond: OverlayDiamond,
	circle: OverlayCircle,
};

export const Overlay = ({ children, tag: Tag, ref, x, y, ...rest }: Props) => {
	if (Tag in Components) {
		const Component = Components[Tag as keyof typeof Components];
		return (
			<Component {...(rest as any)} x={x} y={y}>
				{children}
			</Component>
		);
	}

	const { domain, viewbox } = useGraph();
	const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
	const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
	const x1 = (() => {
		if (!x) return undefined;
		if ("coordinate" in x) return scale(x.coordinate, viewbox.x, 100) + "%";
		if ("tick" in x) return scale(xForValue(x.tick), viewbox.x, 100) + "%";
		return undefined;
	})();
	const y1 = (() => {
		if (!y) return undefined;
		if ("coordinate" in y) return scale(y.coordinate, viewbox.y, 100) + "%";
		if ("tick" in y) return scale(yForValue(y.tick), viewbox.y, 100) + "%";
		return undefined;
	})();
	const TTag = Tag as any;
	return (
		<TTag
			{...rest}
			className={cx("[grid-area:graph]", rest.className)}
			ref={ref}
			style={x1 && y1 ? { position: "absolute", left: x1, top: y1, ...rest.style } : rest.style}
		>
			{children}
		</TTag>
	);
};

type OverlayProxy = {
	[K in HTMLElements]: (props: Omit<ComponentPropsWithRef<K>, "x" | "y"> & { x: Props["x"]; y: Props["y"] }) => ReactNode;
} & {
	rect: typeof OverlayRect;
	triangle: typeof OverlayTriangle;
	diamond: typeof OverlayDiamond;
	cross: typeof OverlayCross;
	circle: typeof OverlayCircle;
};

let cache: Partial<Record<HTMLElements, ({ children, ...rest }: Omit<Props, "tag">) => any>> = {};
export const overlay: OverlayProxy = new Proxy<
	Record<HTMLElements, (props: Omit<Props, "tag">) => ReactNode> & { rect: typeof OverlayRect }
>(Overlay as never, {
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
}) as any;
