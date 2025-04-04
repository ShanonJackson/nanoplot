"use client";
import Link from "next/link";
import React from "react";
import { Routes } from "../../utils/routes/routes";
import { guideItems, nanoplotItems } from "../../utils/constant/navigation";

interface IProp {
	items?: any[];
}
const DropdownMenu = ({ items }: IProp) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="inline-block">
			<button
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				className="p-2"
			>
				<svg width="32px" height="32px" viewBox="0 0 32 32" className="stroke-white stroke-2">
					<g transform="translate(16, 16)">
						<line x1="-11" x2="11" transform={`translate(0, ${!isOpen ? "-7" : "0"}) rotate(${!isOpen ? "0" : "45"})`}></line>
						{!isOpen && <line x1="-11" x2="11" opacity="1"></line>}
						<line x1="-11" x2="11" transform={`translate(0, ${!isOpen ? "7" : "0"}) rotate(${!isOpen ? "0" : "-45"})`}></line>
					</g>
				</svg>
			</button>

			{isOpen && (
				<div
					className="absolute z-10 top-16 left-0 w-screen h-screen bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] shadow-md p-4"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-3 md:mx-6">
						<div className="col-span-full grid grid-cols-2 md:grid-cols-3 md:col-span-2 lg:col-span-3 gap-6">
							<h1 className="font-semibold text-sm text-[hsl(14.2deg,70.71%,53.14%)] dark:text-[hsl(210.5deg,68.97%,65.88%)] col-span-full py-1 my-2 border-b border-[hsl(14.2deg,70.71%,53.14%)] dark:border-[hsl(210.5deg,68.97%,65.88%)]/40">
								COMPONENTS
							</h1>
							{Routes.map((route) => (
								<Link
									key={route.name}
									href={route.href}
									className="text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] text-sm flex items-start gap-2"
								>
									<route.icon className="w-14 h-14" />
									<div>
										<h2 className="font-semibold ">{route.name}</h2>
										<div className="bg-[hsl(347.29deg,47.58%,51.37%)] dark:bg-[hsl(209.65deg,52.15%,31.96%)] text-xs text-white p-1 rounded-md w-fit">
											SVG
										</div>
									</div>
								</Link>
							))}
						</div>

						<div className="col-span-full md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4 font-semibold text-sm text-[hsl(347.29deg,47.58%,51.37%)] dark:text-[hsl(209.65deg,52.15%,31.96%)]">
							<div className="flex flex-col text-[hsl(14.2deg,70.71%,53.14%)] dark:text-[hsl(210.5deg,68.97%,65.88%)]">
								<h2 className="border-b border-[hsl(14.2deg,70.71%,53.14%)] dark:border-[hsl(210.5deg,68.97%,65.88%)]/40 py-1 mb-2">
									GUIDES
								</h2>
								{guideItems.map((guide) => (
									<Link key={guide.label} href={guide.value} className="py-1 text-xs">
										{guide.label}
									</Link>
								))}
							</div>
							<div className="flex flex-col text-[hsl(14.2deg,70.71%,53.14%)] dark:text-[hsl(210.5deg,68.97%,65.88%)]">
								<h2 className="border-b border-[hsl(14.2deg,70.71%,53.14%)] dark:border-[hsl(210.5deg,68.97%,65.88%)]/40 py-1 mb-2">
									OTHER
								</h2>
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
