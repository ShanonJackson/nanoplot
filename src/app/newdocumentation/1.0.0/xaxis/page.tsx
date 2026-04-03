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
	{ id: "xaxis-props", label: "XAxis Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-formatting", label: "Custom Tick Formatting", indent: true },
	{ id: "example-title", label: "With Title and Description", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
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
									<line x1="5" y1="12" x2="19" y2="12" />
									<line x1="5" y1="12" x2="5" y2="18" />
									<line x1="19" y1="12" x2="19" y2="18" />
									<line x1="10" y1="18" x2="10" y2="20" />
									<line x1="14" y1="18" x2="14" y2="20" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">XAxis</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							The XAxis component renders a horizontal axis with customizable tick positions, labels, and formatting.
							Supports auto scaling, custom tick intervals, temporal expressions, and percentage adjustments.
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
								<code className="text-xs font-mono">nanoplot/XAxis</code>
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
						The <InlineCode>{"<XAxis />"}</InlineCode> component renders a horizontal axis with tick marks and labels.
						It is designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and automatically adapts to
						the chart's data domain.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ icon: "auto", title: "Auto Scaling", desc: "Automatically calculates optimal tick ranges and intervals" },
							{ icon: "format", title: "Custom Formatting", desc: "Format tick labels with custom display functions" },
							{ icon: "temporal", title: "Temporal Support", desc: "Native support for date and time-based axes" },
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
						Import and use the XAxis component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. The component
						automatically scales to your data domain and displays tick marks and labels.
					</p>
					<CodeBlock title="basic-xaxis.tsx">{`import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function MyChart() {
  return (
    <Graph>
      <YAxis />
      <Lines data={[{ data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 15 }, { x: 3, y: 30 }] }]} />
      <XAxis title="Time" />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the XAxis component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<XAxis />"}</InlineCode> component supports customizable tick positioning, formatting,
						and display options.
					</p>

					{/* XAxis Props */}
					<SubComponentSection
						id="xaxis-props"
						name="<XAxis />"
						description="Renders a horizontal axis with tick marks, labels, and optional title. Automatically scales to fit the graph data domain."
					>
						<PropRow name="ticks" type="{ from?: number | string; to?: number | string; jumps?: number | string }" defaultValue="{from: 'auto', to: 'auto', jumps: 'auto'}">
							Controls tick positioning. Supports numeric values, temporal expressions (e.g., <InlineCode className="!text-[11px]">'min - P1M'</InlineCode>), and percentage adjustments (e.g., <InlineCode className="!text-[11px]">'min - 10%'</InlineCode>). Set to <InlineCode className="!text-[11px]">'auto'</InlineCode> for automatic calculation.
						</PropRow>
						<PropRow name="title" type="ReactNode">
							Title text displayed below the axis. Useful for labeling the axis dimension.
						</PropRow>
						<PropRow name="teeth" type="boolean" defaultValue="false">
							When <InlineCode className="!text-[11px]">true</InlineCode>, displays small tick marks (teeth) at the top of the axis.
						</PropRow>
						<PropRow name="display" type="(tick: number | string) => ReactNode">
							Custom formatter function for tick labels. Receives the tick value and returns the formatted content.
						</PropRow>
						<PropRow name="description" type="ReactNode">
							Description text displayed below the title. Useful for additional context about the axis.
						</PropRow>
						<PropRow name="dataset" type="string">
							Specifies which dataset to use for multi-dataset graphs. If not provided, uses the first dataset.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Custom Tick Formatting */}
					<div className="mt-14" id="example-formatting" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Tick Formatting</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>display</InlineCode> prop to format tick labels. This example formats numeric values
							as currency.
						</p>
						<TabbedExample code={customFormattingExample} height={480} />
					</div>

					{/* With Title and Description */}
					<div className="mt-14" id="example-title" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">With Title and Description</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Add a <InlineCode>title</InlineCode> and <InlineCode>description</InlineCode> to provide context for the
							axis.
						</p>
						<TabbedExample code={titleDescriptionExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific XAxis elements.
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
									{ cls: "xaxis", desc: "Root container for the entire axis" },
									{ cls: "xaxis__ticks", desc: "Container for tick marks and labels" },
									{ cls: "xaxis__tick", desc: "Individual tick label element" },
									{ cls: "xaxis__labels", desc: "Title and description container" },
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

					<CodeBlock title="custom-xaxis-styling.css">{`.xaxis {
  font-size: 12px;     /* adjust tick label size */
  color: #666;         /* change text color */
}

.xaxis__tick {
  font-weight: 600;    /* make labels bolder */
  opacity: 0.8;        /* semi-transparent labels */
}

.xaxis__labels {
  margin-top: 8px;     /* space between axis and title */
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
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 20 },
  { x: 5, y: 35 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Monthly Sales",
          data: DATA,
        }]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Revenue ($)" />
        <GridLines border horizontal />
        <Lines />
        <XAxis title="Month" />
      </Graph>
    </div>
  );
}
`;

const customFormattingExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const DATA = [
  { x: 100, y: 30 },
  { x: 200, y: 50 },
  { x: 300, y: 40 },
  { x: 400, y: 60 },
  { x: 500, y: 75 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Budget Allocation",
          data: DATA,
        }]}
      >
        <YAxis title="Percentage (%)" />
        <GridLines border horizontal />
        <Lines />
        <XAxis
          title="Spending"
          display={(tick) => \`$\${tick}\`}
        />
      </Graph>
    </div>
  );
}
`;

const titleDescriptionExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const DATA = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 20 },
  { x: 5, y: 35 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Quarterly Performance",
          data: DATA,
        }]}
      >
        <YAxis title="Revenue ($)" />
        <GridLines border horizontal vertical />
        <Lines />
        <XAxis
          title="Quarter"
          description="Q1 2024 - Q2 2024"
        />
      </Graph>
    </div>
  );
}
`;
