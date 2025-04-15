import React from "react";

type Props = {
	children: React.ReactNode;
};

export const DocumentationCode = ({ children }: Props) => {
	return (
		<code className={"notranslate text-sm text-neutral-500 dark:text-neutral-300 bg-[#818b981f] rounded-[0.2em] p-[0.2em]"}>
			{children}
		</code>
	);
};
