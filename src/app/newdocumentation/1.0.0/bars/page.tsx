"use client";
import * as React from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { Badge, InlineCode, CodeBlock, PropRow, SectionHeading, SubComponentSection, TabbedExample, TableOfContents } from "../../components/Overview";

/* ─────────────────────────── TABLE OF CONTENTS ─────────────────────────── */

const TOC: Array<{ id: string; label: string; indent?: boolean }> = [
	{ id: "overview", label: "Overview" },
	{ id: "quick-start", label: "Quick Start" },
	{ id: "interactive-demo", label: "Interactive Demo" },
	{ id: "api-reference", label: "API Reference" },
	{ id: "bars-props", label: "Bars Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-positive-negative", label: "Positive/Negative", indent: true },
	{ id: "example-horizontal", label: "Horizontal Bars", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="white"
									strokeWidth="2.5"
									strokeLinecap="round"
								>
									<rect x="2" y="3" width="3" height="12" rx="0.5" />
									<rect x="8" y="7" width="3" height="8" rx="0.5" />
									<rect x="14" y="1" width="3" height="14" rx="0.5" />
									<rect x="20" y="9" width="3" height="6" rx="0.5" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Bars</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Bar charts compare discrete values across categories. Supports stacked bars, 100% stacked bars, horizontal mode, and positive/negative diverging bars.
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
								<code className="text-xs font-mono">nanoplot/Bars</code>
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
						The <InlineCode>{"<Bars />"}</InlineCode> component renders categorical data as vertical or horizontal bar shapes. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports several display modes for different data visualization needs.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ icon: "stack", title: "Stacked & Grouped", desc: "Multiple series stacked or side-by-side" },
							{ icon: "label", title: "Labels & Formatting", desc: "Automatic labels with compact number formatting" },
							{ icon: "horizontal", title: "Horizontal Mode", desc: "Vertical or horizontal bar orientation" },
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
						Import and use the Bars component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as
						an array of series, each containing an array of <InlineCode>{`{ x, y }`}</InlineCode> points.
					</p>
					<CodeBlock title="basic-bars.tsx">{`import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function MyBars() {
  return (
    <Graph
      data={[{
        name: "Sales by Quarter",
        data: [
          { x: "Q1", y: 25000 },
          { x: "Q2", y: 35000 },
          { x: "Q3", y: 42000 },
          { x: "Q4", y: 55000 },
        ],
      }]}
    >
      <YAxis />
      <GridLines horizontal />
      <Bars />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following shape:
					</p>
					<CodeBlock title="types">{`type CategoricalDataset = Array<{
  name: string;          // Series label (used in legend + labels)
  id?: string;           // Unique identifier
  description?: string;  // Optional description
  group?: string;        // Grouping key
  stroke?: string;       // Bar color
  fill?: string;         // Bar fill
  data: Array<{
    x: string;           // Category label
    y: number;           // Bar height/value
  }>;
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Bars component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<Bars />"}</InlineCode> component renders categorical data as bars with support for stacking, grouping, and horizontal orientation.
					</p>

					{/* Bars Props */}
					<SubComponentSection
						id="bars-props"
						name="<Bars />"
						description="Renders categorical data as vertical or horizontal bars. Supports stacking, grouping, and 100% stacked modes."
					>
						<PropRow name="labels" type="boolean" defaultValue="false">
							Enable text labels on top of each bar showing the value.
						</PropRow>
						<PropRow name="horizontal" type="boolean" defaultValue="false">
							Render bars horizontally instead of vertically.
						</PropRow>
						<PropRow name="anchor" type="number" defaultValue="0">
							The baseline value for positive/negative diverging bars. Set to 0 for neutral axis alignment.
						</PropRow>
						<PropRow name="size" type="number (0-100)" defaultValue="50">
							Bar width as a percentage of available space. Values closer to 100 create wider bars with less spacing.
						</PropRow>
						<PropRow name="radius" type="number (0-360)" defaultValue="0">
							Corner radius in pixels. Rounds the top corners of vertical bars or right corners of horizontal bars.
						</PropRow>
						<PropRow name="glow" type="boolean" defaultValue="false">
							Enable a soft glow effect behind the bars for visual emphasis.
						</PropRow>
						<PropRow name="children" type="ReactNode">
							Child components such as tooltips or additional overlays.
						</PropRow>
						<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Positive/Negative Bars */}
					<div className="mt-14" id="example-positive-negative" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Positive/Negative Bars</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Create diverging bar charts by setting an <InlineCode>anchor</InlineCode> point. Bars above and below the anchor are colored differently to highlight positive and negative values.
						</p>
						<TabbedExample code={positiveNegativeExample} height={480} />
					</div>

					{/* Horizontal Bars */}
					<div className="mt-14" id="example-horizontal" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Horizontal Bars</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>horizontal</InlineCode> prop to render bars left-to-right instead of bottom-to-top. This works well for long category names.
						</p>
						<TabbedExample code={horizontalBarsExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Bars elements.
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
									{ cls: "bars__bar", desc: "Individual bar rectangles" },
									{ cls: "bars__label", desc: "Label group container" },
									{ cls: "bars__label-text", desc: "Text content of labels" },
									{ cls: "bars__skeleton", desc: "Loading skeleton container" },
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

					<CodeBlock title="custom-styling.css">{`.bars__bar {
  opacity: 0.85;        /* semi-transparent bars */
  transition: opacity 0.2s;
}

.bars__bar:hover {
  opacity: 1;           /* full opacity on hover */
}

.bars__label-text {
  font-weight: 600;     /* bold labels */
  fill: currentColor;
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

/* ─────────────────────────── EXAMPLE CODE ─────────────────────────── */

const interactiveDemo = `
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph
        data={[
          {
            name: "Revenue",
            data: [
              { x: "Jan", y: 45000 },
              { x: "Feb", y: 52000 },
              { x: "Mar", y: 48000 },
              { x: "Apr", y: 61000 },
              { x: "May", y: 55000 },
              { x: "Jun", y: 67000 },
            ],
            fill: 'rgba(59, 130, 246, 0.8)',
          },
        ]}
        gap={{ top: 20, left: 40, right: 20, bottom: 40 }}
      >
        <YAxis title="Revenue ($)" />
        <GridLines horizontal border />
        <Bars labels />
        <XAxis title="Month" />
      </Graph>
    </div>
  );
};
`;

const positiveNegativeExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph
        data={[
          {
            name: "Net Change",
            data: [
              { x: "Q1", y: -12000 },
              { x: "Q2", y: 25000 },
              { x: "Q3", y: 18000 },
              { x: "Q4", y: -8000 },
            ],
            fill: 'rgba(59, 130, 246, 0.7)',
          },
        ]}
        gap={{ top: 20, left: 40, right: 20, bottom: 40 }}
      >
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
  return (
    <div className={"h-[70vh] w-[100%] p-4 px-10"}>
      <Graph
        data={[
          {
            name: "Sales",
            data: [
              { x: "Product A", y: 45000 },
              { x: "Product B", y: 52000 },
              { x: "Product C", y: 38000 },
              { x: "Product D", y: 61000 },
            ],
            fill: 'rgba(34, 197, 94, 0.8)',
          },
        ]}
        gap={{ top: 20, left: 100, right: 20, bottom: 40 }}
      >
        <YAxis />
        <GridLines vertical border />
        <Bars horizontal labels />
        <XAxis />
      </Graph>
    </div>
  );
};
`;
