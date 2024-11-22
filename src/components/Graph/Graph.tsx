import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Graph = ({ children }: Props) => {
	return <div>{children}</div>;
};
