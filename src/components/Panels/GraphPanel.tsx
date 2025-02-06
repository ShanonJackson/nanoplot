import { FC, ReactNode, useState } from "react";
import { cx } from "../../utils/cx/cx";
import { Tabs } from "../Tabs/Tabs";
import { CodeBlock } from "../CodeHighlighter/CodeHighlighter";

type Props = {
	code?: string;
	children: ReactNode;
	className?: string;
};

export const GraphPanel: FC<Props> = ({ code, children, className }) => {
	const [tab, setTab] = useState("chart");

	return (
		<div className="flex flex-col h-full">
			<div
				className={cx(
					"flex flex-col h-full border-dotted border border-black dark:border-white overflow-hidden resize row-start-1 min-h-[400px] md:min-h-[unset] md:row-start-[unset]",
					className
				)}
			>
				<Tabs active={tab} onTabChange={setTab}>
					<Tabs.Tab value="chart" icon="chart-icon" />
					<Tabs.Tab value="code" icon="code-icon" />
				</Tabs>
				<div className="w-full h-0 flex-1">
					{tab === "chart" && children}
					{tab === "code" && <CodeBlock code={code ?? "<Coming Soon>"} language="typescript" />}
				</div>
			</div>
		</div>
	);
};
