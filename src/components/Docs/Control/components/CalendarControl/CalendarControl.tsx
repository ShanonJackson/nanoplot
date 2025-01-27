type Props = {
	value: Date;
	onChange: (value: Date) => void;
};

export const CalendarControl = ({ value, onChange }: Props) => {
	return (
		<div className={"flex gap-4 text-black"}>
			<input
				type="date"
				value={value.toISOString().split("T")[0]}
				onChange={(e) => {
					const newDate = new Date(e.currentTarget.value);
					newDate.setHours(value.getHours(), value.getMinutes(), value.getSeconds());
					onChange(newDate);
				}}
			/>
		</div>
	);
};

