"use client";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import * as React from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Heatmap</DocumentationHeading>
			<DocumentationParagraph>
				Heatmaps show data by coloring each quadrant, making it easy to see where values are high or low at a glance. They help you
				quickly spot geographic trends and differences.
			</DocumentationParagraph>
			<Sandpack
				files={{
					"App.js": `
import { Graph } from "nanoplot/Graph";
import { Heatmap } from "nanoplot/Heatmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default function App() {
	const gradient = \`linear-gradient(to right, rgb(165, 0, 38) 0%, rgb(175, 10, 38) 2%, rgb(185, 19, 39) 4%, rgb(194, 29, 40) 6%, rgb(203, 40, 41) 8%, rgb(212, 0, 44) 10%, rgb(219, 61, 47) 12%, rgb(226, 73, 51) 14%, rgb(231, 85, 56) 16%, rgb(236, 97, 62) 18%, rgb(241, 110, 67) 20%, rgb(244, 122, 73) 22%, rgb(247, 135, 79) 24%, rgb(249, 148, 86) 26%, rgb(250, 160, 92) 28%, rgb(252, 172, 100) 30%, rgb(253, 183, 108) 32%, rgb(253, 193, 116) 34%, rgb(254, 203, 125) 36%, rgb(254, 212, 135) 38%, rgb(254, 221, 144) 40%, rgb(254, 229, 153) 42%, rgb(254, 235, 163) 44%, rgb(253, 241, 173) 46%, rgb(252, 245, 182) 48%, rgb(250, 248, 193) 50%, rgb(246, 249, 203) 52%, rgb(241, 249, 213) 54%, rgb(235, 247, 223) 56%, rgb(228, 244, 230) 58%, rgb(220, 241, 236) 60%, rgb(212, 237, 239) 62%, rgb(202, 232, 239) 64%, rgb(192, 227, 238) 66%, rgb(181, 221, 235) 68%, rgb(171, 214, 232) 70%, rgb(160, 207, 227) 72%, rgb(149, 199, 223) 74%, rgb(138, 190, 218) 76%, rgb(128, 181, 213) 78%, rgb(117, 171, 208) 80%, rgb(107, 161, 203) 82%, rgb(98, 150, 197) 84%, rgb(89, 139, 191) 86%, rgb(81, 128, 186) 88%, rgb(74, 116, 180) 90%, rgb(67, 104, 174) 92%, rgb(62, 92, 168) 94%, rgb(57, 79, 161) 96%, rgb(53, 67, 155) 98%, rgb(49, 54, 149) 100%)\`
	const scalars = [-100_000, -80_000, -60_000, -40_000, -20_000, 0, 20_000, 40_000, 60_000, 80_000, 100_000];
	return (
		<div className={"h-[70vh] w-[650px] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Vehicle Tranpsort",
						data: [
							{ x: "Japan", y: "Train", z: -67613 },
							{ x: "Japan", y: "Subway", z: 6066 },
							{ x: "Japan", y: "Bus", z: -77184 },
							{ x: "Japan", y: "Car", z: -15588 },
							{ x: "Japan", y: "Boat", z: -34487 },
							{ x: "Japan", y: "Moto", z: -18311 },
							{ x: "Japan", y: "Moped", z: -98263 },
							{ x: "Japan", y: "Bicycle", z: 90945 },
							{ x: "Japan", y: "Others", z: -41853 },
							{ x: "France", y: "Train", z: -16369 },
							{ x: "France", y: "Subway", z: -47703 },
							{ x: "France", y: "Bus", z: 95371 },
							{ x: "France", y: "Car", z: 82969 },
							{ x: "France", y: "Boat", z: -44779 },
							{ x: "France", y: "Moto", z: -34391 },
							{ x: "France", y: "Moped", z: 86620 },
							{ x: "France", y: "Bicycle", z: -57656 },
							{ x: "France", y: "Others", z: -93255 },
							{ x: "US", y: "Train", z: 24639 },
							{ x: "US", y: "Subway", z: -77038 },
							{ x: "US", y: "Bus", z: 24317 },
							{ x: "US", y: "Car", z: -98275 },
							{ x: "US", y: "Boat", z: -46282 },
							{ x: "US", y: "Moto", z: -79055 },
							{ x: "US", y: "Moped", z: 99926 },
							{ x: "US", y: "Bicycle", z: 84150 },
							{ x: "US", y: "Others", z: -37758 },
							{ x: "Germany", y: "Train", z: 96190 },
							{ x: "Germany", y: "Subway", z: -25946 },
							{ x: "Germany", y: "Bus", z: 25321 },
							{ x: "Germany", y: "Car", z: 77322 },
							{ x: "Germany", y: "Boat", z: -84111 },
							{ x: "Germany", y: "Moto", z: -97764 },
							{ x: "Germany", y: "Moped", z: -58427 },
							{ x: "Germany", y: "Bicycle", z: 38642 },
							{ x: "Germany", y: "Others", z: -81499 },
							{ x: "Norway", y: "Train", z: 8900 },
							{ x: "Norway", y: "Subway", z: -36147 },
							{ x: "Norway", y: "Bus", z: 59144 },
							{ x: "Norway", y: "Car", z: 9986 },
							{ x: "Norway", y: "Boat", z: -4214 },
							{ x: "Norway", y: "Moto", z: 36978 },
							{ x: "Norway", y: "Moped", z: 20210 },
							{ x: "Norway", y: "Bicycle", z: -1138 },
							{ x: "Norway", y: "Others", z: -59581 },
							{ x: "Iceland", y: "Train", z: -3593 },
							{ x: "Iceland", y: "Subway", z: -93637 },
							{ x: "Iceland", y: "Bus", z: -68508 },
							{ x: "Iceland", y: "Car", z: 37216 },
							{ x: "Iceland", y: "Boat", z: 92089 },
							{ x: "Iceland", y: "Moto", z: 68705 },
							{ x: "Iceland", y: "Moped", z: -1113 },
							{ x: "Iceland", y: "Bicycle", z: 19708 },
							{ x: "Iceland", y: "Others", z: 50168 },
							{ x: "UK", y: "Train", z: -70977 },
							{ x: "UK", y: "Subway", z: 34489 },
							{ x: "UK", y: "Bus", z: -79519 },
							{ x: "UK", y: "Car", z: -85519 },
							{ x: "UK", y: "Boat", z: 25162 },
							{ x: "UK", y: "Moto", z: -79704 },
							{ x: "UK", y: "Moped", z: 89641 },
							{ x: "UK", y: "Bicycle", z: 55220 },
							{ x: "UK", y: "Others", z: 48882 },
							{ x: "Vietnam", y: "Train", z: 92694 },
							{ x: "Vietnam", y: "Subway", z: 70315 },
							{ x: "Vietnam", y: "Bus", z: 10598 },
							{ x: "Vietnam", y: "Car", z: 55815 },
							{ x: "Vietnam", y: "Boat", z: -98243 },
							{ x: "Vietnam", y: "Moto", z: 74950 },
							{ x: "Vietnam", y: "Moped", z: 61215 },
							{ x: "Vietnam", y: "Bicycle", z: 76470 },
							{ x: "Vietnam", y: "Others", z: -85923 },
						],
					},
				]}
			>
				<GradientLegend
					position={"top"}
					alignment={"center"}
					gradient={gradient}
					scalars={scalars}
					labels={(value) => {
						return new Intl.NumberFormat("en", { notation: "compact", compactDisplay: "short" }).format(Number(value));
					}}
				/>
				<YAxis />
				<Heatmap gradient={gradient} scalars={scalars} />
				<XAxis />
			</Graph>
		</div>
	)
}
`,
				}}
			/>
			<DocumentationHeading>Props</DocumentationHeading>
			{/*
				gradient: `linear-gradient(${string})`;
				scalars: number[] | Array<{ tick: number; percent: number }>;
				labels?:
					| boolean
					| ((value: string | number | Date) => string)
					| { collision?: boolean; display: (value: string | number | Date) => string };
			*/}
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "gradient", href: "", tag: "code" },
						Description: "Sets the gradient color of the heatmap",
						Type: <Code>{`linear-gradient(\${string})`}</Code>,
						Required: "Yes",
						Default: "-",
					},
					{
						Name: { value: "scalars", href: "", tag: "code" },
						Description: "Sets the scalar values for the gradient legend",
						Type: (
							<Code>
								number[] | Array&lt;{"{"} tick: number; percent: number {"}"}&gt;
							</Code>
						),
						Required: "Yes",
						Default: "-",
					},
					{
						Name: { value: "labels", href: "", tag: "code" },
						Description:
							"Sets the labels for the gradient legend. Can be a boolean, a function, or an object with collision and display properties.",
						Type: (
							<>
								<Code>boolean</Code> |<br /> <Code>(value: string | number | Date) =&gt; string</Code> |<br />{" "}
								<Code>{`{ collision?: boolean; display(value: string | number | Date): string }`}</Code>
							</>
						),
						Required: "No",
						Default: "-",
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
					Description: (v: JSX.Element | string) => v,
					Type: (v: JSX.Element | string) => v,
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
						"Class Name": "heatmap",
						Element: "The base SVG element that wraps the visualization area.",
					},
					{
						"Class Name": "worldmap__country",
						Element: "The path element representing individual country shapes.",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</DocumentationLayout>
	);
}
