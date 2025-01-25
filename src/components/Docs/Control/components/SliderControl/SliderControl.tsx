type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
	value?: number;
	onChange?: (value: number) => void;
	description?: string;
	defaultValue?: number;
	vertical?: boolean;
};

export const SliderControl = ({ value, description, defaultValue, vertical, onChange = Object, ...rest }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"+(vertical?" -rotate-90 -translate-x-1/2 translate-y-28":"")}>
			<input type={"range"} defaultValue={defaultValue} value={+(value ?? 0)} onChange={(e) => onChange(+e.target.value)} {...rest}  />
			<span className={"ml-2"}>{description}</span>
		</label>
	);
};
