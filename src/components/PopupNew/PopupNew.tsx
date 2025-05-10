import React, { CSSProperties, ReactNode } from "react";
import { cx } from "../../utils/cx/cx";

type Props = {
	radius?: number;
	border?: string;
	background?: string;
	className?: string;
	children?: ReactNode;
}

export const PopupNew = ({radius = 5, children, border, background, className}: Props) => {
	return (
		<div className={cx(
			"popup",
			"pseudo-bg-inherit text-white [--a:90deg] [--h:1em] [--p:50%] [--b:5px] p-[1em] [border:var(--b)_solid_#0000] [border-radius:min(var(--r),var(--p)-var(--h)*tan(var(--a)/2))_min(var(--r),100%-var(--p)-var(--h)*tan(var(--a)/2))_var(--r)_var(--r)/var(--r)] [background:padding-box_linear-gradient(black),border-box_rgb(45,45,45)] [background-size:100%_calc(100%+var(--h))] [background-position:bottom] relative z-0",
			"before:content-[''] before:absolute before:z-[-1] before:[inset:calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] before:[background-size:0_0,_100%_100%] before:[clip-path:polygon(min(100%,var(--p)+var(--h)*tan(var(--a)/2))_calc(var(--h)+var(--b)),min(100%,var(--p)+var(--h)*tan(var(--a)/2))_var(--h),var(--p)_0,max(0%,var(--p)-var(--h)*tan(var(--a)/2))_var(--h),max(0%,var(--p)-var(--h)*tan(var(--a)/2))_calc(var(--h)+var(--b)))]",
			"after:content-[''] after:absolute after:z-[-1] after:[inset:calc(-1*var(--b)-var(--h))_calc(-1*var(--b))_calc(-1*var(--b))] after:[border:inherit] after:[background-size:100%_100%,0_0] after:[clip-path:polygon(min(100%-var(--b),var(--p)+var(--h)*tan(var(--a)/2)-var(--b)*tan(45deg-var(--a)/4))_calc(var(--h)+var(--b)),var(--p)_calc(var(--b)/sin(var(--a)/2)),max(var(--b),var(--p)-var(--h)*tan(var(--a)/2)+var(--b)*tan(45deg-var(--a)/4))_calc(var(--h)+var(--b)),50%_50%)]",
			className,
		)}
			style={{"--r": radius + "px" } as CSSProperties}
		>
			{children}
		</div>
	)
}
