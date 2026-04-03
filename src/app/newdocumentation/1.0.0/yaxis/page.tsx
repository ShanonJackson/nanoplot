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
	{ id: "yaxis-props", label: "YAxis Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-right", label: "Right-Positioned Axis", indent: true },
	{ id: "example-custom", label: "Custom Display Format", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
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
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="8" y1="9" x2="16" y2="9" />
									<line x1="8" y1="15" x2="16" y2="15" />
									<line x1="3" y1="21" x2="21" y2="21" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">YAxis</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							The YAxis component renders a vertical axis with labels, title, and optional tick marks. Automatically scales to fit your data and supports custom formatting for tick labels.
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
								<code className="text-xs font-mono">nanoplot/YAxis</code>
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
								<span className="text-xs">Simple Component</span>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<YAxis />"}</InlineCode> component renders a vertical axis on the left or right side of your graph. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and automatically manages tick positioning, scaling, and label formatting.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ title: "Auto Scaling", desc: "Automatically calculates optimal tick ranges and intervals" },
							{ title: "Dual Positioning", desc: "Place the axis on left or right side of chart" },
							{ title: "Custom Formatting", desc: "Format tick labels with custom display functions" },
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
						Import and use the YAxis component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. It will automatically compute the appropriate tick positions and scale based on your data range.
					</p>
					<CodeBlock title="basic-yaxis.tsx">{`import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function MyChart() {
  return (
    <Graph>
      <YAxis title="Price" />
      <Lines data={[{ data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 15 }, { x: 3, y: 30 }] }]} />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the YAxis component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<YAxis />"}</InlineCode> component accepts the following props.
					</p>

					{/* YAxis Props */}
					<SubComponentSection
						id="yaxis-props"
						name="<YAxis />"
						description="Renders a vertical axis with automatic tick calculation, optional title and description, and supports left/right positioning."
					>
						<PropRow name="title" type="ReactNode">
							Title text displayed vertically on the left side of the axis.
						</PropRow>
						<PropRow name="description" type="ReactNode">
							Description text displayed below the title.
						</PropRow>
						<PropRow name="position" type='"left" | "right"' defaultValue='"left"'>
							Position of the axis on the graph. Use <InlineCode>"right"</InlineCode> to place the axis on the right side.
						</PropRow>
						<PropRow
							name="ticks"
							type='{ from?: number | string; to?: number | string; jumps?: number | string }'
							defaultValue='{ from: "auto", to: "auto", jumps: "auto" }'
						>
							Controls tick positioning and intervals. Supports numeric values, temporal strings, percentage adjustments, and <InlineCode>"auto"</InlineCode> for automatic calculation. Same as XAxis.
						</PropRow>
						<PropRow name="display" type="(tick: number | string) => ReactNode">
							Custom formatter function for tick labels. Receives the tick value and should return JSX or a string.
						</PropRow>
						<PropRow name="teeth" type="boolean" defaultValue="false">
							When <InlineCode>true</InlineCode>, displays small tick marks on the side of the axis.
						</PropRow>
						<PropRow name="dataset" type="string">
							Specifies which dataset to use for multi-dataset graphs. When not provided, uses the first dataset.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Right-Positioned Axis */}
					<div className="mt-14" id="example-right" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Right-Positioned Axis</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>position</InlineCode> prop to place the YAxis on the right side of the graph.
						</p>
						<TabbedExample code={rightPositionExample} height={480} />
					</div>

					{/* Custom Display Format */}
					<div className="mt-14" id="example-custom" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Display Format</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>display</InlineCode> prop to customize how tick labels are formatted.
						</p>
						<TabbedExample code={customDisplayExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of YAxis elements.
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
									{ cls: "yaxis", desc: "Root container of the axis" },
									{ cls: "yaxis__ticks", desc: "Container for all tick labels" },
									{ cls: "yaxis__tick", desc: "Individual tick label element" },
									{ cls: "yaxis__labels", desc: "Container for title and description" },
									{ cls: "yaxis__title", desc: "Title text element" },
									{ cls: "yaxis__description", desc: "Description text element" },
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

					<CodeBlock title="custom-yaxis-styling.css">{`.yaxis__tick {
  font-size: 12px;        /* smaller or larger tick labels */
  fill: #666;             /* custom tick color */
  opacity: 0.8;           /* semi-transparent ticks */
}

.yaxis__title {
  font-weight: bold;      /* make title bold */
  fill: #000;             /* title color */
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
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 22 },
  { x: 5, y: 35 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Sales",
          data: data,
        }]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Revenue ($)" />
        <GridLines border horizontal vertical />
        <Lines />
        <XAxis title="Month" />
      </Graph>
    </div>
  );
}
`;

const rightPositionExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 22 },
  { x: 5, y: 35 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Temperature",
          data: data,
        }]}
      >
        <YAxis position="right" title="Temperature (°C)" />
        <GridLines border horizontal vertical />
        <Lines />
        <XAxis />
      </Graph>
    </div>
  );
}
`;

const customDisplayExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 22 },
  { x: 5, y: 35 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Completion Rate",
          data: data,
        }]}
      >
        <YAxis
          title="Completion %"
          display={(tick) => \`\${tick}%\`}
        />
        <GridLines border horizontal vertical />
        <Lines />
        <XAxis />
      </Graph>
    </div>
  );
}
`;
