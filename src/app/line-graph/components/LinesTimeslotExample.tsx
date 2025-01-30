import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import { overlay } from "nanoplot/Overlay";
import "nanoplot/styles.css";

export const LinesTimeslotExample = () => {
	return (
		<Graph>
			<Pie />
			<overlay.rect
				x1={new Date(2024, 3, 1, 0, 0, 0, 0)}
				x2={new Date(2024, 4, 1, 0, 0, 0, 0)}
				y1={50}
				y2={0}
				className={"bg-green-400/70 text-black text-xs py-4"}
			>
				<div className="transform -rotate-180 text-white text-xs py-4" style={{ writingMode: "vertical-rl" }}>
					TRAFFIC BLOCKED
				</div>
			</overlay.rect>
		</Graph>
	);
};

export const LinesTimeslotExampleCode = `
import {
	Pie
} from "nanoplot/Pie";
import {
	Graph
} from "nanoplot/Graph";
import "nanoplot/styles.css";

export const PieEmptyExample = () => {
	return (
		<Graph>
			<Pie />
		</Graph>
	);
};
`;
