"use client";
import { DocumentationNavigationMenuItem } from "./components/DocumentationNavigationMenuItem";
import { documentationNavigation } from "./models/documentation-navigation";

type MenuItem = {
	title: string;
	href?: string;
	children?: MenuItem[];
};

export const DocumentationNavigation = () => {
	/* GPT Generated */
	return (
		<div className="w-[220px]">
			<nav className="top-[65px] w-[220px] h-full py-2 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto bg-white dark:bg-gray-950">
				{documentationNavigation.map((section, sectionIndex) => (
					<div key={sectionIndex} className="mb-4">
						{section.title && (
							<div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">{section.title}</div>
						)}
						<ul className="space-y-1">
							{section.items.map((item, itemIndex) => (
								<DocumentationNavigationMenuItem
									key={itemIndex}
									item={item}
									defaultOpen={sectionIndex === 0 && itemIndex === 1}
								/>
							))}
						</ul>
						{sectionIndex < documentationNavigation.length - 1 && (
							<div className="mx-4 my-4 border-t border-gray-200 dark:border-gray-800" />
						)}
					</div>
				))}
			</nav>
		</div>
	);
};
