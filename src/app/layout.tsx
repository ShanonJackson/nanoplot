import type { Metadata } from "next";
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
			<body>{children}</body>
		</html>
	);
}
