"use client";
import * as React from "react";
import { useState, useEffect, ReactNode } from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";

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
	{ id: "example-trendline", label: "Trendline", indent: true },
	{ id: "example-tooltip", label: "Custom Tooltip", indent: true },
	{ id: "example-multi", label: "Multi-Series", indent: true },
	{ id: "styling", label: "Styling" },
];

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "required" | "optional" }) {
	const styles = {
		default: "bg-blue-500/10 text-blue-400 border-blue-500/20",
		required: "bg-rose-500/10 text-rose-400 border-rose-500/20",
		optional: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
	};
	return (
		<span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${styles[variant]}`}>
			{children}
		</span>
	);
}

function InlineCode({ children, className = "" }: { children: ReactNode; className?: string }) {
	return (
		<code
			className={`px-1.5 py-0.5 rounded-md text-[13px] font-mono bg-gray-100 dark:bg-white/[0.06] text-pink-500 dark:text-pink-400 border border-gray-200 dark:border-white/10 ${className}`}
		>
			{children}
		</code>
	);
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard.writeText(children.trim());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<div className="relative group rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] overflow-hidden my-4">
			{title && (
				<div className="px-4 py-2 border-b border-gray-200 dark:border-white/[0.08] text-xs text-gray-500 dark:text-gray-400 font-mono">
					{title}
				</div>
			)}
			<button
				onClick={copy}
				className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 z-10"
				style={{ top: title ? "2.5rem" : "0.5rem" }}
			>
				{copied ? (
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
						<path d="M20 6 9 17l-5-5" />
					</svg>
				) : (
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
						<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
						<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
					</svg>
				)}
			</button>
			<pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-gray-800 dark:text-gray-200">
				<code>{children.trim()}</code>
			</pre>
		</div>
	);
}

function PropRow({
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
		<div className="group border-b border-gray-100 dark:border-white/[0.05] last:border-0">
			<div className="py-4 px-1">
				<div className="flex items-center gap-2 flex-wrap mb-1.5">
					<InlineCode>{name}</InlineCode>
					<Badge variant={required ? "required" : "optional"}>{required ? "Required" : "Optional"}</Badge>
					{defaultValue && (
						<span className="text-xs text-gray-400 dark:text-gray-500">
							Default: <InlineCode className="!text-[11px]">{defaultValue}</InlineCode>
						</span>
					)}
				</div>
				<div className="mb-1.5">
					<span className="text-xs font-mono text-gray-400 dark:text-gray-500">{type}</span>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
			</div>
		</div>
	);
}

function SectionHeading({ id, children, level = 2 }: { id: string; children: ReactNode; level?: 2 | 3 }) {
	const Tag = level === 2 ? "h2" : "h3";
	const sizes = level === 2 ? "text-2xl font-bold" : "text-xl font-semibold";
	return (
		<a href={`#${id}`} className="group block no-underline">
			<Tag id={id} className={`${sizes} text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-2`}>
				{children}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="opacity-0 group-hover:opacity-40 transition-opacity"
				>
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			</Tag>
		</a>
	);
}

function SubComponentSection({ id, name, description, children }: { id: string; name: string; description: string; children: ReactNode }) {
	return (
		<div className="mt-12">
			<a href={`#${id}`} className="group block no-underline">
				<h3 id={id} className="text-lg font-semibold text-gray-900 dark:text-white mb-2 scroll-mt-24 flex items-center gap-2">
					<span className="font-mono text-blue-500 dark:text-blue-400">{name}</span>
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
						className="opacity-0 group-hover:opacity-40 transition-opacity"
					>
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
				</h3>
			</a>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{description}</p>
			<div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden">
				<div className="px-5 py-3 border-b border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-white/[0.02]">
					<span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Props</span>
				</div>
				<div className="px-5">{children}</div>
			</div>
		</div>
	);
}

/* ─────────────────────────── TABBED EXAMPLE ─────────────────────────── */


