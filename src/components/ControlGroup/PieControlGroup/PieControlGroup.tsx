import { ComponentProps, FC, useEffect } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { propFor } from "../../../utils/prop-for/prop-for";
import { Pie } from "../../Pie/Pie";
import { BooleanControl } from "../../Docs/Control/components/BooleanControl/BooleanControl";
import { HTMLControl } from "../../Docs/Control/components/HTMLControl/HTMLControl";

export type PieControls = ComponentProps<typeof Pie> & {
	example?: {
		props?: string;
		children?: string;
	};
};
type Props = {
	state: PieControls;
	onChange: (setGridPartial: PieControls) => void;
};
export const PieControlGroup: FC<Props> = ({ state, onChange }) => {
	useEffect(() => onControlChange(state), []);

	const onControlChange = (nextState: ComponentProps<typeof Pie>) => {
		const props = [
			propFor.boolean({ prop: "loading", value: nextState.loading }),
			propFor.boolean({ prop: "donut", value: Boolean(nextState.donut) }),
			propFor.boolean({ prop: "labels", value: nextState.labels }),
		]
			.filter(Boolean)
			.join(" ");
		onChange({
			...nextState,
			example: {
				props: props.replace(/\s/g, "").length ? " " + props : "",
				children: nextState.children?.toString() ?? "",
			},
		});
	};

	return (
		<ControlGroup title={"Pie"}>
			<Control name={"loading"} type={"boolean"}>
				<BooleanControl
					value={state.loading}
					onChange={(loading) => onControlChange({ ...state, loading })}
					description={"Renders loading skeleton placeholder"}
				/>
			</Control>
			<Control name={"glow"} type={"boolean"}>
				<BooleanControl
					value={state.glow}
					onChange={(glow) => onControlChange({ ...state, glow })}
					description={"Applies a glow effect to the Pie"}
				/>
			</Control>
			<Control name={"donut"} type={"boolean"}>
				<BooleanControl
					value={Boolean(state.donut)}
					onChange={(donut) => onControlChange({ ...state, donut })}
					description={"Renders a donut chart instead of a pie chart"}
				/>
			</Control>
			<Control name={"labels"} type={"boolean"} default={"true"}>
				<BooleanControl
					value={Boolean(state.labels)}
					onChange={(labels) => onControlChange({ ...state, labels })}
					description={"Renders labels on the pie chart"}
				/>
			</Control>
			<Control name="children" type="ReactNode">
				<HTMLControl html={state.children?.toString() ?? ""} onChange={(children) => onControlChange({ ...state, children })} />
			</Control>
		</ControlGroup>
	);
};
