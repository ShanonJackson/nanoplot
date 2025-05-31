import { cx } from "../../../utils/cx/cx";

type Props = {
	children: React.ReactNode;
	playground?: boolean;
	className?: string;
};

export const DocumentationLayout = ({ children, playground, className }: Props) => {
	return (
		<div
			className={cx(
				"p-6 md:p-8 max-w-[1500px] md:w-full",
				playground && "h-[calc(100vh-80px)] grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr]",
				className,
			)}
		>
			{children}
		</div>
	);
};
