"use client";

import { guideItems, nanoplotItems } from "@/utils/constant/navigation";
import { Routes } from "@/utils/routes/routes";
import Link from "next/link";
import React from "react";

interface IProp {
	items?: any[];
}
const DropdownMenu = ({ items }: IProp) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="inline-block">
			<button onClick={handleToggle} className="p-2">
				<svg width="32px" height="32px" viewBox="0 0 32 32" className="stroke-white stroke-2">
					<g transform="translate(16, 16)">
						<line x1="-11" x2="11" transform={`translate(0, ${!isOpen ? "-7" : "0"}) rotate(${!isOpen ? "0" : "45"})`}></line>
						{!isOpen && <line x1="-11" x2="11" opacity="1"></line>}
						<line x1="-11" x2="11" transform={`translate(0, ${!isOpen ? "7" : "0"}) rotate(${!isOpen ? "0" : "-45"})`}></line>
					</g>
				</svg>
			</button>

			{isOpen && (
				<div className="absolute z-10 top-16 left-0 w-screen h-screen bg-background shadow-md p-4" onClick={handleToggle}>
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
						<div className="col-span-full grid grid-cols-2 md:col-span-2 lg:col-span-3 gap-6">
							<h1 className="font-semibold text-sm text-primary-foreground col-span-full py-1 -mb-3 border-b border-primary-foreground/40">
								COMPONENTS
							</h1>
							{Routes.map((route) => (
								<Link key={route.name} href={route.href} className="text-foreground text-sm flex items-start gap-2">
									<route.icon className="w-14 h-14" />
									<div>
										<h2 className="font-semibold ">{route.name}</h2>
										<div className="bg-primary text-xs text-white p-1 rounded-md w-fit">SVG</div>
									</div>
								</Link>
							))}
						</div>

						<div className="col-span-full md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4 font-semibold text-sm text-primary">
							<div className="flex flex-col text-primary-foreground">
								<h2 className="border-b border-primary-foreground/40 py-1 mb-2">GUIDES</h2>
								{guideItems.map((guide) => (
									<Link key={guide.label} href={guide.value} className="py-1 text-xs">
										{guide.label}
									</Link>
								))}
							</div>
							<div className="flex flex-col text-primary-foreground">
								<h2 className="border-b border-primary-foreground/40 py-1 mb-2">OTHER</h2>
								{nanoplotItems.map((guide) => (
									<Link key={guide.label} href={guide.value} className="py-1 text-xs">
										{guide.label}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
