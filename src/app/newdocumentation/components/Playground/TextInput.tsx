"use client";

export function TextInput({
	label,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
}) {
	return (
		<div>
			<div className="text-[13px] text-gray-600 dark:text-gray-400 mb-1">{label}</div>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full px-2.5 py-1.5 rounded-lg text-[13px] bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.04] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all"
			/>
		</div>
	);
}
