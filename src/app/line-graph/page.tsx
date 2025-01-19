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
import CodeBlock from '@/components/CodeHighlighter/CodeHighlighter'
import Tabs from '@/components/Tabs/Tabs';
import Tab from '@/components/Tabs/Tab';
import TabPanel from '@/components/Tabs/TabPanel';

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	const setXAxisPartial = (partial: Partial<ComponentProps<typeof XAxis>>) => setXAxis((prev) => ({ ...prev, ...partial }));

	let graphData = [
		{
			name: "Josh - Hours gamed",
			data: [
				{ x: 1, y: 20 },
				{ x: 2, y: 40 },
				{ x: 3, y: 30 },
				{ x: 4, y: 50 },
				{ x: 5, y: 36 },
				{ x: 6, y: 60 },
			],
		},
		{
			name: "Sally - Hours gamed",
			data: [
				{ x: 1, y: 5.25 },
				{ x: 2, y: 10 },
				{ x: 3, y: 25.4 },
				{ x: 4, y: 36 },
				{ x: 5, y: 40 },
				{ x: 6, y: 35 },
			],
		},
	]

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
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
			<div className={"border-[1px] h-full border-dotted border-white overflow-hidden resize"}>
				<Tabs>
                					<div className="bg-[rgb(247,250,251)]">
                						<Tab id="chart"><img className='px-1' src={`@/assets/icons/chart-icon-inactive.png`} />chart</Tab>
                						<Tab id="code"><img className='px-1' src={`@/assets/icons/code-icon-inactive.png`} />code</Tab>
                						<Tab id="data"><img className='px-1' src={`@/assets/icons/data-icon-inactive.png`} />data</Tab>
                					</div>

                					<div>
                						<TabPanel id="chart">
				<Graph
					data={graphData}
					gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
				>
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
					<LinesTooltip tooltip={(_, x) => `${x}`} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							yaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
				</TabPanel>
                						<TabPanel id="code">
                							<CodeBlock code="Code Tab: Enter relevant code here" language="javascript" />
                						</TabPanel>
                						<TabPanel id="data">
                							<CodeBlock code={JSON.stringify(graphData, null, 2)} language="javascript" />
                						</TabPanel>
                					</div>
                				</Tabs>
			</div>
			<div className={"border-[1px] border-dotted border-white"}>EXAMPLES</div>
		</div>
	);
}
