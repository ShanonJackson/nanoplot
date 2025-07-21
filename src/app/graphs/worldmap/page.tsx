"use client";
import React, { ComponentProps, useState } from "react";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { Control } from "../../../components/Docs/Control/Control";
import { Worldmap } from "../../../components/Worldmap/Worldmap";
import { SliderControl } from "../../../components/Docs/Control/components/SliderControl/SliderControl";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { GradientLegend } from "../../../components/GradientLegend/GradientLegend";
import Image from "next/image";

export default function Page() {
	return (
		<>
			<GraphPanel>
				<Graph data={MOCK_DATA}>
					<GradientLegend position={"top"} gradient={`linear-gradient(90deg, #e1efff 0, #4285f4 ${12_000})`} />
					<Worldmap
						gradient={`linear-gradient(90deg, #e1efff 0, #4285f4 ${12_000})`}
						fill={(country) => (country.name === "US" ? "red" : "blue")}
					/>
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
		</>
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
