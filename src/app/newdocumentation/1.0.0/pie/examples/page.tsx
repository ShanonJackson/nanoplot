"use client";
import * as React from "react";
import { useState, ReactNode } from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";

/* ─────────────────────────── TABBED EXAMPLE ─────────────────────────── */

function TabbedExample({ code, height = 500 }: { code: string; height?: number }) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const isLight = typeof document !== "undefined" && document.cookie.includes("theme=light");

	const themeSetup = isLight
		? `document.documentElement.style.colorScheme="light";document.documentElement.style.background="white";document.documentElement.style.color="black";`
		: `document.body.classList.add("dark");document.documentElement.style.colorScheme="dark";document.documentElement.style.background="black";document.documentElement.style.color="white";`;

	const setupCode =
		themeSetup +
		`\nvar l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap";l.rel="stylesheet";document.head.appendChild(l);document.body.style.fontFamily="FigTree, sans-serif";`;

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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
							<circle cx="12" cy="12" r="3" />
						</svg>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="13"
							height="13"
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

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
			<main className="max-w-3xl">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Examples</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
					Explore practical examples of the Pie component with various configurations and use cases.
				</p>

				{/* Example 1: Donut Progress Bar */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Donut Progress Bar</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Create a circular progress indicator using a donut chart with custom content in the center. Combine with the{" "}
						<code className="px-1.5 py-0.5 rounded-md text-[13px] font-mono bg-gray-100 dark:bg-white/[0.06] text-pink-500 dark:text-pink-400 border border-gray-200 dark:border-white/10">
							total
						</code>{" "}
						prop to scale segments relative to a total value, and use{" "}
						<code className="px-1.5 py-0.5 rounded-md text-[13px] font-mono bg-gray-100 dark:bg-white/[0.06] text-pink-500 dark:text-pink-400 border border-gray-200 dark:border-white/10">
							children
						</code>{" "}
						to display custom metrics or percentages.
					</p>
					<TabbedExample code={donutProgressExample} height={480} />
				</div>

				{/* Example 2: Pie Collision */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pie Collision</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Visualize datasets with vastly different segment sizes. When one slice dominates and others are small, the component
						automatically positions labels and connector lines to avoid overlaps and maintain readability.
					</p>
					<TabbedExample code={collisionExample} height={480} />
				</div>

				{/* Example 3: Custom Donut Radius */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom Donut Radius</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Fine-tune the donut appearance by passing a custom inner radius. The{" "}
						<code className="px-1.5 py-0.5 rounded-md text-[13px] font-mono bg-gray-100 dark:bg-white/[0.06] text-pink-500 dark:text-pink-400 border border-gray-200 dark:border-white/10">
							donut
						</code>{" "}
						prop accepts a number (percentage of the viewbox) to control the inner radius of the donut.
					</p>
					<TabbedExample code={customRadiusExample} height={480} />
				</div>

				{/* Spacing at bottom */}
				<div className="h-12" />
			</main>
		</div>
	);
}

/* ─────────────────────────── CODE EXAMPLES ─────────────────────────── */

const donutProgressExample = `
import { Graph } from "nanoplot/Graph";
import { Pie } from "nanoplot/Pie";
import "nanoplot/styles.css";

const DATA = [
  { name: "Completed", value: 72, fill: "rgb(34, 197, 94)" },
  { name: "Remaining", value: 28, fill: "rgb(229, 231, 235)" },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 flex items-center justify-center">
      <div style={{ width: 300, height: 300 }}>
        <Graph data={DATA}>
          <Pie
            donut={25}
            total={100}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}>
              <div style={{ fontSize: 32, fontWeight: "bold" }}>72%</div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>Complete</div>
            </div>
          </Pie>
        </Graph>
      </div>
    </div>
  );
}
`;

const collisionExample = `
import { Graph } from "nanoplot/Graph";
import { Pie } from "nanoplot/Pie";
import "nanoplot/styles.css";

const DATA = [
  { name: "Dominant", value: 500, fill: "rgb(59, 130, 246)" },
  { name: "Small 1", value: 35, fill: "rgb(249, 115, 22)" },
  { name: "Small 2", value: 25, fill: "rgb(34, 197, 94)" },
  { name: "Small 3", value: 20, fill: "rgb(239, 68, 68)" },
  { name: "Small 4", value: 15, fill: "rgb(168, 85, 247)" },
  { name: "Small 5", value: 5, fill: "rgb(236, 72, 153)" },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full pt-12 p-4 flex items-center justify-center mt-10">
      <div style={{ width: 500, height: 450 }}>
        <Graph data={DATA}>
          <Pie labels glow />
        </Graph>
      </div>
    </div>
  );
}
`;

const customRadiusExample = `
import { Graph } from "nanoplot/Graph";
import { Pie } from "nanoplot/Pie";
import "nanoplot/styles.css";

const DATA = [
  { name: "Q1", value: 250, fill: "rgb(59, 130, 246)" },
  { name: "Q2", value: 300, fill: "rgb(249, 115, 22)" },
  { name: "Q3", value: 280, fill: "rgb(34, 197, 94)" },
  { name: "Q4", value: 220, fill: "rgb(239, 68, 68)" },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 flex items-center justify-center">
      <div style={{ width: 400, height: 400 }}>
        <Graph data={DATA}>
          <Pie
            donut={15}
            labels
            glow
          />
        </Graph>
      </div>
    </div>
  );
}
`;
