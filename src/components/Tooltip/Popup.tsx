import React, { HTMLAttributes, JSX, Ref } from "react";
import { cx } from "../../utils/cx/cx";
import { Position } from "../../hooks/use-tether";
import styles from "./Tooltip.module.scss";

type Props = HTMLAttributes<HTMLDivElement> & {
	target: Position;
	border?: string /* border color */;
	ref?: Ref<HTMLDivElement>;
};

export const Popup = ({ ref, target: { side, alignment }, border, children, ...rest }: Props) => {
	const transform = (() => {
		if (alignment === "left") return "translate(-10%, 0)";
		if (alignment === "right") return "translate(10%, 0)";
		if (alignment === "top") return "translate(0, -10%)";
		if (alignment === "bottom") return "translate(0, 10%)";
	})();

	const tooltipPositionStyles = (() => {
		if (side === "top" && alignment === "center") return styles.innerTopCenter;
		if (side === "top" && alignment === "left") return styles.innerTopLeft;
		if (side === "top" && alignment === "right") return styles.innerTopRight;
		if (side === "bottom" && alignment === "center") return styles.innerBottomCenter;
		if (side === "bottom" && alignment === "left") return styles.innerBottomLeft;
		if (side === "bottom" && alignment === "right") return styles.innerBottomRight;
		if (side === "left" && alignment === "center") return styles.innerLeftCenter;
		if (side === "left" && alignment === "top") return styles.innerLeftTop;
		if (side === "left" && alignment === "bottom") return styles.innerLeftBottom;
		if (side === "right" && alignment === "center") return styles.innerRightCenter;
		if (side === "right" && alignment === "top") return styles.innerRightTop;
		if (side === "right" && alignment === "bottom") return styles.innerRightBottom;
	})();

	const innerStyle = (() => {
		if (side === "top") return styles.innerTop;
		if (side === "bottom") return styles.innerBottom;
		if (side === "right") return styles.innerRight;
		if (side === "left") return styles.innerLeft;
		if (alignment === "left" && side === "center") return styles.innerLeftMiddle;
		if (alignment === "right" && side === "center") return styles.innerRightMiddle;
	})();
	return (
		<div
			ref={ref}
			{...rest}
			className={cx(styles.base, tooltipPositionStyles, rest.className)}
			style={{
				...rest.style,
				transform,
				background: border,
				boxShadow: `inset 0 0 0 1px ${border}`,
			}}
		>
			<div className={cx(styles.inner, innerStyle, tooltipPositionStyles)}>{children}</div>
		</div>
	);
};
