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
	{ id: "heatmap-props", label: "Heatmap Props", indent: true },
	{ id: "gradient-legend-props", label: "GradientLegend Props", indent: true },
	{ id: "examples", label: "Examples" },
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
							<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="white"
									strokeWidth="0"
								>
									<rect x="3" y="3" width="4" height="4" />
									<rect x="9" y="3" width="4" height="4" />
									<rect x="15" y="3" width="4" height="4" />
									<rect x="3" y="9" width="4" height="4" />
									<rect x="9" y="9" width="4" height="4" />
									<rect x="15" y="9" width="4" height="4" />
									<rect x="3" y="15" width="4" height="4" />
									<rect x="9" y="15" width="4" height="4" />
									<rect x="15" y="15" width="4" height="4" />
								</svg>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Heatmap</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Heatmaps show data by coloring each cell to reveal where values are high or low. Great for spotting patterns
							across two categorical dimensions.
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
								<code className="text-xs font-mono">nanoplot/Heatmap</code>
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
								<code className="text-xs font-mono">nanoplot/GradientLegend</code>
							</div>
						</div>
					</div>

					{/* ─── Overview ─── */}
					<SectionHeading id="overview">Overview</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						The <InlineCode>{"<Heatmap />"}</InlineCode> component renders a grid of colored cells that represent data values
						across two categorical dimensions. It works inside a <InlineCode>{"<Graph />"}</InlineCode> context and pairs with{" "}
						<InlineCode>{"<GradientLegend />"}</InlineCode> to visualize the color-to-value mapping.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						{[
							{ icon: "palette", title: "Color Mapping", desc: "Map values to colors using custom gradients" },
							{ icon: "legend", title: "Gradient Legend", desc: "Visual scale showing value-to-color relationships" },
							{ icon: "label", title: "Custom Labels", desc: "Row and column labels with collision detection" },
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
						Import Heatmap and GradientLegend inside a <InlineCode>{"<Graph />"}</InlineCode> wrapper. Provide data as a
						2D array of values and a gradient string to define the color scale.
					</p>
					<CodeBlock title="basic-heatmap.tsx">{`import { Graph } from "nanoplot/Graph";
import { Heatmap } from "nanoplot/Heatmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function MyHeatmap() {
  const data = [
    [10, 20, 30, 25],
    [15, 35, 28, 40],
    [25, 30, 45, 50],
  ];

  const gradient = "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)";

  return (
    <Graph data={data}>
      <YAxis />
      <Heatmap gradient={gradient} scalars={[0, 50]} />
      <GradientLegend gradient={gradient} scalars={[0, 50]} />
      <XAxis />
    </Graph>
  );
}`}</CodeBlock>

					{/* ─── Interactive Demo ─── */}
					<SectionHeading id="interactive-demo">Interactive Demo</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
						Edit the code below to experiment with the Heatmap component in real-time.
					</p>
					<TabbedExample code={interactiveDemo} height={480} />

					{/* ─── API Reference ─── */}
					<SectionHeading id="api-reference">API Reference</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Heatmap is used with GradientLegend to create a complete visualization. The main component renders the colored
						cells, while the legend provides a visual scale.
					</p>

					{/* Heatmap Props */}
					<SubComponentSection
						id="heatmap-props"
						name="<Heatmap />"
						description="Renders a grid of colored cells representing data values across two categorical dimensions."
					>
						<PropRow name="gradient" type="string" required>
							CSS linear gradient string defining the color scale. Example:{" "}
							<InlineCode>linear-gradient(90deg, blue 0%, red 100%)</InlineCode>
						</PropRow>
						<PropRow name="scalars" type="number[] | Array<{tick, percent}>" required>
							Array of numeric values or tick/percent pairs that define the value range. Used to map data values to colors in
							the gradient.
						</PropRow>
						<PropRow name="labels" type="boolean | (value) => string | {collision, display}" defaultValue="false">
							Show or customize labels on cells. Pass <InlineCode>true</InlineCode> for default labels, a function for custom
							text, or an object with <InlineCode>collision</InlineCode> and <InlineCode>display</InlineCode> properties.
						</PropRow>
					</SubComponentSection>

					{/* GradientLegend Props */}
					<SubComponentSection
						id="gradient-legend-props"
						name="<GradientLegend />"
						description="Renders a visual legend showing the relationship between colors and values in the heatmap."
					>
						<PropRow name="position" type="'top' | 'bottom' | 'left' | 'right'" defaultValue="bottom">
							Where to place the legend relative to the graph.
						</PropRow>
						<PropRow name="alignment" type="'start' | 'center' | 'end'" defaultValue="center">
							Alignment of the legend along its position edge.
						</PropRow>
						<PropRow name="gradient" type="string" required>
							CSS gradient string matching the heatmap gradient. Defines the visual color scale display.
						</PropRow>
						<PropRow name="scalars" type="number[] | Array<{tick, percent}>" required>
							Value range matching the heatmap scalars. Used to label the legend tick marks.
						</PropRow>
						<PropRow name="labels" type="(value) => string" defaultValue="-">
							Custom function to format legend labels. Receives scalar values and returns formatted strings.
						</PropRow>
					</SubComponentSection>

					{/* ─── Styling ─── */}
					<SectionHeading id="styling">Styling</SectionHeading>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
						Target these CSS class names to customize the appearance of specific Heatmap elements.
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
									{ cls: "heatmap", desc: "The SVG container for all heatmap cells" },
									{ cls: "heatmap__cell", desc: "Individual colored cell rectangles" },
									{ cls: "heatmap__label", desc: "Text labels on cells (if enabled)" },
									{ cls: "gradient-legend", desc: "The legend container" },
									{ cls: "gradient-legend__bar", desc: "The gradient color bar" },
									{ cls: "gradient-legend__tick", desc: "Legend tick marks and labels" },
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

					<CodeBlock title="custom-styling.css">{`.heatmap__cell {
  stroke: 1px solid rgba(0, 0, 0, 0.1);  /* cell borders */
  opacity: 0.9;                           /* semi-transparent cells */
}

.gradient-legend__bar {
  border-radius: 4px;                     /* rounded gradient bar */
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
import { Heatmap } from "nanoplot/Heatmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import "nanoplot/styles.css";

const DATA = [
  [10, 15, 20, 25, 30],
  [20, 35, 28, 40, 32],
  [15, 25, 45, 50, 48],
  [25, 30, 35, 55, 60],
  [30, 40, 50, 65, 70],
];

const GRADIENT = "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 40%, #ec4899 70%, #ef4444 100%)";
const SCALARS = [0, 20, 40, 60, 80];

export default function App() {
  return (
    <div className="h-[70vh] w-full p-4 px-10">
      <Graph data={DATA}>
        <YAxis />
        <Heatmap gradient={GRADIENT} scalars={SCALARS} />
        <GradientLegend position="bottom" alignment="center" gradient={GRADIENT} scalars={SCALARS} />
        <XAxis />
      </Graph>
    </div>
  );
}
`;
