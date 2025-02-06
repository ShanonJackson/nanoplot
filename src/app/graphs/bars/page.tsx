"use client";

import { useState } from "react";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { BarsControlGroup } from "../../../components/ControlGroup/BarsControlGroup/BarsControlGroup";
import { useExamples } from "../../../stores/examples";
import { Bars } from "../../../components/Bars/Bars";
import { Graph } from "../../../components/Graph/Graph";

const defaultBars = {
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
		barWidth: 0.8,
		barColor: "#3b82f6",
		barOpacity: 1,
		barBorderRadius: 4,
		barBorderWidth: 0,
		barBorderColor: "#000000",
		barBorderOpacity: 1,
		barGap: 0.2,
		barGroupGap: 0.2,
		barStacked: false,
		barHorizontal: false,
		barPercent: false,
	},
};

export default function Page() {
	const [bars, setBars] = useState(defaultBars);
	const { example } = useExamples();

	const code = example?.code ?? `
const data = ${JSON.stringify(bars.data, null, 2)};

<Graph data={data}>
	<Bars
		layout={${JSON.stringify(bars.layout, null, 2)}}
		style={${JSON.stringify(bars.style, null, 2)}}
	/>
</Graph>
`;

	return (
		<>
			<ControlPanel>
				<div className="flex items-center justify-between pb-2">
					<BarsControlGroup state={bars} onChange={setBars} />
				</div>
			</ControlPanel>
			<GraphPanel code={code}>
				{example ? (
					<example.component />
				) : (
					<Graph data={bars.data}>
						<Bars
							data={bars.data}
							layout={bars.layout}
							style={bars.style}
						/>
					</Graph>
				)}
			</GraphPanel>
		</>
	);
}
