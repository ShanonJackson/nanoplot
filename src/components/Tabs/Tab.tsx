import React from "react";
import { useTabsContext } from "./tabs-context";
import Image from "next/image";
import { cx } from "../../utils/cx/cx";

interface TabProps {
	value: string;
	icon: string;
}

export function Tab({ value, icon }: TabProps) {
	const { active, onChange } = useTabsContext();

	return (
		<div className="group">
			<div
				onClick={() => onChange(value)}
				className={
					"flex items-center justify-center" +
					cx(`flex p-2 text-slate-400 hover:text-black cursor-pointer`, active === value && "bg-white")
				}
			>
				<div className={"shrink-0 px-2"}>
					<Image className="group-hover:hidden" src={`/assets/${icon}-inactive.png`} alt={""} width={24} height={24} />
					<Image className="hidden group-hover:block" src={`/assets/${icon}-active.png`} alt={""} width={24} height={24} />
				</div>
				{value}
			</div>
		</div>
	);
}
