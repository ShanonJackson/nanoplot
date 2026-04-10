"use client";
import * as React from "react";
import { useState, useEffect, ReactNode } from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import {
	Badge,
	InlineCode,
	CodeBlock,
	PropRow,
	SectionHeading,
	SubComponentSection,
	TabbedExample,
	TableOfContents,
} from "../../components/Overview";

/* ─────────────────────────── TABLE OF CONTENTS ─────────────────────────── */

const TOC: Array<{ id: string; label: string; indent?: boolean }> = [
	{ id: "overview", label: "Overview" },
	{ id: "quick-start", label: "Quick Start" },
	{ id: "interactive-demo", label: "Interactive Demo" },
	{ id: "api-reference", label: "API Reference" },
	{ id: "area-props", label: "Area Props", indent: true },
	{ id: "area-tooltip", label: "Area.Tooltip", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-stacked", label: "Stacked Area", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
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
									<path d="M2 20l5-14 5 8 5-6 5 12" />
									<path d="M2 20h20" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Area</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							An area chart displays trends over time. In stacked versions, each series is layered to highlight cumulative
							trends and combined totals.
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
								<code className="text-xs font-mono">nanoplot/Area</code>
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
						The <InlineCode>{"<Area />"}</InlineCode> component renders data as a filled area under a curve on a cartesian
						plane. It is designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports smooth curve
						interpolation and custom fill colors.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "stack", title: "Stacked Areas", desc: "Layer multiple series to show cumulative contributions" },
							{ icon: "curve", title: "Curve Types", desc: "Five interpolation modes from linear to step functions" },
							{ icon: "gradient", title: "Gradient Fills", desc: "Custom fill colors per series for rich visual depth" },
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
						Import and use the Area component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as an
						array of series, each containing an array of <InlineCode>{`{ x, y }`}</InlineCode> points.
					</p>
					<CodeBlock title="basic-area.tsx">{`import { Graph } from "nanoplot/Graph";
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function MyArea() {
  return (
    <Graph
      data={[{
        name: "Revenue",
        data: [
          { x: 0, y: 25 },
          { x: 1, y: 60 },
          { x: 2, y: 80 },
          { x: 3, y: 45 },
        ],
      }]}
    >
      <YAxis />
      <GridLines horizontal />
      <Area />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following shape:
					</p>
					<CodeBlock title="types">{`type CartesianDataset = Array<{
  name: string;          // Series label (used in legend + labels)
  id?: string;           // Unique identifier
  description?: string;  // Optional description
  group?: string;        // Grouping key
  stroke?: string;       // Line color
  fill?: string;         // Fill color
  data: Array<{
    x: number | string;  // X-axis value
    y: number | string;  // Y-axis value
  }>;
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Area component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Area is a compound component with two parts. The main <InlineCode>{"<Area />"}</InlineCode> renders the filled area,
						while the sub-component adds tooltips for interactivity.
					</p>

					{/* Area Props */}
					<SubComponentSection
						id="area-props"
						name="<Area />"
						description="Renders the filled area under a curve on the graph. Supports multiple interpolation modes for different curve types."
					>
						<PropRow
							name="curve"
							type="'linear' | 'natural' | 'monotoneX' | 'stepBefore' | 'stepAfter'"
							defaultValue="'linear'"
						>
							Curve interpolation type. Controls how points are connected: linear connects with straight lines, natural uses
							cubic splines, and step variants create step-like transitions.
						</PropRow>
						<PropRow name="children" type="ReactNode">
							Custom SVG elements to render within the area chart container.
						</PropRow>
						<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
					</SubComponentSection>

					{/* Area.Tooltip */}
					<SubComponentSection
						id="area-tooltip"
						name="<Area.Tooltip />"
						description="Adds hover-activated tooltips to the area chart. Shows information about the data point nearest to the cursor."
					>
						<PropRow name="className" type="string">
							CSS class for the tooltip container. Useful for styling the tooltip background and text.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Stacked Area Example */}
					<div className="mt-14" id="example-stacked" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Stacked Area</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Layer multiple series with custom fill colors to visualize cumulative trends across categories. Each series is
							stacked on top of the previous one to show both individual and combined totals.
						</p>
						<TabbedExample code={stackedExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Area elements.
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
									{ cls: "area__stroke", desc: "The line path above the filled area" },
									{ cls: "area__fill", desc: "The filled area beneath the line" },
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

					<CodeBlock title="custom-styling.css">{`.area__stroke {
  stroke-width: 2;     /* line thickness */
  opacity: 0.8;        /* semi-transparent line */
}

.area__fill {
  opacity: 0.6;        /* semi-transparent fill */
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
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[
          {
            name: "Email", group: "Site Traffic",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 4 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 2 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 3 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 4 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 5 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 3 },
              { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 5 },
              { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 2 },
              { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 4 },
              { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 4 },
              { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 3 },
              { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 4 },
            ],
          },
          {
            name: "Social", group: "Site Traffic",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 7 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 9 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 8 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 8 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 7 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 10 },
              { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 8 },
              { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 9 },
              { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 7 },
              { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 9 },
              { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 7 },
              { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 8 },
            ],
          },
          {
            name: "Direct", group: "Site Traffic",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 12 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 14 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 12 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 11 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 11 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 13 },
              { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 14 },
              { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 12 },
              { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 11 },
              { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 12 },
              { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 12 },
              { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 12 },
            ],
          },
          {
            name: "Organic", group: "Site Traffic",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 42 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 33 },
              { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 33 },
              { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 36 },
              { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 35 },
              { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 37 },
              { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 33 },
            ],
          },
        ]}
      >
        <YAxis ticks={{ to: 100 }} display={(y) => y.toString() + "%"} />
        <GridLines border horizontal vertical />
        <Area />
        <Area.Tooltip className={"bg-white dark:!bg-black"} />
        <XAxis
          ticks={{ jumps: "P1M" }}
          display={(x) => {
            if (typeof x === "number" || typeof x === "string") return null;
            return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
          }}
        />
      </Graph>
    </div>
  );
}
`;

const stackedExample = `
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
