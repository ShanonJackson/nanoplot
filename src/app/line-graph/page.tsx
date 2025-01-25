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
import { CodeBlock } from "@/components/CodeHighlighter/CodeHighlighter";
import { Tabs } from "@/components/Tabs/Tabs";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	const setXAxisPartial = (partial: Partial<ComponentProps<typeof XAxis>>) => setXAxis((prev) => ({ ...prev, ...partial }));
	const [tab, setTab] = useState("chart");

	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-white p-4 dark:bg-gray-800"}>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<ControlGroup title={"XAxis"}>
					<Control name={"title"} type={"ReactNode"}>
						<HTMLControl html={xaxis.title?.toString() ?? ""} onChange={(html) => setXAxisPartial({ title: html })} />
					</Control>
					<Control name={"description"} type={"ReactNode"}>
						<HTMLControl
							html={xaxis.description?.toString() ?? ""}
							onChange={(html) => setXAxisPartial({ description: html })}
						/>
					</Control>
				</ControlGroup>
			</div>
			<div className={"flex flex-col border-[1px] h-full border-dotted border-white overflow-hidden resize"}>
				<Tabs activeTab={tab} onTabChange={setTab}>
					<Tabs.Tab value="chart" icon="chart-icon" />
					<Tabs.Tab value="code" icon="code-icon" />
					<Tabs.Tab value="data" icon="data-icon" />
				</Tabs>
				<div className={"h-0 flex-1"}>
					{tab === "chart" && (
						<Graph data={DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
							{legend.position === "top" && <Legend {...legend} />}
							{legend.position === "left" && <Legend {...legend} />}
							<YAxis
								{...yaxis}
								title={
									yaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />
								}
								description={
									yaxis.description?.toString() && (
										<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />
									)
								}
							/>
							<GridLines {...gridline} />
							<Lines />
							<LinesTooltip tooltip={(_, x) => `${x}`} />
							{legend.position === "right" && <Legend {...legend} />}
							<XAxis
								{...xaxis}
								ticks={{ jumps: "every 1 months" }}
								title={
									xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />
								}
								description={
									yaxis.description?.toString() && (
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
					)}
					{tab === "code" && <CodeBlock code="Code Tab: Enter relevant code here" language="javascript" />}
					{tab === "data" && <CodeBlock code={JSON.stringify(DATA, null, 2)} language="javascript" />}
				</div>
			</div>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}

const DATA = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: new Date("2024-01-01T00:00:00Z"), y: 20 },
			{ x: new Date("2024-02-01T00:00:00Z"), y: 40 },
			{ x: new Date("2024-03-01T00:00:00Z"), y: 30 },
			{ x: new Date("2024-04-01T00:00:00Z"), y: 50 },
			{ x: new Date("2024-05-01T00:00:00Z"), y: 36 },
			{ x: new Date("2024-06-01T00:00:00Z"), y: 60 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: new Date("2024-01-01T00:00:00Z"), y: 5.25 },
			{ x: new Date("2024-02-01T00:00:00Z"), y: 10 },
			{ x: new Date("2024-03-01T00:00:00Z"), y: 25.4 },
			{ x: new Date("2024-04-01T00:00:00Z"), y: 36 },
			{ x: new Date("2024-05-01T00:00:00Z"), y: 40 },
			{ x: new Date("2024-06-01T00:00:00Z"), y: 35 },
		],
	},
];
