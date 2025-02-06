import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <div className={"md:h-[94vh] max-h-screen grid md:grid-rows-2 gap-4 md:grid-cols-[400px_1fr] "}>{children}</div>;
}

