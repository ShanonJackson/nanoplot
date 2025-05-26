import * as React from "react";
import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationCode as Code } from "../../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { DocumentationTable } from "../../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationNote } from "../../../../../components/Documentation/DocumentationNote/DocumentationNote";

export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px]"}>
			<DocumentationHeading level={1}>Legend</DocumentationHeading>
			<Code>{'import { Legend } from "nanoplot/Legend"'}</Code>
			<p className={"my-2"}>
				The Legend component is used to display a legend for the graph. It can be used to display the names of the datasets and
				their respective colors.
			</p>
			<DocumentationNote>
				As with all child components of Graphs. Legend must be rendered top to bottom left to right in the JSX Tree based on what's
				being rendered.
				<Code>
					{`
<Graph data={...}>
	<YAxis/>
	<Lines/>
	<Legend position={"top"}/>
</Graph>`}
				</Code>
				<br />
				Would be invalid as if Legend is position="top" then it must be placed before YAxis (rendered on the left) following top to
				bottom left to right. Same as how HTML renders
			</DocumentationNote>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "position", tag: "code" },
						Description: "Sets the position of the legend on the graph",
						Type: '"top" | "bottom" | "left" | "right"',
						Required: "No",
						Default: '"top"',
					},
					{
						Name: { value: "alignment", tag: "code" },
						Description: "Sets the alignment of the legend",
						Type: '"center" | "start" | "end"',
						Required: "No",
						Default: '"center"',
					},
				]}
				renderers={{
					Name: (val) => <Code>{val.value}</Code>,
					Type: (val) => <Code>{val}</Code>,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>
			<DocumentationHeading level={2}>Examples</DocumentationHeading>
			<DocumentationTable
				columns={["Snippet", "Result"]}
				data={[
					{
						Snippet: `<Legend position="top" alignment="center" />`,
						Result: "Legend is displayed at the top center of the graph",
					},
					{
						Snippet: `<Legend position="bottom" alignment="start" />`,
						Result: "Legend is displayed at the bottom left of the graph",
					},
					{
						Snippet: `<Legend position="left" alignment="end" />`,
						Result: "Legend is displayed on the left side, aligned to the end",
					},
				]}
				renderers={{
					Snippet: (v) => <Code>{v}</Code>,
				}}
			/>
		</div>
	);
}
