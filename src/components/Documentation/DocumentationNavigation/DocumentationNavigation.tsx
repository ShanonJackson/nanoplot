"use client";
import { DocumentationNavigationMenuItem } from "./components/DocumentationNavigationMenuItem";
import { documentationNavigation } from "./models/documentation-navigation";
import { tw } from "../../../utils/cx/cx";

type MenuItem = {
	title: string;
	href?: string;
	children?: MenuItem[];
};

type Props = {
	onClose?: () => void;
	className?: string;
};

export const DocumentationNavigation = ({ className }: Props) => {
	/* GPT Generated */
	return (
		<div className={tw("w-[220px] hidden md:block", className)}>
			<nav className="sticky top-[65px] w-[inherit] h-full py-2 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto bg-white dark:bg-gray-950">
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
