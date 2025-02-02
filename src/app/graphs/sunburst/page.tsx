"use client";
import { ComponentProps, useState } from "react";
import { Sunburst } from "../../../components/Sunburst/Sunburst";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { Control } from "../../../components/Docs/Control/Control";
import { BooleanControl } from "../../../components/Docs/Control/components/BooleanControl/BooleanControl";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";

export default function Page() {
	const [sunburst, setSunburst] = useState<ComponentProps<typeof Sunburst>>({
		loading: false,
	});

	return (
		<>
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
		</>
	);
}
