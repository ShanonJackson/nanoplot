type Props = {
	value?: number;
	onChange?: (value: number) => void;
	description?: string;
};

export const SliderControl = ({ value, description, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
			<input type={"range"} value={+(value ?? 0)} onChange={(e) => onChange(+e.target.value)} />
			<span className={"ml-2"}>{description}</span>
		</label>
	);
};
