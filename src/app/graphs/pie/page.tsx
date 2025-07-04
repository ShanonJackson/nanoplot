"use client";
import { useState } from "react";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { PieControlGroup, PieControls } from "../../../components/ControlGroup/PieControlGroup/PieControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { Pie } from "../../../components/Pie/Pie";

export default function Page() {
	const [pie, setPie] = useState<PieControls>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});

	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<PieControlGroup state={pie} onChange={setPie} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{name: "US", value: 20.7},
						{name: "China", value: 18.4},
						{name: "Japan", value: 15.1},
						{name: "Australia", value: 12.8},
						{name: "New Zealand", value: 10.1},
						{name: "Germany", value: 10},
						{name: "France", value: 8.6},
						{name: "United Kingdom", value: 1.9},
						{name: "Italy", value: 1.9},
						{name: "Spain", value: 0.7},
					]}
				>
					<Pie {...pie}> {pie.children && <div dangerouslySetInnerHTML={{ __html: pie.children.toString() ?? "" }} />}</Pie>
					<Pie.Tooltip>
						{(segment) => {
							console.log({segment})
							if(typeof segment.value !== "number") return null;
							return (
								<div
									className={
										"text-black border-[2px] border-[rgb(255,255,101)] rounded-[2px] opacity-[0.9] [background:linear-gradient(rgb(251,225,71),rgb(231,205,51))]"
									}
								>
									<div
										className={
											"w-[200px] h-[45px] px-[2px] py-[6px] flex items-center gap-2 border-b-2 border-b-[rgb(255,255,101)]"
										}
									>
										<img
											src="https://flagcdn.com/24x18/ua.png"
											width="24"
											height="18"
										/>
										<div>
											<div
												className={
													"max-w-[120px] text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis"
												}
											>
												{segment.name}
											</div>
											<div
												className={
													"w-[150px] max-w-[150px] text-xs overflow-hidden text-ellipsis whitespace-nowrap capitalize"
												}
											>
												2K cookies sold
											</div>
										</div>
									</div>
									<div className={"w-[200px] h-[35px] flex items-baseline gap-[6px] pb-[10px] pl-[6px]"}>
										<div className={"text-2xl font-bold"}>
											{segment.value}%
										</div>
										<div className={"text-sm font-bold"}>Of Coookies Sold</div>
									</div>
								</div>
							);
						}}
					</Pie.Tooltip>
				</Graph>
			</GraphPanel>
		</>
	);
}
