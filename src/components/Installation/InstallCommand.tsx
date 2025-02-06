"use client";

import { useState } from "react";

const packageManagers = {
	npm: "npm install nanoplot",
	pnpm: "pnpm add nanoplot",
	yarn: "yarn add nanoplot",
} as const;

export const InstallCommand = () => {
	const [selectedPackageManager, setSelectedPackageManager] = useState<keyof typeof packageManagers>("npm");
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(packageManagers[selectedPackageManager]);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="mb-8 max-w-3xl w-full">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-gray-200 dark:text-gray-400 mb-4">
				<div className="relative">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center gap-2 hover:text-blue-300 text-blue-400 transition-colors bg-gray-800/50 rounded-lg px-4 py-2"
					>
						<span className="font-medium">Install via {selectedPackageManager}</span>
						<svg
							className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					{isOpen && (
						<div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
							{Object.keys(packageManagers).map((pm) => (
								<button
									key={pm}
									onClick={() => {
										setSelectedPackageManager(pm as keyof typeof packageManagers);
										setIsOpen(false);
									}}
									className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors text-blue-400 ${
										selectedPackageManager === pm ? "text-blue-400 bg-gray-700/50" : "text-blue-400"
									}`}
								>
									{pm}
								</button>
							))}
						</div>
					)}
				</div>
				<button
					onClick={handleCopy}
					className={`text-blue-400 hover:text-gray-200 transition-colors flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2 ${
						copied ? "text-green-400" : ""
					}`}
					aria-label="Copy to clipboard"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{copied ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						)}
					</svg>
					{copied ? "Copied!" : "Copy Command"}
				</button>
			</div>
			<div className="rounded-lg bg-gray-900 dark:bg-gray-800 p-4 relative group">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
				<code className="text-white font-mono text-sm relative z-10">{packageManagers[selectedPackageManager]}</code>
			</div>
		</div>
	);
};

