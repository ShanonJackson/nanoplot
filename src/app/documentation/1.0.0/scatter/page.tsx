"use client";
import * as React from "react";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";

export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px] md:w-[100%]"}>
			<DocumentationHeading level={1}>Scatter Graph</DocumentationHeading>
			<DocumentationParagraph>
				Scatter plots are used to visualise individual data points, highlighting relationships, distributions, and potential
				correlations between variables.{" "}
			</DocumentationParagraph>
			<Sandpack files={{ "App.js": scatterExample }} />

			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "trendline", href: "", tag: "code" },
						Description: "Adds trendline to graph",
						Type: "boolean",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "loading", href: "/", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: "boolean",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "className", href: "", tag: "code" },
						Description: "Applies a custom class",
						Type: "string",
						Required: "No",
						Default: "-",
					},
				]}
				renderers={{
					Name: (val) => {
						if (val.href) {
							return <>{val.tag === "code" ? <Code inherit>{val.value}</Code> : val.value}</>;
						}
						return val.tag === "code" ? <Code>{val.value}</Code> : val.value;
					},
					Description: (v: JSX.Element | string) => v,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>

			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied by targeting the class names below. Each class corresponds to a specific element for precise
				theming and overrides.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "scatter__points",
						Element: "Data point elements",
					},
					{
						"Class Name": "scatter__trendline",
						Element: "Trendline element (if enabled)",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</div>
	);
}

const scatterExample = `
import { Graph } from "nanoplot/Graph";
import { Scatter } from "nanoplot/Scatter";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";
import { Legend } from "nanoplot/Legend";

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const MOCK_DATA = new Array(1000).fill(null).map(() => {
	return {
		hours_studied: random(0, 50),
		test_score: random(0, 100),
	};
});
export default function App ()  {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Hours studed vs Grades",
						data: MOCK_DATA.map((dp) => ({ y: dp.test_score, x: dp.hours_studied })),
					},
				]}
			>
				<Legend alignment={"end"} position={"top"} />
				<YAxis ticks={{ to: 100 }}/>
				<GridLines border horizontal vertical />
				<Scatter />
				<Scatter.Tooltip tooltip={(point) => \`\${point.data.x} \${point.data.y}\`} />
				<XAxis ticks={{ to: 50 }} />
			</Graph>
		</div>
	);
}
`;
