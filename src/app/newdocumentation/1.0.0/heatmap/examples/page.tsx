"use client";
import * as React from "react";
import { useState, ReactNode } from "react";

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function TabbedExample({ code, height = 500 }: { code: string; height?: number }) {
	const [tab, setTab] = useState<"preview" | "code">("preview");

	return (
		<div className="rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
			{/* Tab bar */}
			<div className="flex items-center gap-0 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03]">
				<button
					onClick={() => setTab("preview")}
					className={`relative px-4 py-2.5 text-xs font-medium transition-colors ${
						tab === "preview"
							? "text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
					}`}
				>
					<span className="flex items-center gap-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
						Preview
					</span>
					{tab === "preview" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />}
				</button>
				<button
					onClick={() => setTab("code")}
					className={`relative px-4 py-2.5 text-xs font-medium transition-colors ${
						tab === "code"
							? "text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
					}`}
				>
					<span className="flex items-center gap-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
						Code
					</span>
					{tab === "code" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />}
				</button>
			</div>

			{/* Code display only */}
			{tab === "code" && (
				<div className="p-4 bg-gray-800 dark:bg-gray-900 overflow-x-auto">
					<pre className="text-[12px] leading-relaxed font-mono text-gray-300">
						<code>{code.trim()}</code>
					</pre>
				</div>
			)}

			{/* Preview placeholder */}
			{tab === "preview" && (
				<div style={{ height: `${height}px` }} className="flex items-center justify-center text-gray-500 dark:text-gray-400">
					<div className="text-center">
						<p className="text-sm font-semibold mb-2">Heatmap Preview</p>
						<p className="text-xs">Interactive preview requires component rendering</p>
					</div>
				</div>
			)}
		</div>
	);
}

function SectionHeading({ id, children, level = 2 }: { id: string; children: ReactNode; level?: 2 | 3 }) {
	const Tag = level === 2 ? "h2" : "h3";
	const sizes = level === 2 ? "text-2xl font-bold" : "text-xl font-semibold";
	return (
		<a href={`#${id}`} className="group block no-underline">
			<Tag id={id} className={`${sizes} text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-2`}>
				{children}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="opacity-0 group-hover:opacity-40 transition-opacity"
				>
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			</Tag>
		</a>
	);
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
			<main className="min-w-0 flex-1 max-w-3xl">
				{/* ─── Header ─── */}
				<div className="pt-12 pb-10 border-b border-gray-200 dark:border-white/[0.06]">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Heatmap Examples</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
						Explore practical examples of the Heatmap component showing different use cases and configurations.
					</p>
				</div>

				{/* ─── Basic Heatmap ─── */}
				<div className="mt-14" id="basic-heatmap" style={{ scrollMarginTop: "6rem" }}>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Heatmap with Legend</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
						A complete heatmap visualization showing vehicle transport data across countries and transport types, with a
						gradient legend to indicate value ranges.
					</p>
					<TabbedExample code={basicHeatmapCode} height={480} />
				</div>

				{/* Spacing at bottom */}
				<div className="h-24" />
			</main>
		</div>
	);
}

/* ─────────────────────────── EXAMPLE CODE ─────────────────────────── */

const basicHeatmapCode = `import { Graph } from "nanoplot/Graph";
import { Heatmap } from "nanoplot/Heatmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import "nanoplot/styles.css";

const COUNTRIES = ["USA", "Canada", "Mexico", "Brazil", "Argentina"];
const TRANSPORT_TYPES = ["Air", "Rail", "Road", "Sea"];

// Vehicle transport data (in thousands)
const DATA = [
  [120, 45, 890, 230],    // USA
  [95, 150, 670, 180],    // Canada
  [75, 60, 550, 95],      // Mexico
  [110, 80, 720, 310],    // Brazil
  [85, 70, 480, 200],     // Argentina
];

const GRADIENT = "linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(139, 92, 246) 25%, rgb(236, 72, 153) 50%, rgb(239, 68, 68) 75%, rgb(127, 29, 29) 100%)";
const SCALARS = [0, 200, 400, 600, 800];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph data={DATA}>
        <YAxis />
        <Heatmap gradient={GRADIENT} scalars={SCALARS} />
        <GradientLegend
          position="bottom"
          alignment="center"
          gradient={GRADIENT}
          scalars={SCALARS}
          labels={(val) => \`\${val}K\`}
        />
        <XAxis />
      </Graph>
    </div>
  );
}`;
