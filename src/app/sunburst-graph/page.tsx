"use client";
import { Graph } from "@/components/Graph/Graph";
import { Sunburst } from "@/components/Sunburst/Sunburst";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { ComponentProps, useState } from "react";

export default function Page() {
	const [sunburst, setSunburst] = useState<ComponentProps<typeof Sunburst>>({
		loading: false,
	});

	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
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
		</div>
	);
}
