"use client";
import * as React from "react";
import { JSX } from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Area Chart</DocumentationHeading>
			<DocumentationParagraph>
				An area chart displays trends over time. In stacked versions, each series is layered to highlight cumulative trends and
				combined totals.
			</DocumentationParagraph>
			<Sandpack
				files={{
					"App.js": areaExample,
				}}
			/>

			<DocumentationNote>
				Stacked area charts are a common use case, as shown in the example above, used to visualise cumulative trends over time.
			</DocumentationNote>

			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "curve", href: "", tag: "code" },
						Description: "Sets the curve type used to render the line path between data points",
						Type: (
							<>
								<Code>'linear'</Code> | <Code>'natural'</Code> | <Code>'monotoneX'</Code> | <Code>'stepBefore'</Code> |{" "}
								<Code>'stepAfter'</Code>
							</>
						),
						Required: "No",
						Default: "'linear'",
					},
					{
						Name: { value: "children", href: "", tag: "code" },
						Description: "Custom SVG element rendered inside the graph",
						Type: <Code>ReactNode</Code>,
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "loading", href: "", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: <Code>boolean</Code>,
						Required: "No",
						Default: "false",
					},
				]}
				renderers={{
					Name: (val) => {
						if (val.href) {
							return (
								<a href={val.href} className={"cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"}>
									{val.tag === "code" ? <Code inherit>{val.value}</Code> : val.value}
								</a>
							);
						}
						return val.tag === "code" ? <Code>{val.value}</Code> : val.value;
					},
					Type: (v: JSX.Element | string) => v,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>

			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied to the area chart by targeting the class names below.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "area__stroke",
						Element: "The line path",
					},
					{
						"Class Name": "area__fill",
						Element: "Filled area beneath the line",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</DocumentationLayout>
	);
}

const areaExample = `import { Graph } from "nanoplot/Graph";
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Email",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 4 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 2 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 3 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 4 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 5 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 3 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 5 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 2 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 4 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 4 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 3 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 4 },
						],
					},
					{
						name: "Social",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 7 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 9 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 8 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 8 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 7 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 10 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 8 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 9 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 7 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 9 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 7 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 8 },
						],
					},
					{
						name: "Direct",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 11 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 11 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 13 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 11 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 12 },
						],
					},
					{
						name: "Referral",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 12 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 13 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 16 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 15 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 15 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 15 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 16 },
						],
					},
					{
						name: "Paid Search",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 26 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 23 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 28 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 26 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 25 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 25 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 26 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 28 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 26 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 26 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 27 },
						],
					},
					{
						name: "Organic",
						group: "Site Traffic",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 42 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 33 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 33 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 35 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 33 },
						],
					},
				]}
			>
				<YAxis ticks={{ to: 100 }} display={(y) => y.toString() + "%"} />
				<GridLines border horizontal vertical />
				<Area />
				<Area.Tooltip className={"bg-white dark:!bg-black"} />
				<XAxis
					ticks={{ jumps: "P1M" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null;
						return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
					}}
				/>
			</Graph>
		</div>
	);
};
`;
