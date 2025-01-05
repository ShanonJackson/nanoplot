type Props = {
	options: Array<string>;
	description?: string;
	setPosition: (position: string) => void;
};

const EnumControl = ({ description, options, setPosition }: Props) => {
	return (
		<>
			<div role="list">
				{options.map((position, index) => {
					return (
						<label role="listitem" onClick={() => setPosition(position)} key={index}>
							{position}
						</label>
					);
				})}
			</div>
			<span>{description}</span>
		</>
	);
};

export { EnumControl };
