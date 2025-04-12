"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";

export default function Page() {
	return (
		<div className={"p-8"}>
			<DocumentationNote noteContent={"Note content goes here."} />
			<br />
			<br />
			<DocumentationTable
				columns={["ID", "Name", "Age"]}
				data={data}
				renderers={{
					ID: (val) => (
						<a href={val.href} className={"text-blue-300"}>
							{val.value}
						</a>
					),
				}}
			/>
		</div>
	);
}
const data = [
	{ ID: { value: 1, href: "/shanon" }, Name: "Shan", Age: 32 },
	{ ID: { value: 1, href: "/shanon" }, Name: "Kate", Age: 26 },
	{ ID: { value: 1, href: "/shanon" }, Name: "NooNacker", Age: 38 },
];
