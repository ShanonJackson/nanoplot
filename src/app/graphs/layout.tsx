import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <div className={"min-h-[100vh] max-h-screen grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr] mx-2 md:mx-0"}>{children}</div>;
}
