"use client";
import { Graph } from "@/components/Graph/Graph";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { GridLines } from "@/components/GridLines/GridLines";
import { Bars } from "@/components/Bars/Bars";
import { ComponentProps, useState } from "react";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";

export default function Page() {
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [bars, setBars] = useState<boolean>(false);
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-black dark:border-white p-4 bg-gray-100 dark:bg-gray-800"}>
				<h1 className={"text-2xl"}>Bar Graph</h1>
				<Control name={"Border"} type={"boolean"}>
					<BooleanControl
						value={gridline.border}
						onChange={(checked) => setGridPartial({ border: checked })}
						description={"Adds Border To Graph"}
					/>
				</Control>
				<Control name={"Horizontal Grid"} type={"boolean"}>
					<BooleanControl
						value={gridline.horizontal}
						onChange={(checked) => setGridPartial({ horizontal: checked })}
						description={"Adds Horizontal Grid Lines"}
					/>
				</Control>
				<Control name={"Vertical Grid"} type={"boolean"}>
					<BooleanControl
						value={gridline.vertical}
						onChange={(checked) => setGridPartial({ vertical: checked })}
						description={"Adds Vertical Grid Lines"}
					/>
				</Control>
				<Control name={"Horizontal Bras"} type={"boolean"}>
					<BooleanControl value={bars} onChange={() => setBars(!bars)} description={"Display Bras horizontally"} />
				</Control>
			</div>

			<div className={"h-full border-dotted border border-black dark:border-white"}>
				<Graph data={[{ name: "My First Dataset", data: MOCK_DATA }]} gap={{ top: 15, left: 15, right: 30, bottom: 15 }}>
					<YAxis ticks={{ from: 0 }} />
					<GridLines {...gridline} />
					<Bars horizontal={bars} />
					<XAxis />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-black dark:border-white"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{ x: 57, y: "Jan" },
	{ x: 91, y: "Feb" },
	{ x: 83, y: "Mar" },
	{ x: 74, y: "Apr" },
	{ x: 51, y: "May" },
	{ x: 63, y: "Jun" },
	{ x: 71, y: "Jul" },
	{ x: 73, y: "Aug" },
	{ x: 68, y: "Sep" },
	{ x: 93, y: "Oct" },
	{ x: 84, y: "Nov" },
	{ x: 48, y: "Dec" },
];
