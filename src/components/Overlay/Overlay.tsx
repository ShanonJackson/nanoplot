import { ReactNode, RefObject } from "react";
import { cx } from "@/utils/cx/cx";
import styles from "./Overlay.module.scss";
import { GraphContext } from "@/hooks/use-graph";

type HTMLElements = keyof React.JSX.IntrinsicElements;
type Props = React.HTMLAttributes<HTMLDivElement> & {
	ref?: RefObject<HTMLDivElement>;
	context?: GraphContext;
	tag: HTMLElements;
};

export const Overlay = ({ children, context, tag, ...rest }: Props) => {
	return (
		<div {...rest} className={cx("[grid-area:graph]", rest.className)}>
			{children}
		</div>
	);
};

export const overlay = new Proxy<Record<HTMLElements, (props: Omit<Props, "tag">) => ReactNode>>(Overlay as never, {
	get: function (target, prop: HTMLElements) {
		return ({ children, ...rest }: Omit<Props, "tag">) => {
			return (
				<Overlay {...rest} tag={prop}>
					{children}
				</Overlay>
			);
		};
	},
});
