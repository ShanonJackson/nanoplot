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
	{ id: "pie-props", label: "Pie Props", indent: true },
	{ id: "pie-tooltip", label: "Pie.Tooltip", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-donut", label: "Donut Progress Bar", indent: true },
	{ id: "example-collision", label: "Pie Collision", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
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
									<circle cx="12" cy="12" r="10" />
									<path d="M12 2v10l7 5" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pie</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Pie charts provide a quick, intuitive view of proportions, making it easy to compare the relative sizes of
							categories at a glance. Supports custom tooltips, labels, and donut styling.
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
								<code className="text-xs font-mono">nanoplot/Pie</code>
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
								<span className="text-xs">Compound Component</span>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<Pie />"}</InlineCode> component renders categorical data as circular slices. It is a non-cartesian
						visualization that works independently and supports several companion sub-components for enhanced interactivity.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "donut", title: "Donut Mode", desc: "Configure as full pie or hollow donut with custom radius" },
							{ icon: "tooltip", title: "Tooltips", desc: "Hover-activated tooltips for each segment" },
							{ icon: "labels", title: "Labels", desc: "Display segment names with automatic connector lines" },
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
						Import and use the Pie component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as an array of objects with <InlineCode>name</InlineCode> and{" "}
						<InlineCode>value</InlineCode> properties.
					</p>
					<CodeBlock title="basic-pie.tsx">{`import { Graph } from "nanoplot/Graph";
import { Pie } from "nanoplot/Pie";
import "nanoplot/styles.css";

export default function MyPie() {
  return (
    <Graph data={[
      { name: "Desktop", value: 400 },
      { name: "Mobile", value: 300 },
      { name: "Tablet", value: 200 },
    ]}>
      <Pie labels />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop expects the following shape:
					</p>
					<CodeBlock title="types">{`type PieData = Array<{
  name: string;          // Segment label
  value: number;         // Numeric value for this segment
  id?: string;           // Unique identifier
  fill?: string;         // Custom segment color
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Pie component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Pie is a compound component with two parts. The main <InlineCode>{"<Pie />"}</InlineCode> renders the segments,
						while sub-components add tooltips.
					</p>

					{/* Pie Props */}
					<SubComponentSection
						id="pie-props"
						name="<Pie />"
						description="Renders data segments as SVG arc elements. Non-cartesian visualization that does not require a Graph wrapper."
					>
						<PropRow name="data" type="Array<{ name: string; value: number; id?: string; fill?: string }>" required>
							The pie chart data. Each object represents a segment with a name and numeric value.
						</PropRow>
						<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
						<PropRow name="donut" type="boolean | number" defaultValue="false">
							Enable donut mode. Pass <InlineCode>true</InlineCode> for default donut with 40% inner radius, or a number
							(0-1) for custom inner radius.
						</PropRow>
						<PropRow name="className" type="string" defaultValue="-">
							Applies a custom CSS class to the pie SVG container.
						</PropRow>
						<PropRow name="labels" type="boolean | (segment: PieSegment) => ReactNode" defaultValue="false">
							Enable or customize labels rendered for each segment. Pass <InlineCode>true</InlineCode> for default labels
							(segment name), or a function for custom content.
						</PropRow>
						<PropRow name="glow" type="boolean" defaultValue="false">
							Adds a glow effect to segments on hover.
						</PropRow>
						<PropRow name="total" type="number" defaultValue="-">
							Optional total value for progress-style donuts. When set, segments are scaled relative to this total.
						</PropRow>
						<PropRow name="children" type="ReactNode" defaultValue="-">
							Optional content to render in the center of a donut chart.
						</PropRow>
					</SubComponentSection>

					{/* Pie.Tooltip */}
					<SubComponentSection
						id="pie-tooltip"
						name="<Pie.Tooltip />"
						description="Adds hover-activated tooltips to pie segments. Renders a portal-based tooltip on segment hover."
					>
						<PropRow name="render" type="(segment: PieSegment) => ReactNode" required>
							Render function for tooltip content. Receives the hovered segment with its name, value, and percentage.
						</PropRow>
						<PropRow name="className" type="string | (segment: PieSegment) => string">
							CSS class for the tooltip container. Can be a static string or a function that receives the hovered segment
							for dynamic styling.
						</PropRow>
						<PropRow name="style" type="CSSProperties | (segment: PieSegment) => CSSProperties">
							Inline styles for the tooltip. Supports dynamic styling via a function.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Donut Progress Bar */}
					<div className="mt-14" id="example-donut" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Donut Progress Bar</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use a donut chart with <InlineCode>total</InlineCode> and <InlineCode>children</InlineCode> to create a
							progress indicator. The center content displays the percentage or custom metrics.
						</p>
						<TabbedExample code={donutProgressExample} height={480} />
					</div>

					{/* Pie Collision */}
					<div className="mt-14" id="example-collision" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pie Collision</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Handle slices of vastly different sizes. When you have one dominant segment and many small ones, labels and
							connectors intelligently position themselves to avoid overlap.
						</p>
						<TabbedExample code={collisionExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Pie elements.
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
									{ cls: "pie__segment-group", desc: "Container for all segments" },
									{ cls: "pie__segment", desc: "Individual pie segment SVG path" },
									{ cls: "pie__label", desc: "Segment label text element" },
									{ cls: "pie__label__connector", desc: "Connector line from segment to label" },
									{ cls: "pie__track", desc: "Background track (visible in donut mode)" },
									{ cls: "pie__children", desc: "Container for center content in donut" },
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

					<CodeBlock title="custom-styling.css">{`.pie__segment {
  stroke-width: 2;       /* segment border */
  opacity: 0.9;          /* segment opacity */
}

.pie__label {
  font-weight: 600;      /* label weight */
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
import { Pie } from "nanoplot/Pie";
import "nanoplot/styles.css";

const DATA = [
  { name: "Chrome", value: 450 },
  { name: "Firefox", value: 300 },
  { name: "Safari", value: 200 },
  { name: "Edge", value: 150 },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 flex items-center justify-center">
      <div style={{ width: 400, height: 400 }}>
        <Graph data={DATA}>
          <Pie labels glow />
        </Graph>
      </div>
    </div>
  );
}
`;

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
  { name: "Product A", value: 400, fill: "rgb(59, 130, 246)" },
  { name: "Product B", value: 30, fill: "rgb(249, 115, 22)" },
  { name: "Product C", value: 20, fill: "rgb(34, 197, 94)" },
  { name: "Product D", value: 15, fill: "rgb(239, 68, 68)" },
  { name: "Product E", value: 10, fill: "rgb(168, 85, 247)" },
];

export default function App() {
  return (
    <div className="h-[70vh] w-full pt-12 p-4 flex items-center justify-center">
      <div style={{ width: 500, height: 400 }}>
        <Graph data={DATA}>
          <Pie labels glow />
        </Graph>
      </div>
    </div>
  );
}
`;
