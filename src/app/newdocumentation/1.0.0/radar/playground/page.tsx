"use client";

import { useState, useEffect, ReactNode, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Radar } from "../../../../../components/Radar/Radar";
import "nanoplot/styles.css";

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

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: { radar: ComponentProps<typeof Radar> }) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Radar } from "nanoplot/Radar";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyRadar() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	const rp = [opts.radar.loading && "loading", opts.radar.labels !== undefined && `labels={${opts.radar.labels}}`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <Radar${rp ? " " + rp : ""} />`);

	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	radar: { labels: true, loading: false } as ComponentProps<typeof Radar>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [radar, setRadar] = useState(DEFAULTS.radar);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);

	const code = generateCode({ radar });

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleReset = () => {
		setRadar(DEFAULTS.radar);
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
				<h1 className="text-sm font-semibold text-gray-900 dark:text-white">Radar Playground</h1>
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
					<div className="flex-1 p-5 min-h-0 flex items-center justify-center">
						<div className={"w-[100%] h-[500px]"}>
							<Graph
								data={[
									{
										name: "Jason's Progress",
										stroke: "#11ACAE",
										data: [
											{ x: "Fighting", y: 70 },
											{ x: "Farming", y: 8 },
											{ x: "Supporting", y: 300 },
											{ x: "Pushing", y: 90 },
											{ x: "Versatility", y: 60 },
										],
									},
								]}
							>
								<Radar {...radar} />
							</Graph>
						</div>
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
						<ControlSection title="Radar">
							<Toggle label="loading" checked={!!radar.loading} onChange={(v) => setRadar((r) => ({ ...r, loading: v }))} />
							<Toggle
								label="labels"
								checked={radar.labels !== false}
								onChange={(v) => setRadar((r) => ({ ...r, labels: v }))}
							/>
						</ControlSection>
					</div>
				</div>
			</div>
		</div>
	);
}
