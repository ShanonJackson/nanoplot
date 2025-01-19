import { FC, ComponentProps } from "react";
import { GridLines } from "@/components/GridLines/GridLines";
import { ControlGroup } from "../ControlGroup";
import { Control } from "../../Docs/Control/Control";
import { BooleanControl } from "../../Docs/Control/components/BooleanControl/BooleanControl";

type Grid = ComponentProps<typeof GridLines>;

type Props = {
	state: Grid;
	onChange: (setGridPartial: Partial<Grid>) => void;
};
export const GridLinesControlGroup: FC<Props> = ({ state, onChange }) => {
	return (
		<>
			<ControlGroup title={"GridLines"}>
				<Control name={"border"} type={"boolean"} default={"false"}>
					<BooleanControl
						value={state.border}
						onChange={(checked) => onChange({ ...state, border: checked })}
						description={"Adds Border To Graph"}
					/>
				</Control>
				<Control name={"horizontal"} type={"boolean"} default={"false"}>
					<BooleanControl
						value={state.horizontal}
						onChange={(checked) => onChange({ ...state, horizontal: checked })}
						description={"Adds horizontal grid lines to graph"}
					/>
				</Control>
				<Control name={"vertical"} type={"boolean"} default={"false"}>
					<BooleanControl
						value={state.vertical}
						onChange={(checked) => onChange({ ...state, vertical: checked })}
						description={"Adds vertical grid lines to graph"}
					/>
				</Control>
			</ControlGroup>
		</>
	);
};
