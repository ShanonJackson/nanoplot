type Props = {
	value?: boolean;
	onChange?: (checked: boolean) => void;
	description?: string;
};

export const BooleanControl = ({ value = false, description, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer select-none"}>
			<input
				type={"checkbox"}
				checked={value}
				value={value ? "on" : "off"}
				onChange={(e) => onChange(e.target.checked)}
				onClick={(e) => e.stopPropagation()}
			/>
			<span className={"ml-2 dark:text-white"}>{description}</span>
		</label>
	);
};
