import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
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
				<div className={"flex w-screen h-screen overflow-hidden"}>
					<Navigation />
					<div className="flex-1 flex flex-col gap-4 overflow-hidden">
						<HeaderPage />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
