import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <div className={"md:h-[calc(100vh-65px)] max-h-screen grid md:grid-rows-2 md:grid-cols-[400px_1fr] "}>{children}</div>;
}

