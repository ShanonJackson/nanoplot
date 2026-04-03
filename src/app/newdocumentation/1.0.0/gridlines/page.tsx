"use client";
import * as React from "react";
import { useState, useEffect, ReactNode } from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { Badge, InlineCode, CodeBlock, PropRow, SectionHeading, SubComponentSection, TabbedExample, TableOfContents } from "../../components/Overview";

/* ─────────────────────────── TABLE OF CONTENTS ─────────────────────────── */

const TOC: Array<{ id: string; label: string; indent?: boolean }> = [
	{ id: "overview", label: "Overview" },
	{ id: "quick-start", label: "Quick Start" },
	{ id: "interactive-demo", label: "Interactive Demo" },
	{ id: "api-reference", label: "API Reference" },
	{ id: "gridlines-props", label: "GridLines Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-dashed", label: "Dashed Grid Lines", indent: true },
	{ id: "example-border-only", label: "Border Only", indent: true },
	{ id: "styling", label: "Styling" },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
			<div className="flex gap-12">
				{/* Main content */}
				<main className="min-w-0 flex-1 max-w-3xl">
					{/* ─── Hero ─── */}
					<div className="pt-12 pb-10 border-b border-gray-200/70 dark:border-white/[0.06]">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/20">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
									<line x1="6" y1="3" x2="6" y2="21" />
									<line x1="12" y1="3" x2="12" y2="21" />
									<line x1="18" y1="3" x2="18" y2="21" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">GridLines</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							GridLines render horizontal and vertical reference lines on your graph to improve readability and help users
							quickly identify values. Independently control border, horizontal, and vertical gridlines with flexible styling options.
						</p>
						<div className="flex items-center gap-4 mt-6">
							<div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
								</svg>
								<code className="text-xs font-mono">nanoplot/GridLines</code>
							</div>
							<span className="text-gray-300 dark:text-gray-600">|</span>
							<div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
									<line x1="3" y1="9" x2="21" y2="9" />
									<line x1="9" y1="21" x2="9" y2="9" />
								</svg>
								<span className="text-xs">Standalone Component</span>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<GridLines />"}</InlineCode> component renders reference gridlines on your graph. It is designed
						to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and provides fine-grained control over border lines,
						horizontal gridlines, and vertical gridlines.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "border", title: "Border Control", desc: "Toggle the outer border independently from axis gridlines" },
							{ icon: "axis", title: "Axis-specific Lines", desc: "Enable or disable horizontal or vertical lines separately" },
							{ icon: "styling", title: "Custom Styling", desc: "Apply custom CSS classes per line type with tailwind support" },
						].map((f) => (
							<div
								key={f.title}
								className="rounded-xl border border-gray-200/70 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-500/30"
							>
								<div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{f.title}</div>
								<div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
							</div>
						))}
					</div>

					{/* ─── Quick Start ─── */}
					<SectionHeading id="quick-start">Quick Start</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Import and use the GridLines component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. By default, all
						gridline types are enabled. Use the boolean props to customize which gridlines are shown.
					</p>
					<CodeBlock title="basic-gridlines.tsx">{`import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function MyChart() {
  return (
    <Graph>
      <YAxis />
      <GridLines />
      <Lines data={[{ data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 15 }, { x: 3, y: 30 }] }]} />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the GridLines component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<GridLines />"}</InlineCode> component accepts props to control which gridlines are rendered and
						how they are styled.
					</p>

					{/* GridLines Props */}
					<SubComponentSection
						id="gridlines-props"
						name="<GridLines />"
						description="Renders horizontal, vertical, and border gridlines on the graph axes."
					>
						<PropRow name="border" type="boolean" defaultValue="true">
							Renders border gridlines along the left, right, top, and bottom sides of the graph. Useful for framing the
							visualization without adding internal gridlines.
						</PropRow>
						<PropRow name="horizontal" type="boolean" defaultValue="true">
							Renders horizontal gridlines aligned with each tick on the y-axis. Helps users quickly identify values along the
							vertical axis.
						</PropRow>
						<PropRow name="vertical" type="boolean" defaultValue="true">
							Renders vertical gridlines aligned with each tick on the x-axis. Helps users quickly identify values along the
							horizontal axis.
						</PropRow>
						<PropRow name="className" type="string | { root?: string; vertical?: string; horizontal?: string; border?: string | { top?: string; left?: string; right?: string; bottom?: string } }">
							Custom CSS classes to apply to gridline elements. Pass a string to apply a single class to the root container, or
							an object for granular control. The <InlineCode>border</InlineCode> property can be a string or an object with
							sides (<InlineCode>top</InlineCode>, <InlineCode>left</InlineCode>, <InlineCode>right</InlineCode>,{" "}
							<InlineCode>bottom</InlineCode>).
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Dashed Grid Lines */}
					<div className="mt-14" id="example-dashed" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dashed Grid Lines</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>className</InlineCode> prop with Tailwind utilities to create dashed gridlines.
						</p>
						<TabbedExample code={dashedExample} height={480} />
					</div>

					{/* Border Only */}
					<div className="mt-14" id="example-border-only" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Border Only</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Disable internal gridlines by setting <InlineCode>horizontal</InlineCode> and <InlineCode>vertical</InlineCode> to{" "}
							<InlineCode>false</InlineCode>. This keeps only the outer border frame.
						</p>
						<TabbedExample code={borderOnlyExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific gridline elements.
					</p>
					<div className="rounded-xl border border-gray-200/70 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-white/[0.02]">
									<th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
										Class
									</th>
									<th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
										Element
									</th>
								</tr>
							</thead>
							<tbody>
								{[
									{ cls: "grid-lines__border", desc: "The border gridlines (top, left, right, bottom)" },
									{ cls: "grid-lines__horizontal", desc: "Horizontal gridlines aligned with y-axis ticks" },
									{ cls: "grid-lines__vertical", desc: "Vertical gridlines aligned with x-axis ticks" },
								].map((row, i) => (
									<tr key={i} className="border-b border-gray-100 dark:border-white/[0.05] last:border-0">
										<td className="px-5 py-3">
											<InlineCode>{row.cls}</InlineCode>
										</td>
										<td className="px-5 py-3 text-gray-600 dark:text-gray-400">{row.desc}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<CodeBlock title="custom-styling.css">{`.grid-lines__horizontal {
  stroke: rgba(100, 100, 100, 0.3);  /* semi-transparent gray */
  stroke-dasharray: 4, 4;            /* 4px dash, 4px gap */
  stroke-width: 1;                   /* thin lines */
}

.grid-lines__border {
  stroke: rgb(150, 150, 150);        /* darker border lines */
  stroke-width: 1.5;
}`}</CodeBlock>

					{/* Spacing at bottom */}
					<div className="h-24" />
				</main>

				{/* Table of Contents sidebar */}
				<TableOfContents items={TOC} />
			</div>
		</div>
	);
}

/* ─────────────────────────── SANDPACK EXAMPLES ─────────────────────────── */

const interactiveDemo = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(50).fill(null).map((_, i) => ({
  x: i,
  y: random(20, 80),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Time Series Data",
          stroke: "rgb(59, 130, 246)",
          data: DATA,
        }]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Value" />
        <GridLines border horizontal vertical />
        <Lines />
        <XAxis title="Time" />
      </Graph>
    </div>
  );
}
`;

const dashedExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(50).fill(null).map((_, i) => ({
  x: i,
  y: random(20, 80),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Data with Dashed Grid",
          stroke: "rgb(59, 130, 246)",
          data: DATA,
        }]}
      >
        <YAxis title="Value" />
        <GridLines
          className={{
            vertical: "[stroke-dasharray:4,4]",
            horizontal: "[stroke-dasharray:4,4]",
          }}
        />
        <Lines />
        <XAxis title="Time" />
      </Graph>
    </div>
  );
}
`;

const borderOnlyExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(50).fill(null).map((_, i) => ({
  x: i,
  y: random(20, 80),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Border Only",
          stroke: "rgb(59, 130, 246)",
          data: DATA,
        }]}
      >
        <YAxis title="Value" />
        <GridLines horizontal={false} vertical={false} />
        <Lines />
        <XAxis title="Time" />
      </Graph>
    </div>
  );
}
`;
