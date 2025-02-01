import React from "react";
import { cx } from "@/utils/cx/cx";

type Props<T extends string> = {
	options: Array<T>;
	value: T | undefined;
	description: string;
	onChange: (position: T) => void;
};

export const EnumControl = <T extends string>({ description, options, value, onChange }: Props<T>) => {
	return (
		<div className="">
			<span className="text-sm text-muted-foreground">{description}</span>
			<div role="list" className="flex flex-wrap mt-2 gap-2">
				{options.map((option, index) => {
					const selected = option === value;
					return (
						<button
							key={index}
							onClick={() => onChange(option)}
							className={cx(
								"px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm",
								"hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5",
								"focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900",
								"focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900",
								selected
									? "bg-blue-500 text-white shadow-blue-500/25 shadow-lg"
									: "bg-slate-700 text-slate-200 border border-slate-600",
							)}
						>
							{option}
						</button>
					);
				})}
			</div>
		</div>
	);
};
