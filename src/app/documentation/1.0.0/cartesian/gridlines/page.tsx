import * as React from "react";
import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationTable } from "../../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationCode as Code } from "../../../../../components/Documentation/DocumentationCode/DocumentationCode";

export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px]"}>
			<DocumentationHeading level={1}>Gridlines</DocumentationHeading>
			<Code>{'import { Gridlines } from "nanoplot/gridlines"'}</Code>
			<p className={"my-2"}>
				The gridlines component is used to add gridlines to the graph. It can be used to add gridlines to the X and Y axes and
				border.
			</p>
			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "vertical", tag: "code" },
						Description: "When true renders vertical gridlines on each tick along x axis.",
						Type: `boolean`,
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "horizontal", tag: "code" },
						Description: "When true renders horizontal gridlines on each tick along x axis.",
						Type: `boolean`,
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "border", tag: "code" },
						Description: "When true renders border gridlines along left/right/top/bottom sides",
						Type: `boolean`,
						Required: "No",
						Default: "true",
					},
				]}
				renderers={{
					Name: (val) => {
						return <Code>{val.value}</Code>;
					},
					Type: (val) => <Code>{val}</Code>,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>
		</div>
	);
}
