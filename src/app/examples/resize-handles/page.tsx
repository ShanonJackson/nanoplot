"use client";
import { useState } from "react";
import { Bars } from "../../../components/Bars/Bars";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { BarControls } from "../../../components/ControlGroup/BarsControlGroup/BarsControlGroup";
import { Graph } from "../../../components/Graph/Graph";
import { DocumentationNote } from "../../../components/Documentation/DocumentationNote/DocumentationNote";

export default function Page() {
	const [bars, setBars] = useState<BarControls>({});
	return (
		<div>
			<div>Use resize handler in bottom right corner</div>
			<DocumentationNote>Resizing intentionally will cause overflow if the YAxis OR XAxis text cannot fit.</DocumentationNote>
			<div className={"resize overflow-hidden w-[400px] h-[300px] inline-block"}>
				<Graph
					data={[
						{
							name: "Male",
							fill: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
							data: [
								{ x: "Jan", y: 5_000 },
								{ x: "Feb", y: 20_000 },
								{ x: "Mar", y: 45_000 },
								{ x: "Apr", y: 20_000 },
							],
						},
						{
							name: "Female",
							fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
							data: [
								{ x: "Jan", y: 45_000 },
								{ x: "Feb", y: 10_000 },
								{ x: "Mar", y: 15_000 },
								{ x: "Apr", y: 30_000 },
							],
						},
					].map((dp) => {
						return {
							...dp,
							data: dp.data.map((d) => {
								return { x: d.x, y: d.y };
							}),
						};
					})}
					gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
				>
					<Legend position={"top"} alignment={"end"} />
					<YAxis title={"Cookies Sold"} />
					<GridLines />
					<Bars
						{...bars}
						horizontal={false}
						labels={{
							position: "above",
							collision: true,
							display: (v) => {
								return new Intl.NumberFormat("en", {
									notation: "compact",
									compactDisplay: "short",
									maximumFractionDigits: 2,
								}).format(Number(v.data.y));
							},
						}}
					/>
					<XAxis title={"Months"} />
				</Graph>
			</div>
		</div>
	);
}
