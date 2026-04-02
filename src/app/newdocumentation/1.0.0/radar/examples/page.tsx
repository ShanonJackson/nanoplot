"use client";
import * as React from "react";
import { useState, ReactNode } from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

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
		<div className="max-w-3xl mx-auto px-6 md:px-8 py-12 pb-24">
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Radar Examples</h1>
			<p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
				Explore practical examples and use cases for the Radar chart component.
			</p>

			{/* Multi-Series Example */}
			<div className="mb-16">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Multi-Series Comparison</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
					Compare multiple datasets side-by-side on the same radar chart. This example shows Jason and Alex's progress across different game skills.
					Each series is rendered with its own color, making it easy to see which player excels in each category.
				</p>
				<TabbedExample code={multiSeriesExample} height={600} />
			</div>

			<div className="h-12" />
		</div>
	);
}

/* ─────────────────────────── EXAMPLES ─────────────────────────── */

const multiSeriesExample = `
import { Radar } from "nanoplot/Radar";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className={"h-[70vh] w-[60%] m-auto"}>
      <Graph
        data={[
          { name: "Jason's Progress", stroke: "#11ACAE", data: [
            { x: "Fighting", y: 70 }, { x: "Farming", y: 8 }, { x: "Supporting", y: 300 }, { x: "Pushing", y: 90 }, { x: "Versatility", y: 60 },
          ]},
          { name: "Alex's Progress", stroke: "#E63946", data: [
            { x: "Fighting", y: 50 }, { x: "Farming", y: 95 }, { x: "Supporting", y: 60 }, { x: "Pushing", y: 50 }, { x: "Versatility", y: 90 },
          ]},
        ]}
      >
        <Radar />
      </Graph>
    </div>
  );
}
`;
