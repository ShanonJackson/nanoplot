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
		<div className="space-y-4">
			<div role="list" className="flex flex-wrap gap-2">
				{options.map((option, index) => {
					const isSelected = option === value;
					return (
						<label
							role="listitem"
							onClick={() => onChange(option)}
							key={index}
							className={cx("px-4 py-2 rounded-md border-2 cursor-pointer transition-all", isSelected && "border-blue-600")}
						>
							{option}
						</label>
					);
				})}
			</div>
			<span className="text-sm text-muted-foreground">{description}</span>
		</div>
	);
};
