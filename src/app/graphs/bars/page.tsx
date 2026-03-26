"use client";
import { ComponentProps, useState } from "react";
import { Bars } from "../../../components/Bars/Bars";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { BarControls } from "../../../components/ControlGroup/BarsControlGroup/BarsControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";

import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
if (globalThis) (globalThis as any).Temporal = TemporalPolyfill;

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
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Churn",
							fill: "#f43f5e",
							group: "financials",
							data: [
								{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: -100_000 },
								{ x: Temporal.Instant.from("2025-02-01T00:00:00Z"), y: -120_000 },
								{ x: Temporal.Instant.from("2025-03-01T00:00:00Z"), y: -110_000 },
								{ x: Temporal.Instant.from("2025-04-01T00:00:00Z"), y: -130_000 },
								{ x: Temporal.Instant.from("2025-05-01T00:00:00Z"), y: -90_000 },
								{ x: Temporal.Instant.from("2025-06-01T00:00:00Z"), y: -140_000 },
								{ x: Temporal.Instant.from("2025-07-01T00:00:00Z"), y: -80_000 },
								{ x: Temporal.Instant.from("2025-08-01T00:00:00Z"), y: -110_000 },
								{ x: Temporal.Instant.from("2025-09-01T00:00:00Z"), y: -150_000 },
								{ x: Temporal.Instant.from("2025-10-01T00:00:00Z"), y: -120_000 },
								{ x: Temporal.Instant.from("2025-11-01T00:00:00Z"), y: -100_000 },
								{ x: Temporal.Instant.from("2025-12-01T00:00:00Z"), y: -110_000 },
							],
						},
						{
							name: "Revenue",
							fill: "#8249f0",
							group: "financials",
							data: [
								{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 1_200_000 },
								{ x: Temporal.Instant.from("2025-02-01T00:00:00Z"), y: 1_300_000 },
								{ x: Temporal.Instant.from("2025-03-01T00:00:00Z"), y: 1_350_000 },
								{ x: Temporal.Instant.from("2025-04-01T00:00:00Z"), y: 1_250_000 },
								{ x: Temporal.Instant.from("2025-05-01T00:00:00Z"), y: 1_450_000 },
								{ x: Temporal.Instant.from("2025-06-01T00:00:00Z"), y: 1_500_000 },
								{ x: Temporal.Instant.from("2025-07-01T00:00:00Z"), y: 1_150_000 },
								{ x: Temporal.Instant.from("2025-08-01T00:00:00Z"), y: 1_400_000 },
								{ x: Temporal.Instant.from("2025-09-01T00:00:00Z"), y: 1_550_000 },
								{ x: Temporal.Instant.from("2025-10-01T00:00:00Z"), y: 1_480_000 },
								{ x: Temporal.Instant.from("2025-11-01T00:00:00Z"), y: 1_380_000 },
								{ x: Temporal.Instant.from("2025-12-01T00:00:00Z"), y: 1_280_000 },
							],
						},
					]}
				>
					<Legend position={"top"} alignment={"end"} />
					<YAxis
						display={(v) => {
							if (typeof v === "string" || typeof v !== "number") return null;
							return (
								"$" +
								new Intl.NumberFormat("en", {
									notation: "compact",
									compactDisplay: "short",
									maximumFractionDigits: 2,
								}).format(v)
							);
						}}
					/>
					<GridLines vertical={false} />
					<Bars
						labels={(v) => {
							return (
								"$" +
								new Intl.NumberFormat("en", {
									notation: "compact",
									compactDisplay: "short",
									maximumFractionDigits: 2,
								}).format(Number(v.data.y))
							);
						}}
					/>
					<XAxis
						ticks={{ type: "categorical" }}
						display={(v) => {
							if (typeof v === "string" || typeof v === "number") return null;
							return v.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
