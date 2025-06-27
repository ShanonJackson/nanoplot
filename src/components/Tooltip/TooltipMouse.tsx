import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "./Tooltip";
import { cx } from "../../utils/cx/cx";
import { MathUtils } from "../../utils/math/math";

type TooltipProps = Omit<Parameters<typeof Tooltip>[0], "trigger">;

export const TooltipMouse = ({ active, children, ...props }: TooltipProps) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [mouse, setMouse] = useState({ x: 0, y: 0, triangle: { x: 0.5 } });

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			const { width, height } = tooltipRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
			const VIEWPORT_PADDING_PX = 0;
			const w = (width + VIEWPORT_PADDING_PX) / 2; // (because it's centered)
			const h = (height + VIEWPORT_PADDING_PX) / 2; // (because it's centered)
			const container = props.bounds?.current?.getBoundingClientRect();
			const viewbox = {
				width: container ? container.width + container.left : window.innerWidth,
				height: container ? container.height + container.top : window.innerHeight,
			};
			const x = event.x + w > viewbox.width ? event.x - (event.x + w - viewbox.width) : event.x;
			const y = event.y + h > viewbox.height ? event.y - (event.y + h - viewbox.height) : event.y;
			const xPercentage = (event.x + w - viewbox.width) / width;
			setMouse({
				x,
				y,
				triangle: { x: MathUtils.clamp(0.5 + xPercentage, 0.5, 0.9) },
			});
		};
		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, [props.bounds?.current, tooltipRef.current]);
	console.log(mouse.triangle.x);
	return (
		<Tooltip
			{...props}
			active={active}
			position={{
				target: { alignment: "center", side: "top" },
				tooltip: { alignment: "center", side: "bottom" },
			}}
			trigger={() => null}
			collision={false}
			style={{ ...props.style, left: mouse.x + window.scrollX, top: mouse.y + window.scrollY }}
			className={cx("absolute pointer-events-none [transform:translate(-50%,calc(-100%-8px))]", props.className)}
			triangle={{ x: mouse.triangle.x }}
			ref={tooltipRef}
		>
			{children}
		</Tooltip>
	);
};
