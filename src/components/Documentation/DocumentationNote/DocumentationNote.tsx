import React, { ReactNode } from "react";

type Props = {
	header?: string;
	children?: ReactNode;
};

export const DocumentationNote = ({ header = "Note", children }: Props) => {
	return (
		<div className="text-neutral-700 dark:text-neutral-300 border-l-4 border-emerald-500 dark:border-emerald-400 bg-gray-100 dark:bg-slate-800 p-6 my-4">
			<p className="font-semibold mb-2">{header}</p>
			<p>{children}</p>
		</div>
	);
};
