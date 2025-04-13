type Props = {
	header?: string;
	noteContent: string;
};

export const DocumentationNote = ({ header = "Note", noteContent }: Props) => {
	return (
		<div className="text-neutral-700 dark:text-neutral-300 border-l-4 border-emerald-500 dark:border-emerald-400 bg-gray-100 dark:bg-slate-800 p-6">
			<p className="font-semibold mb-2">{header}</p>
			<p className="">{noteContent}</p>
		</div>
	);
};
