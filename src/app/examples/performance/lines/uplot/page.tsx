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
		if (i === 1) return "CPU";
		if (i === 2) return "RAM";
		return "TCP Out";
	})(),
	data: data[0].map((xy, ii) => ({
		x: new Date(xy * 1000),
		y: d[ii],
	})),
}));

export default function Page() {
	const [count, setCount] = useState(0);
	console.log("page re-render");

	return (
		<div>
			<button onClick={() => setCount((c) => c + 1)}>Re-render graph count: {count}</button>
			<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
				<Graph gap={{ right: 35, left: 10, top: 20, bottom: 10 }} data={dataset}>
					<Legend position={"top"} />
					<YAxis />
					<GridLines />
					<Lines />
					<Lines.Tooltip tooltip={{ title: (v) => format(new Date(+v), "yyyy-mm-dd hh:mm"), display: (v) => v.y.toString() }} />
					<XAxis
						ticks={{ jumps: "every 2 days" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return format(x, "mm/dd");
						}}
					/>
				</Graph>
			</div>
		</div>
	);
}
