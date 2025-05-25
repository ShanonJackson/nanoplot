"use client";

import React, { ComponentProps, useState } from "react";
import { ControlPanel } from "../../../../../components/Panels/ControlPanel";
import { GraphPanel } from "../../../../../components/Panels/GraphPanel";
import { Graph } from "../../../../../components/Graph/Graph";
import { GradientLegend } from "../../../../../components/GradientLegend/GradientLegend";
import { Control } from "../../../../../components/Docs/Control/Control";
import { SliderControl } from "../../../../../components/Docs/Control/components/SliderControl/SliderControl";
import { Worldmap } from "../../../../../components/Worldmap/Worldmap";
import Image from "next/image";
import { DocumentationLayout } from "../../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	const [map, setMap] = useState<ComponentProps<typeof Worldmap>>({
		translate: { x: 100, y: 0, scale: 0 },
	});
	const setMapPartial = (partial: Partial<ComponentProps<typeof Worldmap>>) => setMap((prev) => ({ ...prev, ...partial }));
	return (
		<DocumentationLayout playground>
			<ControlPanel>
				<h1 className={"text-2xl"}>World Map</h1>
				<Control name={"translate"} type={"{x: number, y: number, scale: number}"}>
					<SliderControl
						value={map.translate?.x ?? 0}
						onChange={(value) => setMapPartial({ translate: { y: 0, scale: 0, ...map.translate, x: value } })}
						description={`${map.translate?.x} px`}
					/>
					<SliderControl
						value={map.translate?.y ?? 0}
						onChange={(value) => setMapPartial({ translate: { x: 0, scale: 0, ...map.translate, y: value } })}
						description={`${map.translate?.y} y`}
					/>
					<SliderControl
						value={map.translate?.scale ?? 0}
						onChange={(value) => setMapPartial({ translate: { y: 0, x: 0, ...map.translate, scale: value } })}
						description={`${map.translate?.scale} scale`}
					/>
				</Control>
			</ControlPanel>
			<GraphPanel>
				<Graph data={MOCK_DATA}>
					<GradientLegend
						position={"top"}
						gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"}
						scalars={[Math.min(...MOCK_DATA.map((d) => d.value)), Math.max(...MOCK_DATA.map((d) => d.value))]}
					/>
					<Worldmap gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"} {...map} />
					<Worldmap.Tooltip
						tooltip={(dp) => {
							return (
								<div>
									<div className={"flex items-center"}>
										<Image
											src={`https://flagcdn.com/w40/${dp.name.toLowerCase()}.png`}
											alt={""}
											width={30}
											height={20}
											className={"shrink-0 block"}
											unoptimized
										/>
										<div className={"mx-[4px] text-sm font-bold"}>{dp.name}</div>
										<div className={"mx-[4px] text-sm font-bold"}>{dp.value.toString()}</div>
									</div>
									<div className={"h-[3px] w-[64px] mt-[4px]"} style={{ background: dp.fill }} />
								</div>
							);
						}}
					/>
				</Graph>
			</GraphPanel>
		</DocumentationLayout>
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
