import { ComponentProps, FC } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { Bars } from "@/components/Bars/Bars";
import { SliderControl } from "@/components/Docs/Control/components/SliderControl/SliderControl";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { VerticalBars } from "@/components/Bars/components/VerticalBars";

type Props = {
	state: ComponentProps<typeof VerticalBars>;
	onChange: (setGridPartial: Partial<ComponentProps<typeof VerticalBars>>) => void;
};
export const BarsControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<ControlGroup title={"Bars"}>
			<Control name={"loading"} type={"boolean"} default={"false"}>
				<BooleanControl
					value={state.loading}
					onChange={(checked) => onChange({ ...state, loading: checked })}
					description={"Adds Loading Animation"}
				/>
			</Control>
			<Control name={"glow"} type={"boolean"} default={"false"}>
				<BooleanControl
					value={state.glow}
					onChange={(checked) => onChange({ ...state, glow: checked })}
					description={"Adds glow effect to bars"}
				/>
			</Control>
			<Control name={"size"} type={"number"} default={"45"}>
				<SliderControl
					value={state.size ?? 45}
					onChange={(value) => onChange({ ...state, size: value })}
					description={"Size of the bars as percent 0-100"}
				/>
			</Control>
			<Control name={"radius"} type={"number"} default={"0"}>
				<SliderControl
					value={state.radius ?? 0}
					onChange={(value) => onChange({ ...state, radius: value })}
					description={"Radius of the bars as angle 0-360"}
				/>
			</Control>
		</ControlGroup>
	);
};
