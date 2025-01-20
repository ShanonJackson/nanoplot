"use client";
import { Graph } from "@/components/Graph/Graph";
import { ComponentProps, useState } from "react";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { Lines } from "@/components/Lines/Lines";
import { Legend } from "@/components/Legend/Legend";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { GridLines } from "@/components/GridLines/GridLines";
import { Control } from "@/components/Docs/Control/Control";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import { LinesTooltip } from "@/components/Lines/components/LinesTooltip";
import { LegendControlGroup } from "@/components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";
import { XAxisControlGroup } from "@/components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "@/components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { Bars } from "@/components/Bars/Bars";
import { BarLoading } from "@/components/Bars/components/BarLoading";

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Bars</h1>
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
					{legend.loading ? <BarLoading /> : <Bars />}
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							xaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
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
		name: "Sally hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 20 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 24 },
			{ x: "May", y: 31 },
			{ x: "Jun", y: 43 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 50 },
			{ x: "Feb", y: 50 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 24 },
			{ x: "May", y: 21 },
			{ x: "Jun", y: 33 },
		],
	},
	{
		name: "Sally hours gamed",
		group: "viewers",
		data: [
			{ x: "Jan", y: 40 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 43 },
			{ x: "Apr", y: 54 },
			{ x: "May", y: 51 },
			{ x: "Jun", y: 23 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "viewers",
		data: [
			{ x: "Jan", y: 30 },
			{ x: "Feb", y: 31 },
			{ x: "Mar", y: 53 },
			{ x: "Apr", y: 92 },
			{ x: "May", y: 41 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Sally hours gamed",
		group: "followers",
		data: [
			{ x: "Jan", y: 30 },
			{ x: "Feb", y: 41 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 54 },
			{ x: "May", y: 21 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "followers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "visitors",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
];
