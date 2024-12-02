import type { Metadata } from "next";
import { Navigation } from "@/components/Docs/Navigation/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "Nanoplot",
	description: "Modern data visualization for the next generation of applications.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={"overflow-hidden"}>
				<div className={"grid grid-cols-[min-content_minmax(0,1fr)] min-h-screen"}>
					<Navigation />
					<div>{children}</div>
				</div>
			</body>
		</html>
	);
}
