"use client";
import { useState } from "react";
import { PieControlGroup, PieControls } from "../../../../../components/ControlGroup/PieControlGroup/PieControlGroup";
import { ControlPanel } from "../../../../../components/Panels/ControlPanel";
import { GraphPanel } from "../../../../../components/Panels/GraphPanel";
import { Graph } from "../../../../../components/Graph/Graph";
import { Pie } from "../../../../../components/Pie/Pie";

export default function Page() {
	const [pie, setPie] = useState<PieControls>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});

	return (
		<div className={"h-[calc(100vh-80px)] grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr] p-8"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<PieControlGroup state={pie} onChange={setPie} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "elixir",
							value: 333,
						},
						{
							name: "stylus",
							value: 257,
						},
						{
							name: "css",
							value: 30,
						},
						{
							name: "haskell",
							value: 192,
						},
						{
							name: "python",
							value: 283,
						},
					]}
				>
					<Pie {...pie}> {pie.children && <div dangerouslySetInnerHTML={{ __html: pie.children.toString() ?? "" }} />}</Pie>
				</Graph>
			</GraphPanel>
		</div>
	);
}
