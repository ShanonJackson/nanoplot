"use client";
import { PieGraph } from "@/components/PieGraph/PieGraph";
import { Graph } from "@/components/Graph/Graph";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { Control } from "@/components/Docs/Control/Control";
import { ComponentProps, useState } from "react";

export default function Page() {
	const [pie, setPie] = useState<ComponentProps<typeof PieGraph>>({
		loading: false,
		donut: false,
	});
	const setPiePartial = (partial: Partial<ComponentProps<typeof PieGraph>>) => setPie((prev) => ({ ...prev, ...partial }));
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-black dark:border-white"}>
				<Control name={"loading"} type={"boolean"}>
					<BooleanControl
						value={pie.loading}
						onChange={(loading) => setPiePartial({ loading })}
						description={"Renders loading skeleton placeholder"}
					/>
				</Control>
				<Control name={"donut"} type={"boolean"}>
					<BooleanControl
						value={pie.donut}
						onChange={(donut) => setPiePartial({ donut })}
						description={"Renders a donut chart instead of a pie chart"}
					/>
				</Control>
			</div>
			<div className={"border-[1px] h-full border-dotted border-black dark:border-white"}>
				<Graph data={MOCK_DATA}>
					<PieGraph {...pie} />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-black dark:border-white"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{
		name: "python python python python python",
		value: 283,
	},
	{
		name: "elixir",
		value: 333,
	},
	{
		name: "stylus stylus stylus stylus stylus stylus",
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
