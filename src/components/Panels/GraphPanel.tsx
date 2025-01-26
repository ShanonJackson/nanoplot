import { FC, ReactNode, useState } from "react";
import { Tabs } from "@/components/Tabs/Tabs";
import { CodeBlock } from "@/components/CodeHighlighter/CodeHighlighter";

type Props = {
	data?: string;
	code?: string;
	children: ReactNode;
};
export const GraphPanel: FC<Props> = ({ code, data, children }) => {
	const [tab, setTab] = useState("chart");
	return (
		<div className={"flex flex-col h-full border-dotted border border-black dark:border-white overflow-hidden resize"}>
			<Tabs active={tab} onTabChange={setTab}>
				<Tabs.Tab value="chart" icon="chart-icon" />
				<Tabs.Tab value="code" icon="code-icon" />
				<Tabs.Tab value="data" icon="data-icon" />
			</Tabs>
			<div className={"w-full h-0 flex-1 pt-2"}>
				{tab === "chart" && <>{children}</>}
				{tab === "code" && <CodeBlock code={code ?? "<Coming Soon>"} language="typescript" />}
				{tab === "data" && <CodeBlock code={data ?? ""} language="typescript" />}
			</div>
		</div>
	);
};
