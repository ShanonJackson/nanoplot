import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Figtree } from "next/font/google";
import { cx } from "../utils/cx/cx";
import GettingStarted from "../app/documentation/1.0.0/getting-started/page";
import "./globals.css";
import { DocumentationHeader } from "../components/Documentation/DocumentationHeader/DocumentationHeader";
import { DocumentationNavigation } from "../components/Documentation/DocumentationNavigation/DocumentationNavigation";

const figtree = Figtree({
	subsets: ["latin"], // Supports Latin characters
	weight: ["400", "700"], // Normal & Bold weights
	display: "swap", // Improves rendering
});

export const metadata: Metadata = {
	title: "Nanoplot",
	description: "Modern data visualization for the next generation of applications.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={figtree.className}>
			{children}
		</html>
	);
}
