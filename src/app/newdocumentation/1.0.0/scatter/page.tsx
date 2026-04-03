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
	{ id: "scatter-props", label: "Scatter Props", indent: true },
	{ id: "scatter-tooltip", label: "Scatter.Tooltip", indent: true },
	{ id: "scatter-labels", label: "Scatter.Labels", indent: true },
	{ id: "scatter-quadrant", label: "Scatter.Quadrant", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-tooltip", label: "Custom Tooltip", indent: true },
	{ id: "example-multi", label: "Multi-Series", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
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
									<circle cx="7.5" cy="7.5" r="1" />
									<circle cx="18" cy="18" r="1" />
									<circle cx="11" cy="15" r="1" />
									<circle cx="16" cy="8" r="1" />
									<circle cx="5" cy="12" r="1" />
									<circle cx="13" cy="5" r="1" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Scatter</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Scatter plots visualize individual data points to highlight relationships, distributions, and correlations
							between variables. Supports custom markers, tooltips, labels, and quadrant regions.
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
								<code className="text-xs font-mono">nanoplot/Scatter</code>
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
						The <InlineCode>{"<Scatter />"}</InlineCode> component renders data points as circles on a cartesian plane. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports several companion
						sub-components for enhanced interactivity.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "marker", title: "Custom Markers", desc: "Replace default circles with any SVG shape" },
							{ icon: "tooltip", title: "Tooltips", desc: "Hover-activated tooltips with 30px detection radius" },
							{ icon: "quadrant", title: "Quadrants", desc: "Background regions with gradient fill support" },
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
						Import and use the Scatter component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as
						an array of series, each containing an array of <InlineCode>{`{ x, y }`}</InlineCode> points.
					</p>
					<CodeBlock title="basic-scatter.tsx">{`import { Graph } from "nanoplot/Graph";
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function MyScatter() {
  return (
    <Graph
      data={[{
        name: "Revenue vs Spend",
        data: [
          { x: 10, y: 25 },
          { x: 35, y: 60 },
          { x: 50, y: 80 },
          { x: 70, y: 45 },
        ],
      }]}
    >
      <YAxis />
      <GridLines horizontal />
      <Scatter />
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
  stroke?: string;       // Point color
  fill?: string;         // Point fill
  data: Array<{
    x: number | string;  // X-axis value
    y: number | string;  // Y-axis value
    z?: number | string; // Optional third dimension
  }>;
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Scatter component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Scatter is a compound component with four parts. The main <InlineCode>{"<Scatter />"}</InlineCode> renders the
						points, while sub-components add tooltips, labels, and quadrant regions.
					</p>

					{/* Scatter Props */}
					<SubComponentSection
						id="scatter-props"
						name="<Scatter />"
						description="Renders the data points as SVG path elements. Points are chunked into groups of 3,000 for optimal SVG performance."
					>
							<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
						<PropRow name="className" type="string" defaultValue="-">
							Applies a custom CSS class to the scatter SVG container.
						</PropRow>
						<PropRow name="marker" type="(dp: DataPoint) => ReactNode">
							Custom render function for each data point. When provided, replaces the default circle rendering. The callback
							receives the data point with its series metadata and coordinate values.
						</PropRow>
						<PropRow name="labels" type="boolean | (dp: DataPoint) => ReactNode">
							Enable or customize labels rendered next to each point. Pass <InlineCode>true</InlineCode> for default labels
							(series name), or a function for custom content.
						</PropRow>
					</SubComponentSection>

					{/* Scatter.Tooltip */}
					<SubComponentSection
						id="scatter-tooltip"
						name="<Scatter.Tooltip />"
						description="Adds hover-activated tooltips to data points. Detects the closest point within a 30px radius and renders a portal-based tooltip with a glow effect."
					>
						<PropRow name="tooltip" type="(point: Point) => ReactNode" required>
							Render function for tooltip content. Receives the closest data point with its series metadata, raw data values,
							and computed coordinates.
						</PropRow>
						<PropRow name="className" type="string | (point: Point) => string">
							CSS class for the tooltip container. Can be a static string or a function that receives the hovered point for
							dynamic styling.
						</PropRow>
						<PropRow name="style" type="CSSProperties | (point: Point) => CSSProperties">
							Inline styles for the tooltip. Supports dynamic styling via a function — useful for color-coding tooltips based
							on the data point.
						</PropRow>
					</SubComponentSection>

					{/* Scatter.Labels */}
					<SubComponentSection
						id="scatter-labels"
						name="<Scatter.Labels />"
						description="Renders text labels next to each data point with built-in collision detection. Labels that would overlap or overflow the graph boundaries are automatically hidden."
					>
						<PropRow name="display" type="((dp) => string) | { collision: boolean; label: (dp) => string | ReactNode }">
							Controls what each label displays. Pass a function for simple string labels with collision detection. For more
							control, pass an object with <InlineCode>collision</InlineCode> and <InlineCode>label</InlineCode> properties.
							When <InlineCode>{"collision: false"}</InlineCode>, the label function may return JSX.
						</PropRow>
					</SubComponentSection>

					{/* Scatter.Quadrant */}
					<SubComponentSection
						id="scatter-quadrant"
						name="<Scatter.Quadrant />"
						description="Renders a colored rectangular region on the graph background. Useful for highlighting zones or categories within the scatter plot."
					>
						<PropRow name="x1" type="number | TemporalDate | string" required>
							The starting x-coordinate of the quadrant region.
						</PropRow>
						<PropRow name="y1" type="number | TemporalDate | string" required>
							The starting y-coordinate of the quadrant region.
						</PropRow>
						<PropRow name="x2" type="number | TemporalDate | string" required>
							The ending x-coordinate of the quadrant region.
						</PropRow>
						<PropRow name="y2" type="number | TemporalDate | string" required>
							The ending y-coordinate of the quadrant region.
						</PropRow>
						<PropRow name="fill" type={`string | "linear_gradient(...)"`} required>
							Fill color for the quadrant. Accepts any CSS color string or a special{" "}
							<InlineCode>linear_gradient()</InlineCode> syntax for gradient fills.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Custom Tooltip */}
					<div className="mt-14" id="example-tooltip" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Tooltip</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use <InlineCode>{"<Scatter.Tooltip />"}</InlineCode> with a render function to create rich, interactive
							tooltips. The <InlineCode>style</InlineCode> prop accepts a function for dynamic styling per point.
						</p>
						<TabbedExample code={tooltipExample} height={480} />
					</div>

					{/* Multi-Series */}
					<div className="mt-14" id="example-multi" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Series</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Pass multiple series in the <InlineCode>data</InlineCode> array with distinct <InlineCode>stroke</InlineCode>{" "}
							colors. Each series gets its own legend entry and colored points.
						</p>
						<TabbedExample code={multiSeriesExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Scatter elements.
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
									{ cls: "scatter__points", desc: "The SVG path elements that render each data point" },
									{ cls: "scatter__skeleton", desc: "Loading skeleton container" },
									{ cls: "scatter__skeleton-dots", desc: "Individual dots in the loading skeleton" },
									{ cls: "scatter-tooltip", desc: "The tooltip overlay SVG container" },
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

					<CodeBlock title="custom-styling.css">{`.scatter__points {
  stroke-width: 8;     /* smaller or larger points */
  opacity: 0.8;        /* semi-transparent points */
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
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { Lines } from "nanoplot/Lines";
import { overlay } from "nanoplot/Overlay";
import "nanoplot/styles.css";

const DATA = [
  { genre: "Simulation", supply: 987, avgDemand: 3004, topTitle: "Steal a Brainrot", topTitleDemand: 375262 },
  { genre: "Survival", supply: 346, avgDemand: 4381, topTitle: "99 Nights in the Forest", topTitleDemand: 355721 },
  { genre: "Obby & Platformer", supply: 316, avgDemand: 930, topTitle: "BARRY'S PRISON RUN! (OBBY)", topTitleDemand: 18130 },
  { genre: "Action", supply: 299, avgDemand: 3490, topTitle: "Jujutsu Shenanigans", topTitleDemand: 327149 },
  { genre: "Roleplay & Avatar Sim", supply: 218, avgDemand: 7595, topTitle: "Brookhaven RP", topTitleDemand: 605138 },
  { genre: "Party & Casual", supply: 171, avgDemand: 1887, topTitle: "Knockout!", topTitleDemand: 77803 },
  { genre: "Adventure", supply: 160, avgDemand: 1315, topTitle: "Dead Rails [Beta]", topTitleDemand: 28105 },
  { genre: "Shooter", supply: 123, avgDemand: 5295, topTitle: "RIVALS", topTitleDemand: 401763 },
  { genre: "RPG", supply: 121, avgDemand: 7347, topTitle: "Blox Fruits", topTitleDemand: 340996 },
  { genre: "Strategy", supply: 89, avgDemand: 2381, topTitle: "Anime Vanguards", topTitleDemand: 30974 },
  { genre: "Sports & Racing", supply: 70, avgDemand: 2603, topTitle: "Volleyball Legends", topTitleDemand: 68991 },
  { genre: "Social", supply: 55, avgDemand: 1625, topTitle: "PLS DONATE", topTitleDemand: 20299 },
  { genre: "Puzzle", supply: 40, avgDemand: 1183, topTitle: "A Grabpack test", topTitleDemand: 18078 },
  { genre: "Entertainment", supply: 26, avgDemand: 1104, topTitle: "My Movie", topTitleDemand: 10955 },
  { genre: "Shopping", supply: 16, avgDemand: 8014, topTitle: "Catalog Avatar Creator", topTitleDemand: 98846 },
  { genre: "Education", supply: 4, avgDemand: 563, topTitle: "Spelling Bee", topTitleDemand: 848 },
  { genre: "Utility & Other", supply: 2, avgDemand: 807, topTitle: "Movie Maker 4", topTitleDemand: 1218 },
];

const SUPPLY_BREAK = 150;
const DEMAND_BREAK = 3000;
const TOTAL_SUPPLY = DATA.reduce((sum, d) => sum + d.supply, 0);

function getColor(supply, demand) {
  if (demand >= DEMAND_BREAK) return supply >= SUPPLY_BREAK ? "rgb(2, 165, 215)" : "rgb(5, 180, 98)";
  return supply >= SUPPLY_BREAK ? "rgb(161, 102, 233)" : "rgb(255, 92, 74)";
}

function demandLabel(demand) {
  if (demand >= 7000) return "EXCEPTIONAL";
  if (demand >= 5000) return "HIGH";
  if (demand >= 3000) return "GOOD";
  if (demand >= 1500) return "MODERATE";
  return "LOW";
}

function fmt(n) {
  return n.toLocaleString();
}

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={DATA.map((d) => ({
          name: d.genre,
          fill: getColor(d.supply, d.avgDemand),
          data: [{ x: d.supply, y: d.avgDemand }],
        }))}
      >
        <Scatter.Quadrant x1={0} x2={150} y1={3000} y2={9000} fill="rgba(5, 180, 98, 0.15)" />
        <Scatter.Quadrant x1={150} x2={1100} y1={3000} y2={9000} fill="rgba(2, 165, 215, 0.15)" />
        <Scatter.Quadrant x1={150} x2={1100} y1={0} y2={3000} fill="rgba(161, 102, 233, 0.15)" />
        <Scatter.Quadrant x1={0} x2={150} y1={0} y2={3000} fill="rgba(255, 92, 74, 0.15)" />
        <YAxis title="Avg Player Count (Demand)" />
        <GridLines />
        <Scatter
          marker={({ data: { x, y } }) => {
            if (typeof x !== "number" || typeof y !== "number") return null;
            if (y >= DEMAND_BREAK)
              return x >= SUPPLY_BREAK
                ? <overlay.circle x={x} y={y} fill="rgb(2, 165, 215)" stroke="rgb(2, 165, 215)" />
                : <overlay.triangle x={x} y={y} fill="rgb(5, 180, 98)" stroke="rgb(5, 180, 98)" />;
            return x >= SUPPLY_BREAK
              ? <overlay.diamond x={x} y={y} stroke="rgb(161, 102, 233)" fill="rgb(161, 102, 233)" />
              : <overlay.cross x={x} y={y} stroke="rgb(255, 92, 74)" fill="rgb(255, 92, 74)" />;
          }}
        />
        <Scatter.Labels />
        <Lines.Line
          points={[{ x: 0, y: DEMAND_BREAK }, { x: 1000, y: DEMAND_BREAK }]}
          stroke="white"
          strokeDasharray="8,8"
          filter="0px 0px 40px rgba(255, 255, 255, 0.5)"
        />
        <Lines.Line
          points={[{ x: SUPPLY_BREAK, y: 0 }, { x: SUPPLY_BREAK, y: 9000 }]}
          stroke="white"
          strokeDasharray="8,8"
          filter="0px 0px 40px rgba(255, 255, 255, 0.5)"
        />
        <Scatter.Tooltip
          style={(point) => ({
            background: \`linear-gradient(180.43deg, rgb(0, 0, 0) 0.74%, \${point.fill ?? "white"} 124.74%)\`,
          })}
          tooltip={(point) => {
            const entry = DATA.find((d) => d.genre === point.name);
            return (
              <div style={{ minWidth: 200 }}>
                <div style={{ fontWeight: "bold", fontSize: 14, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  {point.name}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  <div>
                    <div style={{ opacity: 0.6, fontSize: 11, marginBottom: 2 }}>Demand</div>
                    <div style={{ fontWeight: "bold", fontSize: 18 }}>{fmt(entry.avgDemand)}</div>
                    <div style={{ fontWeight: 600, fontSize: 11 }}>{demandLabel(entry.avgDemand)}</div>
                  </div>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.15)", alignSelf: "stretch", margin: "-8px 0" }} />
                  <div>
                    <div style={{ opacity: 0.6, fontSize: 11, marginBottom: 2 }}>Supply</div>
                    <div style={{ fontWeight: "bold", fontSize: 18 }}>{((entry.supply / TOTAL_SUPPLY) * 100).toFixed(1)}%</div>
                    <div style={{ fontSize: 11 }}>{fmt(entry.supply)} TITLES</div>
                  </div>
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ opacity: 0.6, fontSize: 11 }}>Top Title</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{entry.topTitle}</div>
                    <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: "bold", fontSize: 14 }}>{fmt(entry.topTitleDemand)}</div>
                      <div style={{ fontSize: 10, opacity: 0.8 }}>PLAYERS</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
        <XAxis title="Number of Titles (Supply)" />
      </Graph>
    </div>
  );
}
`;

const tooltipExample = `
import { Graph } from "nanoplot/Graph";
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(100).fill(null).map((_, i) => ({
  x: random(0, 100),
  y: random(0, 1000),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Revenue",
          stroke: "rgb(59, 130, 246)",
          data: DATA,
        }]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Revenue ($)" />
        <GridLines border horizontal vertical />
        <Scatter />
        <Scatter.Tooltip
          style={(point) => ({
            background: "linear-gradient(180deg, #111 0%, #1e3a5f 150%)",
          })}
          tooltip={(point) => (
            <div style={{ minWidth: 150 }}>
              <div style={{
                fontWeight: "bold",
                fontSize: 13,
                paddingBottom: 6,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                marginBottom: 6,
              }}>
                {point.name}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ opacity: 0.6 }}>X Value</span>
                <span style={{ fontWeight: 600 }}>{point.data.x.toFixed(1)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                <span style={{ opacity: 0.6 }}>Revenue</span>
                <span style={{ fontWeight: 600 }}>\${point.data.y.toFixed(0)}</span>
              </div>
            </div>
          )}
        />
        <XAxis title="Customers" />
      </Graph>
    </div>
  );
}
`;

const multiSeriesExample = `
import { Graph } from "nanoplot/Graph";
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;

const series1 = new Array(80).fill(null).map(() => ({
  x: random(0, 50), y: random(40, 100),
}));
const series2 = new Array(80).fill(null).map(() => ({
  x: random(30, 100), y: random(0, 60),
}));
const series3 = new Array(80).fill(null).map(() => ({
  x: random(10, 70), y: random(20, 80),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[
          { name: "Product A", stroke: "rgb(59, 130, 246)", data: series1 },
          { name: "Product B", stroke: "rgb(249, 115, 22)", data: series2 },
          { name: "Product C", stroke: "rgb(34, 197, 94)", data: series3 },
        ]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Satisfaction" />
        <GridLines border horizontal vertical />
        <Scatter />
        <Scatter.Tooltip
          tooltip={(point) =>
            \`\${point.name}: (\${point.data.x.toFixed(1)}, \${point.data.y.toFixed(1)})\`
          }
        />
        <XAxis title="Usage Frequency" />
      </Graph>
    </div>
  );
}
`;
