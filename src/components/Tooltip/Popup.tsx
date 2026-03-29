import React, { ComponentProps, CSSProperties, forwardRef, ReactNode } from "react";
import { tw } from "../../utils/cx/cx";
import { Position } from "../../hooks/use-tether";

type Props = ComponentProps<"div"> & {
	radius?: number;
	border?: string;
	background?: string;
	triangle?: { x: number }; // % of triangle's x location i.e 50% would be center.
	target?: Position;
	children?: ReactNode;
};

const AH = 8; // arrow height
const AW = 10; // arrow half-width
const BW = 1; // border width

function clipShape(side: string, radius: number, p: string, inset: number): string {
	const r = Math.max(0, radius - inset);
	const i = inset;
	const ri = r + i;
	const ahi = AH + i;
	const ahri = AH + r + i;
	const awi = AW - i;

	switch (side) {
		case "bottom":
			return `shape(from ${ri}px ${i}px, hline to calc(100% - ${ri}px), curve to calc(100% - ${i}px) ${ri}px with calc(100% - ${i}px) ${i}px, vline to calc(100% - ${ahri}px), curve to calc(100% - ${ri}px) calc(100% - ${ahi}px) with calc(100% - ${i}px) calc(100% - ${ahi}px), hline to calc(${p} + ${awi}px), line to ${p} calc(100% - ${i}px), line to calc(${p} - ${awi}px) calc(100% - ${ahi}px), hline to ${ri}px, curve to ${i}px calc(100% - ${ahri}px) with ${i}px calc(100% - ${ahi}px), vline to ${ri}px, curve to ${ri}px ${i}px with ${i}px ${i}px, close)`;
		case "top":
			return `shape(from ${ri}px ${ahi}px, hline to calc(${p} - ${awi}px), line to ${p} ${i}px, line to calc(${p} + ${awi}px) ${ahi}px, hline to calc(100% - ${ri}px), curve to calc(100% - ${i}px) ${ahri}px with calc(100% - ${i}px) ${ahi}px, vline to calc(100% - ${ri}px), curve to calc(100% - ${ri}px) calc(100% - ${i}px) with calc(100% - ${i}px) calc(100% - ${i}px), hline to ${ri}px, curve to ${i}px calc(100% - ${ri}px) with ${i}px calc(100% - ${i}px), vline to ${ahri}px, curve to ${ri}px ${ahi}px with ${i}px ${ahi}px, close)`;
		case "right":
			return `shape(from ${ri}px ${i}px, hline to calc(100% - ${ahri}px), curve to calc(100% - ${ahi}px) ${ri}px with calc(100% - ${ahi}px) ${i}px, vline to calc(${p} - ${awi}px), line to calc(100% - ${i}px) ${p}, line to calc(100% - ${ahi}px) calc(${p} + ${awi}px), vline to calc(100% - ${ri}px), curve to calc(100% - ${ahri}px) calc(100% - ${i}px) with calc(100% - ${ahi}px) calc(100% - ${i}px), hline to ${ri}px, curve to ${i}px calc(100% - ${ri}px) with ${i}px calc(100% - ${i}px), vline to ${ri}px, curve to ${ri}px ${i}px with ${i}px ${i}px, close)`;
		case "left":
			return `shape(from ${ahri}px ${i}px, hline to calc(100% - ${ri}px), curve to calc(100% - ${i}px) ${ri}px with calc(100% - ${i}px) ${i}px, vline to calc(100% - ${ri}px), curve to calc(100% - ${ri}px) calc(100% - ${i}px) with calc(100% - ${i}px) calc(100% - ${i}px), hline to ${ahri}px, curve to ${ahi}px calc(100% - ${ri}px) with ${ahi}px calc(100% - ${i}px), vline to calc(${p} + ${awi}px), line to ${i}px ${p}, line to ${ahi}px calc(${p} - ${awi}px), vline to ${ri}px, curve to ${ahri}px ${i}px with ${ahi}px ${i}px, close)`;
		default:
			return `shape(from ${ri}px ${i}px, hline to calc(100% - ${ri}px), curve to calc(100% - ${i}px) ${ri}px with calc(100% - ${i}px) ${i}px, vline to calc(100% - ${ri}px), curve to calc(100% - ${ri}px) calc(100% - ${i}px) with calc(100% - ${i}px) calc(100% - ${i}px), hline to ${ri}px, curve to ${i}px calc(100% - ${ri}px) with ${i}px calc(100% - ${i}px), vline to ${ri}px, curve to ${ri}px ${i}px with ${i}px ${i}px, close)`;
	}
}

export const Popup = forwardRef<HTMLDivElement, Props>(
	(
		{
			radius = 5,
			children,
			border,
			background,
			target: { side, alignment } = { side: "bottom", alignment: "center" },
			triangle,
			...props
		},
		ref,
	) => {
		const p = (() => {
			if (triangle) return triangle.x * 100 + "%";
			return {
				["left"]: "10%",
				["top"]: "10%",
				["right"]: "90%",
				["bottom"]: "90%",
				["center"]: "50%",
			}[alignment];
		})();

		const { background: styleBg, ...restStyle } = (props.style ?? {}) as CSSProperties & { background?: string };
		const bg = background ?? styleBg ?? "black";

		return (
			<div
				{...props}
				ref={ref}
				className={tw("popup-next relative isolate w-max text-white", props.className)}
				style={{
					...restStyle,
					background: "transparent",
					paddingTop: 12 + BW + (side === "top" ? AH : 0),
					paddingRight: 12 + BW + (side === "right" ? AH : 0),
					paddingBottom: 12 + BW + (side === "bottom" ? AH : 0),
					paddingLeft: 12 + BW + (side === "left" ? AH : 0),
				}}
			>
				<span
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						zIndex: -2,
						pointerEvents: "none",
						background: border ?? "rgb(45, 45, 45)",
						clipPath: clipShape(side, radius, p, 0),
					}}
				/>
				<span
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						zIndex: -1,
						pointerEvents: "none",
						background: bg,
						clipPath: clipShape(side, radius, p, BW),
					}}
				/>
				{children}
			</div>
		);
	},
);
