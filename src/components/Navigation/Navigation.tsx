"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cx } from "../../utils/cx/cx";
import { Href, Routes } from "../../utils/routes/routes";

type Props = {};

export const Navigation = ({}: Props) => {
	const path = usePathname();
	const isHome = path === Href.HOME;
	return (
		<aside className={"h-screen min-w-[4.5rem] overflow-y-auto p-2 hidden lg:flex flex-col items-center gap-6"}>
			{Routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cx(
						"hover:[&>svg]:scale-110",
						!isHome && "hover:[&>svg]:opacity-60",
						path === route.href || isHome ? "[&_svg]:opacity-100" : "[&>svg]:opacity-30",
					)}
				>
					<route.icon className="w-8 h-8" />
				</Link>
			))}
		</aside>
	);
};
