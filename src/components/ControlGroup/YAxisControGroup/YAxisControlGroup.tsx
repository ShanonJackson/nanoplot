import { ComponentProps, FC } from "react";
import { Control } from "../../Docs/Control/Control";
import { ControlGroup } from "../ControlGroup";
import { HTMLControl } from "../../Docs/Control/components/HTMLControl/HTMLControl";
import { YAxis } from "@/components/YAxis/YAxis";

type YAxis = ComponentProps<typeof YAxis>;

type Props = {
	state: YAxis;
	onChange: (setYAxisPartial: Partial<YAxis>) => void;
};

export const YAxisControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<ControlGroup title={"YAxis"}>
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
