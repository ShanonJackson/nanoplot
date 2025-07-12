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
import NumberFlow from "@number-flow/react";
import { cx } from "../../../utils/cx/cx";

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
	];
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
			<GraphPanel className={"bg-[#191937] p-4"}>
				<Graph
					gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
					interactions={{ hovered, pinned }}
					zoom={zoom}
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
					<ZoomSlider.X onChange={setZoom} />
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
					<GridLines border vertical horizontal />
					<Lines curve={"natural"} joints />
					<Lines.Tooltip />
					<ZoomSlider.Y onChange={setZoom} />
					<XAxis
						ticks={{ from: "min", to: "max", jumps: "P2M" }}
						display={(x) => {
							const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
							if (typeof x === "number" || typeof x === "string") return null;
							return months[x.getMonth()];
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
