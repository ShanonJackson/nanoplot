"use client";

import { useState } from "react";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { PieControlGroup, PieControls } from "../../../components/ControlGroup/PieControlGroup/PieControlGroup";
import { useExamples } from "../../../stores/examples";
import { Pie } from "../../../components/Pie/Pie";
import { Graph } from "../../../components/Graph/Graph";

export default function Page() {
	const [pie, setPie] = useState<PieControls>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});
	const { example } = useExamples();

	const code = example?.code ?? `<coming soon>`;

	return (
		<>
			<ControlPanel>
				<div className="flex items-center justify-between pb-2">
					<PieControlGroup state={pie} onChange={setPie} />
				</div>
			</ControlPanel>
			<GraphPanel code={code}>
				{example ? (
					<example.component />
				) : (
					<Graph
						data={[
							{ name: "A", value: 10 },
							{ name: "B", value: 20 },
							{ name: "C", value: 30 },
							{ name: "D", value: 40 },
							{ name: "E", value: 50 },
						]}
					>
						<Pie />
					</Graph>
				)}
			</GraphPanel>
		</>
	);
}
