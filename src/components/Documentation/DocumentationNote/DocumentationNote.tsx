type Props = {
	header?: string;
	noteContent: string;
};

export const DocumentationNote = ({ header = "Note", noteContent }: Props) => {
	return (
		<div className="border-l-4 border-emerald-500 bg-gray-100 p-6">
			<p className="font-semibold mb-2">{header}</p>
			<p className="">{noteContent}</p>
		</div>
	);
};
