import { ComponentProps, FC, useEffect } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { propFor } from "../../../utils/prop-for/prop-for";
import { Pie } from "../../Pie/Pie";
import { BooleanControl } from "../../Docs/Control/components/BooleanControl/BooleanControl";
import { HTMLControl } from "../../Docs/Control/components/HTMLControl/HTMLControl";
import { SliderControl } from "../../Docs/Control/components/SliderControl/SliderControl";

export type PieControls = ComponentProps<typeof Pie>;
type Props = {
	state: PieControls;
	onChange: (setGridPartial: PieControls) => void;
};
export const PieControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<ControlGroup title={"Pie"}>
			<Control name={"loading"} type={"boolean"}>
				<BooleanControl
					value={state.loading}
					onChange={(loading) => onChange({ ...state, loading })}
					description={"Renders loading skeleton placeholder"}
				/>
			</Control>
			<Control name={"glow"} type={"boolean"}>
				<BooleanControl
					value={state.glow}
					onChange={(glow) => onChange({ ...state, glow })}
					description={"Applies a glow effect to the Pie"}
				/>
			</Control>
			<Control name={"donut"} type={"boolean | number"}>
				<BooleanControl
					value={Boolean(state.donut)}
					onChange={(donut) => onChange({ ...state, donut })}
					description={"Renders a donut chart instead of a pie chart"}
				/>
				<SliderControl value={Number(state.donut)} onChange={(donut) => onChange({ ...state, donut })} />
			</Control>
			<Control name={"labels"} type={"boolean"} default={"true"}>
				<BooleanControl
					value={Boolean(state.labels)}
					onChange={(labels) => onChange({ ...state, labels })}
					description={"Renders labels on the pie chart"}
				/>
			</Control>
			<Control name="children" type="ReactNode">
				<HTMLControl html={state.children?.toString() ?? ""} onChange={(children) => onChange({ ...state, children })} />
			</Control>
		</ControlGroup>
	);
};
