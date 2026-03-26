import { overlay } from "../../Overlay/Overlay";
import { ComponentProps, JSX } from "react";
import { TemporalDate } from "../../../hooks/use-graph/use-graph";

type Props = ComponentProps<"div"> & {
	x: number | string | TemporalDate;
	y: number | string | TemporalDate;
};

export const LinesReference = ({ x, y, ...rest }: Props) => {
	return (
		<overlay.div x={{ tick: x }} y={{ tick: y }} {...rest}>
			{rest.children}
		</overlay.div>
	);
};
