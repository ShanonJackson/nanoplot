"use client";
import * as React from "react";
import { useState, ReactNode } from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "required" | "optional" }) {
	const styles = {
		default: "bg-blue-500/10 text-blue-400 border-blue-500/20",
		required: "bg-rose-500/10 text-rose-400 border-rose-500/20",
		optional: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
	};
	return (
		<span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${styles[variant]}`}>
			{children}
		</span>
	);
}

function InlineCode({ children, className = "" }: { children: ReactNode; className?: string }) {
	return (
		<code
			className={`px-1.5 py-0.5 rounded-md text-[13px] font-mono bg-gray-100 dark:bg-white/[0.06] text-pink-500 dark:text-pink-400 border border-gray-200 dark:border-white/10 ${className}`}
		>
			{children}
		</code>
	);
}

/* ─────────────────────────── TABBED EXAMPLE ─────────────────────────── */

function TabbedExample({ code, height = 500 }: { code: string; height?: number }) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const isLight = typeof document !== "undefined" && document.cookie.includes("theme=light");

	const themeSetup = isLight
		? `document.documentElement.style.colorScheme="light";document.documentElement.style.background="white";document.documentElement.style.color="black";`
		: `document.body.classList.add("dark");document.documentElement.style.colorScheme="dark";document.documentElement.style.background="black";document.documentElement.style.color="white";`;

	const setupCode = themeSetup + `\nvar l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap";l.rel="stylesheet";document.head.appendChild(l);document.body.style.fontFamily="FigTree, sans-serif";`;

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
			{/* Use the working Sandpack component, CSS-toggle editor vs preview */}
			<style>{`
				.tabbed-sandpack [class*="sp-layout"] {
					display: flex !important;
					flex-direction: column !important;
					height: ${height}px !important;
				}
				.tabbed-sandpack[data-tab="preview"] [class*="sp-code-editor"],
				.tabbed-sandpack[data-tab="preview"] [class*="sp-editor"] {
					display: none !important;
				}
				.tabbed-sandpack[data-tab="code"] [class*="sp-preview"] {
					display: none !important;
				}
				.tabbed-sandpack [class*="sp-layout"] > * {
					flex: 1 !important;
					width: 100% !important;
					height: 100% !important;
				}
				.tabbed-sandpack [class*="sp-preview"] iframe {
					height: 100% !important;
				}
				.tabbed-sandpack [class*="sp-resize-handler"] {
					display: none !important;
				}
			`}</style>
			<div className="tabbed-sandpack" data-tab={tab}>
				<Sandpack
					files={{
						"App.js": `import "./themesetup";\n` + code,
						"/themesetup.js": {
							code: setupCode,
							hidden: true,
						},
					}}
					options={{ editorHeight: height }}
				/>
			</div>
		</div>
	);
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ExamplesPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 md:px-8 py-12 pb-24">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Bars Examples</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
					Explore practical examples of the Bars component in action. Use these as a foundation for building your own bar charts.
				</p>

				{/* Example 1: Positive/Negative */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">Positive/Negative Bars</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Create diverging bar charts by setting an <InlineCode>anchor</InlineCode> point at zero. Bars extend above and below the anchor, with distinct colors for positive (revenue) and negative (churn) values. Includes compact number formatting for large values.
					</p>
					<TabbedExample code={positiveNegativeExample} height={480} />
				</div>

				{/* Example 2: Horizontal Bars */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">Horizontal Bars</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Use the <InlineCode>horizontal</InlineCode> prop to render bars left-to-right instead of bottom-to-top. Perfect for long category names and rankings. Labels are centered on the bars for clear readability.
					</p>
					<TabbedExample code={horizontalBarsExample} height={480} />
				</div>

				{/* Example 3: Stacked Bars */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">Stacked Bars</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Stack multiple series on top of each other to show composition. Each series is rendered with its own fill color, allowing viewers to see both individual and total values. Useful for demographics, revenue breakdowns, and cumulative comparisons.
					</p>
					<TabbedExample code={stackedBarsExample} height={480} />
				</div>

				{/* Example 4: 100% Stacked Bars */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">100% Stacked Bars</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Normalize stacked data to percentages by using a group-based scaling approach. Each bar totals to 100%, making it easy to compare proportions across categories. Labels show percentage values for clear interpretation.
					</p>
					<TabbedExample code={percentBarsExample} height={480} />
				</div>

				{/* Example 5: Mask Gradient Fills */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">Mask Gradient Fills</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Apply SVG mask-based linear gradients to bar fills for visually rich charts. Gradients flow from left to right, creating depth and visual interest. Uses collision detection to avoid overlapping labels.
					</p>
					<TabbedExample code={maskGradientExample} height={480} />
				</div>
			</div>
		</div>
	);
}

/* ─────────────────────────── EXAMPLE CODE ─────────────────────────── */

const positiveNegativeExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default () => {
  const data = [
    {
      name: "Revenue",
      data: [
        { x: "2024-Q1", y: 125000 },
        { x: "2024-Q2", y: 180000 },
        { x: "2024-Q3", y: 95000 },
        { x: "2024-Q4", y: 220000 },
      ],
      fill: "rgba(34, 197, 94, 0.8)",
    },
    {
      name: "Churn",
      data: [
        { x: "2024-Q1", y: -18000 },
        { x: "2024-Q2", y: -12000 },
        { x: "2024-Q3", y: -28000 },
        { x: "2024-Q4", y: -8000 },
      ],
      fill: "rgba(239, 68, 68, 0.8)",
    },
  ];

  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph data={data} gap={{ top: 20, left: 40, right: 20, bottom: 40 }}>
        <Legend position="top" />
        <YAxis />
        <GridLines horizontal border />
        <Bars anchor={0} labels />
        <XAxis />
      </Graph>
    </div>
  );
};
`;

const horizontalBarsExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
  const data = [
    {
      name: "Sales",
      data: [
        { x: "Product Alpha", y: 285000 },
        { x: "Product Beta", y: 198000 },
        { x: "Product Gamma", y: 342000 },
        { x: "Product Delta", y: 156000 },
        { x: "Product Epsilon", y: 421000 },
      ],
      fill: "rgba(59, 130, 246, 0.8)",
    },
  ];

  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph data={data} gap={{ top: 20, left: 140, right: 20, bottom: 40 }}>
        <YAxis />
        <GridLines vertical border />
        <Bars horizontal labels />
        <XAxis />
      </Graph>
    </div>
  );
};
`;

const stackedBarsExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default () => {
  const data = [
    {
      name: "Male",
      data: [
        { x: "18-24", y: 425000 },
        { x: "25-34", y: 580000 },
        { x: "35-44", y: 720000 },
        { x: "45-54", y: 650000 },
      ],
      fill: "rgba(59, 130, 246, 0.85)",
    },
    {
      name: "Female",
      data: [
        { x: "18-24", y: 380000 },
        { x: "25-34", y: 550000 },
        { x: "35-44", y: 690000 },
        { x: "45-54", y: 630000 },
      ],
      fill: "rgba(236, 72, 153, 0.85)",
    },
    {
      name: "Non-binary",
      data: [
        { x: "18-24", y: 125000 },
        { x: "25-34", y: 185000 },
        { x: "35-44", y: 220000 },
        { x: "45-54", y: 198000 },
      ],
      fill: "rgba(168, 85, 247, 0.85)",
    },
  ];

  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph data={data} gap={{ top: 20, left: 40, right: 20, bottom: 40 }}>
        <Legend position="top" />
        <YAxis />
        <GridLines horizontal border />
        <Bars labels />
        <XAxis />
      </Graph>
    </div>
  );
};
`;

const percentBarsExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default () => {
  const totalByCategory = {
    "2024-Q1": 1000,
    "2024-Q2": 1200,
    "2024-Q3": 950,
    "2024-Q4": 1400,
  };

  const data = [
    {
      name: "Desktop",
      data: [
        { x: "2024-Q1", y: 520 },
        { x: "2024-Q2", y: 648 },
        { x: "2024-Q3", y: 475 },
        { x: "2024-Q4", y: 798 },
      ],
      fill: "rgba(59, 130, 246, 0.85)",
    },
    {
      name: "Mobile",
      data: [
        { x: "2024-Q1", y: 380 },
        { x: "2024-Q2", y: 420 },
        { x: "2024-Q3", y: 380 },
        { x: "2024-Q4", y: 490 },
      ],
      fill: "rgba(34, 197, 94, 0.85)",
    },
    {
      name: "Tablet",
      data: [
        { x: "2024-Q1", y: 100 },
        { x: "2024-Q2", y: 132 },
        { x: "2024-Q3", y: 95 },
        { x: "2024-Q4", y: 112 },
      ],
      fill: "rgba(168, 85, 247, 0.85)",
    },
  ];

  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph data={data} gap={{ top: 20, left: 40, right: 20, bottom: 40 }}>
        <Legend position="top" />
        <YAxis title="Percentage (%)" />
        <GridLines horizontal border />
        <Bars labels />
        <XAxis title="Quarter" />
      </Graph>
    </div>
  );
};
`;

const maskGradientExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
  const data = [
    {
      name: "Revenue",
      data: [
        { x: "Jan", y: 48000 },
        { x: "Feb", y: 52000 },
        { x: "Mar", y: 45000 },
        { x: "Apr", y: 61000 },
        { x: "May", y: 55000 },
        { x: "Jun", y: 67000 },
      ],
      fill: "mask:linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 1))",
    },
  ];

  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph data={data} gap={{ top: 20, left: 40, right: 20, bottom: 40 }}>
        <YAxis title="Monthly Revenue ($)" />
        <GridLines horizontal border />
        <Bars size={65} radius={6} labels />
        <XAxis title="Month" />
      </Graph>
    </div>
  );
};
`;
