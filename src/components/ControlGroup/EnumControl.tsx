type Props = {
	options: Array<string>;
	description: string;
	onChange: (position: string) => void;
};

export const EnumControl = ({ description, options, onChange }: Props) => {
	return (
		<>
			<div role="list">
				{options.map((position, index) => {
					return (
						<label role="listitem" onClick={() => onChange(position)} key={index}>
							{position}
						</label>
					);
				})}
			</div>
			<span>{description}</span>
		</>
	);
};