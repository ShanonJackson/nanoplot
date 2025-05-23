import { ComponentProps, FC } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { CurveUtils } from "../../../utils/path/curve";
import { EnumControl } from "../../Docs/Control/components/EnumControl/EnumControl";
import { Area } from "../../Area/Area";

type Props = {
	state: ComponentProps<typeof Area>;
	onChange: (setGridPartial: Partial<ComponentProps<typeof Area>>) => void;
};
export const AreaControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<ControlGroup title={"Area"}>
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
		</ControlGroup>
	);
};
