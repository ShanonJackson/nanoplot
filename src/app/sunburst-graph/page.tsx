"use client";
import { Graph } from "@/components/Graph/Graph";
import { Sunburst } from "@/components/Sunburst/Sunburst";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { ComponentProps, useState } from "react";

export default function Page() {
	const [sunburst, setSunburst] = useState<ComponentProps<typeof Sunburst>>({
		loading: false,
	});

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl"}>Sunburst Graph</h1>
				<Control name={"loading"} type={"boolean"}>
					<BooleanControl
						value={sunburst.loading}
						onChange={() => setSunburst((prev) => ({ loading: !prev.loading }))}
						description={"Renders loading skeleton placeholder"}
					/>
				</Control>
			</ControlPanel>
			<GraphPanel>
				<Graph gap={{ bottom: 30 }} data={[]}>
					<Sunburst {...sunburst} />
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}
