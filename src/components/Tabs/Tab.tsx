import React, { ReactNode } from "react";
import { useTabsContext } from "./tabs-context";
import { cx } from "@/utils/cx/cx";

interface TabProps {
	id: string;
	icon: ReactNode;
	children: React.ReactNode;
}

export const Tab = ({ id, icon, children }: TabProps) => {
	const { activeTab, onTabClick } = useTabsContext();
	return (
		<div
			onClick={() => onTabClick(id)}
			className={cx(`flex p-2 text-slate-400 hover:text-black cursor-pointer`, activeTab === id && "bg-white")}
		>
			<div className={"shrink-0"}>{icon}</div>
			{children}
		</div>
	);
};
