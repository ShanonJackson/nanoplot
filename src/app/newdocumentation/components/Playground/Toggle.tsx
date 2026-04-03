"use client";

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
	return (
		<label className="flex items-center justify-between gap-3 py-0.5 cursor-pointer group">
			<span className="text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors select-none">
				{label}
			</span>
			<button
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${checked ? "bg-blue-500" : "bg-gray-200 dark:bg-white/10"}`}
			>
				<span
					className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-[3px]"}`}
				/>
			</button>
		</label>
	);
}
