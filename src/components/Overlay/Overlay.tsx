import { ReactNode, RefObject } from "react";
import { cx } from "@/utils/cx/cx";
import styles from "./Overlay.module.scss";

type HTMLElements = keyof React.JSX.IntrinsicElements;
type Props = React.HTMLAttributes<HTMLDivElement> & {
	ref?: RefObject<HTMLDivElement>;
	tag: HTMLElements;
};
const Overlay = ({ children, ...rest }: Props) => {
	return (
		<div {...rest} className={cx("absolute", styles.base, rest.className)}>
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
