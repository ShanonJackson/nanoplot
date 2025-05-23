"use client";
import Link from "next/link";
import { useState } from "react";
import { Href, Routes } from "../../../utils/routes/routes";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";
import { NavToggle } from "../../NavToggle/NavToggle";

export const DocumentationHeader = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900 dark:border-gray-800">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">D</span>
						<span className="font-bold text-xl hidden sm:inline-block text-gray-900 dark:text-white">Docs</span>
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<ThemeToggle />
					<NavToggle />
				</div>
			</div>
		</header>
	);
};
