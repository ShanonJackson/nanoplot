import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import HeaderPage from "@/components/layout/Header-page";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Nanoplot",
	description: "Modern data visualization for the next generation of applications.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await cookies().then((c) => c.get("theme")?.value ?? "light");

	return (
		<html lang="en" data-theme={theme}>
			<body data-theme={theme} className={theme + " h-full w-full overflow-hidden bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200"}>
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
