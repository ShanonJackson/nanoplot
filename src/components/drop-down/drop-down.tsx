import { cx } from "@/utils/cx/cx";
import Link from "next/link";

export type DropDownItem = {
	label: string;
	value: string;
	icon?: React.ReactNode;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	label: React.ReactNode;
	items: DropDownItem[];
	arrow?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const DropDown = ({ label, items, arrow = true, className = "", children }: Props) => {
	return (
		<div className="relative inline-block text-left group">
			<button className="inline-flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-primary">
				{label}
				{arrow && (
					<svg
						className="w-5 h-5 ml-1 transform transition-transform group-hover:rotate-180"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</button>

			<div
				className={cx(
					"absolute z-10 left-0 w-screen lg:w-fit mt-2 min-w-32 origin-top-right rounded-md shadow-lg ring-opacity-5 bg-primary invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200",
					className,
				)}
			>
				<div className="py-1">
					{items.map((item) => (
						<Link
							href={item.value}
							key={item.value}
							className="flex items-center w-full px-4 py-2 text-sm cursor-pointer hover:bg-primary-foreground"
						>
							{item.icon && <span className="mr-3">{item.icon}</span>}
							{item.label}
						</Link>
					))}
				</div>
				{children}
			</div>
		</div>
	);
};
