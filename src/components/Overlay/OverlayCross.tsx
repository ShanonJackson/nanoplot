import { TemporalDate } from "../../hooks/use-graph/use-graph";
import { ComponentProps } from "react";
import { overlay } from "./Overlay";
import { cx } from "../../utils/cx/cx";

type Props = Omit<ComponentProps<"svg">, "x" | "y"> & {
	x: number | string | TemporalDate;
	y: number | string | TemporalDate;
};

export const OverlayCross = ({ x, y, ...rest }: Props) => {
	return (
		<overlay.svg
			{...rest}
			viewBox={"0 0 24 24"}
			x={{ tick: x }}
			y={{ tick: y }}
			height={16}
			width={16}
			className={cx("[transform:translate(-50%,-50%)]", rest.className)}
		>
			<path d="M 12 4 L 12 20 M 4 12 L 20 12" strokeWidth={4} />
		</overlay.svg>
	);
};
