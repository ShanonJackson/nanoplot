import { Navigation } from "../../components/Navigation/Navigation";
import { NavigationHeader } from "../../components/Navigation/NavigationHeader";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Figtree } from "next/font/google";
import { cx } from "../../utils/cx/cx";
import "../globals.css";

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
		<>
			<body
				data-theme={theme}
				className={cx(
					theme,
					"h-full w-full sm:overflow-unset bg-[hsl(0deg,0%,100%)] dark:bg-[hsl(210deg,22.22%,10.59%)] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200",
				)}
			>
				<div className={"flex w-full h-auto sm:overflow-unset"}>
					<Navigation />
					<div className={"w-full flex flex-col"}>
						<NavigationHeader />
						<div
							className={"md:h-[94vh] max-h-screen grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr] mx-2 md:mx-0 md:p-3 pt-3"}
						>
							{children}
						</div>
					</div>
				</div>
			</body>
		</>
	);
}
