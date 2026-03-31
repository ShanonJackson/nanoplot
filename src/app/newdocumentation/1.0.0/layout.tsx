import type { Metadata } from "next";
import { DocumentationHeader } from "../../../components/Documentation/DocumentationHeader/DocumentationHeader";
import { cookies } from "next/headers";
import { cx } from "../../../utils/cx/cx";
import "../../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { NewDocumentationNavigation } from "../components/Navigation";

export const metadata: Metadata = {
	title: "Nanoplot - Documentation",
	description: "Modern data visualization for the next generation of applications.",
};

export default async function NewDocLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await cookies().then((c) => c.get("theme")?.value ?? "dark");

	return (
		<div
			data-theme={theme}
			className={cx(
				theme,
				"h-full w-full bg-[hsl(0deg,0%,100%)] dark:bg-[#0a0a0f] text-[hsl(0deg,0%,0%)] dark:text-[hsl(0deg,0%,100%)] transition-colors duration-200",
			)}
		>
			<Analytics />
			<DocumentationHeader />
			<div className={"flex"}>
				<NewDocumentationNavigation />
				<div className={"w-full relative"}>
					<div className="lg:hidden h-12" />
					{children}
				</div>
			</div>
		</div>
	);
}
