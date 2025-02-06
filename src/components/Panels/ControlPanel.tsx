import { FC, ReactNode } from "react";
import { cx } from "../../utils/cx/cx";

type Props = {
	children: ReactNode;
	className?: string;
};
export const ControlPanel: FC<Props> = ({ className, children }) => {
	return (
		<div
			className={cx(
				"pb-[80px] row-span-2 h-full border-r-[1px]  dark:border-gray-700 light:border-gray-200  overflow-auto min-h-[600px]",
				className,
			)}
		>
			{children}
		</div>
	);
};
