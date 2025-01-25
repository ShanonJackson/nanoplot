import React, { ReactNode, useId, memo } from "react";
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph";
import { cx } from "@/utils/cx/cx";
import styles from "./Worldmap.module.scss";
import { Country } from "./Country";
import { TooltipsMemo } from "./TooltipsMemo";

export type Props = {
	translate?: { x: number; y: number; scale: number };
	tooltips?: Record<string, ReactNode>; // can't be a function because not serializable.
	className?: string;
	children?: ReactNode;
	divProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const Worldmap = ({ tooltips, translate, className, children , ...divProps }: Props) => {
	const id = useId()
	return (
		<div 
			className="hover:cursor-move active:cursor-grabbing"
			{ ...divProps }
		>
			<svg
				//className={`translate-x-${translate?.x ?? 0} translate-y-${translate?.y ?? 0}`}
				id={id}
				viewBox={"0 0 1090 539"}
				className={cx("w-auto h-full aspect-[1090/539] group", className)}
				preserveAspectRatio={"none"}
				transform={`translate(${translate?.x ?? 0}, ${translate?.y ?? 0}) scale(${1 + (translate?.scale ?? 0) / 85})`}
			>
				<Country></Country>
			</svg>
			<TooltipsMemo tooltips={tooltips}/>
			{children}
		</div>
	);
};

Worldmap.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		attributes: { ...ctx.attributes, className: cx(ctx.attributes.className, "ratio-[1090/539] w-max", styles.base) },
	};
};
