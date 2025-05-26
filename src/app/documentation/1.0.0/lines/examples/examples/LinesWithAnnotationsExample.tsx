export const LinesWithAnnotationsExample = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { overlay } from "nanoplot/Overlay";
import "nanoplot/styles.css";


const roundDownToNearest = (num: number, nearest: number) => {
	return nearest > 0 ? Math.floor(num / nearest) * nearest : Math.ceil(num / nearest) * nearest;
};
export default function App() {
	const data = [
		{
			name: "Competitive Rating",
			stroke: "#316ff2",
			fill: "linear-gradient(to bottom, rgba(49,111,242,0.5) 0%, rgba(49,111,242,0) 100%)",
			data: [
				{ x: 1747267200, y: 5035.43797916793, new_level: 21 },
				{ x: 1747353600, y: 5167.7744424106795, new_level: 22 },
				{ x: 1747699200, y: 5217.9121094837765, new_level: 23 },
				{ x: 1747785600, y: 5196.531665265145, new_level: 23 },
				{ x: 1747872000, y: 5230.115903859852, new_level: 23 },
				{ x: 1747958400, y: 5297.261800936303, new_level: 23 },
			].map(({ x, y, new_level }) => ({ x: new Date(x * 1000), y, new_level })),
		},
	];
	const eachUniqueNewLevel = data[0].data.filter((datapoint, i) => {
		return data[0].data.findIndex((dp) => dp.new_level === datapoint.new_level) === i;
	});
	return (
		<div className={"h-[350px] w-[100%] m-auto p-10 bg-[#191937] resize-both overflow-hidden"}>
			<Graph data={data}>
				<YAxis ticks={{ from: roundDownToNearest(Math.min(...data.flatMap((d) => d.data.map((xy) => xy.y))), 100) }} />
				<GridLines
					border
					className={{
						root: "[stroke-dasharray:4,4]",
						vertical: "[stroke:#316ff2]",
						horizontal: "[stroke:#316ff2]",
						border: {
							left: "[stroke:#316ff2] [stroke-dasharray:1,0] [stroke-width:2]",
							right: "[stroke:#316ff2]",
							top: "[stroke:#316ff2]",
							bottom: "[stroke:#316ff2] [stroke-dasharray:1,0] [stroke-width:2]",
						},
					}}
				/>
				<Lines curve="linear" joints={{ border: true }} />
				{eachUniqueNewLevel.map((datapoint) => {
					return (
						<overlay.div x={{ tick: datapoint.x }} y={{ tick: datapoint.y }} className="[transform:translate(-50%,-100%)]">
							<div className="flex flex-col items-center">
								<div
									className="w-8 h-8 rounded-full flex items-center justify-center"
									style={{ border: "2px solid #316ff2" }}
								></div>
								<div className="w-1 h-3" style={{ backgroundColor: "#316ff2", borderRadius: "2px" }} />
							</div>
						</overlay.div>
					);
				})}
				<Lines.Tooltip />
				<XAxis
					ticks={{ from: "auto - P1D", to: "auto + P1D", jumps: "P3D" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null;
						return \`\${x.getDate()} \${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][x.getMonth()]}\`;
					}}
				/>
			</Graph>
		</div>
	)
}

`;
