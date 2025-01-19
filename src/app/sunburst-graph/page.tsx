"use client";
import { Graph } from "@/components/Graph/Graph";
import { Sunburst } from "@/components/Sunburst/Sunburst";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";

export default function Page() {
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl"}>Sunburst Graph</h1>
			</ControlPanel>
			<GraphPanel>
				<Graph gap={{ bottom: 30 }} data={[]}>
					<Sunburst />
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}
