"use client";

import { useState } from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";

export function TabbedExample({ code, height = 500 }: { code: string; height?: number }) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const isLight = typeof document !== "undefined" && document.cookie.includes("theme=light");

	const themeSetup = isLight
		? `document.documentElement.style.colorScheme="light";document.documentElement.style.background="white";document.documentElement.style.color="black";`
		: `document.body.classList.add("dark");document.documentElement.style.colorScheme="dark";document.documentElement.style.background="black";document.documentElement.style.color="white";`;

	const setupCode = themeSetup + `\nvar l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap";l.rel="stylesheet";document.head.appendChild(l);document.body.style.fontFamily="FigTree, sans-serif";`;

	return (
		<div className="rounded-xl border border-gray-200/70 dark:border-white/[0.08] overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
			{/* Tab bar */}
			<div className="flex items-center gap-0 border-b border-gray-200/70 dark:border-white/[0.08] bg-white dark:bg-white/[0.03]">
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
