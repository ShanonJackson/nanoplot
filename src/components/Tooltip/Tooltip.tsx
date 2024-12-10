import * as React from "react";
import { JSX, RefObject, useRef, useState } from "react";
import { cx } from "../../utils/cx/cx";
import styles from "./Tooltip.module.scss";
import { Position, useTether } from "../../hooks/use-tether";
import { Portal } from "../Portal/Portal";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { Popup } from "@/components/Tooltip/Popup";

export type Props = Omit<JSX.IntrinsicElements["div"], "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> & {
	active?: boolean;
	delay?: number;
	trigger: (ref: RefObject<never>, active: boolean) => React.ReactNode;
	disabled?: boolean;
	targetPosition?: Position;
	tetherPosition?: Position;
	interactable?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	bounds?: React.RefObject<Element>;
	contain?: React.RefObject<Element> /* if the tooltip renders outside this box, will render null */;
	border?: string;
	collision?: boolean;
};

const TOOLTIP_Z_INDEX = 20; /* as defined in variables.scss */
export const Tooltip = ({
	active,
	border,
	delay = 0,
	targetPosition = { alignment: "center", side: "bottom" },
	tetherPosition = { alignment: "center", side: "top" },
	trigger,
	className,
	style,
	children,
	interactable,
	disabled,
	onClose = Object,
	bounds,
	contain,
	collision = true,
	...rest
}: Props) => {
	const target = useRef<Element>(null);
	const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>();
	const [isInsideTooltip, setIsInsideTooltip] = useState(false);

	const {
		styles: tetherStyles,
		positions: {
			tetherPosition: { alignment, side },
		},
	} = useTether({
		targetPosition,
		tetherPosition,
		targetRef: target,
		tetherRef: tooltipRef,
		boundingContainer: bounds,
		onCollision: () => ({ targetPosition, tetherPosition }),
	});

	useOnClickOutside([target, tooltipRef], onClose);

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

	const open = Boolean(interactable ? active || isInsideTooltip : active);

	const rect = contain?.current?.getBoundingClientRect();
	const tooltip = tooltipRef.current?.getBoundingClientRect();
	const isInsideContainer =
		rect && tooltip
			? rect.left < tooltip.left && rect.right > tooltip.right && rect.top < tooltip.top && rect.bottom > tooltip.bottom
			: true;

	return (
		<>
			{trigger(target as RefObject<never>, open)}
			{!disabled && isInsideContainer ? (
				<Portal>
					{open && Boolean(children) && (
						<Popup
							ref={setTooltipRef}
							style={tetherStyles}
							border={border}
							onMouseEnter={() => setIsInsideTooltip(true)}
							target={{ side, alignment }}
							onMouseLeave={() => setIsInsideTooltip(false)}
						>
							{children}
							{triangle}
						</Popup>
						// <div
						// 	{...rest}
						// 	ref={setTooltipRef}
						// 	style={{
						// 		pointerEvents: "none",
						// 		transform,
						// 		...tetherStyles,
						// 		zIndex: (tetherStyles.zIndex || 0) + TOOLTIP_Z_INDEX,
						// 		...style,
						// 		border: `1px solid ${border}`,
						// 		backgroundColor: border,
						// 	}}
						// 	className={cx(styles.base, tooltipPositionStyles, className)}
						//
						// >
						// 	<div className={cx(styles.inner, innerStyle, tooltipPositionStyles)}>
						// 		{children}
						// 		{triangle}
						// 	</div>
						// </div>
					)}
				</Portal>
			) : null}
		</>
	);
};

Tooltip.Title = ({ children, ...rest }: JSX.IntrinsicElements["div"]) => {
	return (
		<div {...rest} className={cx(styles.title, rest.className)}>
			{children}
		</div>
	);
};
Tooltip.Description = ({ children, ...rest }: JSX.IntrinsicElements["div"]) => {
	return (
		<div {...rest} className={cx(styles.description, rest.className)}>
			{children}
		</div>
	);
};

// TooltipContent
