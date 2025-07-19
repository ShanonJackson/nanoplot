export const BarsWithMaskExample = `
import { Bars } from "nanoplot/Bars";
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-10"}>
			<Graph
				data={[
					{
						name: "Male",
						fill: "mask:linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
						data: [
							{ x: "Jan", y: 5_000 },
							{ x: "Feb", y: 20_000 },
							{ x: "Mar", y: 45_000 },
							{ x: "Apr", y: 20_000 },
						],
					},
					{
						name: "Female",
						fill: "mask:linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
						data: [
							{ x: "Jan", y: 45_000 },
							{ x: "Feb", y: 10_000 },
							{ x: "Mar", y: 15_000 },
							{ x: "Apr", y: 30_000 },
						],
					},
				]}
			>
					<Legend position={"top"} />
					<YAxis/>
					<GridLines />
					<Bars
						horizontal={false}
						labels={{
							position: "above",
							collision: true,
							display: (v) => {
								return new Intl.NumberFormat("en", {
									notation: "compact",
									compactDisplay: "short",
									maximumFractionDigits: 2,
								}).format(Number(v.data.y));
							},
						}}
					/>
					<XAxis/>
			</Graph>
		</div>
	);
};
`;
