import { ComponentType, FC, ReactNode, useState } from "react";
import { cx } from "../../utils/cx/cx";
import { Tabs } from "../Tabs/Tabs";
import { CodeBlock } from "../CodeHighlighter/CodeHighlighter";
import { ExamplesPanel } from "./ExamplesPanel";

type Props = {
	code?: string;
	examples?: Array<{ name: string; code: string; component: ComponentType }>;
	children: ReactNode;
	className?: string;
};
export const GraphPanel: FC<Props> = ({ examples = [], code, children, className }) => {
	const [tab, setTab] = useState("chart");
	const [example, setExample] = useState<{ name: string; code: string; component: ComponentType }>();
	return (
		<>
			<div
				className={cx(
					"flex flex-col h-full border-solid border border-black dark:border-white overflow-hidden resize row-start-1 min-h-[400px] md:min-h-[unset] md:row-start-[unset]",
					className,
				)}
			>
				<Tabs active={tab} onTabChange={setTab}>
					<Tabs.Tab value="chart" icon="chart-icon" />
					<Tabs.Tab value="code" icon="code-icon" />
				</Tabs>
				<div className={"w-full h-0 flex-1"}>
					{tab === "chart" && <>{example ? <example.component /> : children}</>}
					{tab === "code" && <CodeBlock code={example?.code ?? code ?? "<Coming Soon>"} language="typescript" />}
				</div>
			</div>
			<ExamplesPanel examples={examples} onClick={setExample} active={example?.name} />
		</>
	);
};
