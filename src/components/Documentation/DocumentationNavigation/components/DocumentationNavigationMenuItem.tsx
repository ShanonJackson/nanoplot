import { useRef, useState } from "react";
import { ChevronDown } from "../../../../assets/Icons/ChevronDown";
import { ChevronRight } from "../../../../assets/Icons/ChevronRight";
import { cx } from "../../../../utils/cx/cx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useOnClickOutside } from "../../../../hooks/use-on-click-outside";

export type MenuItem = {
	title: string;
	href?: string;
	children?: MenuItem[];
};

export type Props = {
	item: MenuItem;
	active: MenuItem | undefined;
	level?: number;
	onClick?: (item: MenuItem) => void;
};

export const DocumentationNavigationMenuItem = ({ item, active, level = 0, onClick }: Props) => {
	/* GPT Generated */
	const pathname = usePathname();
	const hasChildren = item.children && item.children.length > 0;
	const isLink = Boolean(item.href);
	const isActive = isLink && pathname === item.href;
	const isOpen = item === active || item.children?.some((child) => child === active);

	const content = (
		<>
			{hasChildren && (
				<span className="mr-2">
					{isOpen ? (
						<ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
					) : (
						<ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
					)}
				</span>
			)}
			<span>{item.title}</span>
		</>
	);
	return (
		<li>
			<div className="grid grid-cols-1 cursor-pointer">
				{item.href && !hasChildren ? (
					<Link
						href={item.href}
						className={cx(
							"flex items-center px-4 py-2 text-sm",
							hasChildren ? "cursor-pointer" : "",
							level === 0
								? "text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 pl-8",
							isOpen && "bg-gray-100 dark:bg-gray-900",
						)}
						onClick={() => {
							onClick?.(item);
						}}
					>
						{content}
					</Link>
				) : (
					<div
						className={cx(
							"flex items-center px-4 py-2 text-sm",
							hasChildren ? "cursor-pointer" : "",
							level === 0
								? "text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 pl-8",
							isOpen && "bg-gray-100 dark:bg-gray-900",
						)}
						onClick={() => {
							onClick?.(item);
						}}
					>
						{content}
					</div>
				)}
				{hasChildren && (
					<div className={cx("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
						<div className="overflow-hidden">
							<ul className="space-y-1 py-1">
								{item.children?.map((child, index) => (
									<DocumentationNavigationMenuItem
										key={index}
										item={child}
										level={level + 1}
										onClick={onClick}
										active={active}
									/>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</li>
	);
};
