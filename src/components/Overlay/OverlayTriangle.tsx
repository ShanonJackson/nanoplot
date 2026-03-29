import { TemporalDate } from "../../hooks/use-graph/use-graph";
import { overlay } from "./Overlay";
import { ComponentProps } from "react";
import { cx } from "../../utils/cx/cx";

type Props = Omit<ComponentProps<"svg">, "x" | "y"> & {
	x: number | string | TemporalDate;
	y: number | string | TemporalDate;
};

export const OverlayTriangle = ({ x, y, ...rest }: Props) => {
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
			<path d="M12 2 L22 20 L2 20 Z" />
		</overlay.svg>
	);
};
