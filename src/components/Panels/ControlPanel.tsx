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
				"pb-[80px] row-span-2 h-full border-[1px] border-dotted border-black dark:border-white p-4 bg-gray-100 dark:bg-gray-800 overflow-auto min-h-[600px]",
				className,
			)}
		>
			{children}
		</div>
	);
};
