import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export const DonutRadiusExample = () => {
	const data = [
		{
			name: "elixir",
			value: 333,
		},
		{
			name: "stylus",
			value: 257,
		},
		{
			name: "css",
			value: 30,
		},
		{
			name: "haskell",
			value: 192,
		},
		{
			name: "python",
			value: 283,
		},
	];
	return (
		<Graph data={data}>
			<Pie donut={25} />
		</Graph>
	);
};

export const DonutRadiusExampleCode = `
import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export const PieCollisionExample = () => {
	const data = [
		{
			name: "elixir",
			value: 333,
		},
		{
			name: "stylus",
			value: 257,
		},
		{
			name: "css",
			value: 30,
		},
		{
			name: "haskell",
			value: 192,
		},
		{
			name: "python",
			value: 283,
		},
	];
	return (
		<Graph data={data}>
			<Pie donut={25} />
		</Graph>
	);
};
`;
