"use client";
import { ComponentProps, useState } from "react";
import { Lines } from "../../../components/Lines/Lines";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { LinesControlGroup } from "../../../components/ControlGroup/LinesControlGroup/LinesControlGroup";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { LinesTimeslotExample, LinesTimeslotExampleCode } from "./components/LinesTimeslotExample";
import { Graph } from "../../../components/Graph/Graph";
import { LinesSiteTraffic, LinesSiteTrafficCode } from "./components/LinesSiteTraffic";
import { LinesSiteTrafficPinned, LinesSiteTrafficPinnedCode } from "./components/LinesSiteTrafficPinned";
import { TimeSeriesCustomTooltipExample, TimeSeriesCustomTooltipExampleCode } from "./components/TimeSeriesCustomTooltipExample";
import { LinesGradientMaskExample, LinesGradientMaskExampleCode } from "./components/LinesGradientMaskExample";
import { LinesPredictionExample, LinesPredictionExampleCode } from "./components/LinesPredictionExample";
import { ZoomSlider } from "../../../components/ZoomSlider/ZoomSlider";
import { Area } from "../../../components/Area/Area";
import { overlay } from "../../../components/Overlay/Overlay";

const roundDownToNearest = (num: number, nearest: number) => {
	return nearest > 0 ? Math.floor(num / nearest) * nearest : Math.ceil(num / nearest) * nearest;
};
export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({ curve: "linear", joints: true });
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });

	const [hovered, setHovered] = useState<string[]>([]);
	const [pinned, setPinned] = useState<string[]>([]);
	const [zoom, setZoom] = useState<{ x: [number, number]; y: [number, number] }>({ x: [0, 100], y: [0, 100] });
	const data = [
		{
			name: "Competitive Rating",
			stroke: "#316ff2",
			fill: "linear-gradient(to bottom, #316ff2 0%, transparent 100%)",
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
	console.log({ eachUniqueNewLevel });
	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LinesControlGroup state={line} onChange={setLine} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel className={"bg-[#191937]"}>
				<Graph data={data} gap={{ top: 30, left: 30, right: 30, bottom: 30 }}>
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
							return `${x.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][x.getMonth()]}`;
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
