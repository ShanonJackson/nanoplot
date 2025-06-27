import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "../globals.css";
import { cx } from "../../utils/cx/cx";

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
		<html lang="en">
			<body
				className={cx(
					figtree.className,
					"nanoplot h-full w-full sm:overflow-unset bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200",
				)}
			>
				{children}
			</body>
		</html>
	);
}
