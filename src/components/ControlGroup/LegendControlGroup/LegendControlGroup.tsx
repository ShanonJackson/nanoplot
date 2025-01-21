import { ComponentProps, FC } from "react";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { Control } from "@/components/Docs/Control/Control";
import { Legend } from "@/components/Legend/Legend";
import { EnumControl } from "@/components/Docs/Control/components/EnumControl/EnumControl";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";

type Legend = ComponentProps<typeof Legend>;

type Props = {
	state: Legend;
	onChange: (setGridPartial: Partial<Legend>) => void;
};
export const LegendControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<ControlGroup title={"Legend"}>
				<Control name={"loading"} type={"boolean"} default={"false"}>
					<BooleanControl
						value={state.loading}
						onChange={(checked) => onChange({ ...state, loading: checked })}
						description={"Renders loading skeleton placeholder"}
					/>
				</Control>
				<Control name={"position"} type={"'top' | 'right' | 'bottom' | 'left'"} required={true}>
					<EnumControl
						options={["top", "right", "bottom", "left"]}
						value={state.position}
						onChange={(opt) => onChange({ ...state, position: opt === state.position ? undefined : opt })}
						description={"Positions legend element as row/column depending on option in correct 'slot'"}
					/>
				</Control>
				<Control name={"alignment"} type={"'center' | 'start' | 'end'"} default={"false"}>
					<EnumControl
						value={state.alignment}
						options={["center", "start", "end"]}
						onChange={(opt) => onChange({ ...state, alignment: opt === state.alignment ? undefined : opt })}
						description={"Aligns the content within legend."}
					/>
				</Control>
			</ControlGroup>
		</>
	);
};
