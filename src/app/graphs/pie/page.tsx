"use client";

import { useState } from "react";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { PieControlGroup } from "../../../components/ControlGroup/PieControlGroup/PieControlGroup";
import { useExamples } from "../../../stores/examples";
import { Pie } from "../../../components/Pie/Pie";
import { Graph } from "../../../components/Graph/Graph";

const defaultPie = {
	data: [
		{ name: "A", value: 10 },
		{ name: "B", value: 20 },
		{ name: "C", value: 30 },
		{ name: "D", value: 40 },
		{ name: "E", value: 50 },
	],
	layout: {
		width: 800,
		height: 400,
		margin: {
			top: 20,
			right: 20,
			bottom: 40,
			left: 40,
		},
	},
	style: {
		innerRadius: 0,
		padAngle: 0,
		cornerRadius: 4,
		startAngle: 0,
		endAngle: 360,
		colors: ["#3b82f6", "#ef4444", "#22c55e", "#eab308", "#a855f7"],
	},
};

export default function Page() {
	const [pie, setPie] = useState(defaultPie);
	const { example } = useExamples();

	const code = example?.code ?? `
const data = ${JSON.stringify(pie.data, null, 2)};

<Graph data={data}>
	<Pie
		layout={${JSON.stringify(pie.layout, null, 2)}}
		style={${JSON.stringify(pie.style, null, 2)}}
	/>
</Graph>
`;

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
					<Graph data={pie.data}>
						<Pie
							data={pie.data}
							layout={pie.layout}
							style={pie.style}
						/>
					</Graph>
				)}
			</GraphPanel>
		</>
	);
}
