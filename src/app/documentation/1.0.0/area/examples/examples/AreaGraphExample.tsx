export const AreaGraphExample = `
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { Area } from "nanoplot/Area";
import { XAxis } from "nanoplot/XAxis";
import "nanoplot/styles.css";

export default () => {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Downtown",
						data: [
							{ x: new Date(2025, 0, 1, 0, 0, 0, 0), y: 40 },
							{ x: new Date(2025, 0, 3, 0, 0, 0, 0), y: 52 },
							{ x: new Date(2025, 0, 5, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2025, 0, 7, 0, 0, 0, 0), y: 22 },
							{ x: new Date(2025, 0, 9, 0, 0, 0, 0), y: 63 },
							{ x: new Date(2025, 0, 11, 0, 0, 0, 0), y: 40 },
							{ x: new Date(2025, 0, 13, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2025, 0, 15, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2025, 0, 17, 0, 0, 0, 0), y: 43 },
							{ x: new Date(2025, 0, 19, 0, 0, 0, 0), y: 54 },
							{ x: new Date(2025, 0, 21, 0, 0, 0, 0), y: 35 },
							{ x: new Date(2025, 0, 23, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2025, 0, 25, 0, 0, 0, 0), y: 52 },
							{ x: new Date(2025, 0, 27, 0, 0, 0, 0), y: 40 },
							{ x: new Date(2025, 0, 29, 0, 0, 0, 0), y: 52 },
							{ x: new Date(2025, 0, 31, 0, 0, 0, 0), y: 46 },
						],
						fill: 'rgba(227, 178, 209, 1)',
					},
					{
						name: "North Region",
						data: [
							{ x: new Date(2025, 0, 1, 0, 0, 0, 0), y: 30 },
							{ x: new Date(2025, 0, 3, 0, 0, 0, 0), y: 21 },
							{ x: new Date(2025, 0, 5, 0, 0, 0, 0), y: 22 },
							{ x: new Date(2025, 0, 7, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2025, 0, 9, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2025, 0, 11, 0, 0, 0, 0), y: 47 },
							{ x: new Date(2025, 0, 13, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2025, 0, 15, 0, 0, 0, 0), y: 32 },
							{ x: new Date(2025, 0, 17, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2025, 0, 19, 0, 0, 0, 0), y: 34 },
							{ x: new Date(2025, 0, 21, 0, 0, 0, 0), y: 31 },
							{ x: new Date(2025, 0, 23, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2025, 0, 25, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2025, 0, 27, 0, 0, 0, 0), y: 40 },
							{ x: new Date(2025, 0, 29, 0, 0, 0, 0), y: 52 },
							{ x: new Date(2025, 0, 31, 0, 0, 0, 0), y: 30 },
						],
						fill: 'rgba(181, 81, 157, 0.75)',
					},
					{
						name: "Central City",
						data: [
							{ x: new Date(2025, 0, 1, 0, 0, 0, 0), y: 24 },
							{ x: new Date(2025, 0, 5, 0, 0, 0, 0), y: 50 },
							{ x: new Date(2025, 0, 9, 0, 0, 0, 0), y: 22 },
							{ x: new Date(2025, 0, 11, 0, 0, 0, 0), y: 54 },
							{ x: new Date(2025, 0, 13, 0, 0, 0, 0), y: 20 },
							{ x: new Date(2025, 0, 15, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2025, 0, 17, 0, 0, 0, 0), y: 16 },
							{ x: new Date(2025, 0, 19, 0, 0, 0, 0), y: 34 },
							{ x: new Date(2025, 0, 21, 0, 0, 0, 0), y: 35 },
							{ x: new Date(2025, 0, 23, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2025, 0, 25, 0, 0, 0, 0), y: 15 },
							{ x: new Date(2025, 0, 27, 0, 0, 0, 0), y: 20 },
							{ x: new Date(2025, 0, 29, 0, 0, 0, 0), y: 21 },
							{ x: new Date(2025, 0, 31, 0, 0, 0, 0), y: 34 },
						],
						fill: 'rgba(83, 29, 204, 0.6)',
					},
				]}
			>
				<Legend position={"top"} alignment="{start}" />
				<Area />
				<Area.Tooltip className={"bg-white dark:!bg-black"} />
				<XAxis
					ticks={{ jumps: "P2D" }}
					display={(x) => {
						if (x instanceof Date) return x.getDate();
						return null;
					}}
				/>
			</Graph>
		</div>
	);
};
`;
