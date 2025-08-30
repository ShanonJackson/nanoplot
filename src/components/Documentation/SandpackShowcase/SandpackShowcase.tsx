"use client";

import React, { useState } from "react";
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import { CopyButton } from "./CopyButton";
import pkg from "../../../../package.json";
import { useMounted } from "../../../hooks/use-mounted";
import { cx } from "../../../utils/cx/cx";

interface SandpackShowcaseProps {
	children: React.ReactNode;
	language?: string;
	title?: string;
	files?: Record<string, string>;
	dependencies?: Record<string, string>;
	template?: "react" | "react-ts" | "vanilla" | "vanilla-ts" | "angular" | "vue" | "vue-ts";
}

export function SandpackShowcase({ children, language = "tsx", title, files, dependencies, template = "react" }: SandpackShowcaseProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
	const mounted = useMounted();
	if (!mounted) return null;
	const isLight = document.cookie.includes("theme=light");
	// Default files if none provided
	return (
		<div className={"min-h-[500px]"}>
			<SandpackProvider
				template={"react"}
				files={{
					"App.js": children as string,
				}}
				key={isLight.toString()}
				theme={isLight ? "light" : "dark"}
				customSetup={{
					dependencies: { nanoplot: pkg.version, "@number-flow/react": "latest" },
				}}
				options={{
					externalResources: [
						"https://unpkg.com/@tailwindcss/browser@4.0.12",
						`${window.location.origin}/sandpack/sandpack.js`,
						`${window.location.origin}/sandpack/sandpack-${isLight ? "light" : "dark"}.js`,
						`${window.location.origin}/sandpack/sandpack-${isLight ? "light" : "dark"}-global.css`,
					],
				}}
			>
				<div className="w-full mx-auto">
					<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
						{/* Header with tabs and copy button */}
						<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
							<div className="flex space-x-1">
								<button
									onClick={() => setActiveTab("preview")}
									className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										activeTab === "preview"
											? "bg-white text-gray-900 border border-gray-200 shadow-sm"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
									}`}
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
									<span>Preview</span>
								</button>
								<button
									onClick={() => setActiveTab("code")}
									className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										activeTab === "code"
											? "bg-white text-gray-900 border border-gray-200 shadow-sm"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
									}`}
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
										/>
									</svg>
									<span>Code</span>
								</button>
							</div>

							<CopyButton />
						</div>
						<SandpackLayout>
							<div className="min-h-[500px] p-6 relative w-[100%]">
								<div className={cx("bg-white hidden", activeTab === "preview" && "block")}>
									<SandpackPreview
										showNavigator={false}
										showRefreshButton={false}
										showOpenInCodeSandbox={false}
										style={{ height: 500 }}
									/>
								</div>
								<div className={cx("bg-white hidden relative", activeTab === "code" && "block")}>
									<div className="absolute top-3 right-3 z-10">
										<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
											{language}
										</span>
									</div>
									<SandpackCodeEditor
										showLineNumbers
										showInlineErrors
										wrapContent
										showTabs={false}
										showRunButton={false}
										style={{ height: 500 }}
									/>
								</div>
							</div>
						</SandpackLayout>
					</div>
				</div>
			</SandpackProvider>
		</div>
	);
}
