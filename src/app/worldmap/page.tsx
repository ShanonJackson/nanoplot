"use client";
import { Worldmap } from "@/components/Worldmap/Worldmap";
import Image from "next/image";
import { ColorUtils } from "@/utils/color/color";
import React, { ComponentProps, useState } from "react";
import { Graph } from "@/components/Graph/Graph";
import { Control } from "@/components/Docs/Control/Control";
import { SliderControl } from "@/components/Docs/Control/components/SliderControl/SliderControl";

export default function Page() {
	const [map, setMap] = useState<ComponentProps<typeof Worldmap>>({
		translate: { x: 0, y: 0, scale: 0 },
	});
	const setPiePartial = (partial: Partial<ComponentProps<typeof Worldmap>>) => setMap((prev) => ({ ...prev, ...partial }));
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-black dark:border-white"}>
				<Control name={"translate"} type={"{x: number, y: number, scale: number}"}>
					<SliderControl
						value={map.translate?.x ?? 0}
						onChange={(value) => setPiePartial({ translate: { y: 0, scale: 0, ...map.translate, x: value } })}
						description={`${map.translate?.x} x`}
					/>
					<SliderControl
						value={map.translate?.y ?? 0}
						onChange={(value) => setPiePartial({ translate: { x: 0, scale: 0, ...map.translate, y: value } })}
						description={`${map.translate?.y} y`}
					/>
					<SliderControl
						value={map.translate?.scale ?? 0}
						onChange={(value) => setPiePartial({ translate: { y: 0, x: 0, ...map.translate, scale: value } })}
						description={`${map.translate?.scale} scale`}
					/>
				</Control>
			</div>
			<div className={"border-[1px] h-full border-dotted border-black dark:border-white"}>
				<Graph
					data={MOCK_DATA.map(({ market, average_demand_multiplier }) => {
						return {
							name: market,
							value: average_demand_multiplier,
							fill: ColorUtils.between("rgb(255, 0, 0)", "rgb(0, 0, 255)", average_demand_multiplier / 50),
						};
					})}
				>
					<Worldmap
						tooltips={Object.fromEntries(
							MOCK_DATA.map((data, i) => {
								return [
									data.market,
									<div className={"flex items-center"}>
										<div>{i + 1}</div>
										<Image
											src={`https://cdn-fastly.parrotanalytics.com/flags/${data.market.toLowerCase()}.png?quality=85&width=32`}
											alt={""}
											unoptimized={true}
											height={14}
											width={20}
										/>
										{data.market}
										<div>{data.average_demand_multiplier.toFixed(2)}</div>
									</div>,
								];
							}),
						)}
						{...map}
					/>
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-black dark:border-white"}>EXAMPLES</div>
		</div>
	);
}
const MOCK_DATA = [
	{
		average_demand_multiplier: 30.66084384,
		peak_demand_multiplier: 48.20566087,
		market: "US",
	},
	{
		average_demand_multiplier: 18.90105193,
		peak_demand_multiplier: 28.04605787,
		market: "BR",
	},
	{
		average_demand_multiplier: 18.64487964,
		peak_demand_multiplier: 30.17193343,
		market: "CA",
	},
	{
		average_demand_multiplier: 18.44276897,
		peak_demand_multiplier: 25.2216836,
		market: "FR",
	},
	{
		average_demand_multiplier: 18.27638264,
		peak_demand_multiplier: 28.40830589,
		market: "GB",
	},
	{
		average_demand_multiplier: 16.70440768,
		peak_demand_multiplier: 25.73526003,
		market: "AU",
	},
	{
		average_demand_multiplier: 16.23507698,
		peak_demand_multiplier: 20.05782464,
		market: "IT",
	},
	{
		average_demand_multiplier: 15.4540799,
		peak_demand_multiplier: 20.73726998,
		market: "NL",
	},
	{
		average_demand_multiplier: 14.23870141,
		peak_demand_multiplier: 25.8493036,
		market: "SE",
	},
	{
		average_demand_multiplier: 13.50264605,
		peak_demand_multiplier: 18.8833557,
		market: "CN",
	},
	{
		average_demand_multiplier: 13.24011216,
		peak_demand_multiplier: 18.72522608,
		market: "MX",
	},
	{
		average_demand_multiplier: 12.82763295,
		peak_demand_multiplier: 16.03633968,
		market: "DE",
	},
	{
		average_demand_multiplier: 12.58901678,
		peak_demand_multiplier: 17.89021915,
		market: "ES",
	},
	{
		average_demand_multiplier: 12.09283866,
		peak_demand_multiplier: 18.43247409,
		market: "PH",
	},
	{
		average_demand_multiplier: 11.44015663,
		peak_demand_multiplier: 17.89101243,
		market: "CH",
	},
	{
		average_demand_multiplier: 11.34177398,
		peak_demand_multiplier: 21.00291155,
		market: "NZ",
	},
	{
		average_demand_multiplier: 11.11646783,
		peak_demand_multiplier: 17.6246422,
		market: "ZA",
	},
	{
		average_demand_multiplier: 10.84798662,
		peak_demand_multiplier: 14.17939937,
		market: "BE",
	},
	{
		average_demand_multiplier: 10.47160398,
		peak_demand_multiplier: 18.3163472,
		market: "IN",
	},
	{
		average_demand_multiplier: 9.26096274,
		peak_demand_multiplier: 14.40397153,
		market: "SG",
	},
	{
		average_demand_multiplier: 8.73743775,
		peak_demand_multiplier: 13.68268784,
		market: "AR",
	},
	{
		average_demand_multiplier: 8.56933336,
		peak_demand_multiplier: 15.26992866,
		market: "PL",
	},
	{
		average_demand_multiplier: 8.53100501,
		peak_demand_multiplier: 15.98863572,
		market: "PT",
	},
	{
		average_demand_multiplier: 7.77109219,
		peak_demand_multiplier: 14.64771183,
		market: "RU",
	},
	{
		average_demand_multiplier: 7.60202318,
		peak_demand_multiplier: 16.22492527,
		market: "HU",
	},
	{
		average_demand_multiplier: 7.37920112,
		peak_demand_multiplier: 8.59966123,
		market: "BG",
	},
	{
		average_demand_multiplier: 6.98188986,
		peak_demand_multiplier: 11.98772947,
		market: "NG",
	},
	{
		average_demand_multiplier: 6.72269713,
		peak_demand_multiplier: 11.74294111,
		market: "RO",
	},
	{
		average_demand_multiplier: 6.61769111,
		peak_demand_multiplier: 10.73382564,
		market: "CL",
	},
	{
		average_demand_multiplier: 6.57909938,
		peak_demand_multiplier: 10.87715306,
		market: "IL",
	},
	{
		average_demand_multiplier: 6.39822049,
		peak_demand_multiplier: 10.91750278,
		market: "TR",
	},
	{
		average_demand_multiplier: 6.36342929,
		peak_demand_multiplier: 13.14603741,
		market: "IE",
	},
	{
		average_demand_multiplier: 6.32675597,
		peak_demand_multiplier: 9.09772135,
		market: "BD",
	},
	{
		average_demand_multiplier: 6.25141583,
		peak_demand_multiplier: 8.9906216,
		market: "KE",
	},
	{
		average_demand_multiplier: 6.12591268,
		peak_demand_multiplier: 10.24129512,
		market: "MY",
	},
	{
		average_demand_multiplier: 6.00003663,
		peak_demand_multiplier: 12.98665452,
		market: "CZ",
	},
	{
		average_demand_multiplier: 5.79303943,
		peak_demand_multiplier: 8.88466652,
		market: "KR",
	},
	{
		average_demand_multiplier: 5.58439482,
		peak_demand_multiplier: 8.10189252,
		market: "JP",
	},
	{
		average_demand_multiplier: 5.39554522,
		peak_demand_multiplier: 8.00082177,
		market: "VN",
	},
	{
		average_demand_multiplier: 5.2729184,
		peak_demand_multiplier: 10.44780508,
		market: "AE",
	},
	{
		average_demand_multiplier: 5.22536126,
		peak_demand_multiplier: 10.51344733,
		market: "PE",
	},
	{
		average_demand_multiplier: 5.16016383,
		peak_demand_multiplier: 11.09629786,
		market: "DK",
	},
	{
		average_demand_multiplier: 4.78666174,
		peak_demand_multiplier: 9.51431884,
		market: "PK",
	},
	{
		average_demand_multiplier: 4.63282227,
		peak_demand_multiplier: 8.70163288,
		market: "CO",
	},
	{
		average_demand_multiplier: 4.21828582,
		peak_demand_multiplier: 10.0155062,
		market: "UA",
	},
	{
		average_demand_multiplier: 4.18741467,
		peak_demand_multiplier: 6.55501339,
		market: "ID",
	},
	{
		average_demand_multiplier: 4.09728995,
		peak_demand_multiplier: 7.73559225,
		market: "EG",
	},
	{
		average_demand_multiplier: 3.75737225,
		peak_demand_multiplier: 7.61083238,
		market: "EC",
	},
	{
		average_demand_multiplier: 3.68270014,
		peak_demand_multiplier: 6.93422333,
		market: "LK",
	},
	{
		average_demand_multiplier: 3.64930098,
		peak_demand_multiplier: 12.63973446,
		market: "NO",
	},
	{
		average_demand_multiplier: 3.48573408,
		peak_demand_multiplier: 6.50423257,
		market: "GR",
	},
	{
		average_demand_multiplier: 3.35961597,
		peak_demand_multiplier: 7.81578828,
		market: "VE",
	},
	{
		average_demand_multiplier: 3.04676203,
		peak_demand_multiplier: 8.92394533,
		market: "AT",
	},
	{
		average_demand_multiplier: 3.03666072,
		peak_demand_multiplier: 6.49897208,
		market: "FI",
	},
	{
		average_demand_multiplier: 2.97730947,
		peak_demand_multiplier: 5.82003423,
		market: "TH",
	},
	{
		average_demand_multiplier: 2.97316784,
		peak_demand_multiplier: 4.57571347,
		market: "MA",
	},
	{
		average_demand_multiplier: 2.8699552,
		peak_demand_multiplier: 4.18094274,
		market: "SA",
	},
	{
		average_demand_multiplier: 2.71769182,
		peak_demand_multiplier: 5.44901471,
		market: "HK",
	},
	{
		average_demand_multiplier: 2.44256647,
		peak_demand_multiplier: 8.08802033,
		market: "TW",
	},
	{
		average_demand_multiplier: 2.35523183,
		peak_demand_multiplier: 3.9062001,
		market: "SI",
	},
	{
		average_demand_multiplier: 2.13914626,
		peak_demand_multiplier: 3.20644929,
		market: "DZ",
	},
	{
		average_demand_multiplier: 1.47676755,
		peak_demand_multiplier: 2.19907886,
		market: "HR",
	},
	{
		average_demand_multiplier: 1.35638206,
		peak_demand_multiplier: 4.94414388,
		market: "RS",
	},
	{
		average_demand_multiplier: 1.19244283,
		peak_demand_multiplier: 5.20083169,
		market: "PR",
	},
	{
		average_demand_multiplier: 1.08248941,
		peak_demand_multiplier: 3.22740375,
		market: "IR",
	},
	{
		average_demand_multiplier: 0.99974164,
		peak_demand_multiplier: 2.15538834,
		market: "CY",
	},
	{
		average_demand_multiplier: 0.90746658,
		peak_demand_multiplier: 1.75926616,
		market: "LU",
	},
	{
		average_demand_multiplier: 0.77848182,
		peak_demand_multiplier: 1.25359022,
		market: "BA",
	},
	{
		average_demand_multiplier: 0.71975264,
		peak_demand_multiplier: 3.61857763,
		market: "SK",
	},
	{
		average_demand_multiplier: 0.6702038,
		peak_demand_multiplier: 2.38055126,
		market: "JM",
	},
	{
		average_demand_multiplier: 0.62128643,
		peak_demand_multiplier: 1.18344351,
		market: "IS",
	},
	{
		average_demand_multiplier: 0.59302718,
		peak_demand_multiplier: 0.95675093,
		market: "TN",
	},
	{
		average_demand_multiplier: 0.58943189,
		peak_demand_multiplier: 1.84837035,
		market: "GH",
	},
	{
		average_demand_multiplier: 0.58692026,
		peak_demand_multiplier: 3.34628015,
		market: "PA",
	},
	{
		average_demand_multiplier: 0.55869713,
		peak_demand_multiplier: 0.92784625,
		market: "EE",
	},
	{
		average_demand_multiplier: 0.44576483,
		peak_demand_multiplier: 1.00565818,
		market: "MK",
	},
	{
		average_demand_multiplier: 0.4192772,
		peak_demand_multiplier: 0.72922348,
		market: "LV",
	},
	{
		average_demand_multiplier: 0.38491001,
		peak_demand_multiplier: 0.61473723,
		market: "KW",
	},
	{
		average_demand_multiplier: 0.31358027,
		peak_demand_multiplier: 0.56536498,
		market: "LT",
	},
	{
		average_demand_multiplier: 0.29649092,
		peak_demand_multiplier: 0.61644091,
		market: "TT",
	},
	{
		average_demand_multiplier: 0.27797807,
		peak_demand_multiplier: 0.53715218,
		market: "MT",
	},
	{
		average_demand_multiplier: 0.2491241,
		peak_demand_multiplier: 0.36327033,
		market: "OM",
	},
	{
		average_demand_multiplier: 0.22396186,
		peak_demand_multiplier: 0.36827645,
		market: "IQ",
	},
	{
		average_demand_multiplier: 0.2083852,
		peak_demand_multiplier: 0.32093361,
		market: "LB",
	},
	{
		average_demand_multiplier: 0.18750686,
		peak_demand_multiplier: 0.45564937,
		market: "QA",
	},
	{
		average_demand_multiplier: 0.16265214,
		peak_demand_multiplier: 0.34058962,
		market: "UY",
	},
	{
		average_demand_multiplier: 0.09860513,
		peak_demand_multiplier: 0.1801025,
		market: "JO",
	},
	{
		average_demand_multiplier: 0.0895515,
		peak_demand_multiplier: 0.16944225,
		market: "BH",
	},
	{
		average_demand_multiplier: 0.07021612,
		peak_demand_multiplier: 0.13690209,
		market: "BN",
	},
	{
		average_demand_multiplier: 0.05982922,
		peak_demand_multiplier: 0.1219869,
		market: "PY",
	},
];
