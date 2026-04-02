"use client";

import { useState, useEffect, ReactNode, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Lines } from "../../../../../components/Lines/Lines";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

function generateData() {
	return [
		{
			name: "New Users",
			stroke: "#FF4B4B",
			data: [
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
				{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
				{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
				{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
				{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
				{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
				{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 65 },
				{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 75 },
				{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 80 },
				{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 85 },
				{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 90 },
			],
		},
		{
			name: "Registered Users",
			stroke: "#33D4FF",
			data: [
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
				{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
				{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
				{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
				{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 85 },
				{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 95 },
				{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 92 },
				{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 105 },
				{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 110 },
				{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 120 },
			],
		},
	];
}

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

function TextInput({
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

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	lines: ComponentProps<typeof Lines>;
	gridline: ComponentProps<typeof GridLines>;
	xaxis: ComponentProps<typeof XAxis>;
	yaxis: ComponentProps<typeof YAxis>;
	legend: ComponentProps<typeof Legend>;
}) {
	const lines_lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Lines } from "nanoplot/Lines";`,
		`import { GridLines } from "nanoplot/GridLines";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { Legend } from "nanoplot/Legend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyLines() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	if (opts.legend.position === "top" || opts.legend.position === "left") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines_lines.push(`      <Legend ${p} />`);
	}

	const yp = [opts.yaxis.title && `title="${opts.yaxis.title}"`, opts.yaxis.description && `description="${opts.yaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <YAxis${yp ? " " + yp : ""} />`);

	const gp = [opts.gridline.border && "border", opts.gridline.horizontal && "horizontal", opts.gridline.vertical && "vertical"]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <GridLines${gp ? " " + gp : ""} />`);

	const lp = [opts.lines.curve && `curve="${opts.lines.curve}"`, opts.lines.joints && "joints", opts.lines.loading && "loading"]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <Lines${lp ? " " + lp : ""} />`);
	lines_lines.push(`      <Lines.Tooltip />`);

	if (opts.legend.position === "right" || opts.legend.position === "bottom") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines_lines.push(`      <Legend ${p} />`);
	}

	const xp = [opts.xaxis.title && `title="${opts.xaxis.title}"`, opts.xaxis.description && `description="${opts.xaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <XAxis${xp ? " " + xp : ""} />`);

	lines_lines.push(`    </Graph>`, `  );`, `}`);
	return lines_lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	lines: { curve: "natural" as const } as ComponentProps<typeof Lines>,
	gridline: { border: true, horizontal: true, vertical: true } as ComponentProps<typeof GridLines>,
	xaxis: {} as ComponentProps<typeof XAxis>,
	yaxis: {} as ComponentProps<typeof YAxis>,
	legend: { position: "top", alignment: "end" } as ComponentProps<typeof Legend>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [lines, setLines] = useState(DEFAULTS.lines);
	const [gridline, setGridline] = useState(DEFAULTS.gridline);
	const [xaxis, setXAxis] = useState(DEFAULTS.xaxis);
	const [yaxis, setYAxis] = useState(DEFAULTS.yaxis);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);
	const [data] = useState(() => generateData());

	const code = generateCode({ lines, gridline, xaxis, yaxis, legend });

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleReset = () => {
		setLines(DEFAULTS.lines);
		setGridline(DEFAULTS.gridline);
		setXAxis(DEFAULTS.xaxis);
		setYAxis(DEFAULTS.yaxis);
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
				<h1 className="text-sm font-semibold text-gray-900 dark:text-white">Lines Playground</h1>
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
							data={data}
							gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
						>
							{(legend.position === "top" || legend.position === "left") && <Legend {...legend} />}
							<YAxis {...yaxis} />
							<GridLines {...gridline} />
							<Lines {...lines} />
							<Lines.Tooltip />
							{legend.position === "right" && <Legend {...legend} />}
							<XAxis {...xaxis} ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
							{legend.position === "bottom" && <Legend {...legend} />}
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
						<ControlSection title="Lines">
							<Chips
								label="curve"
								options={["linear", "natural", "monotoneX", "stepBefore", "stepAfter"] as const}
								value={lines.curve}
								onChange={(v) => setLines((s) => ({ ...s, curve: v }))}
							/>
							<Toggle
								label="joints"
								checked={!!lines.joints}
								onChange={(v) => setLines((s) => ({ ...s, joints: v }))}
							/>
							<Toggle
								label="loading"
								checked={!!lines.loading}
								onChange={(v) => setLines((s) => ({ ...s, loading: v }))}
							/>
						</ControlSection>

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

						<ControlSection title="GridLines">
							<Toggle
								label="border"
								checked={!!gridline.border}
								onChange={(v) => setGridline((s) => ({ ...s, border: v }))}
							/>
							<Toggle
								label="horizontal"
								checked={!!gridline.horizontal}
								onChange={(v) => setGridline((s) => ({ ...s, horizontal: v }))}
							/>
							<Toggle
								label="vertical"
								checked={!!gridline.vertical}
								onChange={(v) => setGridline((s) => ({ ...s, vertical: v }))}
							/>
						</ControlSection>

						<ControlSection title="X Axis" defaultOpen={false}>
							<TextInput
								label="title"
								value={xaxis.title?.toString() ?? ""}
								onChange={(v) => setXAxis((s) => ({ ...s, title: v || undefined }))}
								placeholder="e.g. Month"
							/>
							<TextInput
								label="description"
								value={xaxis.description?.toString() ?? ""}
								onChange={(v) => setXAxis((s) => ({ ...s, description: v || undefined }))}
								placeholder="e.g. Time period"
							/>
						</ControlSection>

						<ControlSection title="Y Axis" defaultOpen={false}>
							<TextInput
								label="title"
								value={yaxis.title?.toString() ?? ""}
								onChange={(v) => setYAxis((s) => ({ ...s, title: v || undefined }))}
								placeholder="e.g. User Count"
							/>
							<TextInput
								label="description"
								value={yaxis.description?.toString() ?? ""}
								onChange={(v) => setYAxis((s) => ({ ...s, description: v || undefined }))}
								placeholder="e.g. Total users"
							/>
						</ControlSection>
					</div>
				</div>
			</div>
		</div>
	);
}
