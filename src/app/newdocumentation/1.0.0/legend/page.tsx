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
	{ id: "legend-props", label: "Legend Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-bottom", label: "Bottom Legend", indent: true },
	{ id: "example-interactive", label: "Interactive Legend", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
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
									<line x1="8" y1="6" x2="21" y2="6" />
									<line x1="8" y1="12" x2="21" y2="12" />
									<line x1="8" y1="18" x2="21" y2="18" />
									<line x1="3" y1="6" x2="3.01" y2="6" />
									<line x1="3" y1="12" x2="3.01" y2="12" />
									<line x1="3" y1="18" x2="3.01" y2="18" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Legend</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							The Legend component displays series names and colors for chart data, supporting flexible positioning,
							alignment, and interactive event handlers for filtering and highlighting data.
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
								<code className="text-xs font-mono">nanoplot/Legend</code>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<Legend />"}</InlineCode> component renders a legend for chart series, automatically reading
						colors from data and supporting positioning on any side of the graph. It works inside a{" "}
						<InlineCode>{"<Graph />"}</InlineCode> context and respects the top-to-bottom, left-to-right rendering order for
						optimal layout.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ icon: "flex", title: "Flexible Positioning", desc: "Place the legend on top, bottom, left, or right" },
							{ icon: "click", title: "Interactive Events", desc: "Click and hover handlers for filtering and highlighting" },
							{ icon: "auto", title: "Auto Color Detection", desc: "Automatically reads series colors from fill and stroke" },
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
						Import and use the Legend component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. The Legend
						automatically reads series names and colors from your data.
					</p>
					<CodeBlock title="basic-legend.tsx">{`import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { Legend } from "nanoplot/Legend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function MyChart() {
  return (
    <Graph>
      <Legend position="top" alignment="end" />
      <YAxis />
      <Lines data={[
        { name: "Revenue", data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 15 }] },
        { name: "Costs", data: [{ x: 0, y: 5 }, { x: 1, y: 12 }, { x: 2, y: 8 }] },
      ]} />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── JSX Tree Rule ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						<strong>Important:</strong> Components must follow top-to-bottom, left-to-right rendering order in JSX based on
						the legend's position:
					</p>
					<ul className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
						<li>
							<InlineCode>position="top"</InlineCode> — Legend must appear <strong>before</strong> YAxis
						</li>
						<li>
							<InlineCode>position="bottom"</InlineCode> — Legend goes <strong>after</strong> XAxis
						</li>
						<li>
							<InlineCode>position="left"</InlineCode> — Legend goes <strong>before</strong> YAxis
						</li>
						<li>
							<InlineCode>position="right"</InlineCode> — Legend goes <strong>after</strong> the chart data components
						</li>
					</ul>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Legend component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<Legend />"}</InlineCode> component accepts props to control positioning, alignment, event
						handlers, and dataset filtering.
					</p>

					{/* Legend Props */}
					<SubComponentSection
						id="legend-props"
						name="<Legend />"
						description="Renders the legend for chart series with customizable positioning, alignment, and event handlers."
					>
						<PropRow name="position" type='"top" | "bottom" | "left" | "right"' defaultValue='"top"'>
							Position of the legend relative to the chart. Affects JSX rendering order and layout.
						</PropRow>
						<PropRow name="alignment" type='"center" | "start" | "end"' defaultValue='"center"'>
							Alignment of the legend within its positioned area. <InlineCode>start</InlineCode> aligns to the beginning,{" "}
							<InlineCode>center</InlineCode> centers it, and <InlineCode>end</InlineCode> aligns to the end.
						</PropRow>
						<PropRow name="onClick" type="(datapoint: object) => void">
							Callback fired when a legend item is clicked. Receives the series data object. Useful for filtering or
							toggling series visibility.
						</PropRow>
						<PropRow name="onMouseEnter" type="(datapoint: object) => void">
							Callback fired when the mouse enters a legend item. Receives the series data object. Useful for highlighting
							related chart elements.
						</PropRow>
						<PropRow name="onMouseLeave" type="(datapoint: object) => void">
							Callback fired when the mouse leaves a legend item. Receives the series data object.
						</PropRow>
						<PropRow name="onMouseMove" type="(datapoint: object) => void">
							Callback fired when the mouse moves over a legend item. Receives the series data object.
						</PropRow>
						<PropRow name="datasets" type="string[]">
							Array of dataset IDs to include in the legend. If omitted, all datasets are included.
						</PropRow>
						<PropRow name="children" type="ReactNode">
							Custom children content to render instead of the default legend items.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Bottom Legend */}
					<div className="mt-14" id="example-bottom" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bottom Legend</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Position the legend at the bottom of the chart with center alignment. Remember to place it <strong>after</strong>{" "}
							the <InlineCode>{"<XAxis />"}</InlineCode> in JSX.
						</p>
						<TabbedExample code={bottomLegendExample} height={480} />
					</div>

					{/* Interactive Legend */}
					<div className="mt-14" id="example-interactive" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Legend</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use the <InlineCode>onClick</InlineCode> handler to toggle series visibility based on legend item clicks. The
							handler receives the full series object.
						</p>
						<TabbedExample code={interactiveLegendExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The Legend component does not have scoped CSS classes like other components. Styling is done through the{" "}
						<InlineCode>className</InlineCode> prop passed to the container div. You can also apply global styles targeting
						the legend container.
					</p>
					<CodeBlock title="custom-styling.css">{`.legend-container {
  font-size: 14px;
  gap: 12px;        /* space between items */
}

.legend-item {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.legend-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
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
import { Legend } from "nanoplot/Legend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph data={[
        {
          name: "Product A",
          stroke: "rgb(59, 130, 246)",
          data: [
            { x: 0, y: 10 },
            { x: 1, y: 25 },
            { x: 2, y: 15 },
            { x: 3, y: 30 },
          ],
        },
        {
          name: "Product B",
          stroke: "rgb(249, 115, 22)",
          data: [
            { x: 0, y: 5 },
            { x: 1, y: 12 },
            { x: 2, y: 8 },
            { x: 3, y: 18 },
          ],
        },
      ]}>
        <Legend position="top" alignment="end" />
        <YAxis title="Sales" />
        <GridLines horizontal vertical border />
        <Lines />
        <XAxis title="Quarter" />
      </Graph>
    </div>
  );
}
`;

const bottomLegendExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { Legend } from "nanoplot/Legend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph data={[
        {
          name: "Visitors",
          stroke: "rgb(59, 130, 246)",
          data: [
            { x: 0, y: 100 },
            { x: 1, y: 150 },
            { x: 2, y: 130 },
            { x: 3, y: 200 },
          ],
        },
        {
          name: "Conversions",
          stroke: "rgb(34, 197, 94)",
          data: [
            { x: 0, y: 20 },
            { x: 1, y: 35 },
            { x: 2, y: 28 },
            { x: 3, y: 50 },
          ],
        },
      ]}>
        <YAxis title="Count" />
        <GridLines horizontal vertical border />
        <Lines />
        <XAxis title="Week" />
        <Legend position="bottom" alignment="center" />
      </Graph>
    </div>
  );
}
`;

