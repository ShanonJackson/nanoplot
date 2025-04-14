"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";

export default function Page() {
	return (
		<div className={"p-8"}>
			<DocumentationHeading level={1}>Radar Chart</DocumentationHeading>
			<DocumentationNote>
				Radar graphs are best used for comparing multiple variables across categories with a shared scale, i.e. performance metrics
				or feature comparisons.
			</DocumentationNote>
			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required"]}
				data={data}
				renderers={{
					Name: (val) => (
						<a href={val.href} className={"cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"}>
							{val.value}
						</a>
					),
				}}
			/>
		</div>
	);
}
const data = [
	{ Name: { value: "loading", href: "/graphs/radar" }, Description: "Displays a loading skeleton", Type: "boolean", Required: "No" },
	{
		Name: { value: "scalars", href: "/graphs/radar" },
		Description: "Specifies the values for chart rings",
		Type: "number[]",
		Required: "No",
	},
	{ Name: { value: "className", href: "/graphs/radar" }, Description: "Applies a custom class", Type: "string", Required: "No" },
	{ Name: { value: "labels", href: "/graphs/radar" }, Description: "Displays axis labels", Type: "boolean", Required: "No" },
];
