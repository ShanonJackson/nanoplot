export const BarsPercentExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-5"}>
			<Graph
				data={[
					{
						name: "Male",
						group: "gender",
						data: [
							{ x: "Jan", y: 10 },
							{ x: "Feb", y: 70 },
							{ x: "Mar", y: 80 },
							{ x: "Apr", y: 50 },
						],
					},
					{
						name: "Female",
						group: "gender",
						data: [
							{ x: "Jan", y: 90 },
							{ x: "Feb", y: 30 },
							{ x: "Mar", y: 20 },
							{ x: "Apr", y: 50 },
						],
					},
					{
						name: "Younger",
						group: "generation",
						data: [
							{ x: "Jan", y: 33.33 },
							{ x: "Feb", y: 33.33 },
							{ x: "Mar", y: 33.33 },
							{ x: "Apr", y: 33.33 },
						],
					},
					{
						name: "Middle aged",
						group: "generation",
						data: [
							{ x: "Jan", y: 33.33 },
							{ x: "Feb", y: 33.33 },
							{ x: "Mar", y: 33.33 },
							{ x: "Apr", y: 33.33 },
						],
					},
					{
						name: "Older",
						group: "generation",
						data: [
							{ x: "Jan", y: 33.33 },
							{ x: "Feb", y: 33.33 },
							{ x: "Mar", y: 33.33 },
							{ x: "Apr", y: 33.33 },
						],
					},
				]}
			>
				<YAxis ticks={{ to: 100 }} display={(y) => \`\${y}%\`} />
				<GridLines />
				<Bars labels={(y) => Math.round(y) + "%"} />
				<XAxis />
			</Graph>
		</div>
	);
};
`;
