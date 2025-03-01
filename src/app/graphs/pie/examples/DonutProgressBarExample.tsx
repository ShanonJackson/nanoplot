import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";

type Props = {};

export const DonutProgressBarExample = ({}: Props) => {
	return (
		<Graph
			data={[
				{
					name: "elixir",
					value: 90,
				},
			]}
		>
			<Pie labels={false} total={100} donut={25}>
				<div className="flex flex-col items-center justify-center">
					<span className="text-lg font-semibold leading-5">Filled</span>
					<div className="text-xl font-bold">
						<span className="text-violet-600 dark:text-violet-400">90</span>
						<span className="text-zinc-400 dark:text-zinc-600"> / 100</span>
					</div>
				</div>
			</Pie>
		</Graph>
	);
};

export const DonutProgressBarExampleCode = `
import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";

export const DonutProgressBarExample = () => {
	return (
		<Graph
			data={[
				{
					name: "elixir",
					value: 90,
				},
			]}
		>
			<Pie labels={false} total={100} donut={25}>
				<div className="flex flex-col items-center justify-center">
					<span className="text-lg font-semibold leading-5">Filled</span>
					<div className="text-xl font-bold">
						<span className="text-violet-600 dark:text-violet-400">90</span>
						<span className="text-zinc-400 dark:text-zinc-600"> / 100</span>
					</div>
				</div>
			</Pie>
		</Graph>
	);
};
`;
