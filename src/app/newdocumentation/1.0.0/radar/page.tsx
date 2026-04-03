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
	{ id: "radar-props", label: "Radar Props", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-multi", label: "Multi-Series Comparison", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
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
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Radar</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Radar charts compare multivariate data across shared categories, highlighting patterns and gaps between datasets at a glance.
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
								<code className="text-xs font-mono">nanoplot/Radar</code>
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
								<span className="text-xs">Component</span>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<Radar />"}</InlineCode> component renders multivariate data in a polar coordinate system. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports multiple series for side-by-side
						comparison.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "multi", title: "Multi-Series", desc: "Compare multiple datasets on the same radar" },
							{ icon: "scalar", title: "Custom Scalars", desc: "Define custom min/max values and tick intervals" },
							{ icon: "wedge", title: "Hoverable Wedges", desc: "Interactive wedge highlighting on hover" },
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
						Import and use the Radar component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as
						an array of series, each containing an array of <InlineCode>{`{ x, y }`}</InlineCode> points.
					</p>
					<CodeBlock title="basic-radar.tsx">{`import { Graph } from "nanoplot/Graph";
import { Radar } from "nanoplot/Radar";
import "nanoplot/styles.css";

export default function MyRadar() {
  return (
    <Graph
      data={[{
        name: "Performance",
        data: [
          { x: "Fighting", y: 70 },
          { x: "Farming", y: 8 },
          { x: "Supporting", y: 300 },
          { x: "Pushing", y: 90 },
          { x: "Versatility", y: 60 },
        ],
      }]}
    >
      <Radar />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following shape:
					</p>
					<CodeBlock title="types">{`type PolarDataset = Array<{
  name: string;          // Series label
  id?: string;           // Unique identifier
  description?: string;  // Optional description
  group?: string;        // Grouping key
  stroke?: string;       // Line color
  fill?: string;         // Fill color
  data: Array<{
    x: string;           // Category label
    y: number;           // Value
  }>;
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Radar component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						The <InlineCode>{"<Radar />"}</InlineCode> component provides a set of props to customize the appearance and behavior
						of the radar chart.
					</p>

					{/* Radar Props */}
					<SubComponentSection
						id="radar-props"
						name="<Radar />"
						description="Renders a radar chart with concentric rings and radial axes for polar data visualization."
					>
							<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
						<PropRow name="scalars" type="number[]" defaultValue="[0, 20, 40, 60, 80, 100]">
							Array of scalar values defining the tick marks and grid rings on the radar.
						</PropRow>
						<PropRow name="className" type="string" defaultValue="-">
							Applies a custom CSS class to the radar SVG container.
						</PropRow>
						<PropRow name="labels" type="boolean" defaultValue="true">
							Whether to display category labels on the outer ring of the radar.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Multi-Series */}
					<div className="mt-14" id="example-multi" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Series Comparison</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Pass multiple series in the <InlineCode>data</InlineCode> array with distinct <InlineCode>stroke</InlineCode>{" "}
							colors. Each series gets its own colored radar polygon for comparison.
						</p>
						<TabbedExample code={multiSeriesExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Radar elements.
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
									{ cls: "radar__data-fill", desc: "The filled area of the radar polygon" },
									{ cls: "radar__data-point", desc: "The vertices of the radar polygon" },
									{ cls: "radar__data-point-glow", desc: "Glow effect around hovered points" },
									{ cls: "radar__axis-label", desc: "Category labels at the outer ring" },
									{ cls: "radar__axis-dot", desc: "Center dots of axis lines" },
									{ cls: "radar__tick-label", desc: "Scalar value labels on axes" },
									{ cls: "radar__ring-odd", desc: "Odd-numbered concentric rings" },
									{ cls: "radar__ring-even", desc: "Even-numbered concentric rings" },
									{ cls: "radar__wedge", desc: "Interactive wedge regions" },
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

					<CodeBlock title="custom-styling.css">{`.radar__data-fill {
  opacity: 0.15;       /* semi-transparent fill */
}

.radar__data-point {
  r: 4;               /* point radius */
  stroke-width: 2;
}

.radar__ring-odd {
  stroke: rgba(0, 0, 0, 0.05);
}

.radar__ring-even {
  stroke: rgba(0, 0, 0, 0.08);
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
import { Radar } from "nanoplot/Radar";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 flex items-center justify-center">
      <div style={{ width: 400, height: 400 }}>
        <Graph
          data={[{
            name: "Jason's Progress",
            stroke: "#11ACAE",
            data: [
              { x: "Fighting", y: 70 },
              { x: "Farming", y: 8 },
              { x: "Supporting", y: 300 },
              { x: "Pushing", y: 90 },
              { x: "Versatility", y: 60 },
            ],
          }]}
        >
          <Radar />
        </Graph>
      </div>
    </div>
  );
}
`;

const multiSeriesExample = `
import { Graph } from "nanoplot/Graph";
import { Radar } from "nanoplot/Radar";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 flex items-center justify-center">
      <div style={{ width: 500, height: 500 }}>
        <Graph
          data={[
            {
              name: "Jason's Progress",
              stroke: "#11ACAE",
              data: [
                { x: "Fighting", y: 70 },
                { x: "Farming", y: 8 },
                { x: "Supporting", y: 300 },
                { x: "Pushing", y: 90 },
                { x: "Versatility", y: 60 },
              ],
            },
            {
              name: "Alex's Progress",
              stroke: "#E63946",
              data: [
                { x: "Fighting", y: 50 },
                { x: "Farming", y: 95 },
                { x: "Supporting", y: 60 },
                { x: "Pushing", y: 50 },
                { x: "Versatility", y: 90 },
              ],
            },
          ]}
        >
          <Radar />
        </Graph>
      </div>
    </div>
  );
}
`;
