export const LinesWithZoomAndPan = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { ZoomSlider } from "nanoplot/ZoomSlider";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
	const [ zoom, setZoom ] = useState({x: [0, 100], y: [0, 100]});
	return (
		<div className={"h-[350px] w-[100%] m-auto p-10"}>
			<Graph
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
				zoom={zoom}
			>
				<ZoomSlider.X onChange={setZoom}/>
				<Legend alignment={"end"} position={"top"} />
				<YAxis />
				<GridLines />
				<Lines curve={"natural"} />
				<Lines.Tooltip />
				<ZoomSlider.Y onChange={setZoom}/>
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
