import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Navigation } from "../components/Navigation/Navigation";
import { NavigationHeader } from "../components/Navigation/NavigationHeader";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cx } from "../utils/cx/cx";

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
	const theme = await cookies().then((c) => c.get("theme")?.value ?? "dark");
	return (
		<html lang="en" data-theme={theme}>
			<body
				data-theme={theme}
				className={cx(
					theme,
					figtree.className,
					"nanoplot h-full w-full sm:overflow-unset bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200",
				)}
			>
				{children}
			</body>
		</html>
	);
}
