"use client";
import { Graph } from "@/components/Graph/Graph";
import { ComponentProps, useState } from "react";
import { ScatterGraph } from "@/components/ScatterGraph/ScatterGraph";
import { XAxis } from "@/components/Axis/XAxis/XAxis";
import { YAxis } from "@/components/Axis/YAxis/YAxis";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import GridLines from "@/components/GridLines/GridLines";

export default function Page() {
	const [scatter, setScatter] = useState<ComponentProps<typeof ScatterGraph>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});

	const setScatterPartial = (partial: Partial<ComponentProps<typeof ScatterGraph>>) => setScatter((prev) => ({ ...prev, ...partial }));
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-foreground"}>
				<Control name={"Trend Line"} type={"boolean"}>
					<BooleanControl
						value={scatter.trendline}
						onChange={(checked) => setScatterPartial({ trendline: checked })}
						description={"Adds Trendline To Graph"}
					/>
				</Control>
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

			<div className={"border-[1px] h-full border-dotted border-foreground"}>
				<Graph
					data={MOCK_DATA.map((d, i) => {
						return {
							id: i.toString(),
							name: "",
							data: [{ x: d.hours_studied, y: d.test_score }],
						};
					})}
					gap={{ top: 50 }}
				>
					<YAxis />
					<GridLines {...gridline} />
					<ScatterGraph {...scatter} />
					<XAxis />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-foreground"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{
		hours_studied: 18.73,
		test_score: 38.32,
	},
	{
		hours_studied: 47.54,
		test_score: 92.08,
	},
	{
		hours_studied: 36.6,
		test_score: 74.12,
	},
	{
		hours_studied: 29.93,
		test_score: 39.99,
	},
	{
		hours_studied: 7.8,
		test_score: 13.41,
	},
	{
		hours_studied: 7.8,
		test_score: 19.17,
	},
	{
		hours_studied: 2.9,
		test_score: 20.59,
	},
	{
		hours_studied: 43.31,
		test_score: 81.43,
	},
	{
		hours_studied: 30.06,
		test_score: 52.03,
	},
	{
		hours_studied: 35.4,
		test_score: 65.79,
	},
	{
		hours_studied: 1.03,
		test_score: 11.21,
	},
	{
		hours_studied: 48.5,
		test_score: 100.0,
	},
	{
		hours_studied: 41.62,
		test_score: 77.95,
	},
	{
		hours_studied: 10.62,
		test_score: 26.37,
	},
	{
		hours_studied: 9.09,
		test_score: 19.15,
	},
	{
		hours_studied: 9.17,
		test_score: 28.03,
	},
	{
		hours_studied: 15.21,
		test_score: 23.4,
	},
	{
		hours_studied: 26.24,
		test_score: 49.2,
	},
	{
		hours_studied: 21.6,
		test_score: 39.27,
	},
	{
		hours_studied: 14.56,
		test_score: 14.49,
	},
	{
		hours_studied: 30.59,
		test_score: 64.15,
	},
	{
		hours_studied: 6.97,
		test_score: 16.56,
	},
	{
		hours_studied: 14.61,
		test_score: 29.27,
	},
	{
		hours_studied: 18.32,
		test_score: 34.29,
	},
	{
		hours_studied: 22.8,
		test_score: 31.45,
	},
	{
		hours_studied: 39.26,
		test_score: 74.31,
	},
	{
		hours_studied: 9.98,
		test_score: 16.54,
	},
	{
		hours_studied: 25.71,
		test_score: 43.4,
	},
	{
		hours_studied: 29.62,
		test_score: 57.63,
	},
	{
		hours_studied: 2.32,
		test_score: 8.69,
	},
	{
		hours_studied: 30.38,
		test_score: 79.62,
	},
	{
		hours_studied: 8.53,
		test_score: 18.8,
	},
	{
		hours_studied: 3.25,
		test_score: 9.08,
	},
	{
		hours_studied: 47.44,
		test_score: 94.14,
	},
	{
		hours_studied: 48.28,
		test_score: 77.38,
	},
	{
		hours_studied: 40.42,
		test_score: 80.57,
	},
	{
		hours_studied: 15.23,
		test_score: 31.06,
	},
	{
		hours_studied: 4.88,
		test_score: 34.4,
	},
	{
		hours_studied: 34.21,
		test_score: 66.5,
	},
	{
		hours_studied: 22.01,
		test_score: 47.03,
	},
	{
		hours_studied: 6.1,
		test_score: 11.86,
	},
	{
		hours_studied: 24.76,
		test_score: 37.83,
	},
	{
		hours_studied: 1.72,
		test_score: 14.87,
	},
	{
		hours_studied: 45.47,
		test_score: 98.45,
	},
	{
		hours_studied: 12.94,
		test_score: 33.79,
	},
	{
		hours_studied: 33.13,
		test_score: 57.16,
	},
	{
		hours_studied: 15.59,
		test_score: 45.2,
	},
	{
		hours_studied: 26.0,
		test_score: 37.99,
	},
	{
		hours_studied: 27.34,
		test_score: 60.54,
	},
	{
		hours_studied: 9.24,
		test_score: 40.39,
	},
	{
		hours_studied: 48.48,
		test_score: 87.05,
	},
	{
		hours_studied: 38.76,
		test_score: 71.85,
	},
	{
		hours_studied: 46.97,
		test_score: 94.95,
	},
	{
		hours_studied: 44.74,
		test_score: 84.45,
	},
	{
		hours_studied: 29.89,
		test_score: 44.28,
	},
	{
		hours_studied: 46.09,
		test_score: 92.87,
	},
	{
		hours_studied: 4.42,
		test_score: 0.0,
	},
	{
		hours_studied: 9.8,
		test_score: 24.33,
	},
	{
		hours_studied: 2.26,
		test_score: 0.0,
	},
	{
		hours_studied: 16.27,
		test_score: 48.03,
	},
	{
		hours_studied: 19.43,
		test_score: 31.04,
	},
	{
		hours_studied: 13.57,
		test_score: 23.91,
	},
	{
		hours_studied: 41.44,
		test_score: 91.01,
	},
	{
		hours_studied: 17.84,
		test_score: 23.37,
	},
	{
		hours_studied: 14.05,
		test_score: 30.37,
	},
	{
		hours_studied: 27.13,
		test_score: 67.34,
	},
	{
		hours_studied: 7.05,
		test_score: 0.0,
	},
	{
		hours_studied: 40.11,
		test_score: 82.07,
	},
	{
		hours_studied: 3.73,
		test_score: 10.05,
	},
	{
		hours_studied: 49.34,
		test_score: 100.0,
	},
	{
		hours_studied: 38.61,
		test_score: 64.85,
	},
	{
		hours_studied: 9.94,
		test_score: 6.67,
	},
	{
		hours_studied: 0.28,
		test_score: 5.77,
	},
	{
		hours_studied: 40.77,
		test_score: 84.52,
	},
	{
		hours_studied: 35.34,
		test_score: 73.19,
	},
	{
		hours_studied: 36.45,
		test_score: 76.37,
	},
	{
		hours_studied: 38.56,
		test_score: 70.33,
	},
	{
		hours_studied: 3.7,
		test_score: 9.73,
	},
	{
		hours_studied: 17.92,
		test_score: 38.78,
	},
	{
		hours_studied: 5.79,
		test_score: 4.44,
	},
	{
		hours_studied: 43.16,
		test_score: 100.0,
	},
	{
		hours_studied: 31.16,
		test_score: 67.07,
	},
	{
		hours_studied: 16.54,
		test_score: 21.18,
	},
	{
		hours_studied: 3.18,
		test_score: 12.92,
	},
	{
		hours_studied: 15.55,
		test_score: 21.35,
	},
	{
		hours_studied: 16.26,
		test_score: 40.39,
	},
	{
		hours_studied: 36.48,
		test_score: 84.55,
	},
	{
		hours_studied: 31.88,
		test_score: 55.55,
	},
	{
		hours_studied: 44.36,
		test_score: 98.36,
	},
	{
		hours_studied: 23.61,
		test_score: 51.35,
	},
	{
		hours_studied: 5.98,
		test_score: 20.18,
	},
	{
		hours_studied: 35.66,
		test_score: 90.29,
	},
	{
		hours_studied: 38.04,
		test_score: 73.62,
	},
	{
		hours_studied: 28.06,
		test_score: 48.59,
	},
	{
		hours_studied: 38.55,
		test_score: 68.2,
	},
	{
		hours_studied: 24.69,
		test_score: 41.22,
	},
	{
		hours_studied: 26.14,
		test_score: 51.5,
	},
	{
		hours_studied: 21.38,
		test_score: 46.17,
	},
	{
		hours_studied: 1.27,
		test_score: 5.31,
	},
	{
		hours_studied: 5.39,
		test_score: 19.06,
	},
];
