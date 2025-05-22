import React, { useEffect, useState } from "react";
import { DocumentationNavigation } from "../Documentation/DocumentationNavigation/DocumentationNavigation";

export const NavToggle = () => {
	const [open, setOpen] = useState(false);
	// IF YOU go back to a breakpoint where button is invisible
	// set open false.

	useEffect(() => {
		const onResize = () => {
			const breakpoint = window.matchMedia("(max-width: 768px)");
			if (!breakpoint.matches) {
				setOpen(false);
			}
		};
		window.addEventListener("resize", onResize);

		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<div>
			<button
				className="md:hidden rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
				aria-label="Toggle menu"
				onClick={() => setOpen(!open)}
			>
				<svg width="32px" height="32px" viewBox="0 0 32 32" className="stroke-gray-800 dark:stroke-gray-100 stroke-2">
					<g transform="translate(16, 16)">
						<line x1="-11" x2="11" transform={`translate(0, ${!open ? "-7" : "0"}) rotate(${!open ? "0" : "45"})`}></line>
						{!open && <line x1="-11" x2="11" opacity="1"></line>}
						<line x1="-11" x2="11" transform={`translate(0, ${!open ? "7" : "0"}) rotate(${!open ? "0" : "-45"})`}></line>
					</g>
				</svg>
			</button>
			{open && <DocumentationNavigation className={"fixed w-full h-full block top-[65px] left-0"} />}
		</div>
	);
};
