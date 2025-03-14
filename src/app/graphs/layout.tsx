import { ReactNode } from "react";
import { Navigation } from "../../components/Navigation/Navigation";
import { NavigationHeader } from "../../components/Navigation/NavigationHeader";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={"flex w-full h-auto sm:overflow-unset"}>
			<Navigation />
			<div className={"w-full flex flex-col"}>
				<NavigationHeader />
				<div className={"md:h-[94vh] max-h-screen grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr] mx-2 md:mx-0 md:p-3 pt-3"}>
					{children}
				</div>
			</div>
		</div>
	);
}
