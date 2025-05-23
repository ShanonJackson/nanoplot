export const LinesLegendInteractions = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
	const [ hovered, setHovered ] = useState([]);
	const [ pinned, setPinned ] = useState([]);
	return (
		<div className={"h-[350px] w-[100%] m-auto p-10"}>
			<Graph
				interactions={{ hovered, pinned }}
				data={[
					{
						name: "New Users",
						stroke: "#FF4B4B",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 100 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
						],
					},
					{
						name: "Registered Users",
						stroke: "#33D4FF",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 45 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 60 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 55 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 70 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 70 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 75 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 60 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 55 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 80 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 85 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 80 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 82 },
						],
					},
				]}
			>
				<Legend
					alignment={"end"}
					position={"top"}
					onClick={(dp) => {
						setPinned((p) => {
							if (p.includes(dp.id)) return p.filter((pin) => pin !== dp.id);
							return [...p, dp.id];
						});
					}}
					onMouseEnter={(dp) => {
						setHovered((h) => {
							if (h.includes(dp.id)) return h.filter((hov) => hov !== dp.id);
							return [...h, dp.id];
						});
					}}
					onMouseLeave={(dp) => {
						setHovered((h) => h.filter((hov) => hov !== dp.id));
					}}
				/>
				<YAxis />
				<GridLines />
				<Lines curve={"natural"} />
				<Lines.Tooltip />
				<XAxis
					ticks={{ jumps: "P1M" }}
					display={(x) => {
						const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						if (typeof x === "number" || typeof x === "string") return null;
						return months[x.getMonth()];
					}}
				/>
			</Graph>
		</div>
	)
}
`;
