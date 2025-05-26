import { ComponentProps, FC } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { Lines } from "../../Lines/Lines";
import { CurveUtils } from "../../../utils/path/curve";
import { EnumControl } from "../../Docs/Control/components/EnumControl/EnumControl";
import { BooleanControl } from "../../Docs/Control/components/BooleanControl/BooleanControl";

type Props = {
	state: ComponentProps<typeof Lines>;
	onChange: (setGridPartial: Partial<ComponentProps<typeof Lines>>) => void;
};
export const LinesControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<ControlGroup title={"Lines"}>
			<Control
				name={"curve"}
				type={Object.keys(CurveUtils)
					.map((c) => `'${c}'`)
					.join(" | ")}
				default={"linear"}
			>
				<EnumControl
					options={Object.keys(CurveUtils)}
					value={state.curve ?? "linear"}
					description={"Curves lines to make them smooth or sharp."}
					onChange={(value) => onChange({ ...state, curve: value })}
				/>
			</Control>
			<Control name={"joints"} type={"boolean"} default={"false"}>
				<BooleanControl
					value={Boolean(state.joints) ?? false}
					description={"Show joints between lines."}
					onChange={(value) => onChange({ ...state, joints: value })}
				/>
			</Control>
		</ControlGroup>
	);
};
