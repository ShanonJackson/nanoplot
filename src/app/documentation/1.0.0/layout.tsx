import type { Metadata } from "next";
import { DocumentationHeader } from "../../../components/Documentation/DocumentationHeader/DocumentationHeader";
import { DocumentationNavigation } from "../../../components/Documentation/DocumentationNavigation/DocumentationNavigation";
import { cookies } from "next/headers";
import { cx } from "../../../utils/cx/cx";
import "../../globals.css";
import { Analytics } from "@vercel/analytics/next";

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
				<Analytics />
				<div>
					<DocumentationHeader />
					<div className={"flex"}>
						<DocumentationNavigation />
						<div className={"w-full"}>{children}</div>
					</div>
				</div>
			</body>
		</>
	);
}
