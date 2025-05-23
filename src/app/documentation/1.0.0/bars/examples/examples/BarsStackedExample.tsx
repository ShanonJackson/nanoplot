export const BarsStackedExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-10"}>
			<Graph
				data={[
					{
						name: "Male",
						group: "gender",
						data: [
							{ x: "Jan", y: 5_000 },
							{ x: "Feb", y: 20_000 },
							{ x: "Mar", y: 45_000 },
							{ x: "Apr", y: 20_000 },
						],
					},
					{
						name: "Female",
						group: "gender",
						data: [
							{ x: "Jan", y: 45_000 },
							{ x: "Feb", y: 10_000 },
							{ x: "Mar", y: 15_000 },
							{ x: "Apr", y: 30_000 },
						],
					},
					{
						name: "Younger",
						group: "generation",
						data: [
							{ x: "Jan", y: 5500 },
							{ x: "Feb", y: 10_000 },
							{ x: "Mar", y: 10_000 },
							{ x: "Apr", y: 10_000 },
						],
					},
					{
						name: "Middle aged",
						group: "generation",
						data: [
							{ x: "Jan", y: 40_000 },
							{ x: "Feb", y: 40_000 },
							{ x: "Mar", y: 40_000 },
							{ x: "Apr", y: 40_000 },
						],
					},
					{
						name: "Older",
						group: "generation",
						data: [
							{ x: "Jan", y: 50_000 },
							{ x: "Feb", y: 50_000 },
							{ x: "Mar", y: 50_000 },
							{ x: "Apr", y: 50_000 },
						],
					},
				]}
			>
				<YAxis />
				<GridLines border horizontal />
				<Bars />
				<XAxis />
			</Graph>
		</div>
	);
};
`;
