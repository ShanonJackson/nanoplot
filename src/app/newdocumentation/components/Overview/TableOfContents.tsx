"use client";

import { useState, useEffect } from "react";

export function TableOfContents({ items }: { items: Array<{ id: string; label: string; indent?: boolean }> }) {
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
		items.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [items]);

	return (
		<nav className="hidden xl:block sticky top-24 w-56 shrink-0 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">On this page</div>
			<ul className="space-y-0.5">
				{items.map(({ id, label, indent }) => (
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
