export const HorizontalBarsExample = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[450px] w-[100%] m-auto dark:bg-black p-10"}>
			<Graph
				data={[
					{
						name: "Male",
						data: [
							{ y: "Jan", x: 5_000 },
							{ y: "Feb", x: 20_000 },
							{ y: "Mar", x: 45_000 },
							{ y: "Apr", x: 20_000 },
						],
					},
					{
						name: "Female",
						data: [
							{ y: "Jan", x: 45_000 },
							{ y: "Feb", x: 10_000 },
							{ y: "Mar", x: 15_000 },
							{ y: "Apr", x: 30_000 },
						],
					},
				]}
			>
				<YAxis />
				<GridLines border vertical={true} horizontal={true} />
				<Bars horizontal labels={{ position: "center", display: (v) => v.data.x }} />
				<XAxis />
			</Graph>
		</div>
	);
};
`;
