"use client";
import { Pie } from "@/components/Pie/Pie";
import { useState } from "react";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { PieEmptyExample, PieEmptyExampleCode } from "@/app/pie-graph/examples/PieEmptyExample";
import { Graph } from "@/components/Graph/Graph";
import { PieControlGroup, PieControls } from "@/components/ControlGroup/PieControlGroup/PieControlGroup";
import { PieCollisionExample, PieCollisionExampleCode } from "@/app/pie-graph/examples/PieCollisionExample";

export default function Page() {
	const [pie, setPie] = useState<PieControls>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});

	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<PieControlGroup state={pie} onChange={setPie} />
			</ControlPanel>
			<GraphPanel
				examples={[
					{ name: "Pie Empty", code: PieEmptyExampleCode, component: PieEmptyExample },
					{ name: "Pie Collision", code: PieCollisionExampleCode, component: PieCollisionExample },
				]}
				code={`
const data = ${JSON.stringify(MOCK_DATA, null, 4)};
<Graph data={data}>
	<Pie${pie.example?.props ? pie.example.props : ""}>
		${pie.children}
	</Pie>
</Graph>
`}
			>
				<Graph data={MOCK_DATA}>
					<Pie {...pie}> {pie.children && <div dangerouslySetInnerHTML={{ __html: pie.children.toString() ?? "" }} />}</Pie>
				</Graph>
			</GraphPanel>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "python",
		value: 283,
	},
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
];
