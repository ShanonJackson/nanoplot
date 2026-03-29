import { cx } from "../../utils/cx/cx";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"polygon"> & {
	x1: number;
	y1: number;
};

export const Triangle = ({ x1, y1, ...rest }: Props) => {
	return (
		<g transform={`translate(${x1},${y1})`}>
			<polygon
				points="0,-7 6.06,3.5 -6.06,3.5"
				className={cx(
					"[--fit-w:100cqw] [--fit-h:100cqh]",
					"[transform:scale(calc(10000*tan(atan2(calc(var(--vbw)*1px),calc(10000*var(--fit-w))))),calc(10000*tan(atan2(calc(var(--vbh)*1px),calc(10000*var(--fit-h))))))]",
					rest.className,
				)}
				{...rest}
			/>
		</g>
	);
};

// overlay.triangle
// overlay.square
// overlay.diamond
// overlay.rect
// overlay.cross
