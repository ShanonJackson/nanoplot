type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
	value?: number;
	onChange?: (value: number) => void;
	description?: string;
};

export const SliderControl = ({ value, description, defaultValue, onChange = Object, ...rest }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
			<input type={"range"} defaultValue={defaultValue} value={+(value ?? 0)} onChange={(e) => onChange(+e.target.value)} {...rest} />
			<span className={"ml-2"}>{description}</span>
		</label>
	);
};