function TabbedExample({ code, height = 500 }: { code: string; height?: number }) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const isLight = typeof document !== "undefined" && document.cookie.includes("theme=light");

	const themeSetup = isLight
		? `document.documentElement.style.colorScheme="light";document.documentElement.style.background="white";document.documentElement.style.color="black";`
		: `document.body.classList.add("dark");document.documentElement.style.colorScheme="dark";document.documentElement.style.background="black";document.documentElement.style.color="white";`;

	const setupCode = themeSetup + `\nvar l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap";l.rel="stylesheet";document.head.appendChild(l);document.body.style.fontFamily="FigTree, sans-serif";`;

	return (
		<div className="rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
			{/* Tab bar */}
			<div className="flex items-center gap-0 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03]">
				<button
					onClick={() => setTab("preview")}
					className={`relative px-4 py-2.5 text-xs font-medium transition-colors ${
						tab === "preview"
							? "text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
					}`}
				>
					<span className="flex items-center gap-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
						Preview
					</span>
					{tab === "preview" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />}
				</button>
				<button
					onClick={() => setTab("code")}
					className={`relative px-4 py-2.5 text-xs font-medium transition-colors ${
						tab === "code"
							? "text-blue-600 dark:text-blue-400"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
					}`}
				>
					<span className="flex items-center gap-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
						Code
					</span>
					{tab === "code" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />}
				</button>
			</div>
			{/* Use the working Sandpack component, CSS-toggle editor vs preview */}
			<style>{`
				.tabbed-sandpack [class*="sp-layout"] {
					display: flex !important;
					flex-direction: column !important;
					height: ${height}px !important;
				}
				.tabbed-sandpack[data-tab="preview"] [class*="sp-code-editor"],
				.tabbed-sandpack[data-tab="preview"] [class*="sp-editor"] {
					display: none !important;
				}
				.tabbed-sandpack[data-tab="code"] [class*="sp-preview"] {
					display: none !important;
				}
				.tabbed-sandpack [class*="sp-layout"] > * {
					flex: 1 !important;
					width: 100% !important;
					height: 100% !important;
				}
				.tabbed-sandpack [class*="sp-preview"] iframe {
					height: 100% !important;
				}
				.tabbed-sandpack [class*="sp-resize-handler"] {
					display: none !important;
				}
			`}</style>
			<div className="tabbed-sandpack" data-tab={tab}>
				<Sandpack
					files={{
						"App.js": `import "./themesetup";\n` + code,
						"/themesetup.js": {
							code: setupCode,
							hidden: true,
						},
					}}
					options={{ editorHeight: height }}
				/>
			</div>
		</div>
	);
}

/* ─────────────────────────── TOC SIDEBAR (client) ─────────────────────────── */

function TableOfContents() {
	const [active, setActive] = useState("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length > 0) {
					setActive(visible[0].target.id);
				}
			},
			{ rootMargin: "-80px 0px -70% 0px", threshold: 0 },
		);
		TOC.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	return (
		<nav className="hidden xl:block sticky top-24 w-56 shrink-0 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">On this page</div>
			<ul className="space-y-0.5">
				{TOC.map(({ id, label, indent }) => (
					<li key={id}>
						<a
							href={`#${id}`}
							className={`block py-1 text-[13px] transition-colors duration-150 border-l-2 ${indent ? "pl-5" : "pl-3"} ${
								active === id
									? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
									: "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
							}`}
						>
							{label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
			<div className="flex gap-12">
				{/* Main content */}
				<main className="min-w-0 flex-1 max-w-3xl">
					{/* ─── Hero ─── */}
					<div className="pt-12 pb-10 border-b border-gray-200 dark:border-white/[0.06]">
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
							between variables. Supports trendlines, custom markers, tooltips, labels, and quadrant regions.
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
							{ icon: "trend", title: "Trendlines", desc: "Built-in linear regression trendline overlay" },
							{ icon: "marker", title: "Custom Markers", desc: "Replace default circles with any SVG shape" },
							{ icon: "tooltip", title: "Tooltips", desc: "Hover-activated tooltips with 30px detection radius" },
							{ icon: "quadrant", title: "Quadrants", desc: "Background regions with gradient fill support" },
						].map((f) => (
							<div
								key={f.title}
								className="rounded-xl border border-gray-200 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-500/30"
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
					<Sandpack files={{ "App.js": interactiveDemo }} options={{ editorHeight: 480 }} />

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
						<PropRow name="trendline" type="boolean" defaultValue="false">
							Renders a dashed linear regression trendline over the data points.
						</PropRow>
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

					{/* Trendline */}
					<div className="mt-8" id="example-trendline" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trendline</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Enable a dashed linear regression line by passing the <InlineCode>trendline</InlineCode> prop.
						</p>
						<TabbedExample code={trendlineExample} height={480} />
					</div>

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
					<div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden">
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
									{ cls: "scatter__trendline", desc: "The dashed trendline path (when enabled)" },
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
}

.scatter__trendline {
  stroke: #3b82f6;     /* custom trendline color */
  stroke-dasharray: 8,4;
}`}</CodeBlock>

					{/* Spacing at bottom */}
					<div className="h-24" />
				</main>

				{/* Table of Contents sidebar */}
				<TableOfContents />
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
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(500).fill(null).map(() => ({
  hours: random(0, 50),
  score: random(0, 100),
}));

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Hours Studied vs Test Score",
          data: DATA.map((d) => ({ x: d.hours, y: d.score })),
        }]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Test Score" />
        <GridLines border horizontal vertical />
        <Scatter trendline />
        <Scatter.Tooltip
          tooltip={(point) =>
            \`Hours: \${point.data.x.toFixed(1)} | Score: \${point.data.y.toFixed(1)}\`
          }
        />
        <XAxis title="Hours Studied" />
      </Graph>
    </div>
  );
}
`;

const trendlineExample = `
import { Graph } from "nanoplot/Graph";
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

const random = (min, max) => Math.random() * (max - min) + min;
const DATA = new Array(200).fill(null).map(() => {
  const x = random(0, 100);
  return { x, y: x * 0.7 + random(-15, 15) };
});

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph
        data={[{
          name: "Correlated data",
          data: DATA,
        }]}
      >
        <YAxis />
        <GridLines border horizontal />
        <Scatter trendline />
        <XAxis />
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
