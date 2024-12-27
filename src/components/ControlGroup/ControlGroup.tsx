import { ReactNode, FC, useState } from "react";

type Props = {
	title: string;
    open: boolean;
	children?: ReactNode;
};
const ControlGroup: FC<Props> = ({ title, open, children }) => {
	const [accordionOpen, setAccordionOpen] = useState(open);
	return (
		<>
			<div>
				<button
					onClick={() => setAccordionOpen(!accordionOpen)}
					role="button"
					name="switch"
					className="flex justify-between w-full py-2 px-2 bg-gradient-to-r from-[hsl(347.29deg,47.58%,51.37%)] to-[hsl(14.2deg,70.71%,53.14%)] text-white
			dark:from-[hsl(209.65deg,52.15%,31.96%)] dark:to-[hsl(210.5deg,68.97%,65.88%)"
				>
					<span className="uppercase font-bold">{title}</span>
                    <svg
						className={`w-5 h-5 ml-1 transform transition-transform ${!accordionOpen ? '' : 'rotate-180'}`}
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
				</button>
				<div
					className={`grid overflow-hidden transition-all duration-300 ease-in-out 
                        ${accordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
				>
					<div className={`overflow-hidden`} style={{ opacity: `${!accordionOpen ? 0 : 1}` }}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default ControlGroup;
