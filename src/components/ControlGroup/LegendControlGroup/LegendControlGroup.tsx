import { ComponentProps, FC } from "react";
import { Legend } from "../../Legend/Legend";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { EnumControl } from "../../Docs/Control/components/EnumControl/EnumControl";

type Legend = ComponentProps<typeof Legend>;

type Props = {
	state: Legend;
	onChange: (setGridPartial: Partial<Legend>) => void;
};
export const LegendControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<ControlGroup title={"Legend"}>
				<Control name={"position"} type={"'top' | 'right' | 'bottom' | 'left'"} required={true}>
					<EnumControl
						options={["top", "right", "bottom", "left"]}
						value={state.position}
						onChange={(opt) => onChange({ ...state, position: opt === state.position ? undefined : opt })}
						description={"Positions legend element as row/column depending on option in correct 'slot'"}
					/>
				</Control>
				<Control name={"alignment"} type={"'center' | 'start' | 'end'"} default={"center"}>
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
