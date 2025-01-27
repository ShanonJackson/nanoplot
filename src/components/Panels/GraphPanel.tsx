import { ComponentType, FC, ReactNode, useState } from "react";
import { Tabs } from "@/components/Tabs/Tabs";
import { CodeBlock } from "@/components/CodeHighlighter/CodeHighlighter";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";

type Props = {
	code?: string;
	examples?: Array<{ name: string; code: string; component: ComponentType }>;
	children: ReactNode;
};
export const GraphPanel: FC<Props> = ({ examples = [], code, children }) => {
	const [tab, setTab] = useState("chart");
	const [example, setExample] = useState<{ name: string; code: string; component: ComponentType }>();
	return (
		<>
			<div className={"flex flex-col h-full border-dotted border border-black dark:border-white overflow-hidden resize"}>
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
