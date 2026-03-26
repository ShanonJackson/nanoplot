import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

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
