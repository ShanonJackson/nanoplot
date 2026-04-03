"use client";

export function Slider({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (v: number) => void;
}) {
	return (
		<div>
			<div className="flex items-center justify-between mb-1.5">
				<span className="text-[13px] text-gray-600 dark:text-gray-400">{label}</span>
				<span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 tabular-nums">{value}</span>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full h-1 rounded-full appearance-none bg-gray-200 dark:bg-white/10 accent-blue-500 cursor-pointer"
			/>
		</div>
	);
}
