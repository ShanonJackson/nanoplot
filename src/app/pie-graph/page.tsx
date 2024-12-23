"use client";
import { PieGraph } from "@/components/PieGraph/PieGraph";
import { Graph } from "@/components/Graph/Graph";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { Control } from "@/components/Docs/Control/Control";
import { ComponentProps, useState } from "react";
import { Legend } from "@/components/Legend/Legend";
import RollTheDice from "@/components/RollTheDice/RollTheDice";
import { Segment } from "../../utils/graph/graphUtils";

export default function Page() {
	const [pie, setPie] = useState<ComponentProps<typeof PieGraph>>({
		loading: false,
		donut: false,
		labels: true,
	});
	const setPiePartial = (partial: Partial<ComponentProps<typeof PieGraph>>) => setPie((prev) => ({ ...prev, ...partial }));

	const [state, setState] = useState<Segment[]>(MOCK_DATA);

	const handleRoll = (): Segment[] => {
		// Implement your roll logic here
		return state.map((segment) => ({
			...segment,
			value: Math.floor(Math.random() * (max_value - min_value + 1)) + min_value,
		}));
	};

	const min_value = 0;
	const max_value = 50000;

	return (
		<div>
			<div className="flex items-center justify-end py-4 pr-8">
				<RollTheDice data={state} onClick={() => setState(handleRoll())} />
			</div>
			<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
				<div className={"row-span-2 h-full border-[1px] border-dotted border-foreground"}>
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
					<Control name={"labels"} type={"boolean"} default={"true"}>
						<BooleanControl
							value={Boolean(pie.labels)}
							onChange={(labels) => setPiePartial({ labels })}
							description={"Renders labels on the pie chart"}
						/>
					</Control>
				</div>
				<div className={"border-[1px] h-full border-dotted border-foreground"}>
					<Graph data={MOCK_DATA}>
						<Legend position={"top"} alignment={"center"} />
						<PieGraph {...pie}></PieGraph>
					</Graph>
				</div>
				<div className={"border-[1px] border-dotted border-foreground"}>EXAMPLES</div>
			</div>
		</div>
	);
}

const MOCK_DATA: Segment[] = [
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
