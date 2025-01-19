"use client";
import { Graph } from "@/components/Graph/Graph";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { GridLines } from "@/components/GridLines/GridLines";
import { Bars } from "@/components/Bars/Bars";
import { ComponentProps, useState } from "react";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { SliderControl } from "@/components/Docs/Control/components/SliderControl/SliderControl";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";

export default function Page() {
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [barsBase, setBarsBase] = useState<ComponentProps<typeof Bars>>({});
	const [bars, setBars] = useState<boolean>(false);
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));
	const setBarsBAse = (partial: Partial<ComponentProps<typeof Bars>>) => setBarsBase((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl"}>Bar Graph</h1>
				<ControlGroup title={"Bars"}>
					<Control name={"Horizontal Bras"} type={"boolean"}>
						<BooleanControl value={bars} onChange={() => setBars(!bars)} description={"Display Bras horizontally"} />
					</Control>
					<Control name="Size" type="number">
						<SliderControl
							value={barsBase.size}
							onChange={(value) => setBarsBAse({ size: value })}
							min={15}
							description={"Size Of Bars"}
						/>
					</Control>
					<Control name="Radius" type="number">
						<SliderControl
							value={barsBase.radius}
							onChange={(value) => setBarsBAse({ radius: value })}
							min={0}
							max={360}
							description={"Bar Radius"}
						/>
					</Control>
				</ControlGroup>
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
			</ControlPanel>

			<GraphPanel>
				<Graph
					data={MOCK_DATA.map((bar) => {
						return {
							...bar,
							data: bar.data.map(({ x, y }) => {
								if (bars) return { x: y, y: x };
								return { x, y };
							}),
						};
					})}
					gap={{ top: 15, left: 15, right: 30, bottom: 15 }}
				>
					<YAxis />
					<GridLines {...gridline} />
					<Bars horizontal={bars} size={barsBase.size} radius={barsBase.radius} />
					<XAxis ticks={{ from: 0 }} />
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "Sally hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 20 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 24 },
			{ x: "May", y: 31 },
			{ x: "Jun", y: 43 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 50 },
			{ x: "Feb", y: 50 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 24 },
			{ x: "May", y: 21 },
			{ x: "Jun", y: 33 },
		],
	},
	{
		name: "Sally hours gamed",
		group: "viewers",
		data: [
			{ x: "Jan", y: 40 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 43 },
			{ x: "Apr", y: 54 },
			{ x: "May", y: 51 },
			{ x: "Jun", y: 23 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "viewers",
		data: [
			{ x: "Jan", y: 30 },
			{ x: "Feb", y: 31 },
			{ x: "Mar", y: 53 },
			{ x: "Apr", y: 92 },
			{ x: "May", y: 41 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Sally hours gamed",
		group: "followers",
		data: [
			{ x: "Jan", y: 30 },
			{ x: "Feb", y: 41 },
			{ x: "Mar", y: 33 },
			{ x: "Apr", y: 54 },
			{ x: "May", y: 21 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "followers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "gamers",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
	{
		name: "Joe hours gamed",
		group: "visitors",
		data: [
			{ x: "Jan", y: 10 },
			{ x: "Feb", y: 21 },
			{ x: "Mar", y: 13 },
			{ x: "Apr", y: 22 },
			{ x: "May", y: 11 },
			{ x: "Jun", y: 13 },
		],
	},
];
