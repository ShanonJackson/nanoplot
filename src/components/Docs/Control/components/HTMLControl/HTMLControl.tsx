type Props = {
	html?: string;
	onChange?: (newHTML: string) => void;
};

export const HTMLControl = ({ html, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
			<textarea
				className={"[resize:both] border-[1px] border-black min-w-60 dark:text-black"}
				value={html}
				onChange={(e) => onChange(e.target.value)}
				placeholder="I.E <div>HELLO WORLD</div>"
			></textarea>
		</label>
	);
};
