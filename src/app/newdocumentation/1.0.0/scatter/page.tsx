"use client";
import * as React from "react";
import { useState, ReactNode } from "react";
import { Badge, InlineCode, CodeBlock, SectionHeading, TabbedExample, TableOfContents } from "../../components/Overview";

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
	{ id: "next-steps", label: "Next Steps" },
];

/* ─────────────────────────── LOCAL COMPONENTS (PROTOTYPE) ─────────────────────────── */

/** A wide wrapper — demos fill the available main column (which isn't constrained
 *  to max-w-3xl like the text). The extra class hook is here in case we need it. */
function WideBreakout({ children, className = "" }: { children: ReactNode; className?: string }) {
	return <div className={`relative w-full ${className}`}>{children}</div>;
}

/** Type pill — colorizes parts of a TS type string so props are easier to scan. */
function TypePill({ type }: { type: string }) {
	// Split by common delimiters but keep them, so we can color each token.
	const tokens = type.split(/(\s*\|\s*|\s*=>\s*|[<>(),\[\]{}])/).filter(Boolean);
	const colorFor = (t: string) => {
		const trimmed = t.trim();
		if (["string", "number", "boolean", "ReactNode", "CSSProperties"].includes(trimmed))
			return "text-sky-600 dark:text-sky-400";
		if (["true", "false", "null", "undefined"].includes(trimmed))
			return "text-amber-600 dark:text-amber-400";
		if (/^["'`].*["'`]$/.test(trimmed)) return "text-emerald-600 dark:text-emerald-400";
		if (trimmed === "|") return "text-gray-400 dark:text-gray-500";
		if (trimmed === "=>") return "text-violet-500 dark:text-violet-400";
		if (/^[A-Z]/.test(trimmed)) return "text-fuchsia-600 dark:text-fuchsia-400";
		return "text-gray-500 dark:text-gray-400";
	};
	return (
		<span className="inline-flex flex-wrap items-center font-mono text-[12px] leading-5 px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/[0.03] border border-gray-200/70 dark:border-white/[0.06]">
			{tokens.map((t, i) => (
				<span key={i} className={colorFor(t)}>
					{t}
				</span>
			))}
		</span>
	);
}

/** Enhanced PropRow with colored type + hover state */
function EnhancedPropRow({
	name,
	type,
	required,
	defaultValue,
	children,
}: {
	name: string;
	type: string;
	required?: boolean;
	defaultValue?: string;
	children: ReactNode;
}) {
	return (
		<div className="group relative border-b border-gray-100 dark:border-white/[0.05] last:border-0 transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.015] -mx-5 px-5">
			<div className="py-5">
				<div className="flex items-center gap-2 flex-wrap mb-2">
					<code className="px-2 py-0.5 rounded-md text-[13px] font-mono font-semibold bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-500/10 dark:to-rose-500/10 text-pink-600 dark:text-pink-300 border border-pink-200/60 dark:border-pink-500/20">
						{name}
					</code>
					<Badge variant={required ? "required" : "optional"}>{required ? "Required" : "Optional"}</Badge>
					{defaultValue && (
						<span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
							Default:
							<code className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 border border-gray-200/70 dark:border-white/10">
								{defaultValue}
							</code>
						</span>
					)}
				</div>
				<div className="mb-2">
					<TypePill type={type} />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
			</div>
		</div>
	);
}

/** Enhanced subcomponent section wrapper */
function EnhancedSubSection({
	id,
	name,
	description,
	children,
	accent = "blue",
}: {
	id: string;
	name: string;
	description: string;
	children: ReactNode;
	accent?: "blue" | "violet" | "emerald" | "amber";
}) {
	const accentMap: Record<string, { text: string; dot: string }> = {
		blue: { text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
		violet: { text: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
		emerald: { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
		amber: { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
	};
	const a = accentMap[accent];

	return (
		<div className="mt-12">
			<a href={`#${id}`} className="group block no-underline">
				<h3
					id={id}
					className="text-lg font-semibold text-gray-900 dark:text-white mb-3 scroll-mt-24 flex items-center gap-2.5"
				>
					<span className={`h-1.5 w-1.5 rounded-full ${a.dot} shadow-[0_0_10px_currentColor] opacity-80`} />
					<span className={`font-mono ${a.text}`}>{name}</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="opacity-0 group-hover:opacity-40 transition-opacity text-gray-500"
					>
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
				</h3>
			</a>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{description}</p>
			<div className="relative rounded-2xl border border-gray-200/70 dark:border-white/[0.08] bg-white dark:bg-white/[0.015] overflow-hidden shadow-sm">
				<div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/[0.05] bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-white/[0.015] dark:to-white/[0.025]">
					<span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
						Props
					</span>
					<span className="text-[11px] text-gray-400 dark:text-gray-500">
						{React.Children.count(children)} {React.Children.count(children) === 1 ? "prop" : "props"}
					</span>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}

/** Resizable + expandable demo wrapper. The demo breaks out wider than the content column. */
function FeaturedDemo({
	code,
	title,
	description,
	height = 640,
}: {
	code: string;
	title?: string;
	description?: string;
	height?: number;
}) {
	const [expanded, setExpanded] = useState(false);
	const currentHeight = expanded ? Math.max(height, 820) : height;

	return (
		<WideBreakout className="my-4">
			<div
				className={`relative rounded-2xl border border-gray-200/70 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-white/[0.015] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_30px_rgba(15,23,42,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_20px_60px_rgba(0,0,0,0.35)] transition-all ${
					expanded ? "ring-1 ring-blue-500/30" : ""
				}`}
			>
				{/* soft gradient border glow */}
				<div
					aria-hidden
					className="pointer-events-none absolute -inset-px rounded-2xl opacity-60 dark:opacity-40"
					style={{
						background:
							"radial-gradient(1200px 240px at 20% -10%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(900px 220px at 110% 110%, rgba(168,85,247,0.12), transparent 60%)",
					}}
				/>
				{(title || description) && (
					<div className="relative flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-5 py-4 border-b border-gray-200/70 dark:border-white/[0.06] bg-gradient-to-r from-white/80 via-white/60 to-transparent dark:from-white/[0.02] dark:via-white/[0.015] dark:to-transparent">
						<div className="flex items-center gap-2 shrink-0">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
							</span>
							<span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
								Live
							</span>
							{title && (
								<>
									<span className="text-gray-300 dark:text-white/20">•</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
								</>
							)}
						</div>
						{description && (
							<span className="text-[13px] text-gray-500 dark:text-gray-400 truncate">{description}</span>
						)}
						<div className="sm:ml-auto flex items-center gap-2">
							<button
								onClick={() => setExpanded((e) => !e)}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-colors border border-gray-200/70 dark:border-white/[0.06]"
								title={expanded ? "Collapse" : "Expand"}
							>
								{expanded ? (
									<>
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="M14 10l7-7" /><path d="M3 21l7-7" /></svg>
										Collapse
									</>
								) : (
									<>
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
										Expand
									</>
								)}
							</button>
						</div>
					</div>
				)}
				<div className="relative">
					<TabbedExample code={code} height={currentHeight} />
				</div>
			</div>
		</WideBreakout>
	);
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Page() {
	return (
		<div className="relative">
			{/* decorative background — very subtle mesh */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div
					className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[920px] rounded-full blur-3xl opacity-60 dark:opacity-40"
					style={{
						background:
							"radial-gradient(circle at 30% 40%, rgba(59,130,246,0.15), transparent 55%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.12), transparent 55%)",
					}}
				/>
			</div>

			<div className="relative max-w-[88rem] mx-auto px-6 md:px-10 pb-24">
				<div className="flex gap-10 xl:gap-14">
					{/* Main content */}
					<main className="min-w-0 flex-1">
						{/* ─── Hero ─── */}
						<section className="pt-12 pb-12">
							<div className="max-w-3xl">
								{/* breadcrumb / category */}
								<div className="flex items-center gap-2 text-[12px] mb-5">
									<span className="text-gray-400 dark:text-gray-500">Docs</span>
									<span className="text-gray-300 dark:text-white/20">/</span>
									<span className="text-gray-400 dark:text-gray-500">Charts</span>
									<span className="text-gray-300 dark:text-white/20">/</span>
									<span className="font-medium text-gray-900 dark:text-white">Scatter</span>
								</div>

								<div className="flex items-start gap-4 mb-5">
									<div
										className="relative h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
										style={{
											boxShadow:
												"0 10px 30px -10px rgba(59,130,246,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="26"
											height="26"
											viewBox="0 0 24 24"
											fill="none"
											stroke="white"
											strokeWidth="2.5"
											strokeLinecap="round"
										>
											<circle cx="7.5" cy="7.5" r="1.2" />
											<circle cx="18" cy="18" r="1.2" />
											<circle cx="11" cy="15" r="1.2" />
											<circle cx="16" cy="8" r="1.2" />
											<circle cx="5" cy="12" r="1.2" />
											<circle cx="13" cy="5" r="1.2" />
										</svg>
										<div
											aria-hidden
											className="absolute -inset-2 rounded-3xl blur-xl opacity-50"
											style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
										/>
									</div>
									<div className="min-w-0">
										<div className="flex items-center gap-2 flex-wrap">
											<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
												Scatter
											</h1>
											<Badge>Component</Badge>
											<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
												<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
												Stable
											</span>
										</div>
										<div className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
											v1.0.0 · SVG · Tree-shakeable
										</div>
									</div>
								</div>

								<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
									Visualize individual data points to highlight relationships, distributions, and correlations between
									variables. Supports custom markers, rich tooltips, collision-aware labels, and gradient quadrant
									regions.
								</p>
							</div>

							{/* Stats strip */}
							<div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl">
								{[
									{ label: "Import", value: "nanoplot/Scatter", mono: true },
									{ label: "Sub-components", value: "4", mono: false },
									{ label: "Bundle", value: "~3.1 kB", mono: false },
									{ label: "Renderer", value: "SVG", mono: false },
								].map((s) => (
									<div
										key={s.label}
										className="rounded-xl border border-gray-200/70 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.015] backdrop-blur px-3.5 py-3"
									>
										<div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
											{s.label}
										</div>
										<div
											className={`mt-0.5 text-[13px] text-gray-900 dark:text-white truncate ${
												s.mono ? "font-mono" : "font-semibold"
											}`}
											title={s.value}
										>
											{s.value}
										</div>
									</div>
								))}
							</div>
						</section>

						{/* ─── Overview ─── */}
						<section>
							<SectionHeading id="overview">Overview</SectionHeading>
							<div className="max-w-3xl">
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-[15px]">
									The <InlineCode>{"<Scatter />"}</InlineCode> component renders data points as circles on a cartesian
									plane. It is designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports
									several companion sub-components for enhanced interactivity.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
								{[
									{
										title: "Custom Markers",
										desc: "Replace default circles with any SVG shape — triangles, diamonds, or render props.",
										color: "from-blue-500 to-cyan-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="2" /><path d="M12 4l4 7h-8z" /><rect x="15" y="14" width="5" height="5" rx="1" transform="rotate(45 17.5 16.5)" /></svg>
										),
									},
									{
										title: "Rich Tooltips",
										desc: "Hover-activated tooltips with 30px detection and portal-based rendering.",
										color: "from-violet-500 to-fuchsia-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
										),
									},
									{
										title: "Smart Labels",
										desc: "Collision-aware text labels that automatically hide overlapping or out-of-bounds text.",
										color: "from-emerald-500 to-teal-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V4h18v3" /><path d="M12 4v16" /><path d="M8 20h8" /></svg>
										),
									},
									{
										title: "Quadrants",
										desc: "Background regions with solid or gradient fills — perfect for zone highlighting.",
										color: "from-amber-500 to-orange-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" /></svg>
										),
									},
								].map((f) => (
									<div
										key={f.title}
										className="group relative rounded-2xl border border-gray-200/70 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.015] backdrop-blur p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 dark:hover:border-white/[0.12]"
									>
										<div
											className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white mb-3 shadow-sm`}
										>
											<span className="h-4 w-4">{f.icon}</span>
										</div>
										<div className="font-semibold text-[14px] text-gray-900 dark:text-white mb-1">
											{f.title}
										</div>
										<div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
									</div>
								))}
							</div>
						</section>

						{/* ─── Quick Start ─── */}
						<section>
							<SectionHeading id="quick-start">Quick Start</SectionHeading>
							<div className="max-w-3xl">
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-[15px]">
									Import and use the Scatter component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide
									your data as an array of series, each containing an array of{" "}
									<InlineCode>{`{ x, y }`}</InlineCode> points.
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

								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2 mt-8 text-[15px]">
									The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following
									shape:
								</p>
								<CodeBlock title="types.ts">{`type CartesianDataset = Array<{
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
							</div>
						</section>

						{/* ─── Interactive Demo — WIDE ─── */}
						<section>
							<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
							<div className="max-w-3xl">
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 text-[15px]">
									Edit the code on the right to experiment in real-time. The demo below combines custom markers,
									quadrants, reference lines, and rich tooltips — a showcase of what{" "}
									<InlineCode>Scatter</InlineCode> can do in production.
								</p>
							</div>
							<FeaturedDemo
								code={interactiveDemo}
								title="Roblox Genre Analysis"
								description="Supply vs. demand across 17 Roblox game genres"
								height={680}
							/>
						</section>

						{/* ─── API Reference ─── */}
						<section>
							<SectionHeading id="api-reference">API Reference</SectionHeading>
							<div className="max-w-3xl">
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-[15px]">
									Scatter is a compound component with four parts. The main <InlineCode>{"<Scatter />"}</InlineCode>{" "}
									renders the points, while sub-components add tooltips, labels, and quadrant regions.
								</p>
							</div>

							<div className="max-w-4xl">
								<EnhancedSubSection
									id="scatter-props"
									name="<Scatter />"
									description="Renders the data points as SVG path elements. Points are chunked into groups of 3,000 for optimal SVG performance."
									accent="blue"
								>
									<EnhancedPropRow name="loading" type="boolean" defaultValue="false">
										Shows an animated skeleton placeholder while data is loading.
									</EnhancedPropRow>
									<EnhancedPropRow name="className" type="string" defaultValue="—">
										Applies a custom CSS class to the scatter SVG container.
									</EnhancedPropRow>
									<EnhancedPropRow name="marker" type="(dp: DataPoint) => ReactNode">
										Custom render function for each data point. When provided, replaces the default circle rendering.
										The callback receives the data point with its series metadata and coordinate values.
									</EnhancedPropRow>
									<EnhancedPropRow name="labels" type="boolean | (dp: DataPoint) => ReactNode">
										Enable or customize labels rendered next to each point. Pass <InlineCode>true</InlineCode> for
										default labels (series name), or a function for custom content.
									</EnhancedPropRow>
								</EnhancedSubSection>

								<EnhancedSubSection
									id="scatter-tooltip"
									name="<Scatter.Tooltip />"
									description="Adds hover-activated tooltips to data points. Detects the closest point within a 30px radius and renders a portal-based tooltip with a glow effect."
									accent="violet"
								>
									<EnhancedPropRow name="tooltip" type="(point: Point) => ReactNode" required>
										Render function for tooltip content. Receives the closest data point with its series metadata, raw
										data values, and computed coordinates.
									</EnhancedPropRow>
									<EnhancedPropRow name="className" type="string | (point: Point) => string">
										CSS class for the tooltip container. Can be a static string or a function that receives the hovered
										point for dynamic styling.
									</EnhancedPropRow>
									<EnhancedPropRow name="style" type="CSSProperties | (point: Point) => CSSProperties">
										Inline styles for the tooltip. Supports dynamic styling via a function — useful for color-coding
										tooltips based on the data point.
									</EnhancedPropRow>
								</EnhancedSubSection>

								<EnhancedSubSection
									id="scatter-labels"
									name="<Scatter.Labels />"
									description="Renders text labels next to each data point with built-in collision detection. Labels that would overlap or overflow the graph boundaries are automatically hidden."
									accent="emerald"
								>
									<EnhancedPropRow
										name="display"
										type="((dp) => string) | { collision: boolean; label: (dp) => string | ReactNode }"
									>
										Controls what each label displays. Pass a function for simple string labels with collision
										detection. For more control, pass an object with <InlineCode>collision</InlineCode> and{" "}
										<InlineCode>label</InlineCode> properties. When <InlineCode>{"collision: false"}</InlineCode>, the
										label function may return JSX.
									</EnhancedPropRow>
								</EnhancedSubSection>

								<EnhancedSubSection
									id="scatter-quadrant"
									name="<Scatter.Quadrant />"
									description="Renders a colored rectangular region on the graph background. Useful for highlighting zones or categories within the scatter plot."
									accent="amber"
								>
									<EnhancedPropRow name="x1" type="number | TemporalDate | string" required>
										The starting x-coordinate of the quadrant region.
									</EnhancedPropRow>
									<EnhancedPropRow name="y1" type="number | TemporalDate | string" required>
										The starting y-coordinate of the quadrant region.
									</EnhancedPropRow>
									<EnhancedPropRow name="x2" type="number | TemporalDate | string" required>
										The ending x-coordinate of the quadrant region.
									</EnhancedPropRow>
									<EnhancedPropRow name="y2" type="number | TemporalDate | string" required>
										The ending y-coordinate of the quadrant region.
									</EnhancedPropRow>
									<EnhancedPropRow name='fill' type='string | "linear_gradient(...)"' required>
										Fill color for the quadrant. Accepts any CSS color string or a special{" "}
										<InlineCode>linear_gradient()</InlineCode> syntax for gradient fills.
									</EnhancedPropRow>
								</EnhancedSubSection>
							</div>
						</section>

						{/* ─── Examples ─── */}
						<section>
							<SectionHeading id="examples">Examples</SectionHeading>

							<div className="mt-4" id="example-tooltip" style={{ scrollMarginTop: "6rem" }}>
								<div className="max-w-3xl">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Custom Tooltip</h3>
										<span className="text-[11px] text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.04]">
											100 points
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
										Use <InlineCode>{"<Scatter.Tooltip />"}</InlineCode> with a render function to create rich,
										interactive tooltips. The <InlineCode>style</InlineCode> prop accepts a function for dynamic styling
										per point.
									</p>
								</div>
								<FeaturedDemo
									code={tooltipExample}
									title="Custom Tooltip"
									description="Gradient-styled tooltip with per-point values"
									height={560}
								/>
							</div>

							<div className="mt-16" id="example-multi" style={{ scrollMarginTop: "6rem" }}>
								<div className="max-w-3xl">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Series</h3>
										<span className="text-[11px] text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.04]">
											3 series · 240 points
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
										Pass multiple series in the <InlineCode>data</InlineCode> array with distinct{" "}
										<InlineCode>stroke</InlineCode> colors. Each series gets its own legend entry and colored points.
									</p>
								</div>
								<FeaturedDemo
									code={multiSeriesExample}
									title="Multi-Series"
									description="Three product cohorts side-by-side"
									height={560}
								/>
							</div>
						</section>

						{/* ─── Styling ─── */}
						<section>
							<SectionHeading id="styling">Styling</SectionHeading>
							<div className="max-w-3xl">
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-[15px]">
									Target these CSS class names to customize the appearance of specific Scatter elements.
								</p>
							</div>
							<div className="max-w-4xl rounded-2xl border border-gray-200/70 dark:border-white/[0.08] bg-white dark:bg-white/[0.015] overflow-hidden shadow-sm">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-gray-100 dark:border-white/[0.05] bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-white/[0.02] dark:to-white/[0.015]">
											<th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 w-64">
												Class
											</th>
											<th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
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
											<tr
												key={i}
												className="border-b border-gray-100 dark:border-white/[0.05] last:border-0 hover:bg-gray-50/60 dark:hover:bg-white/[0.015] transition-colors"
											>
												<td className="px-5 py-3.5">
													<InlineCode>{row.cls}</InlineCode>
												</td>
												<td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">{row.desc}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="max-w-4xl mt-6">
								<CodeBlock title="custom-styling.css">{`.scatter__points {
  stroke-width: 8;     /* smaller or larger points */
  opacity: 0.8;        /* semi-transparent points */
}`}</CodeBlock>
							</div>
						</section>

						{/* ─── Next Steps ─── */}
						<section>
							<SectionHeading id="next-steps">Next Steps</SectionHeading>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
								{[
									{
										href: "/newdocumentation/1.0.0/scatter/playground",
										title: "Playground",
										desc: "Experiment with every Scatter prop visually.",
										color: "from-blue-500 to-cyan-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
										),
									},
									{
										href: "/newdocumentation/1.0.0/scatter/examples",
										title: "More Examples",
										desc: "Real-world recipes and advanced patterns.",
										color: "from-violet-500 to-fuchsia-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
										),
									},
									{
										href: "/newdocumentation/1.0.0/lines",
										title: "Lines",
										desc: "Pair scatter with line series for richer plots.",
										color: "from-emerald-500 to-teal-500",
										icon: (
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
										),
									},
								].map((n) => (
									<a
										key={n.href}
										href={n.href}
										className="group relative rounded-2xl border border-gray-200/70 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.015] backdrop-blur p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 dark:hover:border-white/[0.12]"
									>
										<div
											className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${n.color} text-white mb-3 shadow-sm`}
										>
											<span className="h-4 w-4">{n.icon}</span>
										</div>
										<div className="font-semibold text-[14px] text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
											{n.title}
											<svg
												className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-gray-400"
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
												<line x1="5" y1="12" x2="19" y2="12" />
												<polyline points="12 5 19 12 12 19" />
											</svg>
										</div>
										<div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{n.desc}</div>
									</a>
								))}
							</div>
						</section>

						{/* Spacing at bottom */}
						<div className="h-24" />
					</main>

					{/* Table of Contents sidebar */}
					<TableOfContents items={TOC} />
				</div>
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
