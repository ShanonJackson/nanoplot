"use client";
import { useState, useEffect, useCallback, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─────────────────────────── NAV DATA ─────────────────────────── */

type NavItem = {
	label: string;
	href: string;
	icon: ReactNode;
};

type NavSection = {
	title: string;
	items: NavItem[];
};

const SECTIONS: NavSection[] = [
	{
		title: "Getting Started",
		items: [
			{
				label: "Introduction",
				href: "/newdocumentation/1.0.0",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				),
			},
		],
	},
	{
		title: "Charts",
		items: [
			{
				label: "Lines",
				href: "/newdocumentation/1.0.0/lines",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
					</svg>
				),
			},
			{
				label: "Scatter",
				href: "/newdocumentation/1.0.0/scatter",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="7.5" cy="7.5" r="1.5" />
						<circle cx="18" cy="18" r="1.5" />
						<circle cx="11" cy="15" r="1.5" />
						<circle cx="16" cy="8" r="1.5" />
					</svg>
				),
			},
			{
				label: "Bars",
				href: "/newdocumentation/1.0.0/bars",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<rect x="3" y="12" width="4" height="9" rx="1" />
						<rect x="10" y="6" width="4" height="15" rx="1" />
						<rect x="17" y="2" width="4" height="19" rx="1" />
					</svg>
				),
			},
			{
				label: "Pie",
				href: "/newdocumentation/1.0.0/pie",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
						<path d="M22 12A10 10 0 0 0 12 2v10z" />
					</svg>
				),
			},
			{
				label: "Area",
				href: "/newdocumentation/1.0.0/area",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M2 20l5-14 5 8 5-6 5 12" />
						<path d="M2 20h20" />
					</svg>
				),
			},
			{
				label: "Radar",
				href: "/newdocumentation/1.0.0/radar",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M12 2L2 19.5h20L12 2z" />
						<path d="M12 8l-5 9.5h10L12 8z" />
					</svg>
				),
			},
			{
				label: "Heatmap",
				href: "/newdocumentation/1.0.0/heatmap",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<rect x="3" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="3" y="14" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" />
					</svg>
				),
			},
			{
				label: "Worldmap",
				href: "/newdocumentation/1.0.0/worldmap",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="12" r="10" />
						<line x1="2" y1="12" x2="22" y2="12" />
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
					</svg>
				),
			},
		],
	},
	{
		title: "Cartesian",
		items: [
			{
				label: "GridLines",
				href: "/newdocumentation/1.0.0/gridlines",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="3" y1="3" x2="3" y2="21" />
						<line x1="9" y1="3" x2="9" y2="21" />
						<line x1="15" y1="3" x2="15" y2="21" />
						<line x1="21" y1="3" x2="21" y2="21" />
						<line x1="3" y1="9" x2="21" y2="9" />
						<line x1="3" y1="15" x2="21" y2="15" />
					</svg>
				),
			},
			{
				label: "XAxis",
				href: "/newdocumentation/1.0.0/xaxis",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="3" y1="18" x2="21" y2="18" />
						<line x1="7" y1="18" x2="7" y2="21" />
						<line x1="12" y1="18" x2="12" y2="21" />
						<line x1="17" y1="18" x2="17" y2="21" />
					</svg>
				),
			},
			{
				label: "YAxis",
				href: "/newdocumentation/1.0.0/yaxis",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="6" y1="3" x2="6" y2="21" />
						<line x1="3" y1="7" x2="6" y2="7" />
						<line x1="3" y1="12" x2="6" y2="12" />
						<line x1="3" y1="17" x2="6" y2="17" />
					</svg>
				),
			},
			{
				label: "Legend",
				href: "/newdocumentation/1.0.0/legend",
				icon: (
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<rect x="3" y="5" width="4" height="2" rx="0.5" />
						<line x1="10" y1="6" x2="21" y2="6" />
						<rect x="3" y="11" width="4" height="2" rx="0.5" />
						<line x1="10" y1="12" x2="21" y2="12" />
						<rect x="3" y="17" width="4" height="2" rx="0.5" />
						<line x1="10" y1="18" x2="21" y2="18" />
					</svg>
				),
			},
		],
	},
];

/* ─────────────────────────── NAV LINK ─────────────────────────── */

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
	const pathname = usePathname();
	const isActive = pathname === item.href;

	return (
		<Link
			href={item.href}
			onClick={onClick}
			className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
				isActive
					? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
					: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:text-gray-900 dark:hover:text-gray-200"
			}`}
		>
			<span className={`shrink-0 transition-colors ${isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`}>
				{item.icon}
			</span>
			{item.label}
		</Link>
	);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<div className="flex flex-col gap-6 py-4 px-3">
			{SECTIONS.map((section) => (
				<div key={section.title}>
					<div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
						{section.title}
					</div>
					<div className="flex flex-col gap-0.5">
						{section.items.map((item) => (
							<NavLink key={item.href} item={item} onClick={onNavigate} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}

/* ─────────────────────────── NAVIGATION ─────────────────────────── */

export function NewDocumentationNavigation() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (drawerOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [drawerOpen]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") setDrawerOpen(false);
		},
		[],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	return (
		<>
			{/* Desktop sidebar */}
			<aside className="hidden lg:block w-60 shrink-0 border-r border-gray-200 dark:border-white/[0.08] sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50/50 dark:bg-white/[0.02]">
				<SidebarContent />
			</aside>

			{/* Mobile hamburger bar — visible below lg */}
			<div className="lg:hidden absolute top-0 left-0 right-0 flex items-center h-12 px-4 border-b border-gray-200 dark:border-white/[0.08] bg-[hsl(0deg,0%,100%)] dark:bg-[#0a0a0f] z-30">
				<button
					onClick={() => setDrawerOpen(true)}
					className="p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
					aria-label="Open navigation"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="3" y1="6" x2="21" y2="6" />
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>
				<span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Navigation</span>
			</div>

			{/* Mobile drawer — only rendered client-side when open */}
			{mounted && drawerOpen && (
				<>
					<div
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
						onClick={() => setDrawerOpen(false)}
					/>
					<div className="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-[#0c0c14] border-r border-gray-200 dark:border-white/[0.08] lg:hidden">
						<div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-white/[0.08]">
							<div className="flex items-center gap-2.5">
								<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
									<span className="text-white text-sm font-bold">N</span>
								</div>
								<span className="text-sm font-semibold text-gray-900 dark:text-white">Documentation</span>
							</div>
							<button
								onClick={() => setDrawerOpen(false)}
								className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						</div>
						<div className="overflow-y-auto h-[calc(100%-4rem)]">
							<SidebarContent onNavigate={() => setDrawerOpen(false)} />
						</div>
					</div>
				</>
			)}
		</>
	);
}
