"use client";
import { Graph } from "@/components/Graph/Graph";
import { ComponentProps, useState } from "react";
import { ScatterGraph } from "@/components/ScatterGraph/ScatterGraph";
import { XAxis } from "@/components/Axis/XAxis/XAxis";
import { YAxis } from "@/components/Axis/YAxis/YAxis";
import { LineGraph } from "@/components/LineGraph/LineGraph";

export default function Page() {
	const [scatter, setScatter] = useState<ComponentProps<typeof ScatterGraph>>({});
	const setPiePartial = (partial: Partial<ComponentProps<typeof ScatterGraph>>) => setScatter((prev) => ({ ...prev, ...partial }));
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-white"}>PLACEHOLDER</div>
			<div className={"border-[1px] h-full border-dotted border-white"}>
				<Graph
					data={[
						{name: "Hours Gamed", data: MOCK_DATA}
					]}
				>
					<YAxis />
					<LineGraph />
					<XAxis />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-white"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{ "x": 1, "y": 20 },
	{ "x": 2, "y": 40 },
	{ "x": 3, "y": 30 },
	{ "x": 4, "y": 50 },
	{ "x": 5, "y": 36 },
	{ "x": 6, "y": 60 }
];
