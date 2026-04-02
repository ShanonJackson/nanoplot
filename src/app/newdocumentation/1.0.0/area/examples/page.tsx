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
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Area Examples</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
					Explore practical examples of the Area component in action. Use these as a foundation for building your own area
					charts.
				</p>

				{/* Stacked Area Example */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 scroll-mt-24">Stacked Area</h2>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Layer multiple series with custom fill colors to visualize cumulative trends across categories. Each series is
						stacked on top of the previous one to show both individual and combined totals.
					</p>
					<TabbedExample code={stackedAreaExample} height={480} />
				</div>
			</div>
		</div>
	);
}

/* ─────────────────────────── EXAMPLE CODE ─────────────────────────── */

const stackedAreaExample = `
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { Area } from "nanoplot/Area";
import { XAxis } from "nanoplot/XAxis";
import "nanoplot/styles.css";

export default () => {
  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph
        data={[
          {
            name: "Downtown",
            data: [
              { x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 40 },
              { x: Temporal.Instant.from("2025-01-03T00:00:00Z"), y: 52 },
              { x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2025-01-07T00:00:00Z"), y: 22 },
              { x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 63 },
              { x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 40 },
              { x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 43 },
              { x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 54 },
              { x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 35 },
              { x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 25 },
            ],
            fill: 'rgba(227, 178, 209, 1)',
          },
          {
            name: "North Region",
            data: [
              { x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 30 },
              { x: Temporal.Instant.from("2025-01-03T00:00:00Z"), y: 21 },
              { x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 22 },
              { x: Temporal.Instant.from("2025-01-07T00:00:00Z"), y: 14 },
              { x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 47 },
              { x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 14 },
              { x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 32 },
              { x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 25 },
              { x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 34 },
              { x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 31 },
              { x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 14 },
            ],
            fill: 'rgba(181, 81, 157, 0.75)',
          },
          {
            name: "Central City",
            data: [
              { x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 24 },
              { x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 50 },
              { x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 22 },
              { x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 54 },
              { x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 20 },
              { x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 16 },
              { x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 34 },
              { x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 35 },
              { x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 14 },
            ],
            fill: 'rgba(83, 29, 204, 0.6)',
          },
        ]}
      >
        <Legend position={"top"} alignment={"start"} />
        <Area />
        <Area.Tooltip className={"bg-white dark:!bg-black"} />
        <XAxis
          ticks={{ jumps: "P2D" }}
          display={(x) => {
            if (typeof x === "number" || typeof x === "string") return null;
            return x.toLocaleString("en-US", { day: "numeric", timeZone: "UTC" });
          }}
        />
      </Graph>
    </div>
  );
}
`;
