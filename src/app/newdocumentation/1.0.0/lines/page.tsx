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
	{ id: "lines-props", label: "Lines Props", indent: true },
	{ id: "lines-tooltip", label: "Lines.Tooltip", indent: true },
	{ id: "examples", label: "Examples" },
	{ id: "example-mask", label: "Mask Gradient", indent: true },
	{ id: "example-legend", label: "Legend Interactions", indent: true },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
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
									<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Lines</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Line graphs visualize continuous datasets, showing patterns, trends, and changes over time. Supports multiple curve types, data point joints, tooltips, and zoom.
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
								<code className="text-xs font-mono">nanoplot/Lines</code>
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
						The <InlineCode>{"<Lines />"}</InlineCode> component renders continuous data as smooth or linear curves on a cartesian plane. It is
						designed to work inside a <InlineCode>{"<Graph />"}</InlineCode> context and supports several companion
						sub-components for enhanced interactivity.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ icon: "curve", title: "Curve Types", desc: "5 interpolation modes for different data shapes" },
							{ icon: "tooltip", title: "Tooltips", desc: "Vertical line showing all series at hovered x" },
							{ icon: "zoom", title: "Zoom & Pan", desc: "Built-in zoom slider for exploring data ranges" },
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
						Import and use the Lines component inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide your data as
						an array of series, each containing an array of <InlineCode>{`{ x, y }`}</InlineCode> points with temporal data.
					</p>
					<CodeBlock title="basic-lines.tsx">{`import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function MyLines() {
  return (
    <Graph
      data={[{
        name: "Monthly Sales",
        data: [
          { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 2500 },
          { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 3200 },
          { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 2800 },
          { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 3900 },
        ],
      }]}
    >
      <YAxis />
      <GridLines horizontal />
      <Lines curve="natural" />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Data Shape ─── */}
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2 mt-8">
						The <InlineCode>data</InlineCode> prop on <InlineCode>{"<Graph />"}</InlineCode> expects the following shape:
					</p>
					<CodeBlock title="types">{`type TimeSeriesDataset = Array<{
  name: string;          // Series label (used in legend + tooltips)
  id?: string;           // Unique identifier
  description?: string;  // Optional description
  stroke?: string;       // Line color
  data: Array<{
    x: Temporal.Instant; // Time value
    y: number | string;  // Y-axis value
  }>;
}>;`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Lines component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Lines is a compound component with two parts. The main <InlineCode>{"<Lines />"}</InlineCode> renders the
						lines, while the sub-component <InlineCode>{"<Lines.Tooltip />"}</InlineCode> adds hover tooltips.
					</p>

					{/* Lines Props */}
					<SubComponentSection
						id="lines-props"
						name="<Lines />"
						description="Renders the line paths as SVG elements. Supports smooth curves, step functions, and custom styling."
					>
						<PropRow name="curve" type="'linear' | 'natural' | 'monotoneX' | 'stepBefore' | 'stepAfter'" defaultValue="'linear'">
							Interpolation mode for the line curve. Use 'natural' for smooth curves, 'linear' for straight segments, or step functions for discrete data.
						</PropRow>
						<PropRow name="joints" type="boolean | { border: boolean }" defaultValue="false">
							Show circles at each data point. Pass an object with <InlineCode>border: true</InlineCode> for outlined joints.
						</PropRow>
						<PropRow name="loading" type="boolean" defaultValue="false">
							Shows an animated skeleton placeholder while data is loading.
						</PropRow>
						<PropRow name="dataset" type="string">
							Optional key to bind to a specific dataset in the Graph's data array.
						</PropRow>
						<PropRow name="children" type="ReactNode">
							Optional child elements, such as annotations or overlays.
						</PropRow>
					</SubComponentSection>

					{/* Lines.Tooltip */}
					<SubComponentSection
						id="lines-tooltip"
						name="<Lines.Tooltip />"
						description="Adds a vertical line with tooltips showing all series values at the hovered x-coordinate. Automatically positions the tooltip content above or below based on viewport space."
					>
						<PropRow name="className" type="string">
							CSS class for the tooltip container.
						</PropRow>
						<PropRow name="style" type="CSSProperties">
							Inline styles for the tooltip overlay.
						</PropRow>
					</SubComponentSection>

					{/* ─── Examples ─── */}
					<SectionHeading id="examples">Examples</SectionHeading>

					{/* Mask Gradient */}
					<div className="mt-14" id="example-mask" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mask Gradient</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Use <InlineCode>stroke</InlineCode> with a mask gradient to conditionally color the line based on values. Red for negative, green for positive.
						</p>
						<TabbedExample code={maskGradientExample} height={480} />
					</div>

					{/* Legend Interactions */}
					<div className="mt-14" id="example-legend" style={{ scrollMarginTop: "6rem" }}>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Legend Interactions</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							Click legend items to pin series, hover to highlight. Use <InlineCode>interactions</InlineCode> and <InlineCode>Legend</InlineCode> callbacks for interactivity.
						</p>
						<TabbedExample code={legendInteractionsExample} height={480} />
					</div>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Lines elements.
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
									{ cls: "lines__stroke", desc: "The SVG path element that renders the line" },
									{ cls: "lines__fill", desc: "Fill area below the line (if applied)" },
									{ cls: "lines__joints", desc: "Circle elements at data points" },
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

					<CodeBlock title="custom-styling.css">{`.lines__stroke {
  stroke-width: 2;     /* line thickness */
  opacity: 0.9;        /* semi-transparent lines */
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
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
import { Lines } from "nanoplot/Lines";
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
            name: "New Users",
            stroke: "#FF4B4B",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
            ],
          },
          {
            name: "Registered Users",
            stroke: "#33D4FF",
            data: [
              { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
              { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
              { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
              { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
              { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
              { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
            ],
          },
        ]}
      >
        <Legend position="top" alignment="end" />
        <YAxis title="Users" />
        <GridLines border horizontal vertical />
        <Lines curve="natural" />
        <Lines.Tooltip />
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  );
}
`;

const maskGradientExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default function App() {
  return (
    <div className={"h-[70vh] w-[100%] m-auto p-10"}>
      <Graph
        data={[{
          name: "Money Made",
          stroke: "mask:linear-gradient(to top, #d93025 40, rgb(52, 168, 83) 40.001, rgb(52, 168, 83))",
          data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 102 },
            { x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
            { x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
            { x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
          ],
        }]}
      >
        <Legend alignment={"end"} position={"top"} />
        <YAxis />
        <GridLines horizontal vertical border />
        <Lines curve={"natural"} joints={true} />
        <Lines.Tooltip />
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  );
}
`;

const legendInteractionsExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
  const [hovered, setHovered] = useState([]);
  const [pinned, setPinned] = useState([]);
  return (
    <div className={"h-[70vh] w-[100%] m-auto p-10"}>
      <Graph
        interactions={{ hovered, pinned }}
        data={[
          { name: "New Users", stroke: "#FF4B4B", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
          ]},
          { name: "Registered Users", stroke: "#33D4FF", data: [
            { x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
            { x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
            { x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
            { x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
            { x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
          ]},
        ]}
      >
        <Legend alignment={"end"} position={"top"}
          onClick={(dp) => { setPinned((p) => p.includes(dp.id) ? p.filter((pin) => pin !== dp.id) : [...p, dp.id]); }}
          onMouseEnter={(dp) => { setHovered((h) => h.includes(dp.id) ? h.filter((hov) => hov !== dp.id) : [...h, dp.id]); }}
          onMouseLeave={(dp) => { setHovered((h) => h.filter((hov) => hov !== dp.id)); }}
        />
        <YAxis />
        <GridLines />
        <Lines curve={"natural"} />
        <Lines.Tooltip />
        <XAxis ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
      </Graph>
    </div>
  )
}
`;
