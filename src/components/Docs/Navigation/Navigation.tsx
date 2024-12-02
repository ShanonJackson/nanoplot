import Link from "next/link";
import { Routes } from "@/utils/routes/routes";

type Props = {};

export const Navigation = ({}: Props) => {
	return (
		<aside className={"h-full"}>
			<div>LOGO</div>
			<Link href={Routes.WORLDMAP}>
				<div>WORLDMAP</div>
			</Link>
			<Link href={Routes.PIE_GRAPH}>
				<div>PIE</div>
			</Link>
		</aside>
	);
};
