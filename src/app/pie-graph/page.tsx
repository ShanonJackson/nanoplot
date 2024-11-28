import { PieGraph } from "@/components/PieGraph/PieGraph";
import { Graph } from "@/components/Graph/Graph";

export default function Page() {
	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
			<div style={{ width: 800, height: 800, resize: "both", overflow: "hidden", border: "1px dotted black" }}>
				<Graph data={MOCK_DATA}>
					<PieGraph loading={false} donut={false} />
				</Graph>
			</div>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "python python python python python",
		value: 283,
	},
	{
		name: "elixir",
		value: 333,
	},
	{
		name: "stylus stylus stylus stylus stylus stylus",
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
];
