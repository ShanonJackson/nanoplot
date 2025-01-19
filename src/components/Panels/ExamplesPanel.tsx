import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const ExamplesPanel: FC<Props> = ({ children }) => {
	return (
		<>
			<div className={"border-[1px] border-dotted border-black dark:border-white"}>{children}</div>
		</>
	);
};
