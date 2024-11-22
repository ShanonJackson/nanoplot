import { PieGraph } from "@/components/PieGraph/PieGraph";

export default function Page() {
	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
			<div style={{ width: 800, height: 800, resize: "both", overflow: "hidden", border: "1px dotted black" }}>
				<PieGraph
					data={MOCK_DATA.map((dp) => {
						return {
							name: dp.label,
							value: dp.value,
							fill: dp.color,
						};
					})}
					donut={false}
				/>
			</div>
		</div>
	);
}

const MOCK_DATA = [
	{
		id: "python",
		label: "python",
		value: 283,
		color: "hsl(359, 70%, 50%)",
	},
	{
		id: "elixir",
		label: "elixir",
		value: 333,
		color: "hsl(253, 70%, 50%)",
	},
	{
		id: "stylus",
		label: "stylus",
		value: 257,
		color: "hsl(352, 70%, 50%)",
	},
	{
		id: "css",
		label: "css",
		value: 30,
		color: "hsl(31, 70%, 50%)",
	},
	{
		id: "haskell",
		label: "haskell",
		value: 192,
		color: "hsl(209, 70%, 50%)",
	},
];
