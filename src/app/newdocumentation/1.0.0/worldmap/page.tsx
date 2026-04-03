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
	{ id: "worldmap-props", label: "Worldmap Props", indent: true },
	{ id: "worldmap-tooltip", label: "Worldmap.Tooltip", indent: true },
	{ id: "gradient-legend", label: "GradientLegend", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
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
									<line x1="2" y1="12" x2="22" y2="12" />
									<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Worldmap</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Worldmap heatmaps show data by coloring each region on a map, making it easy to see where values are high or low
							at a glance. They help you quickly spot geographic trends and differences.
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
								<code className="text-xs font-mono">nanoplot/Worldmap</code>
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
						The <InlineCode>{"<Worldmap />"}</InlineCode> component renders geographic heatmaps with gradient color mapping. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports custom tooltips and gradient
						legend display.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						{[
							{ icon: "heatmap", title: "Geographic Heatmap", desc: "Color countries by data values with gradient mapping" },
							{ icon: "tooltip", title: "Custom Tooltips", desc: "Rich tooltips with country flags and data" },
							{ icon: "pan", title: "Pan & Zoom", desc: "Adjust translation and scale for focused views" },
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
						Import and use the Worldmap component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as
						an array of objects with <InlineCode>{`{ name, value }`}</InlineCode> pairs where name is the country code.
					</p>
					<CodeBlock title="basic-worldmap.tsx">{`import { Graph } from "nanoplot/Graph";
import { Worldmap } from "nanoplot/Worldmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import "nanoplot/styles.css";

export default function MyWorldmap() {
  const data = [
    { name: "US", value: 12000 },
    { name: "CN", value: 11500 },
    { name: "JP", value: 10700 },
    { name: "DE", value: 10500 },
    { name: "FR", value: 10200 },
  ];

  return (
    <Graph data={data}>
      <GradientLegend position="top" gradient={\`linear-gradient(90deg, #e1efff 0, #4285f4 \${12000})\`} />
      <Worldmap gradient={\`linear-gradient(90deg, #e1efff 0, #4285f4 \${12000})\`} />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following shape:
					</p>
					<CodeBlock title="types">{`type WorldmapDataset = Array<{
  name: string;    // Country code (e.g. "US", "CN", "GB")
  value: number;   // Numeric value for gradient mapping
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Worldmap component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Worldmap is a compound component with two parts. The main <InlineCode>{"<Worldmap />"}</InlineCode> renders the
						heatmap, while sub-components add tooltips and legends.
					</p>

					{/* Worldmap Props */}
					<SubComponentSection
						id="worldmap-props"
						name="<Worldmap />"
						description="Renders the world map as SVG paths colored by data values. Countries are mapped to colors based on the provided gradient."
					>
						<PropRow name="translate" type="{{ x: number; y: number; scale: number }}" defaultValue="{ x: 0, y: 0, scale: 0 }">
							Translation and scale for pan and zoom functionality. Allows adjusting map position and zoom level.
						</PropRow>
						<PropRow name="gradient" type="linear-gradient string" defaultValue="-">
							Gradient color for heatmap. Use CSS linear-gradient format to define color scale for values.
						</PropRow>
						<PropRow name="className" type="string" defaultValue="-">
							Custom CSS class for the worldmap SVG container.
						</PropRow>
					</SubComponentSection>

					{/* Worldmap.Tooltip */}
					<SubComponentSection
						id="worldmap-tooltip"
						name="<Worldmap.Tooltip />"
						description="Adds hover-activated tooltips to countries on the map. Detects the hovered country and renders a custom tooltip."
					>
						<PropRow name="tooltip" type="(dp: DataPoint) => ReactNode" required>
							Render function for tooltip content. Receives the country data point with name, value, and computed fill color.
						</PropRow>
					</SubComponentSection>

					{/* GradientLegend */}
					<SubComponentSection
						id="gradient-legend"
						name="<GradientLegend />"
						description="Displays a color gradient legend to show the mapping between values and colors on the heatmap."
					>
						<PropRow name="position" type='"top" | "bottom" | "left" | "right"' defaultValue="top">
							Position of the legend relative to the map.
						</PropRow>
						<PropRow name="gradient" type="linear-gradient string" required>
							The gradient string to display in the legend. Should match the gradient used on the Worldmap component.
						</PropRow>
					</SubComponentSection>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Worldmap elements.
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
									{ cls: "worldmap", desc: "Base SVG wrapping all countries" },
									{ cls: "worldmap__country", desc: "Path element for each country" },
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

					<CodeBlock title="custom-styling.css">{`.worldmap {
  opacity: 0.95;
}

.worldmap__country {
  stroke-width: 0.5;
  stroke: rgba(255, 255, 255, 0.2);
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
import { Worldmap } from "nanoplot/Worldmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import "nanoplot/styles.css";

export default function App() {
  const DATA = [
    { name: "AR", value: 3287 },
    { name: "AT", value: 2100 },
    { name: "AU", value: 6098 },
    { name: "BE", value: 2460 },
    { name: "BR", value: 9550 },
    { name: "CA", value: 8421 },
    { name: "CH", value: 4378 },
    { name: "CN", value: 11500 },
    { name: "DE", value: 10500 },
    { name: "DK", value: 1987 },
    { name: "ES", value: 5478 },
    { name: "FI", value: 1760 },
    { name: "FR", value: 10200 },
    { name: "GB", value: 10000 },
    { name: "GR", value: 1590 },
    { name: "IE", value: 1683 },
    { name: "IN", value: 11200 },
    { name: "IT", value: 6512 },
    { name: "JP", value: 10700 },
    { name: "KR", value: 7053 },
    { name: "MX", value: 7850 },
    { name: "NL", value: 4320 },
    { name: "NO", value: 2150 },
    { name: "NZ", value: 3950 },
    { name: "PL", value: 3890 },
    { name: "PT", value: 2950 },
    { name: "RU", value: 11000 },
    { name: "SE", value: 3050 },
    { name: "TR", value: 3245 },
    { name: "US", value: 12000 },
    { name: "ZA", value: 2765 },
  ];

  const maxValue = 12000;
  const gradient = \`linear-gradient(90deg, #e1efff 0, #4285f4 \${maxValue})\`;

  return (
    <div className={"h-[70vh] w-[650px] p-4 px-10"}>
      <Graph data={DATA}>
        <GradientLegend position={"top"} gradient={gradient} />
        <Worldmap gradient={gradient} />
        <Worldmap.Tooltip
          tooltip={(dp) => {
            return (
              <div>
                <div className={"flex items-center"}>
                  <img
                    src={\`https://flagcdn.com/w40/\${dp.name.toLowerCase()}.png\`}
                    alt={""}
                    width={30}
                    height={20}
                    className={"shrink-0 block"}
                  />
                  <div className={"mx-[4px] text-sm font-bold"}>{dp.name}</div>
                  <div className={"mx-[4px] text-sm font-bold"}>{dp.value.toString()}</div>
                </div>
                <div className={"h-[3px] w-[64px] mt-[4px]"} style={{ background: dp.fill }} />
              </div>
            )
          }}
        />
      </Graph>
    </div>
  )
}
`;
