"use client";

import { useState, useEffect, ReactNode, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Worldmap } from "../../../../../components/Worldmap/Worldmap";
import { GradientLegend } from "../../../../../components/GradientLegend/GradientLegend";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const COUNTRY_DATA = [
	{ name: "AR", value: 3287 },
	{ name: "AT", value: 2100 },
	{ name: "AU", value: 6098 },
	{ name: "BE", value: 2460 },
	{ name: "BR", value: 9550 },
	{ name: "CA", value: 8421 },
	{ name: "CH", value: 4378 },
	{ name: "CN", value: 11500 },
	{ name: "DE", value: 10500 },
	{ name: "DK", value: 1987 },
	{ name: "ES", value: 5478 },
	{ name: "FI", value: 1760 },
	{ name: "FR", value: 10200 },
	{ name: "GB", value: 10000 },
	{ name: "GR", value: 1590 },
	{ name: "IE", value: 1683 },
	{ name: "IN", value: 11200 },
	{ name: "IT", value: 6512 },
	{ name: "JP", value: 10700 },
	{ name: "KR", value: 7053 },
	{ name: "MX", value: 7850 },
	{ name: "NL", value: 4320 },
	{ name: "NO", value: 2150 },
	{ name: "NZ", value: 3950 },
	{ name: "PL", value: 3890 },
	{ name: "PT", value: 2950 },
	{ name: "RU", value: 11000 },
	{ name: "SE", value: 3050 },
	{ name: "TR", value: 3245 },
	{ name: "US", value: 12000 },
	{ name: "ZA", value: 2765 },
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

function Slider({
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

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	worldmap: ComponentProps<typeof Worldmap>;
	legend: ComponentProps<typeof GradientLegend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Worldmap } from "nanoplot/Worldmap";`,
		`import { GradientLegend } from "nanoplot/GradientLegend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyWorldmap() {`,
		`  const DATA = [`,
		`    { name: "US", value: 12000 },`,
		`    { name: "CN", value: 11500 },`,
		`    // ... more countries`,
		`  ];`,
		``,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	if (opts.legend.position === "top" || opts.legend.position === "left") {
		const p = [`position="${opts.legend.position}"`].filter(Boolean).join(" ");
		lines.push(`      <GradientLegend ${p} gradient={gradient} />`);
	}

	lines.push(`      <Worldmap${opts.worldmap.gradient ? ` gradient={gradient}` : ""} />`);

	if (opts.legend.position === "right" || opts.legend.position === "bottom") {
		const p = [`position="${opts.legend.position}"`].filter(Boolean).join(" ");
		lines.push(`      <GradientLegend ${p} gradient={gradient} />`);
	}

	lines.push(`      <Worldmap.Tooltip tooltip={(dp) => \`\${dp.name}: \${dp.value}\`} />`);

	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	worldmap: {} as ComponentProps<typeof Worldmap>,
	legend: { position: "top" } as ComponentProps<typeof GradientLegend>,
	translateX: 0,
	translateY: 0,
	scale: 0,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [worldmap, setWorldmap] = useState(DEFAULTS.worldmap);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [translateX, setTranslateX] = useState(DEFAULTS.translateX);
	const [translateY, setTranslateY] = useState(DEFAULTS.translateY);
	const [scale, setScale] = useState(DEFAULTS.scale);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);

	const translate = { x: translateX, y: translateY, scale: scale };
	const maxValue = 12000;
	const gradient = `linear-gradient(90deg, #e1efff 0, #4285f4 ${maxValue})`;
	const code = generateCode({ worldmap, legend });

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleReset = () => {
		setWorldmap(DEFAULTS.worldmap);
		setLegend(DEFAULTS.legend);
		setTranslateX(DEFAULTS.translateX);
		setTranslateY(DEFAULTS.translateY);
		setScale(DEFAULTS.scale);
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
				<h1 className="text-sm font-semibold text-gray-900 dark:text-white">Worldmap Playground</h1>
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
						<Graph data={COUNTRY_DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
							{(legend.position === "top" || legend.position === "left") && (
								<GradientLegend {...legend} gradient={gradient} />
							)}
							<Worldmap {...worldmap} gradient={gradient} translate={translate} />
							<Worldmap.Tooltip tooltip={(point) => `${point.name}: ${point.value}`} />
							{legend.position === "right" && <GradientLegend {...legend} gradient={gradient} />}
							{legend.position === "bottom" && <GradientLegend {...legend} gradient={gradient} />}
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
						<ControlSection title="Worldmap">
							<Slider label="translate.x" value={translateX} min={-200} max={200} onChange={setTranslateX} />
							<Slider label="translate.y" value={translateY} min={-200} max={200} onChange={setTranslateY} />
							<Slider label="translate.scale" value={scale} min={0} max={100} onChange={setScale} />
						</ControlSection>

						<ControlSection title="Legend">
							<div>
								<div className="text-[13px] text-gray-600 dark:text-gray-400 mb-1.5">position</div>
								<div className="flex flex-wrap gap-1">
									{["top", "right", "bottom", "left"].map((pos) => (
										<button
											key={pos}
											onClick={() => setLegend((s) => ({ ...s, position: pos as any }))}
											className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-100 ${
												legend.position === pos
													? "bg-blue-500 text-white shadow-sm shadow-blue-500/25"
													: "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
											}`}
										>
											{pos}
										</button>
									))}
								</div>
							</div>
						</ControlSection>
					</div>
				</div>
			</div>
		</div>
	);
}
