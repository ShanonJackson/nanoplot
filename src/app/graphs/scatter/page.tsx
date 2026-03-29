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
import { overlay } from "../../../components/Overlay/Overlay";
import { Lines } from "../../../components/Lines/Lines";

const SUPPLY_BREAK = 150;
const DEMAND_BREAK = 3000;
const TOTAL_SUPPLY = robloxData.reduce((sum, d) => sum + d.supply, 0);

function getColor(supply: number, demand: number) {
	if (demand >= DEMAND_BREAK) return supply >= SUPPLY_BREAK ? "rgb(2, 165, 215)" : "rgb(5, 180, 98)";
	return supply >= SUPPLY_BREAK ? "rgb(161, 102, 233)" : "rgb(255, 92, 74)";
}
function getMarker(supply: number, demand: number) {
	if (demand >= DEMAND_BREAK) return supply >= SUPPLY_BREAK ? <overlay.triangle x={supply} y={demand} /> : "rgb(5, 180, 98)";
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
						fill: getColor(d.supply, d.avgDemand),
						data: [{ x: d.supply, y: d.avgDemand }],
					}))}
				>
					<Scatter.Quadrant x1={0} x2={150} y1={3000} y2={9000} fill={"rgba(5, 180, 98, 0.15)"} />
					<Scatter.Quadrant x1={150} x2={1100} y1={3000} y2={9000} fill={"rgba(2, 165, 215, 0.15)"} />
					<Scatter.Quadrant x1={150} x2={1100} y1={0} y2={3000} fill={"rgba(161, 102, 233, 0.15)"} />
					<Scatter.Quadrant x1={0} x2={150} y1={0} y2={3000} fill={"rgba(255, 92, 74, 0.15)"} />
					<YAxis />
					<GridLines />
					<Scatter
						marker={({ data: { x, y } }) => {
							if (typeof x !== "number" || typeof y !== "number") return null;
							if (y >= DEMAND_BREAK)
								return x >= SUPPLY_BREAK ? (
									<overlay.circle x={x} y={y} fill={"rgb(2, 165, 215)"} stroke={"rgb(2, 165, 215)"} />
								) : (
									<overlay.triangle x={x} y={y} fill={"rgb(5, 180, 98)"} stroke={"rgb(5, 180, 98)"} />
								);
							return x >= SUPPLY_BREAK ? (
								<overlay.diamond x={x} y={y} stroke={"rgb(161, 102, 233)"} fill={"rgb(161, 102, 233)"} />
							) : (
								<overlay.cross x={x} y={y} stroke={"rgb(255, 92, 74)"} fill={"rgb(255, 92, 74)"} />
							);
						}}
					/>
					<Scatter.Labels />
					<Lines.Line
						points={[
							{ x: 0, y: DEMAND_BREAK },
							{ x: 1000, y: DEMAND_BREAK },
						]}
						stroke={"white"}
						strokeDasharray={"8,8"}
						filter={"0px 0px 40px rgba(255, 255, 255, 0.5)"}
					/>
					<Lines.Line
						points={[
							{ x: SUPPLY_BREAK, y: 0 },
							{ x: SUPPLY_BREAK, y: 9000 },
						]}
						stroke={"white"}
						strokeDasharray={"8,8"}
						filter={"0px 0px 40px rgba(255, 255, 255, 0.5)"}
					/>
					<Scatter.Tooltip
						style={(point) => ({
							background: `linear-gradient(180.43deg, rgb(0, 0, 0) 0.74%, ${point.fill ?? "white"} 124.74%)`,
						})}
						tooltip={(point) => {
							const entry = robloxData.find((d) => d.genre === point.name)!;
							return (
								<div className="min-w-[200px]">
									<div className="font-bold text-sm pb-2 border-b border-white/15">{point.name}</div>
									<div className="flex justify-between py-2 border-b border-white/15">
										<div>
											<div className="opacity-60 text-[11px] mb-0.5">Demand</div>
											<div className="font-bold text-lg">{fmt(entry.avgDemand)}</div>
											<div className="font-semibold text-[11px]">{demandLabel(entry.avgDemand)}</div>
										</div>
										<div className="w-px bg-white/15 self-stretch -my-2" />
										<div>
											<div className="opacity-60 text-[11px] mb-0.5">Supply</div>
											<div className="font-bold text-lg">{((entry.supply / TOTAL_SUPPLY) * 100).toFixed(1)}%</div>
											<div className="text-[11px]">{fmt(entry.supply)} TITLES</div>
										</div>
									</div>
									<div className="pt-2">
										<div className="opacity-60 text-[11px] mb-1">Top Title</div>
										<div className="flex justify-between items-center gap-3">
											<div className="font-semibold text-[13px]">{entry.topTitle}</div>
											<div className="text-right whitespace-nowrap">
												<div className="font-bold text-sm">{fmt(entry.topTitleDemand)}</div>
												<div className="text-[10px] opacity-80">PLAYERS</div>
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
			<div className="mt-[200px]">
				<div>target side</div>
				{(["top", "bottom", "left", "right"] as const).map((side, i) => (
					<button onClick={() => setTargetSide(side)} key={i}>
						{side}
					</button>
				))}
				<div>tooltip side</div>
				{(["top", "bottom", "left", "right"] as const).map((side, i) => (
					<button onClick={() => setTooltipSide(side)} key={i}>
						{side}
					</button>
				))}
				<Tooltip
					active={true}
					position={{
						target: { side: targetSide, alignment: "center" },
						tooltip: { side: tooltipSide, alignment: "center" },
					}}
					collision={false}
					trigger={(ref) => <div className="h-[50px] w-[50px] bg-[red]" ref={ref} />}
				>
					HELLO WORLD
				</Tooltip>
			</div>
		</>
	);
}
