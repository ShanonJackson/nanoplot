import { ComponentProps, FC } from "react";
import { Control } from "../../Docs/Control/Control"
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import {Pie } from "@/components/Pie/Pie"

type Pie = ComponentProps<typeof Pie>

type Props = {
	state: Pie;
    onChange: (setPiePartial: Partial<typeof Pie>) => void;
};
export const PieControlsPanel: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<div
				className={
					"row-span-2 h-full border-[1px] border-dotted border-[hsl(0deg,0%,0%)] dark:border-[hsl(0deg,0%,100%)] p-4 dark:bg-gray-800"
				}
			>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<ControlGroup title={"Pie"}>
					<Control name={"loading"} type={"boolean"}>
						<BooleanControl
							value={state.loading}
							onChange={(loading) => onChange({...state, loading })}
							description={"Renders loading skeleton placeholder"}
						/>
					</Control>
					<Control name={"donut"} type={"boolean"}>
						<BooleanControl
							value={state.donut}
							onChange={(donut) => onChange({...state, donut })}
							description={"Renders a donut chart instead of a pie chart"}
						/>
					</Control>
					<Control name={"labels"} type={"boolean"} default={"true"}>
						<BooleanControl
							value={Boolean(state.labels)}
							onChange={(labels) => onChange({...state, labels })}
							description={"Renders labels on the pie chart"}
						/>
					</Control>
					<Control name="children" type="ReactNode">
						<HTMLControl html={state.children?.toString() ?? ""} onChange={(children) => onChange({...state, children })} />
					</Control>
				</ControlGroup>
			</div>
		</>
	);
};
