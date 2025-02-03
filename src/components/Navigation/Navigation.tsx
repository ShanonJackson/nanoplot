"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cx } from "../../utils/cx/cx";
import { Routes } from "../../utils/routes/routes";

type Props = {};

export const Navigation = ({}: Props) => {
	const path = usePathname();
	return (
		<aside className={"h-screen min-w-[4.5rem] overflow-y-auto p-2 hidden lg:flex flex-col items-center gap-6"}>
			<Link href={"/public"}>
				<Image src={"/nanoplot_logo.jpg"} height={36} width={36} alt={"Logo"} className={"rounded-full"} />
			</Link>

			{Routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cx(
						"hover:[&>svg]:opacity-60 hover:[&>svg]:scale-110",
						path === route.href ? "[&_svg]:opacity-100" : "[&>svg]:opacity-30",
					)}
				>
					<route.icon className="w-8 h-8" />
				</Link>
			))}
		</aside>
	);
};
