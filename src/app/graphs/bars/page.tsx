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
import { StackedBarsExample, StackedBarsExampleCode } from "./examples/StackedBarsExample";
import { HorizontalBarsExample, HorizontalBarsExampleCode } from "./examples/HorizontalBarsExample";
import { BarsPercentExample, BarsPercentExampleCode } from "./examples/BarsPercentExample";
import { PositiveNegativeBarsExample } from "./examples/PositiveNegativeBarsExample";
import {
	PositiveNegativeBarsCustomAnchorExample,
	PositiveNegativeBarsCustomAnchorExampleCode,
} from "./examples/PositiveNegativeBarsCustomAnchorExample";
import { format } from "../../../utils/date/date-format";

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
						{...yaxis}
						ticks={{ from: "auto - P1M", to: "auto + P1M", jumps: "P1M", type: "categorical" }}
						display={(x) => (x instanceof Date ? format(x) : null)}
						title={yaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />}
						description={
							yaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					<GridLines {...gridline} />
					<Bars {...bars} horizontal={true} interactions={{ y: mouse?.closest.tick.y, shadow: true }} />
					<Bars.Mouse onMove={(mouse) => setMouse(mouse)} onLeave={() => setMouse(undefined)} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis {...xaxis} title={"HELLO WORLD TITLE"} description={"HELLOWRLD DESC"} />
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}
