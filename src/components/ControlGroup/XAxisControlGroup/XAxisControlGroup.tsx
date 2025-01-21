import { ComponentProps, FC } from "react";
import { Control } from "../../Docs/Control/Control";
import { ControlGroup } from "../ControlGroup";
import { HTMLControl } from "../../Docs/Control/components/HTMLControl/HTMLControl";
import { XAxis } from "@/components/XAxis/XAxis";

type XAxis = ComponentProps<typeof XAxis>;

type Props = {
	state: XAxis;
	onChange: (setXaxisPartial: Partial<XAxis>) => void;
};

export const XAxisControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<ControlGroup title={"XAxis"}>
				<Control name={"title"} type={"ReactNode"}>
					<HTMLControl html={state.title?.toString() ?? ""} onChange={(html) => onChange({ ...state, title: html })} />
				</Control>
				<Control name={"description"} type={"ReactNode"}>
					<HTMLControl
						html={state.description?.toString() ?? ""}
						onChange={(html) => onChange({ ...state, description: html })}
					/>
				</Control>
			</ControlGroup>
		</>
	);
};
