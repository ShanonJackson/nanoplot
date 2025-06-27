import * as React from "react";
import { forwardRef, JSX, RefObject, useRef, useState } from "react";
import { Position, useTether } from "../../hooks/use-tether";
import { Portal } from "../Portal/Portal";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { Popup } from "./Popup";
import { cx } from "../../utils/cx/cx";

export type Props = Omit<JSX.IntrinsicElements["div"], "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> & {
	active?: boolean;
	delay?: number;
	trigger: (ref: RefObject<never>, active: boolean) => React.ReactNode;
	disabled?: boolean;
	position?: { tooltip: Position; target: Position };
	interactable?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	bounds?: React.RefObject<Element | null> /* collision detection will be relative to this box OR window */;
	contain?: React.RefObject<Element | null> /* if the tooltip renders outside this box, will render null */;
	triangle?: { x: number }; // % of triangle's x location i.e 50% would be center.
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
			triangle,
			collision = true,
			...rest
		},
		ref,
	) => {
		const target = useRef<Element>(null);
		const [tooltipRef, setTooltipRef] = useStatefulRef<HTMLDivElement>([ref]);
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
				y: 8,
				x: 8,
			},
			/* default is to 'flip' so if collision is true, set this to undefined so 'flip' behaviour kicks in */
			onCollision: collision ? undefined : () => ({ targetPosition: position.target, tetherPosition: position.tooltip }),
		});

		useOnClickOutside([target, tooltipRef], onClose);

		const open = Boolean(interactable ? active || isInsideTooltip : active);

		const rect = contain?.current?.getBoundingClientRect();
		const tooltip = tooltipRef.current?.getBoundingClientRect();
		const isInsideContainer =
			rect && tooltip
				? rect.left < tooltip.left && rect.right > tooltip.right && rect.top < tooltip.top && rect.bottom > tooltip.bottom
				: true;

		const triangleX = (() => {
			if (triangle) return triangle;
			if (alignment === "left") return { x: 0.05 };
			if (alignment === "right") return { x: 0.95 };
			if (alignment === "top") return { x: 0.05 };
			if (alignment === "bottom") return { x: 0.95 };
			return undefined;
		})();

		const transform = (() => {
			if (alignment === "left") return `translate(-5%,0)`;
			if (alignment === "right") return `translate(5%,0)`;
			if (alignment === "top") return `translate(0,5%)`;
			if (alignment === "bottom") return `translate(0,-5%)`;
			return undefined;
		})();

		return (
			<>
				{trigger(target as RefObject<never>, open)}
				<Portal>
					{open && Boolean(children) && (
						<Popup
							{...rest}
							ref={setTooltipRef}
							style={{ ...tetherStyles, ...style, transform }}
							border={border}
							target={{ side, alignment }}
							onMouseEnter={() => setIsInsideTooltip(true)}
							onMouseLeave={() => setIsInsideTooltip(false)}
							triangle={triangleX}
							className={cx(className, (!isInsideContainer || disabled) && "hidden")}
						>
							{children}
						</Popup>
					)}
				</Portal>
			</>
		);
	},
);
