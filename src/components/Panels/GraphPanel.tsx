import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};
export const GraphPanel: FC<Props> = ({ children }) => {
	return (
		<>
			<div className={"h-full border-dotted border border-black dark:border-white overflow-hidden resize"}>{children}</div>
		</>
	);
};
