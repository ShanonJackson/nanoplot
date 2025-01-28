import React, { ReactNode, useId } from "react";
import { PathUtils } from "@/utils/path/path";
import { MathUtils } from "@/utils/math/math";
import { Popup } from "@/components/Tooltip/Popup";
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph";
import { cx } from "@/utils/cx/cx";
import { countries } from "@/utils/countries";
import styles from "./Worldmap.module.scss";

type Props = {
	translate?: { x: number; y: number; scale: number };
	tooltips?: Record<string, ReactNode>; // can't be a function because not serializable.
	className?: string;
	children?: ReactNode;
};

export const Worldmap = ({ tooltips, translate, className, children }: Props) => {
	const { data } = useGraph();
	const id = useId();
	const dataset = Object.fromEntries(data.map((datapoint) => [datapoint.id ?? datapoint.name, datapoint]));

	return (
		<>
			<svg
				id={id}
				viewBox={"0 0 1090 539"}
				className={cx("w-auto h-full aspect-[1090/539] group", className)}
				preserveAspectRatio={"none"}
				transform={`translate(${translate?.x ?? 0}, ${translate?.y ?? 0}) scale(${1 + (translate?.scale ?? 0) / 85})`}
			>
				{Object.entries(countries).map(([iso, path], i) => {
					const color = "#2c2c2c";
					return (
						<path
							key={i}
							d={path}
							fill={typeof dataset[iso]?.fill === "string" ? dataset[iso].fill : color}
							stroke={dataset[iso]?.stroke ?? "white"}
							strokeWidth={0.5}
							data-iso={iso}
							className={`hover:stroke-white hover:stroke-[1.5] worldmap__country_${iso} worldmap__country`}
						/>
					);
				})}
			</svg>
			{Object.entries(countries).map(([iso, path], i) => {
				const { x, y } = PathUtils.center(path);
				return (
					<Popup
						key={i}
						target={{ side: "bottom", alignment: "center" }}
						style={{ left: MathUtils.scale(x, 1090, 100) + "%", top: MathUtils.scale(y, 539, 100) + "%" }}
						border={"rgb(45, 45, 45)"}
						className={cx(`bg-black pointer-events-none`, styles.tooltip)}
						data-iso={iso}
					>
						<div>{tooltips?.[iso] ? tooltips[iso] : iso}</div>
					</Popup>
				);
			})}
			{children}
		</>
	);
};

Worldmap.context = (ctx: GraphContext, props: Props) => {
	return {
		...ctx,
		attributes: { ...ctx.attributes, className: cx(ctx.attributes.className, "ratio-[1090/539] w-max", styles.base) },
	};
};
