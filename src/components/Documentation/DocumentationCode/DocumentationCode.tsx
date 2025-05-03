import React from "react";
import { cx } from "../../../utils/cx/cx";

type Props = {
	children: React.ReactNode;
	inherit?: boolean;
};

export const DocumentationCode = ({ children, inherit }: Props) => {
	return (
		<code
			className={cx(
				"notranslate text-sm bg-[#818b981f] rounded-[0.2em] p-[0.2em] whitespace-nowrap",
				inherit ? "text-inherit" : "text-neutral-500 dark:text-neutral-300",
			)}
		>
			{children}
		</code>
	);
};
