type Props = {
	value?: boolean;
	onChange?: (checked: boolean) => void;
	description?: string;
};

export const BooleanControl = ({ value, description, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
			<input type={"checkbox"} checked={value} onChange={(e) => onChange(e.target.checked)} />
			<span className={"ml-2"}>{description}</span>
		</label>
	);
};
