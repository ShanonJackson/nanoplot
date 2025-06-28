import { overlay } from "../../Overlay/Overlay";
import { ComponentProps, JSX } from "react";

type Props = ComponentProps<"div"> & {
	x: number | string | Date;
	y: number | string | Date;
};

export const LinesReference = ({ x, y, ...rest }: Props) => {
	return (
		<overlay.div x={{ tick: x }} y={{ tick: y }} {...rest}>
			{rest.children}
		</overlay.div>
	);
};
