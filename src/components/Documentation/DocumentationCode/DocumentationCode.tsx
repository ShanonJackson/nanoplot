import React from "react";
import { tw } from "../../../utils/cx/cx";

type Props = {
	children: React.ReactNode;
	inherit?: boolean;
	className?: string;
};

export const DocumentationCode = ({ children, inherit, className }: Props) => {
	return (
		<code
			className={tw(
				"notranslate text-sm bg-[#818b981f] rounded-[0.2em] p-[0.2em] whitespace-pre-wrap",
				inherit ? "text-inherit" : "text-neutral-500 dark:text-neutral-300",
				className,
			)}
		>
			{children}
		</code>
	);
};
