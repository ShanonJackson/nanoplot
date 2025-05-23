import type { Metadata } from "next";
import { DocumentationHeader } from "../../../components/Documentation/DocumentationHeader/DocumentationHeader";
import { DocumentationNavigation } from "../../../components/Documentation/DocumentationNavigation/DocumentationNavigation";

export const metadata: Metadata = {
	title: "Nanoplot",
	description: "Modern data visualization for the next generation of applications.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<DocumentationHeader />
			<div className={"flex"}>
				<DocumentationNavigation />
				<div className={"w-full"}>{children}</div>
			</div>
		</div>
	);
}
