"use client";
import data from "./data.json";
import { Graph } from "../../../../../components/Graph/Graph";
import { Legend } from "../../../../../components/Legend/Legend";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Lines } from "../../../../../components/Lines/Lines";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { format } from "../../../../../utils/date/date-format";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { useState } from "react";

const dataset = data.slice(1, 4).map((d, i) => ({
	name: (() => {
		if (i === 1) return "RAM";
		if (i === 2) return "CPU";
		return "TCP Out";
	})(),
	data: data[0].map((xy, ii) => ({
		x: new Date(xy * 1000),
		y: d[ii],
	})),
}));

export default function Page() {
	const [mount, setMount] = useState(false);
	return (
		<div>
			<button onClick={() => setMount((m) => !m)}>{mount ? "Unmount" : "Mount"}</button>
			{mount && (
				<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
					<Graph
						gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
						data={dataset.filter((d) => d.name !== "TCP Out")}
						datasets={{
							TCP: dataset.filter((d) => d.name === "TCP Out").map((c) => ({ ...c, stroke: "rgb(255, 0, 0)" })),
						}}
					>
						<Legend position={"top"} />
						<YAxis />
						<GridLines />
						<Lines />
						<Lines dataset={"TCP"} />
						<Lines.Tooltip
							tooltip={{ title: (v) => format(new Date(+v), "yyyy-mm-dd hh:mm"), display: (v) => v.y.toString() }}
						/>
						<YAxis dataset={"TCP"} position={"right"} display={(t) => t.toString() + " MB"} />
						<XAxis
							ticks={{ jumps: "P2D" }}
							display={(x) => {
								if (typeof x === "number" || typeof x === "string") return null;
								return format(x, "mm/dd");
							}}
						/>
					</Graph>
				</div>
			)}
		</div>
	);
}
