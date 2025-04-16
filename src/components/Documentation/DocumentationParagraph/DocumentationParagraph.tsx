import * as React from "react";

type Props = {
	children: React.ReactNode;
};

export const DocumentationParagraph = ({ children }: Props) => {
	return <p className={"my-2 text-neutral-700 dark:text-neutral-100"}>{children}</p>;
};
