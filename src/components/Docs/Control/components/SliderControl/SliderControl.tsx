type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	value?: number;
	onChange?: (value: number) => void;
	description?: string;
};

export const SliderControl = ({ value, description, defaultValue, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
			<input type={"range"} defaultValue={defaultValue} value={+(value ?? 0)} onChange={(e) => onChange(+e.target.value)} />
			<span className={"ml-2"}>{description}</span>
		</label>
	);
};
