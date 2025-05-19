import { useState } from "react";
import { DocumentationNavigation } from "../Documentation/DocumentationNavigation/DocumentationNavigation";

export const NavToggle = () => {
	const [open, setOpen] = useState(false);
	// IF YOU go back to a breakpoint where button is invisible
	// set open false.

	return (
		<div>
			<button
				className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
				aria-label="Toggle menu"
				onClick={() => setOpen(!open)}
			>
				<svg
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
			{open && <DocumentationNavigation className={"fixed w-full h-full block top-[65px] left-0"} onClose={() => setOpen(false)} />}
		</div>
	);
};
