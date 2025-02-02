import { Graph } from "nanoplot/Graph";
import { overlay } from "nanoplot/Overlay";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesTimeslotExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 10, bottom: 10 }}
			data={[
				{
					name: "Cars",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
					],
				},
			]}
		>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<overlay.rect
				x1={new Date(2024, 3, 1, 0, 0, 0, 0)}
				x2={new Date(2024, 4, 1, 0, 0, 0, 0)}
				y1={50}
				y2={0}
				className={"bg-green-400/70 text-black text-xs py-4 rounded"}
			>
				<div className="transform -rotate-180 text-white text-xs py-4" style={{ writingMode: "vertical-rl" }}>
					TRAFFIC BLOCKED
				</div>
			</overlay.rect>
			<XAxis
				ticks={{ jumps: "every 1 months" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
				}}
			/>
		</Graph>
	);
};

export const LinesTimeslotExampleCode = `
import { Graph } from "nanoplot/Graph";
import { overlay } from "nanoplot/Overlay";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesTimeslotExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 10, bottom: 10 }}
			data={[
				{
					name: "Josh - Hours gamed",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
					],
				},
			]}
		>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<overlay.rect
				x1={new Date(2024, 3, 1, 0, 0, 0, 0)}
				x2={new Date(2024, 4, 1, 0, 0, 0, 0)}
				y1={50}
				y2={0}
				className={"bg-green-400/70 text-black text-xs py-4 rounded"}
			>
				<div className="transform -rotate-180 text-white text-xs py-4" style={{ writingMode: "vertical-rl" }}>
					TRAFFIC BLOCKED
				</div>
			</overlay.rect>
			<XAxis
				ticks={{ jumps: "every 1 months" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return \`\${x.getFullYear()}-\${x.getMonth() + 1}-\${x.getDate()}\`;
				}}
			/>
		</Graph>
	);
};
`;
