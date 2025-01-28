import React, { ComponentType, FC } from "react";
import { cx } from "@/utils/cx/cx";

type Props = {
	active?: string;
	examples: Array<{ name: string; code: string; component: ComponentType }>;
	onClick: (example: { name: string; code: string; component: ComponentType } | undefined) => void;
};

export const ExamplesPanel: FC<Props> = ({ active, examples, onClick }) => {
	return (
		<div className={"border-[1px] border-dotted border-black dark:border-white"}>
			{[undefined, ...examples].map((example, i) => {
				const isActive = example === undefined ? !active : active === example.name;
				return (
					<button
						key={i}
						onClick={() => onClick(example)}
						className={cx(
							"flex w-full items-center justify-between bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 border-b border-gray-100 transition-colors",
							isActive && "!bg-gray-200",
						)}
					>
						<span>{example?.name ?? "Playground"}</span>
						<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				);
			})}
		</div>
	);
};
