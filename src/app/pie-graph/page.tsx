"use client";
import { Pie } from "@/components/Pie/Pie";
import { Graph } from "@/components/Graph/Graph";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import { Control } from "@/components/Docs/Control/Control";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { ComponentProps, useState } from "react";
import { Legend } from "@/components/Legend/Legend";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";

export default function Page() {
	const [pie, setPie] = useState<ComponentProps<typeof Pie>>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});
	const setPiePartial = (partial: Partial<ComponentProps<typeof Pie>>) => setPie((prev) => ({ ...prev, ...partial }));
	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<ControlGroup title={"Pie"}>
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
					<Control name="children" type="ReactNode">
						<HTMLControl html={pie.children?.toString() ?? ""} onChange={(children) => setPiePartial({ children })} />
					</Control>
				</ControlGroup>
			</ControlPanel>
			<GraphPanel>
				<Graph data={MOCK_DATA}>
					<Pie {...pie}>{pie.children && <div dangerouslySetInnerHTML={{ __html: pie.children.toString() ?? "" }} />}</Pie>
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
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
