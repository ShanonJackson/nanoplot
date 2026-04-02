"use client";

import { useState, useEffect, ReactNode, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Heatmap } from "../../../../../components/Heatmap/Heatmap";
import { GradientLegend } from "../../../../../components/GradientLegend/GradientLegend";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const HEATMAP_DATA = [
	{
		name: "Vehicle Transport",
		data: [
			{ x: "Japan", y: "Train", z: -67613 },
			{ x: "Japan", y: "Bus", z: -77184 },
			{ x: "Japan", y: "Car", z: -15588 },
			{ x: "Japan", y: "Boat", z: -34487 },
			{ x: "Japan", y: "Bicycle", z: 90945 },
			{ x: "France", y: "Train", z: -16369 },
			{ x: "France", y: "Bus", z: 95371 },
			{ x: "France", y: "Car", z: 82969 },
			{ x: "France", y: "Boat", z: -44779 },
			{ x: "France", y: "Bicycle", z: -57656 },
			{ x: "US", y: "Train", z: 24639 },
			{ x: "US", y: "Bus", z: 24317 },
			{ x: "US", y: "Car", z: -98275 },
			{ x: "US", y: "Boat", z: -46282 },
			{ x: "US", y: "Bicycle", z: 84150 },
			{ x: "Germany", y: "Train", z: 96190 },
			{ x: "Germany", y: "Bus", z: 25321 },
			{ x: "Germany", y: "Car", z: 77322 },
			{ x: "Germany", y: "Boat", z: -84111 },
			{ x: "Germany", y: "Bicycle", z: 38642 },
			{ x: "Norway", y: "Train", z: 8900 },
			{ x: "Norway", y: "Bus", z: 59144 },
			{ x: "Norway", y: "Car", z: 9986 },
			{ x: "Norway", y: "Boat", z: -4214 },
			{ x: "Norway", y: "Bicycle", z: -1138 },
		],
	},
];

/* ─────────────────────────── CONTROL PRIMITIVES ─────────────────────────── */

function ControlSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div>
			<button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2 text-left group">
				<span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
					{title}
				</span>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</button>
			{open && <div className="pb-4 space-y-2.5">{children}</div>}
		</div>
	);
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
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

function Chips<T extends string>({
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

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	gradient: string;
	legend: ComponentProps<typeof GradientLegend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Heatmap } from "nanoplot/Heatmap";`,
		`import { GradientLegend } from "nanoplot/GradientLegend";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import "nanoplot/styles.css";`,
		``,
		`const GRADIENT = "${opts.gradient}";`,
		`const SCALARS = [-100000, -50000, 0, 50000, 100000];`,
		``,
		`export default function MyHeatmap() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
		`      <YAxis />`,
		`      <Heatmap gradient={GRADIENT} scalars={SCALARS} />`,
	];

	const gp = [opts.legend.position && `position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <GradientLegend${gp ? " " + gp : ""} gradient={GRADIENT} scalars={SCALARS} />`);

	lines.push(`      <XAxis />`);
	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	gradient: "linear-gradient(to right, rgb(165, 0, 38) 0%, rgb(215, 48, 39) 10%, rgb(244, 109, 67) 20%, rgb(253, 174, 97) 30%, rgb(254, 224, 144) 40%, rgb(250, 248, 193) 50%, rgb(224, 243, 248) 60%, rgb(171, 217, 233) 70%, rgb(116, 173, 209) 80%, rgb(69, 117, 180) 90%, rgb(49, 54, 149) 100%)",
	legend: { position: "bottom", alignment: "center" } as ComponentProps<typeof GradientLegend>,
};

const SCALARS = [-100000, -50000, 0, 50000, 100000];

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [gradient, setGradient] = useState(DEFAULTS.gradient);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);

	const code = generateCode({ gradient, legend });

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleReset = () => {
		setGradient(DEFAULTS.gradient);
		setLegend(DEFAULTS.legend);
	};

	if (!mounted) return null;

	return (
		<div
			className="grid"
			style={{
				height: "calc(100vh - 4rem)",
				gridTemplateRows: "3rem 1fr",
				gridTemplateColumns: "1fr",
			}}
		>
			{/* ─── Row 1: Toolbar (spans full width) ─── */}
			<div className="flex items-center justify-between px-5 border-b border-black/[0.04] dark:border-white/[0.04] bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-sm col-span-full">
				<h1 className="text-sm font-semibold text-gray-900 dark:text-white">Heatmap Playground</h1>
				<div className="flex items-center gap-1">
					<button
						onClick={() => setShowCode((v) => !v)}
						className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors ${showCode ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06]"}`}
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="16 18 22 12 16 6" />
							<polyline points="8 6 2 12 8 18" />
						</svg>
						Code
					</button>
					<button
						onClick={handleCopy}
						className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
					>
						{copied ? (
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-emerald-500"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						) : (
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
								<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
							</svg>
						)}
						{copied ? "Copied" : "Copy"}
					</button>
					<button
						onClick={handleReset}
						className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
							<path d="M3 3v5h5" />
						</svg>
						Reset
					</button>
				</div>
			</div>

			{/* ─── Row 2: Graph + Controls side by side ─── */}
			<div className="flex min-h-0">
				{/* Graph area — fills remaining space */}
				<div className="flex-1 min-w-0 flex flex-col min-h-0">
					<div className="flex-1 p-5 min-h-0">
						<Graph
							data={HEATMAP_DATA}
							gap={{ top: 10, bottom: 10 }}
						>
							<YAxis />
							<Heatmap gradient={gradient} scalars={SCALARS} />
							<GradientLegend {...legend} gradient={gradient} scalars={SCALARS} />
							<XAxis />
						</Graph>
					</div>

					{/* Code panel — slides up from bottom of graph area */}
					{showCode && (
						<div className="shrink-0 border-t border-black/[0.04] dark:border-white/[0.04] bg-[#1a1a2e] dark:bg-[#111119] max-h-[40%] overflow-auto">
							<div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] sticky top-0 bg-[#1a1a2e] dark:bg-[#111119]">
								<span className="text-[11px] font-medium text-gray-500">Generated JSX</span>
								<button
									onClick={handleCopy}
									className="text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-colors"
								>
									{copied ? "Copied!" : "Copy"}
								</button>
							</div>
							<pre className="p-4 text-[12px] leading-relaxed font-mono text-gray-300">
								<code>{code}</code>
							</pre>
						</div>
					)}
				</div>

				{/* Controls panel — fixed-width right sidebar */}
				<div className="w-72 shrink-0 border-l border-black/[0.04] dark:border-white/[0.04] overflow-y-auto bg-gray-50/60 dark:bg-white/[0.015]">
					<div className="p-4 space-y-1 divide-y divide-black/[0.04] dark:divide-white/[0.04]">
						<ControlSection title="Legend">
							<Chips
								label="position"
								options={["top", "right", "bottom", "left"] as const}
								value={legend.position}
								onChange={(v) => setLegend((s) => ({ ...s, position: v === s.position ? undefined : v }))}
							/>
							<Chips
								label="alignment"
								options={["center", "start", "end"] as const}
								value={legend.alignment}
								onChange={(v) => setLegend((s) => ({ ...s, alignment: v === s.alignment ? undefined : v }))}
							/>
						</ControlSection>
					</div>
				</div>
			</div>
		</div>
	);
}
