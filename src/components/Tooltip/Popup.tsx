import { cx } from "@/utils/cx/cx";
import styles from "@/components/Tooltip/Tooltip.module.scss";
import * as React from "react";
import { HTMLAttributes, RefObject } from "react";
import { Position } from "@/hooks/use-tether";

type Props = HTMLAttributes<HTMLDivElement> & {
	target: Position;
	border?: string /* border color */;
};

export const Popup = ({ target: { side, alignment }, border, children, ...rest }: Props, ref: RefObject<HTMLDivElement>) => {
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

	const triangle = (() => {
		const path: Record<string, JSX.Element> = {
			["lefttop"]: <path d="M 30 0 L 60 30" />,
			["righttop"]: <path d="M 0 30 L 30 0" />,
			["centertop"]: <path d="M 0 30 L 30 0 L 60 30" />,
			["leftbottom"]: <path d="M 30 30 L 60 0" />,
			["rightbottom"]: <path d="M 0 0 L 30 30" />,
			["centerbottom"]: <path d="M 0 0 L 30 30 L 60 0" />,
		};

		return (
			<svg
				viewBox={"0 0 60 30"}
				stroke={border}
				className={cx(styles.triangle, {
					[styles.triangleBottom]: side === "bottom",
					[styles.triangleTopLeft]: alignment === "left" && side === "top",
					[styles.triangleTopRight]: alignment === "right" && side === "top",
					[styles.triangleTopCenter]: alignment === "center" && side === "top",
					[styles.triangleBottomLeft]: alignment === "left" && side === "bottom",
					[styles.triangleBottomRight]: alignment === "right" && side === "bottom",
					[styles.triangleBottomCenter]: alignment === "center" && side === "bottom",
				})}
			>
				{path[`${alignment}${side}`]}
			</svg>
		);
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
			style={{
				pointerEvents: "none",
				transform,
				...rest.style,
				border: `1px solid ${border}`,
			}}
			className={cx(styles.base, tooltipPositionStyles, rest.className)}
		>
			<div className={cx(styles.inner, innerStyle, tooltipPositionStyles)}>
				{children}
				{triangle}
			</div>
		</div>
	);
};
