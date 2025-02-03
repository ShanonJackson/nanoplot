import { ComponentProps, FC, useEffect } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { VerticalBars } from "../../Bars/components/VerticalBars";
import { BooleanControl } from "../../Docs/Control/components/BooleanControl/BooleanControl";
import { SliderControl } from "../../Docs/Control/components/SliderControl/SliderControl";
import { propFor } from "../../../utils/prop-for/prop-for";
import { Bars } from "../../Bars/Bars";

export type BarControls = ComponentProps<typeof VerticalBars> & {
	example?: {
		props?: string;
		children?: string;
	};
};

type Props = {
	state: BarControls;
	onChange: (setGridPartial: BarControls) => void;
};
export const BarsControlGroup: FC<Props> = ({ state, onChange }) => {
	useEffect(() => onControlChange(state), []);

	const onControlChange = (nextState: Partial<ComponentProps<typeof VerticalBars>>) => {
		const data = { ...state, ...nextState };
		const props = [
			propFor.boolean({ prop: "loading", value: data.loading }),
			propFor.boolean({ prop: "glow", value: data.glow }),
			propFor.number({ prop: "size", value: data.size }),
			propFor.number({ prop: "radius", value: data.radius }),
		]
			.filter(Boolean)
			.join(" ");
		onChange({
			...data,
			example: {
				props: props.replace(/\s/g, "").length ? " " + props : "",
				children: data.children?.toString() ?? "",
			},
		});
	};

	return (
		<ControlGroup title={"Bars"}>
			<Control name={"loading"} type={"boolean"} default={"false"}>
				<BooleanControl
					value={state.loading}
					onChange={(checked) => onControlChange({ loading: checked })}
					description={"Adds Loading Animation"}
				/>
			</Control>
			<Control name={"glow"} type={"boolean"} default={"false"}>
				<BooleanControl
					value={state.glow}
					onChange={(checked) => onControlChange({ glow: checked })}
					description={"Adds glow effect to bars"}
				/>
			</Control>
			<Control name={"size"} type={"number"} default={"50"}>
				<SliderControl
					value={state.size ?? 50}
					onChange={(value) => onControlChange({ size: value })}
					description={"Size of the bars as percent 0-100"}
				/>
			</Control>
			<Control name={"radius"} type={"number"} default={"0"}>
				<SliderControl
					value={state.radius ?? 0}
					onChange={(value) => onControlChange({ radius: value })}
					description={"Radius of the bars as angle 0-360"}
				/>
			</Control>
		</ControlGroup>
	);
};
