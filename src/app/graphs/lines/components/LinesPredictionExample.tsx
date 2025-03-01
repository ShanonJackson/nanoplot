import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesPredictionExample = () => {
	const data = [
		{
			name: "Website Users",
			data: [
				{ x: new Date(2019, 0, 1, 0, 0, 0, 0), y: 1186945 },
				{ x: new Date(2020, 0, 1, 0, 0, 0, 0), y: 1827148 },
				{ x: new Date(2021, 0, 1, 0, 0, 0, 0), y: 2591740 },
				{ x: new Date(2022, 0, 1, 0, 0, 0, 0), y: 3393396 },
				{ x: new Date(2023, 0, 1, 0, 0, 0, 0), y: 4252605 },
				{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 5249076 },
				{ x: new Date(2025, 0, 1, 0, 0, 0, 0), y: 6029551 },
				{ x: new Date(2026, 0, 1, 0, 0, 0, 0), y: 7143810 },
				{ x: new Date(2027, 0, 1, 0, 0, 0, 0), y: 8524799 },
				{ x: new Date(2028, 0, 1, 0, 0, 0, 0), y: 9919216 },
				{ x: new Date(2029, 0, 1, 0, 0, 0, 0), y: 11196156 },
			],
			stroke: `linear-gradient(to right, rgb(51, 212, 255) 0%, rgb(51, 212, 255) ${new Date(2023, 0, 1, 0, 0, 0, 0).getTime()}, rgb(211, 211, 211) ${new Date(2023, 0, 1, 0, 0, 0, 0).getTime() + 1}, rgb(211, 211, 211))`,
		},
	];
	return (
		<Graph data={data} gap={{ top: 15, right: 20 }}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "every 1 years" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return `${x.getFullYear()}`;
				}}
			/>
		</Graph>
	);
};

export const LinesPredictionExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesPredictionExample = () => {
	const data = [
		{
			name: "Website Users",
			data: [
				{ x: new Date(2019, 0, 1, 0, 0, 0, 0), y: 1186945 },
				{ x: new Date(2020, 0, 1, 0, 0, 0, 0), y: 1827148 },
				{ x: new Date(2021, 0, 1, 0, 0, 0, 0), y: 2591740 },
				{ x: new Date(2022, 0, 1, 0, 0, 0, 0), y: 3393396 },
				{ x: new Date(2023, 0, 1, 0, 0, 0, 0), y: 4252605 },
				{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 5249076 },
				{ x: new Date(2025, 0, 1, 0, 0, 0, 0), y: 6029551 },
				{ x: new Date(2026, 0, 1, 0, 0, 0, 0), y: 7143810 },
				{ x: new Date(2027, 0, 1, 0, 0, 0, 0), y: 8524799 },
				{ x: new Date(2028, 0, 1, 0, 0, 0, 0), y: 9919216 },
				{ x: new Date(2029, 0, 1, 0, 0, 0, 0), y: 11196156 },
			],
			stroke: \`linear-gradient(to right, rgb(51, 212, 255) 0%, rgb(51, 212, 255) \${new Date(2023, 0, 1, 0, 0, 0, 0).getTime()}, rgb(211, 211, 211) \${new Date(2023, 0, 1, 0, 0, 0, 0).getTime() + 1}, rgb(211, 211, 211))\`,
		},
	];
	return (
		<Graph data={data}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "every 1 years" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return \`\${x.getFullYear()}\`;
				}}
			/>
		</Graph>
	);
};
`;
