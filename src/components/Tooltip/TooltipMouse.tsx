import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "./Tooltip";
import { cx } from "../../utils/cx/cx";
import { useStatefulRef } from "../../hooks/use-stateful-ref";

type TooltipProps = Omit<Parameters<typeof Tooltip>[0], "trigger">;

export const TooltipMouse = ({ active, children, ...props }: TooltipProps) => {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) =>
			setMouse({
				x: event.x,
				y: event.y,
			});

		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, []);

	// useEffect(() => {
	// 	console.log(tooltipRef);
	// }, [tooltipRef.current]);

	return (
		<Tooltip
			active={active}
			position={{
				target: { alignment: "center", side: "top" },
				tooltip: { alignment: "center", side: "bottom" },
			}}
			trigger={() => null}
			collision={false}
			{...props}
			style={{ left: mouse.x + window.scrollX, top: mouse.y + window.scrollY, ...props.style }}
			className={cx("absolute pointer-events-none", props.className)}
		>
			{children}
		</Tooltip>
	);
};
