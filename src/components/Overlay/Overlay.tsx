import React, { ReactNode, Ref } from "react";
import { cx } from "@/utils/cx/cx";

type HTMLElements = keyof React.JSX.IntrinsicElements;
type Props = React.HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement>; tag: HTMLElements };

export const Overlay = ({ children, tag, ref, ...rest }: Props) => {
	return (
		<div {...rest} className={cx("[grid-area:graph]", rest.className)} ref={ref}>
			{children}
		</div>
	);
};

let cache: Partial<Record<HTMLElements, ({ children, ...rest }: Omit<Props, "tag">) => any>> = {};
export const overlay = new Proxy<Record<HTMLElements, (props: Omit<Props, "tag">) => ReactNode>>(Overlay as never, {
	get: function (_, prop: HTMLElements) {
		if (cache[prop]) return cache[prop];
		/* 
			Ensures this component identity is only created once, this is important because react's remount logic
			will check element.type === lastrender.type, if this is not the same, it will remount the component.
			because overlay.div will run this function every time 'component' will recieve a new function identity
		* */
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
});
