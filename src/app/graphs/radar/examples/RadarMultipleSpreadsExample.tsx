import { Radar } from "nanoplot/Radar";
import { Graph } from "nanoplot/Graph";

export const RadarMultipleSpreadsExample = () => {
	return (
		<Graph gap={{ top: 30 }} data={MOCK_DATA}>
			<Radar />
		</Graph>
	);
};

const MOCK_DATA = [
	{
		name: "Jasons Progress",
		stroke: "#11ACAE",
		data: [
			{ x: "Fighting", y: 70 },
			{ x: "Farming", y: 8 },
			{ x: "Supporting", y: 300 },
			{ x: "Pushing", y: 90 },
			{ x: "Versatility", y: 60 },
		],
	},
	{
		name: "Alex's Progress",
		stroke: "#E63946",
		data: [
			{ x: "Fighting", y: 50 },
			{ x: "Farming", y: 95 },
			{ x: "Supporting", y: 60 },
			{ x: "Pushing", y: 50 },
			{ x: "Versatility", y: 90 },
		],
	},
];

export const RadarMultipleSpreadsExampleCode = `
import { Radar } from "nanoplot/Radar";
import { Graph } from "nanoplot/Graph";

export const RadarMultipleSpreadsExample = () => {
	return (
		<Graph gap={{ top: 30 }} data={MOCK_DATA}>
			<Radar />
		</Graph>
	);
};

const MOCK_DATA = [
	{
		name: "Jasons Progress",
		stroke: "#11ACAE",
		data: [
			{ x: "Fighting", y: 70 },
			{ x: "Farming", y: 8 },
			{ x: "Supporting", y: 300 },
			{ x: "Pushing", y: 90 },
			{ x: "Versatility", y: 60 },
		],
	},
	{
		name: "Alex's Progress",
		stroke: "#E63946",
		data: [
			{ x: "Fighting", y: 50 },
			{ x: "Farming", y: 95 },
			{ x: "Supporting", y: 60 },
			{ x: "Pushing", y: 50 },
			{ x: "Versatility", y: 90 },
		],
	},
];
`;
