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

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
	return (
		<a href={`#${id}`} className="group block no-underline">
			<h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-2">
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
			</h2>
		</a>
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

export default function Page() {
	return (
		<div className="max-w-3xl mx-auto px-6 md:px-8 pb-24 pt-12">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-4">
					<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
						</svg>
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Lines Examples</h1>
							<Badge>Collection</Badge>
						</div>
					</div>
				</div>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
					Real-world examples demonstrating common patterns and techniques with the Lines component.
				</p>
			</div>

			{/* Mask Gradient */}
			<SectionHeading id="example-mask">Mask Gradient</SectionHeading>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
				Use <InlineCode>stroke</InlineCode> with a mask gradient to conditionally color the line based on values. Red for negative, green for positive.
			</p>
			<TabbedExample code={maskGradientExample} height={480} />

			{/* Legend Interactions */}
			<SectionHeading id="example-legend">Legend Interactions</SectionHeading>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
				Click legend items to pin series, hover to highlight. Use <InlineCode>interactions</InlineCode> and <InlineCode>Legend</InlineCode> callbacks for interactivity.
			</p>
			<TabbedExample code={legendInteractionsExample} height={480} />

			{/* Zoom and Pan */}
			<SectionHeading id="example-zoom">Zoom and Pan</SectionHeading>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
				Add <InlineCode>ZoomSlider</InlineCode> components to enable interactive zoom and pan functionality. Control the zoom state with <InlineCode>zoom</InlineCode> prop on Graph.
			</p>
			<TabbedExample code={zoomPanExample} height={480} />

			{/* Spacing at bottom */}
			<div className="h-24" />
		</div>
	);
}

/* ─────────────────────────── EXAMPLE CODE ─────────────────────────── */

const maskGradientExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className={"h-[70vh] w-[100%] m-auto p-10"}>
      <Graph
        data={[{
          name: "Money Made",
          stroke: "mask:linear-gradient(to top, #d93025 40, rgb(52, 168, 83) 40.001, rgb(52, 168, 83))",
          data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 102 },
            { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
            { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
            { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
          ],
        }]}
      >
        <Legend alignment={"end"} position={"top"} />
        <YAxis />
        <GridLines horizontal vertical border />
        <Lines curve={"natural"} joints={true} />
        <Lines.Tooltip />
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  );
}
`;

const legendInteractionsExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
  const [hovered, setHovered] = useState([]);
  const [pinned, setPinned] = useState([]);
  return (
    <div className={"h-[70vh] w-[100%] m-auto p-10"}>
      <Graph
        interactions={{ hovered, pinned }}
        data={[
          { name: "New Users", stroke: "#FF4B4B", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
          ]},
          { name: "Registered Users", stroke: "#33D4FF", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
          ]},
        ]}
      >
        <Legend alignment={"end"} position={"top"}
          onClick={(dp) => { setPinned((p) => p.includes(dp.id) ? p.filter((pin) => pin !== dp.id) : [...p, dp.id]); }}
          onMouseEnter={(dp) => { setHovered((h) => h.includes(dp.id) ? h.filter((hov) => hov !== dp.id) : [...h, dp.id]); }}
          onMouseLeave={(dp) => { setHovered((h) => h.filter((hov) => hov !== dp.id)); }}
        />
        <YAxis />
        <GridLines />
        <Lines curve={"natural"} />
        <Lines.Tooltip />
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  )
}
`;

const zoomPanExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { ZoomSlider } from "nanoplot/ZoomSlider";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
  const [zoom, setZoom] = useState({x: [0, 100], y: [0, 100]});
  return (
    <div className={"h-[70vh] w-[100%] m-auto p-10"}>
      <Graph
        data={[
          { name: "New Users", stroke: "#FF4B4B", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
          ]},
          { name: "Registered Users", stroke: "#33D4FF", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
          ]},
        ]}
        zoom={zoom}
      >
        <ZoomSlider.X onChange={setZoom}/>
        <Legend alignment={"end"} position={"top"} />
        <YAxis />
        <GridLines />
        <Lines curve={"natural"} />
        <Lines.Tooltip />
        <ZoomSlider.Y onChange={setZoom}/>
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  )
}
`;
