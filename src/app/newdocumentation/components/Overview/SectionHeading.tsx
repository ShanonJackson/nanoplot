"use client";

import { ReactNode } from "react";

export function SectionHeading({ id, children, level = 2 }: { id: string; children: ReactNode; level?: 2 | 3 }) {
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
