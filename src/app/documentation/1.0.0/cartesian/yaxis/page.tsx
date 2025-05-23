import * as React from "react";
import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationTable } from "../../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationCode as Code } from "../../../../../components/Documentation/DocumentationCode/DocumentationCode";

export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px]"}>
			<DocumentationHeading level={1}>Y Axis</DocumentationHeading>
			<p className={"my-2"}>
				The YAxis component can render on the left/right side and with custom dataset support (multiple YAxis).
			</p>
			<ul className={"list-disc list-inside"}>
				<li>linear [default]</li>
				<li>categorical - Will be spaced evenly on the YAxis, When 'y' in dataset is a string.</li>
				<li>temporal - When 'y' in dataset is a javascript date object.</li>
				<li>logarithmic [Coming Soon]</li>
			</ul>
			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "ticks", tag: "code" },
						Description: "Control for the ticks that run along the YAxis",
						Type: `export type FromToJumps = {
	from?: From;
	to?: To;
	jumps?: Jumps;
};
export type MinMax = "min" | "max";
export type ISODuration = \`P\${string}\`;
export type Expression =
	| "auto"
	| "min"
	| "max"
	| \`\${MinMax} - \${number}\`
	| \`\${MinMax} - \${number}%\`
	| \`\${MinMax} - \${ISODuration}\`
	| \`\${MinMax} + \${number}%\`
	| \`\${MinMax} + \${number}\`
	| \`\${MinMax} + \${ISODuration}\`
	| number;
type From = "auto" | Expression | number;
type To = "auto" | Expression | number;
type Jumps = "auto" | ISODuration | number;`,
						Required: "No",
						Default: "{from: 'auto', to: 'auto', jumps: 'auto'}",
					},
					{
						Name: { value: "title", tag: "code" },
						Description: "Sets the title of the YAxis",
						Type: "string",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "display", tag: "code" },
						Description: "Custom display function for the YAxis ticks",
						Type: "(tick) => ReactNode",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "description", tag: "code" },
						Description: "Sets the description of the YAxis",
						Type: "string",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "position", tag: "code" },
						Description: "Sets the position of the YAxis. Can be 'top', 'bottom', 'left', or 'right'. Default is 'left'.",
						Type: "'left' | 'right'",
						Required: "No",
						Default: "'left'",
					},
					{
						Name: { value: "dataset", tag: "code" },
						Description: "Changes the dataset used to render the YAxis",
						Type: "string",
						Required: "No",
						Default: "-",
					},
				]}
				renderers={{
					Name: (val) => {
						return val.tag === "code" ? <Code>{val.value}</Code> : val.value;
					},
					Type: (val) => <Code>{val}</Code>,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>
			<DocumentationHeading level={2}>Examples</DocumentationHeading>
			<Code>{"<YAxis ticks={{ from: 'min - P1M', to: 'max + P1M', jumps: 'P1M' }}/>"}</Code> - From the minimum date in the dataset
			minus 1 month, to the max in the dataset plus 1 month, jumping by 1 month.
			<br />
			<Code>{"<YAxis ticks={{ from: 'min - P1M15D', to: 'max + P1M15D', jumps: 'P1Y' }}/>"}</Code> - From the minimum date in the
			dataset minus 1 month and 15 days, to the max in the dataset plus 1 month and 15 days, jumping by 1 year.
			<br />
			<Code>{"<YAxis ticks={{ from: -25, to: 100, jumps: 5 }}/>"}</Code> - From -25 to 100, in 5 jumps. (-25, 0, 25, 50, 75, 100)
			<br />
			<Code>{"<YAxis ticks={{ from: -25, to: 'auto', jumps: 'auto' }}/>"}</Code> - From -25 but the library will pick the most
			appropriate max value and number of jumps based on the dataset
		</div>
	);
}
