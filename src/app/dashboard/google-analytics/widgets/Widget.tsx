import { ComponentProps } from "react";
import { cx } from "../../../../utils/cx/cx";

export const Widget = ({ children, ...rest }: ComponentProps<"div">) => {
	return (
		<div {...rest} className={cx("rounded-[8px] [border:1px_solid_#dadce0] bg-white max-h-[400px]", rest.className)}>
			{children}
		</div>
	);
};