const interactiveLegendExample = `
import { useState } from "react";
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { Legend } from "nanoplot/Legend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const allData = [
  {
    name: "Series A",
    stroke: "rgb(59, 130, 246)",
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 25 },
      { x: 2, y: 15 },
      { x: 3, y: 30 },
    ],
  },
  {
    name: "Series B",
    stroke: "rgb(249, 115, 22)",
    data: [
      { x: 0, y: 5 },
      { x: 1, y: 12 },
      { x: 2, y: 8 },
      { x: 3, y: 18 },
    ],
  },
  {
    name: "Series C",
    stroke: "rgb(34, 197, 94)",
    data: [
      { x: 0, y: 15 },
      { x: 1, y: 20 },
      { x: 2, y: 25 },
      { x: 3, y: 22 },
    ],
  },
];

export default function App() {
  const [hidden, setHidden] = useState(new Set());

  const toggleSeries = (datapoint) => {
    const name = datapoint.name;
    const newHidden = new Set(hidden);
    if (newHidden.has(name)) {
      newHidden.delete(name);
    } else {
      newHidden.add(name);
    }
    setHidden(newHidden);
  };

  const filteredData = allData.filter(d => !hidden.has(d.name));

  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph data={filteredData}>
        <Legend position="top" alignment="end" onClick={toggleSeries} />
        <YAxis title="Value" />
        <GridLines horizontal vertical border />
        <Lines />
        <XAxis title="Time" />
      </Graph>
      <p style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
        Click legend items to toggle visibility
      </p>
    </div>
  );
}
`;
