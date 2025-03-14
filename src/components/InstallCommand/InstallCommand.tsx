"use client";
import { useState } from "react";
import { cx } from "../../utils/cx/cx";

export const InstallCommand = ({ className }: { className?: string }) => {
	const [selectedManager, setSelectedManager] = useState("npm");
	const packageName = "nanoplot";
	const getInstallCommand = () => {
		switch (selectedManager) {
			case "npm":
				return `npm install ${packageName}`;
			case "yarn":
				return `yarn add ${packageName}`;
			case "pnpm":
				return `pnpm add ${packageName}`;
			case "bun":
				return `bun i ${packageName}`;
			default:
				return `pnpm add ${packageName}`;
		}
	};

	return (
		<div className={cx("max-w-3xl", className)}>
			<div className="border-b border-gray-200 dark:border-gray-700">
				<nav className="-mb-px flex">
					{["npm", "yarn", "pnpm", "bun"].map((manager) => (
						<button
							key={manager}
							onClick={() => setSelectedManager(manager)}
							className={`py-4 px-6 text-sm font-medium ${
								selectedManager === manager
									? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
							}`}
						>
							{manager}
						</button>
					))}
				</nav>
			</div>

			<div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
				<div className="font-mono text-sm text-gray-800 dark:text-gray-200">{getInstallCommand()}</div>
			</div>
		</div>
	);
};
