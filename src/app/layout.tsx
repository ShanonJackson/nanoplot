import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import HeaderPage from "@/components/layout/Header-page";
import "./globals.css";
import { cookies } from "next/headers";
import { Graph } from "@/components/Graph/Graph";
import { Legend } from "@/components/Legend/Legend";
import { YAxis } from "@/components/YAxis/YAxis";
import { GridLines } from "@/components/GridLines/GridLines";
import { Lines } from "@/components/Lines/Lines";
import { XAxis } from "@/components/XAxis/XAxis";

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
				className={
					theme +
					" h-full w-full md:overflow-hidden sm:overflow-unset bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200"
				}
			>
				<div className={"flex w-screen h-auto md:overflow-hidden  sm:overflow-unset"}>
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

const MOCK_DATA = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: new Date("2024-01-05"), y: 20 },
			{ x: new Date("2024-02-10"), y: 40 },
			{ x: new Date("2024-03-11"), y: 30 },
			{ x: new Date("2024-04-15"), y: 50 },
			{ x: new Date("2024-05-20"), y: 36 },
			{ x: new Date("2024-06-25"), y: 60 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: new Date("2024-01-08"), y: 5.25 },
			{ x: new Date("2024-02-15"), y: 10 },
			{ x: new Date("2024-03-20"), y: 25.4 },
			{ x: new Date("2024-04-05"), y: 36 },
			{ x: new Date("2024-05-10"), y: 40 },
			{ x: new Date("2024-06-18"), y: 35 },
		],
	},
];
