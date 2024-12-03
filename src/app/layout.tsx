import type { Metadata } from "next";
import { Navigation } from "@/components/Docs/Navigation/Navigation";
import HeaderPage from "@/components/layout/Header-page";
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
		<html lang="en" data-theme="light">
			<body>
				<div className={"grid grid-cols-[min-content_minmax(0,1fr)] min-h-screen"}>
					<Navigation />
					<div className="flex flex-col gap-4">
						<HeaderPage />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
