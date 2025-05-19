"use client";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import * as React from "react";
import { GradientLegend } from "../../../../components/GradientLegend/GradientLegend";
import { Worldmap } from "../../../../components/Worldmap/Worldmap";
import { Graph } from "../../../../components/Graph/Graph";

export default function Page() {
	return (
		<div className={"p-8"}>
			<DocumentationHeading level={1}>Worldmap</DocumentationHeading>
			<DocumentationParagraph>
				A heatmap world map chart highlights countries with varying colors to easily visualize global data trends and patterns,
				<br />
				allowing for quick comparison of regional differences in metrics like population, economy, or health.
			</DocumentationParagraph>
			<Graph data={MOCK_DATA}>
				<GradientLegend
					position={"top"}
					gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"}
					scalars={[Math.min(...MOCK_DATA.map((d) => d.value)), Math.max(...MOCK_DATA.map((d) => d.value))]}
				/>
				<Worldmap gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"} />
				<Worldmap.Tooltip
					tooltip={(dp) => {
						return <div>{dp.name + " " + dp.value}</div>;
					}}
				/>
			</Graph>
		</div>
	);
}
const MOCK_DATA = [
	{ name: "AR", value: 3287 },
	{ name: "AT", value: 2100 },
	{ name: "AU", value: 6098 },
	{ name: "BE", value: 2460 },
	{ name: "BR", value: 9550 },
	{ name: "CA", value: 8421 },
	{ name: "CH", value: 4378 },
	{ name: "CN", value: 11500 },
	{ name: "DE", value: 10500 },
	{ name: "DK", value: 1987 },
	{ name: "ES", value: 5478 },
	{ name: "FI", value: 1760 },
	{ name: "FR", value: 10200 },
	{ name: "GB", value: 10000 },
	{ name: "GR", value: 1590 },
	{ name: "IE", value: 1683 },
	{ name: "IN", value: 11200 },
	{ name: "IT", value: 6512 },
	{ name: "JP", value: 10700 },
	{ name: "KR", value: 7053 },
	{ name: "MX", value: 7850 },
	{ name: "NL", value: 4320 },
	{ name: "NO", value: 2150 },
	{ name: "NZ", value: 3950 },
	{ name: "PL", value: 3890 },
	{ name: "PT", value: 2950 },
	{ name: "RU", value: 11000 },
	{ name: "SE", value: 3050 },
	{ name: "TR", value: 3245 },
	{ name: "US", value: 12000 },
	{ name: "ZA", value: 2765 },
];
