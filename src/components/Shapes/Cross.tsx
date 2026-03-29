import { cx } from "../../utils/cx/cx";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"path"> & {
	x1: number;
	y1: number;
};

export const Cross = ({ x1, y1, ...rest }: Props) => {
	return (
		<g transform={`translate(${x1},${y1})`}>
			<path
				{...rest}
				d="M 0 0 h 0.001 M -6 0 H 6 M 0 -6 V 6"
				strokeWidth="3"
				strokeLinecap="round"
				className={cx(
					"[--fit-w:100cqw] [--fit-h:100cqh]",
					"[transform:scale(calc(10000*tan(atan2(calc(var(--vbw)*1px),calc(10000*var(--fit-w))))),calc(10000*tan(atan2(calc(var(--vbh)*1px),calc(10000*var(--fit-h))))))]",
					rest.className,
				)}
			/>
		</g>
	);
};
