"use client";

import React, { ComponentType, FC, useState, useRef, useEffect } from "react";
import { cx } from "../../utils/cx/cx";

type Props = {
	active?: string;
	examples: Array<{ name: string; code: string; component: ComponentType }>;
	onClick: (example: { name: string; code: string; component: ComponentType } | undefined) => void;
};

export const ExamplesPanel: FC<Props> = ({ active, examples, onClick }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const activeExample = examples.find((ex) => ex.name === active);
	const currentLabel = activeExample?.name ?? "Playground";

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className="w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 hover:text-blue-300 text-blue-400 transition-colors bg-gray-800/50 rounded-lg px-4 py-2"
			>
				<div className="flex items-center gap-2">
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>

					<>
						<span>{currentLabel}</span>
					</>
				</div>
				<svg
					className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute left-0 right-0 mt-2 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
					<button
						onClick={() => {
							onClick(undefined);
							setIsOpen(false);
						}}
						className={cx(
							"flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors",
							!active ? "text-blue-400 bg-gray-800/50" : "text-gray-200",
						)}
					>
						<div className="flex items-center gap-2">
							<span>Playground</span>
						</div>
					</button>

					{examples.map((example, i) => (
						<button
							key={i}
							onClick={() => {
								onClick(example);
								setIsOpen(false);
							}}
							className={cx(
								"flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors",
								active === example.name ? "text-blue-400 bg-gray-800/50" : "text-gray-200",
							)}
						>
							<div className="flex items-center gap-2">
								<span>{example.name}</span>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

