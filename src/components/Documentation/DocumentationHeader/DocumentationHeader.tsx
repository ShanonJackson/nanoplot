"use client";
import Link from "next/link";
import { useState } from "react";
import { Href, Routes } from "../../../utils/routes/routes";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";

type Props = {};

export const DocumentationHeader = ({}: Props) => {
	const [search, setSearch] = useState("");
	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900 dark:border-gray-800">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">D</span>
						<span className="font-bold text-xl hidden sm:inline-block text-gray-900 dark:text-white">Docs</span>
					</Link>
				</div>
				<nav className="hidden md:!flex items-center gap-6">
					<Link
						href={Href.DOCUMENTATION.V1_0_0.INDEX}
						className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
					>
						Documentation
					</Link>
					<Link
						href={Href.BARS}
						className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
					>
						Examples
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<ThemeToggle />
					{/*<button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">*/}
					{/*	<svg*/}
					{/*		xmlns="http://www.w3.org/2000/svg"*/}
					{/*		width="20"*/}
					{/*		height="20"*/}
					{/*		viewBox="0 0 24 24"*/}
					{/*		fill="none"*/}
					{/*		stroke="currentColor"*/}
					{/*		strokeWidth="2"*/}
					{/*		strokeLinecap="round"*/}
					{/*		strokeLinejoin="round"*/}
					{/*		className="h-5 w-5"*/}
					{/*	>*/}
					{/*		<circle cx="11" cy="11" r="8"></circle>*/}
					{/*		<path d="m21 21-4.3-4.3"></path>*/}
					{/*	</svg>*/}
					{/*	<span className="sr-only">Search documentation</span>*/}
					{/*</button>*/}
					<button
						className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
						aria-label="Toggle menu"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-5 w-5"
						>
							<line x1="4" x2="20" y1="12" y2="12"></line>
							<line x1="4" x2="20" y1="6" y2="6"></line>
							<line x1="4" x2="20" y1="18" y2="18"></line>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};
