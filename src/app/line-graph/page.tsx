"use client";
import { Lines } from "@/components/Lines/Lines";
import { Legend } from "@/components/Legend/Legend";
import { GridLines } from "@/components/GridLines/GridLines";
import { LegendControlGroup } from "@/components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { ComponentProps, useState } from "react";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { Graph } from "@/components/Graph/Graph";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";
import { XAxisControlGroup } from "@/components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "@/components/ControlGroup/YAxisControGroup/YAxisControlGroup";

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph data={MOCK_DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
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
					<Lines />
					<Lines.Tooltip tooltip={(_, x) => `${x}`} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						ticks={{ jumps: "every 1 months" }}
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							xaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
						display={(x) => `${x.getFullYear()}/${x.getMonth() + 1}/${x.getDate()}`}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: new Date("2024-01-05"), y: 20 },
			{ x: new Date("2024-02-10"), y: 40 },
			{ x: new Date("2024-03-11"), y: 30 },
			{ x: new Date("2024-04-15"), y: 50 },
			{ x: new Date("2024-05-20"), y: 36 },
			{ x: new Date("2024-06-25"), y: 60 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: new Date("2024-01-08"), y: 5.25 },
			{ x: new Date("2024-02-15"), y: 10 },
			{ x: new Date("2024-03-20"), y: 25.4 },
			{ x: new Date("2024-04-05"), y: 36 },
			{ x: new Date("2024-05-10"), y: 40 },
			{ x: new Date("2024-06-18"), y: 35 },
		],
	},
];
