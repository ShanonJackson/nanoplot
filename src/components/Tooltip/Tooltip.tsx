import * as React from "react";
import { forwardRef, JSX, RefObject, useRef, useState } from "react";
import { Position, useTether } from "../../hooks/use-tether";
import { Portal } from "../Portal/Portal";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { Popup } from "./Popup";
import { mergeRefs } from "../../utils/refs/merge-refs";

export type Props = Omit<JSX.IntrinsicElements["div"], "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> & {
	active?: boolean;
	delay?: number;
	trigger: (ref: RefObject<never>, active: boolean) => React.ReactNode;
	disabled?: boolean;
	position?: { tooltip: Position; target: Position };
	interactable?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	bounds?: React.RefObject<Element> /* collision detection will be relative to this box OR window */;
	contain?: React.RefObject<Element> /* if the tooltip renders outside this box, will render null */;
	border?: string;
	collision?: boolean;
};

export const Tooltip = forwardRef<HTMLDivElement, Props>(
	(
		{
			active,
			border,
			delay = 0,
			position = { tooltip: { alignment: "center", side: "bottom" }, target: { alignment: "center", side: "top" } },
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
		},
		ref,
	) => {
		const target = useRef<Element>(null);
		const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>();
		const [isInsideTooltip, setIsInsideTooltip] = useState(false);

		const {
			styles: tetherStyles,
			positions: {
				tetherPosition: { alignment, side },
			},
		} = useTether({
			targetPosition: position.target,
			tetherPosition: position.tooltip,
			targetRef: target,
			tetherRef: tooltipRef,
			boundingContainer: bounds,
			offset: {
				y: position.target.side === "top" || position.target.side === "bottom" ? 8 : 0,
				x: position.target.side === "left" || position.target.side === "right" ? 8 : 0,
			},
			onCollision: (collides) => {
				if (!collision) return { targetPosition: position.target, tetherPosition: position.tooltip };
				console.log(collides);
				return { targetPosition: position.target, tetherPosition: position.tooltip };
			},
		});

		useOnClickOutside([target, tooltipRef], onClose);

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
								{...rest}
								ref={mergeRefs(setTooltipRef, ref)}
								style={{ ...tetherStyles, ...style }}
								border={border}
								target={{ side, alignment }}
								onMouseEnter={() => setIsInsideTooltip(true)}
								onMouseLeave={() => setIsInsideTooltip(false)}
								className={className}
							>
								{children}
							</Popup>
						)}
					</Portal>
				) : null}
			</>
		);
	},
);
