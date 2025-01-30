"use client";
import { Lines } from "@/components/Lines/Lines";
import { Legend } from "@/components/Legend/Legend";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { GridLines } from "@/components/GridLines/GridLines";
import { Control } from "@/components/Docs/Control/Control";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import { LinesTooltip } from "@/components/Lines/components/LinesTooltip";
import { LegendControlGroup } from "@/components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { ComponentProps, useState } from "react";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { Graph } from "@/components/Graph/Graph";
import { overlay } from "@/components/Overlay/Overlay";
import { LinesControlGroup } from "@/components/ControlGroup/LinesControlGroup/LinesControlGroup";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { OverlayRect } from "../../components/Overlay/OverlayRect";
import { CalendarControl } from "../../components/Docs/Control/components/CalendarControl/CalendarControl";
import { XAxisControlGroup } from "@/components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { LineTimeslotExample } from "@/app/line-graph/components/LineTimeslotExample";
import { LinesTimeslotExample, LinesTimeslotExampleCode } from "@/app/line-graph/components/LinesTimeslotExample";

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [mark, setMark] = useState<ComponentProps<typeof OverlayRect>>({
		title: "",
		x1: new Date("2024-01-01"),
		x2: new Date("2024-02-01"),
		y1: 2550,
	});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});
	const setXAxisPartial = (partial: Partial<ComponentProps<typeof XAxis>>) => setXAxis((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LinesControlGroup state={line} onChange={setLine} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
			</ControlPanel>
			<GraphPanel examples={[{ name: "Lines timeslot", code: LinesTimeslotExampleCode, component: LinesTimeslotExample }]}>
				<Graph data={DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
					{legend.position === "top" && <Legend {...legend} />}
					{legend.position === "left" && <Legend {...legend} />}
					<YAxis
						{...yaxis}
						title={yaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />}
						description={
							yaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					<GridLines {...gridline} />
					<Lines {...line} />
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
					<Lines.Tooltip />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						ticks={{ jumps: "every 1 months" }}
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							xaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
						}}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</div>
	);
}

const DATA = [
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
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 5.25 },
			{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 10 },
			{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 25.4 },
			{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 36 },
			{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 40 },
			{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 35 },
		],
	},
];
