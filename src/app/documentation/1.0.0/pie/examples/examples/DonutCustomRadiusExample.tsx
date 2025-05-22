export const DonutRadiusExample = `
import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-5"}>
			<Graph
				data={[
					{
						name: "elixir",
						value: 333,
					},
					{
						name: "stylus",
						value: 257,
					},
					{
						name: "css",
						value: 30,
					},
					{
						name: "haskell",
						value: 192,
					},
					{
						name: "python",
						value: 283,
					},
				]}
			>
				<Pie donut={25} />
			</Graph>
		</div>
	);
};
`;
