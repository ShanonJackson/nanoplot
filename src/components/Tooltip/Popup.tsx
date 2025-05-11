import React, { ComponentProps, CSSProperties, forwardRef, ReactNode } from "react";
import { cx } from "../../utils/cx/cx";
import { Position } from "../../hooks/use-tether";

type Props = ComponentProps<"div"> & {
	radius?: number;
	border?: string;
	background?: string;
	target?: Position;
	children?: ReactNode;
};

export const POPUP_TRIANGLE_HEIGHT_PX = 12;
export const Popup = forwardRef<HTMLDivElement, Props>(
	(
		{ radius = 5, children, border, background, target: { side, alignment } = { side: "bottom", alignment: "center" }, ...props },
		ref,
	) => {
		return (
			<div
				{...props}
				className={cx(
					"popup",
					"pseudo-bg-inherit w-max text-white [--a:90deg] [--h:8px] [--p:50%] [--b:1px] p-[12px] [border:var(--b)_solid_#0000] [background:padding-box_linear-gradient(black),border-box_rgb(45,45,45)] z-0",
					"before:content-[''] before:absolute before:z-[-1] before:[background-size:0_0,_100%_100%]",
					"after:content-[''] after:absolute after:z-[-1] after:[border:inherit] after:[background-size:100%_100%,0_0]",
					side === "top" &&
						"[background-size:100%_calc(100%+var(--h))] [background-position:bottom] [border-radius:min(var(--r),var(--p)-var(--h)*tan(var(--a)/2))_min(var(--r),100%-var(--p)-var(--h)*tan(var(--a)/2))_var(--r)_var(--r)/var(--r)]",
					side === "top" &&
						"before:[inset:calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] before:[clip-path:polygon(min(100%,var(--p)+var(--h)*tan(var(--a)/2))_calc(var(--h)+var(--b)),min(100%,var(--p)+var(--h)*tan(var(--a)/2))_var(--h),var(--p)_0,max(0%,var(--p)-var(--h)*tan(var(--a)/2))_var(--h),max(0%,var(--p)-var(--h)*tan(var(--a)/2))_calc(var(--h)+var(--b)))]",
					side === "top" &&
						"after:[inset:calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] after:[clip-path:polygon(min(100%-var(--b),var(--p)+var(--h)*tan(var(--a)/2)-var(--b)*tan(45deg-var(--a)/4))_calc(var(--h)+var(--b)),var(--p)_calc(var(--b)/sin(var(--a)/2)),max(var(--b),var(--p)-var(--h)*tan(var(--a)/2)+var(--b)*tan(45deg-var(--a)/4))_calc(var(--h)+var(--b)),50%_50%)]",
					side === "bottom" &&
						"[background-size:100%_calc(100%+var(--h))] [border-radius:var(--r)_var(--r)_min(var(--r),100%-var(--p)-var(--h)*tan(var(--a)/2))_min(var(--r),var(--p)-var(--h)*tan(var(--a)/2))/var(--r)]",
					side === "bottom" &&
						"before:[inset:calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b)-var(--h))] before:[clip-path:polygon(min(100%,var(--p)+var(--h)*tan(var(--a)/2))_calc(100%-var(--h)-var(--b)),min(100%,var(--p)+var(--h)*tan(var(--a)/2))_calc(100%-var(--h)),var(--p)_100%,max(0%,var(--p)-var(--h)*tan(var(--a)/2))_calc(100%-var(--h)),max(0%,var(--p)-var(--h)*tan(var(--a)/2))_calc(100%-var(--h)-var(--b)))]",
					side === "bottom" &&
						"after:[inset:calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b)-var(--h))] after:[clip-path:polygon(min(100%-var(--b),var(--p)+var(--h)*tan(var(--a)/2)-var(--b)*tan(45deg-var(--a)/4))_calc(100%-var(--h)-var(--b)),var(--p)_calc(100%-var(--b)/sin(var(--a)/2)),max(var(--b),var(--p)-var(--h)*tan(var(--a)/2)+var(--b)*tan(45deg-var(--a)/4))_calc(100%-var(--h)-var(--b)),50%_50%)]",
					side === "left" &&
						"[background-size:calc(100%+var(--h))_100%] [background-position:right] [border-radius:var(--r)/min(var(--r),var(--p)-var(--h)*tan(var(--a)/2))_var(--r)_var(--r)_min(var(--r),100%-var(--p)-var(--h)*tan(var(--a)/2))]",
					side === "left" &&
						"before:[inset:calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b)-var(--h))] before:[clip-path:polygon(calc(var(--h)+var(--b))_min(100%,var(--p)+var(--h)*tan(var(--a)/2)),var(--h)_min(100%,var(--p)+var(--h)*tan(var(--a)/2)),0_var(--p),var(--h)_max(0%,var(--p)-var(--h)*tan(var(--a)/2)),calc(var(--h)+var(--b))_max(0%,var(--p)-var(--h)*tan(var(--a)/2)))]",
					side === "left" &&
						"after:[inset:calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b))_calc(-1*var(--b)-var(--h))] after:[clip-path:polygon(calc(var(--h)+var(--b))_min(100%-var(--b),var(--p)+var(--h)*tan(var(--a)/2)-var(--b)*tan(45deg-var(--a)/4)),calc(var(--b)/sin(var(--a)/2))_var(--p),calc(var(--h)+var(--b))_max(var(--b),var(--p)-var(--h)*tan(var(--a)/2)+var(--b)*tan(45deg-var(--a)/4)),50%_50%)]",
					side === "right" &&
						"[background-size:calc(100%+var(--h))_100%] [border-radius:var(--r)/var(--r)_min(var(--r),var(--p)-var(--h)*tan(var(--a)/2))_min(var(--r),100%-var(--p)-var(--h)*tan(var(--a)/2))_var(--r)]",
					side === "right" &&
						"before:[inset:calc(-1*var(--b))_calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] before:[clip-path:polygon(calc(100%-var(--h)-var(--b))_min(100%,var(--p)+var(--h)*tan(var(--a)/2)),calc(100%-var(--h))_min(100%,var(--p)+var(--h)*tan(var(--a)/2)),100%_var(--p),calc(100%-var(--h))_max(0%,var(--p)-var(--h)*tan(var(--a)/2)),calc(100%-var(--h)-var(--b))_max(0%,var(--p)-var(--h)*tan(var(--a)/2)))]",
					side === "right" &&
						"after:[inset:calc(-1*var(--b))_calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] after:[clip-path:polygon(calc(100%-var(--h)-var(--b))_min(100%-var(--b),var(--p)+var(--h)*tan(var(--a)/2)-var(--b)*tan(45deg-var(--a)/4)),calc(100%-var(--b)/sin(var(--a)/2))_var(--p),calc(100%-var(--h)-var(--b))_max(var(--b),var(--p)-var(--h)*tan(var(--a)/2)+var(--b)*tan(45deg-var(--a)/4)),50%_50%)]",
					props.className,
				)}
				style={{ ...props.style, "--r": radius + "px" } as CSSProperties}
				ref={ref}
			>
				{children}
			</div>
		);
	},
);
