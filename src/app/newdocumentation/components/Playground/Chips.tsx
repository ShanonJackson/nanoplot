"use client";

export function Chips<T extends string>({
	label,
	options,
	value,
	onChange,
}: {
	label: string;
	options: readonly T[];
	value: T | undefined;
	onChange: (v: T) => void;
}) {
	return (
		<div>
			<div className="text-[13px] text-gray-600 dark:text-gray-400 mb-1.5">{label}</div>
			<div className="flex flex-wrap gap-1">
				{options.map((opt) => (
					<button
						key={opt}
						onClick={() => onChange(opt)}
						className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-100 ${
							value === opt
								? "bg-blue-500 text-white shadow-sm shadow-blue-500/25"
								: "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
						}`}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
}
