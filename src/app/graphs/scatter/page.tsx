"use client";
import { ComponentProps, useState } from "react";
import { Scatter } from "../../../components/Scatter/Scatter";
import { GridLines } from "../../../components/GridLines/GridLines";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Graph } from "../../../components/Graph/Graph";
import { XAxis } from "../../../components/XAxis/XAxis";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { Legend } from "../../../components/Legend/Legend";
import { Tooltip } from "../../../components/Tooltip/Tooltip";
import robloxData from "./data.json";

const SUPPLY_BREAK = 150;
const DEMAND_BREAK = 3000;
const TOTAL_SUPPLY = robloxData.reduce((sum, d) => sum + d.supply, 0);

function quadrantColor(supply: number, demand: number) {
	if (demand >= DEMAND_BREAK) return supply >= SUPPLY_BREAK ? "rgb(2, 165, 215)" : "rgb(5, 180, 98)";
	return supply >= SUPPLY_BREAK ? "rgb(161, 102, 233)" : "rgb(255, 92, 74)";
}

function demandLabel(demand: number) {
	if (demand >= 7000) return "EXCEPTIONAL";
	if (demand >= 5000) return "HIGH";
	if (demand >= 3000) return "GOOD";
	if (demand >= 1500) return "MODERATE";
	return "LOW";
}

function fmt(n: number) {
	return n.toLocaleString();
}

export default function Page() {
	const [scatter, setScatter] = useState<ComponentProps<typeof Scatter>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({ title: "Number of Titles (Supply)" });
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({ title: "Avg Player Count (Demand)" });
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });
	const [targetSide, setTargetSide] = useState<"top" | "bottom" | "left" | "right">("right");
	const [tooltipSide, setTooltipSide] = useState<"top" | "bottom" | "left" | "right">("left");
	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Scatter Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={robloxData.map((d) => ({
						name: d.genre,
						fill: quadrantColor(d.supply, d.avgDemand),
						data: [{ x: d.supply, y: d.avgDemand }],
					}))}
				>
					<Scatter.Quadrant x1={0} x2={150} y1={3000} y2={9000} fill={"rgba(5, 180, 98, 0.25)"} />
					<Scatter.Quadrant x1={150} x2={1100} y1={3000} y2={9000} fill={"rgba(2, 165, 215, 0.25)"} />
					<Scatter.Quadrant x1={150} x2={1100} y1={0} y2={3000} fill={"rgba(161, 102, 233, 0.25)"} />
					<Scatter.Quadrant x1={0} x2={150} y1={0} y2={3000} fill={"rgba(255, 92, 74, 0.25)"} />
					<YAxis />
					<GridLines />
					<Scatter />
					<Scatter.Tooltip
						style={(point) => ({
							background: `linear-gradient(180.43deg, rgb(0, 0, 0) 0.74%, ${point.fill ?? "white"} 124.74%)`,
							minWidth: 230,
						})}
						tooltip={(point) => {
							const entry = robloxData.find((d) => d.genre === point.name)!;
							const color = point.fill ?? "white";
							return (
								<div style={{}}>
									<div
										style={{
											fontWeight: 700,
											fontSize: 14,
											paddingBottom: 8,
											borderBottom: "1px solid rgba(255,255,255,0.15)",
										}}
									>
										{point.name}
									</div>
									<div
										style={{
											display: "flex",
											gap: 28,
											padding: "8px 0",
											borderBottom: "1px solid rgba(255,255,255,0.15)",
										}}
									>
										<div>
											<div style={{ opacity: 0.6, fontSize: 11, marginBottom: 2 }}>Demand</div>
											<div style={{ fontWeight: 700, fontSize: 18 }}>{fmt(entry.avgDemand)}</div>
											<div style={{ fontWeight: 600, fontSize: 11 }}>{demandLabel(entry.avgDemand)}</div>
										</div>
										<div>
											<div style={{ opacity: 0.6, fontSize: 11, marginBottom: 2 }}>Supply</div>
											<div style={{ fontWeight: 700, fontSize: 18 }}>
												{((entry.supply / TOTAL_SUPPLY) * 100).toFixed(1)}%
											</div>
											<div style={{ fontSize: 11 }}>{fmt(entry.supply)} TITLES</div>
										</div>
									</div>
									<div style={{ paddingTop: 8 }}>
										<div style={{ opacity: 0.6, fontSize: 11, marginBottom: 4 }}>Top Title</div>
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
											<div style={{ fontWeight: 600, fontSize: 13 }}>{entry.topTitle}</div>
											<div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
												<div style={{ fontWeight: 700, fontSize: 14 }}>{fmt(entry.topTitleDemand)}</div>
												<div style={{ fontSize: 10, opacity: 0.8 }}>PLAYERS</div>
											</div>
										</div>
									</div>
								</div>
							);
						}}
					/>
					<XAxis />
				</Graph>
			</GraphPanel>
		</>
	);
}
