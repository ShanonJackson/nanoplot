"use client";
import { Graph } from "@/components/Graph/Graph";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { GridLines } from "@/components/GridLines/GridLines";
import { ComponentProps, useState } from "react";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { Network } from "@/components/Network/Network";

export default function Page() {
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-white p-4 bg-gray-100 dark:bg-gray-800"}>
				<h1 className={"text-2xl"}>Bar Graph</h1>
				<Control name={"Border"} type={"boolean"}>
					<BooleanControl
						value={gridline.border}
						onChange={(checked) => setGridPartial({ border: checked })}
						description={"Adds Border To Graph"}
					/>
				</Control>
				<Control name={"Horizontal"} type={"boolean"}>
					<BooleanControl
						value={gridline.horizontal}
						onChange={(checked) => setGridPartial({ horizontal: checked })}
						description={"Adds Horizontal Grid Lines"}
					/>
				</Control>
				<Control name={"Vertical"} type={"boolean"}>
					<BooleanControl
						value={gridline.vertical}
						onChange={(checked) => setGridPartial({ vertical: checked })}
						description={"Adds Vertical Grid Lines"}
					/>
				</Control>
			</div>

			<div className={"border-[1px] h-full border-dotted border-white"}>
				<Graph data={MOCK_DATA} gap={{ top: 15, left: 15, right: 30, bottom: 15 }}>
					<GridLines {...gridline} />
					<Network />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-white"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "N - 1",
		x: -15,
		y: 0,
		data: [
			{ x: 1, y: 20 },
			{ x: 2, y: 40 },
			{ x: 3, y: 30 },
		],
	},
	{
		name: "N - 2",
		x: 0,
		y: -15,
		data: [
			{ x: 1, y: 5.25 },
			{ x: 2, y: 10 },
			{ x: 3, y: 25.4 },
		],
	},
	{
		name: "N - 3",
		x: 15,
		y: 0,
		data: [
			{ x: 1, y: 55 },
			{ x: 2, y: 30 },
			{ x: 3, y: 41 },
		],
	},
	{
		name: "N - 4",
		x: 15,
		y: 15,
		data: [
			{ x: 1, y: 5.25 },
			{ x: 2, y: 10 },
			{ x: 3, y: 25.4 },
		],
	},
];
