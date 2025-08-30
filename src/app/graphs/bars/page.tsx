"use client";
import { ComponentProps, useState } from "react";
import { Bars } from "../../../components/Bars/Bars";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { BarControls, BarsControlGroup } from "../../../components/ControlGroup/BarsControlGroup/BarsControlGroup";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { format } from "../../../utils/date/date-format";
import { SandpackShowcase } from "../../../components/Documentation/SandpackShowcase/SandpackShowcase";

type Mouse = Parameters<NonNullable<ComponentProps<(typeof Bars)["Mouse"]>["onMove"]>>[0];
export default function Page() {
	const [bars, setBars] = useState<BarControls>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: true });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({ title: "Months" });
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({ title: "Cookies Sold" });
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top" });

	const [mouse, setMouse] = useState<Mouse>();
	return (
		<>
			<SandpackShowcase language={"tsx"} title={"Showcase"}>
				{`export default function App() {
			    return (<div>helasdsadlo world</div>)
			   }`}
			</SandpackShowcase>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Bars</h1>
				<BarsControlGroup state={bars} onChange={setBars} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Male",
							fill: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
							group: "gender",
							data: [
								{ x: "Jan", y: 5_000 },
								{ x: "Feb", y: 20_000 },
								{ x: "Mar", y: 45_000 },
								{ x: "Apr", y: 20_000 },
							].map((d, i) => ({ x: new Date(2025, i, 1), y: d.y })),
						},
						{
							name: "Female",
							group: "gender",
							fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
							data: [
								{ x: "Jan", y: 45_000 },
								{ x: "Feb", y: 10_000 },
								{ x: "Mar", y: 15_000 },
								{ x: "Apr", y: 30_000 },
							].map((d, i) => ({ x: new Date(2025, i, 1), y: d.y })),
						},
						{
							name: "abcdefg",
							fill: "red",
							data: [
								{ x: new Date(2025, 6, 1), y: 30_000 },
								{ x: new Date(2025, 0, 1), y: 30_000 },
								{ x: new Date(2025, 1, 1), y: 30_000 },
							],
						},
					].map((dp) => {
						return {
							...dp,
							data: dp.data.map((d) => {
								return { x: d.y, y: d.x };
							}),
						};
					})}
					gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
				>
					{legend.position === "top" && <Legend {...legend} />}
					{legend.position === "left" && <Legend {...legend} />}
					<YAxis
						ticks={{ from: "auto - P1M", to: "auto + P1M", jumps: "P1M", type: "categorical" }}
						display={(x) => (x instanceof Date ? format(x) : null)}
						teeth
						title={yaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />}
						description={
							yaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					<GridLines {...gridline} />
					{mouse?.closest.tick.x ? (
						<Bars.Bar
							x={"auto"}
							y={mouse?.closest.tick.y}
							fill={"linear-gradient(to left, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.35) 65%, rgba(45, 45, 45, 1) 100%)"}
							horizontal
							className={""}
						/>
					) : null}
					<Bars {...bars} horizontal={true} interactions={{ y: mouse?.closest.tick.y }} />
					<Bars.Mouse onMove={(mouse) => setMouse(mouse)} onLeave={() => setMouse(undefined)} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis teeth {...xaxis} title={"HELLO WORLD TITLE"} description={"HELLOWRLD DESC"} />
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}
