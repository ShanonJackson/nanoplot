import { ComponentProps, FC } from "react";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { Lines } from "@/components/Lines/Lines";
import { CurveUtils } from "@/utils/path/curve";
import { EnumControl } from "@/components/Docs/Control/components/EnumControl/EnumControl";

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
					description={"Curving function"}
					onChange={(value) => onChange({ ...state, curve: value })}
				/>
			</Control>
		</ControlGroup>
	);
};
