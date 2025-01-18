import { FC, ComponentProps } from "react";
import { Pie } from "@/components/Pie/Pie";
import { Graph } from "@/components/Graph/Graph";
import { Legend } from "@/components/Legend/Legend";

type Pie = ComponentProps<typeof Pie>;
type Props = {
	data: Array<{ name: string; value: number }>;
	state: Pie;
};

export const PieGraphPanel: FC<Props> = ({ data, state }) => {
	return (
		<>
			<div
				className={
					"border-[1px] h-full border-dotted border-[hsl(0deg,0%,0%)] dark:border-[hsl(0deg,0%,100%)] overflow-hidden resize"
				}
			>
				<Graph data={data}>
					<Legend position={"top"} alignment={"center"} />
					<Pie {...state}>{state.children && <div dangerouslySetInnerHTML={{ __html: state.children.toString() ?? "" }} />}</Pie>
				</Graph>
			</div>
		</>
	);
};
