"use client";
import { ComponentProps, useState } from "react";
import { ControlPanel } from "../../../../../components/Panels/ControlPanel";
import { GraphPanel } from "../../../../../components/Panels/GraphPanel";
import { Graph } from "../../../../../components/Graph/Graph";
import { Control } from "../../../../../components/Docs/Control/Control";
import { BooleanControl } from "../../../../../components/Docs/Control/components/BooleanControl/BooleanControl";
import { Radar } from "../../../../../components/Radar/Radar";
import { DocumentationLayout } from "../../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	const [radar, setRadar] = useState<ComponentProps<typeof Radar>>({
		loading: false,
	});
	const setRadarPartial = (partial: Partial<ComponentProps<typeof Radar>>) => setRadar((prev) => ({ ...prev, ...partial }));

	return (
		<DocumentationLayout playground>
			<ControlPanel>
				<h1 className={"text-2xl"}>Radar Graph</h1>
				<Control name={"loading"} type={"boolean"}>
					<BooleanControl
						value={radar.loading}
						onChange={(loading) => setRadarPartial({ loading })}
						description={"Renders loading skeleton placeholder"}
					/>
				</Control>
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Jasons Progress",
							stroke: "#11ACAE",
							data: [
								{ x: "Fighting", y: 70 },
								{ x: "Farming", y: 8 },
								{ x: "Supporting", y: 300 },
								{ x: "Pushing", y: 90 },
								{ x: "Versatility", y: 60 },
							],
						},
					]}
				>
					<Radar {...radar} />
				</Graph>
			</GraphPanel>
		</DocumentationLayout>
	);
}
