type Props = {
	children: React.ReactNode;
	className?: string;
};

export const DocumentationLayout = ({ children }: Props) => {
	return <div className={"m-2"}>{children}</div>;
};
