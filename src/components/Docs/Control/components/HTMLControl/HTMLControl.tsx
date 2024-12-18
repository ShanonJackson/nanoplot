type Props = {
	html?: string;
	onChange?: (newHTML: string) => void;
};

export const HTMLControl = ({ html, onChange = Object }: Props) => {
	return (
		<label className={"flex items-center cursor-pointer"}>
            <textarea className={"[resize:both]"} value={html} onChange={(e) => onChange(e.target.value)}></textarea>
		</label>
	);
};
