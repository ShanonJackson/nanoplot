import { ReactNode } from "react";

type Props = {
	name: string;
	type: string;
	required?: boolean;
	children: ReactNode;
};

export const Control = ({ name, type, required, children }: Props) => {
	return (
		<div className={"m-3"}>
			<div className={"flex items-center dark:text-white"}>
				<div className={"mr-1.5"}>{name}</div>
				<div className={"mr-1.5 text-gray-400"}>{type}</div>
				{required && <div className={"accent-red-500"}>Required</div>}
			</div>
			{children}
		</div>
	);
};
