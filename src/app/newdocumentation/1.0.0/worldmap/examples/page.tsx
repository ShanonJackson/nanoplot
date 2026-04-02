"use client";
import * as React from "react";
import { useState, ReactNode } from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";

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

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ExamplesPage() {
	return (
		<div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
			<div className="flex gap-12">
				{/* Main content */}
				<main className="min-w-0 flex-1 max-w-3xl">
					{/* ─── Hero ─── */}
					<div className="pt-12 pb-10 border-b border-gray-200 dark:border-white/[0.06]">
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
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Worldmap Examples</h1>
									<Badge>Component</Badge>
								</div>
							</div>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
							Explore practical examples of the Worldmap component with different configurations and styling approaches.
						</p>
					</div>

					{/* ─── Example: Basic Worldmap with Tooltip ─── */}
					<div className="mt-14" id="example-basic-tooltip" style={{ scrollMarginTop: "6rem" }}>
						<SectionHeading id="example-basic-tooltip" level={2}>
							Basic Worldmap with Tooltip
						</SectionHeading>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
							A simple worldmap with custom tooltips displaying country flags, names, and values. The tooltip includes a color indicator showing the gradient fill.
						</p>
						<TabbedExample code={basicTooltipExample} height={480} />
					</div>

					{/* Spacing at bottom */}
					<div className="h-24" />
				</main>
			</div>
		</div>
	);
}

/* ─────────────────────────── SANDPACK EXAMPLES ─────────────────────────── */

const basicTooltipExample = `
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
    <div className={"h-[70vh] w-full p-4 px-10"}>
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
