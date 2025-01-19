import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};
export const ControlPanel: FC<Props> = ({ children }) => {
	return (<div className={"row-span-2 h-full border-[1px] border-dotted border-black dark:border-white p-4 bg-gray-100 dark:bg-gray-800"}>{children}</div>)
};
