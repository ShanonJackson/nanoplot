import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export const PieCollisionExample = () => {
	const data = [
		{ name: "B", value: 1 },
		{ name: "C", value: 1 },
		{ name: "D", value: 1 },
		{ name: "E", value: 1 },
		{ name: "F", value: 1 },
		{ name: "G", value: 1 },
		{ name: "H", value: 1 },
		{ name: "I", value: 1 },
		{ name: "A", value: 90 },
	];
	return (
		<Graph data={data}>
			<Pie />
		</Graph>
	);
};

export const PieCollisionExampleCode = `
import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export const PieCollisionExample = () => {
	const data = [
		{ name: "A", value: 90 },
		{ name: "B", value: 1 },
		{ name: "C", value: 1 },
		{ name: "D", value: 1 },
		{ name: "E", value: 1 },
		{ name: "F", value: 1 },
		{ name: "G", value: 1 },
		{ name: "H", value: 1 },
		{ name: "I", value: 1 },
		{ name: "J", value: 1 },
	];
	return (
		<Graph data={data}>
			<Pie />
		</Graph>
	);
};
`;
