"use client";
import { useState } from "react";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { PieControlGroup, PieControls } from "../../../components/ControlGroup/PieControlGroup/PieControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { Pie } from "../../../components/Pie/Pie";
import { Legend } from "../../../components/Legend/Legend";
import { InternalSegmentDataset } from "../../../hooks/use-graph/use-graph";

export default function Page() {
	const [pie, setPie] = useState<PieControls>({
		loading: false,
		donut: false,
		labels: true,
		children: "",
	});
	const [hovered, setHovered] = useState<InternalSegmentDataset[number]>();

	const cookies = [
		{ id: "US", name: "US", value: 17226 },
		{ id: "CN", name: "China", value: 15397 },
		{ id: "JP", name: "Japan", value: 12573 },
		{ id: "AU", name: "Australia", value: 10659 },
		{ id: "NZ", name: "New Zealand", value: 8411 },
		{ id: "DE", name: "Germany", value: 8328 },
		{ id: "FR", name: "France", value: 7162 },
		{ id: "GB", name: "United Kingdom", value: 1582 },
		{ id: "IT", name: "Italy", value: 1582 },
		{ id: "ES", name: "Spain", value: 583 },
	];
	const totalCookies = cookies.reduce((sum, cookie) => sum + cookie.value, 0);

	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Pie Graph</h1>
				<PieControlGroup state={pie} onChange={setPie} />
			</ControlPanel>
			<GraphPanel>
				<Graph data={cookies} interactions={{ hovered: hovered ? [hovered.id] : [] }}>
					<Pie
						gap={5}
						onMouseEnter={(segment) => setHovered(segment)}
						onMouseLeave={() => setHovered(undefined)}
						radius={40}
						labels={true}
					>
						<>
							<div className="flex flex-col items-center justify-center">
								<span className="text-lg font-semibold leading-5">{hovered ? hovered.name : "Cookies"}</span>
								<div className="text-xl font-bold">
									{hovered ? (
										<span className="text-violet-600 dark:text-violet-400">
											{hovered ? ((+hovered.value / totalCookies) * 100).toFixed(2) : 0}%
										</span>
									) : (
										<>
											<span className="text-violet-600 dark:text-violet-400">{totalCookies} Sold</span>
										</>
									)}
								</div>
							</div>
						</>
					</Pie>
					<Legend position={"right"} />
					<Pie.Tooltip>
						{(segment) => {
							const fill = segment.fill;
							if (typeof segment.value !== "number" || typeof fill !== "string") return null;
							const bg = `linear-gradient(${lightenColor(fill, 20)}, ${fill})`;
							return (
								<div
									style={{ border: `2px solid ${lightenColor(fill, 50)}`, background: bg }}
									className={"text-black rounded-[2px] opacity-[0.9] user-select-none"}
								>
									<div
										style={{
											borderBottom: `2px solid ${lightenColor(fill, 50)}`,
										}}
										className={"w-[200px] h-[45px] px-[4px] py-[6px] flex items-center gap-2"}
									>
										<img src={`https://flagcdn.com/h24/${segment.id.toLowerCase()}.png`} width="24" height="18" />
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
												{segment.value} cookies sold
											</div>
										</div>
									</div>
									<div className={"w-[200px] h-[35px] flex items-baseline gap-[6px] pb-[10px] pl-[6px]"}>
										<div className={"text-xl font-bold"}>
											{`${new Intl.NumberFormat("en-US", {
												minimumFractionDigits: 0,
												maximumFractionDigits: 2,
											}).format((segment.value / totalCookies) * 100)}%`}
										</div>
										<div className={"text-sm font-bold"}>Cookies Sold</div>
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

const lightenColor = (color: string, amt: number) => {
	color = color.replace(`#`, ``);
	if (color.length === 6) {
		const decimalColor = parseInt(color, 16);
		let r = (decimalColor >> 16) + amt;
		r > 255 && (r = 255);
		r < 0 && (r = 0);
		let g = (decimalColor & 0x0000ff) + amt;
		g > 255 && (g = 255);
		g < 0 && (g = 0);
		let b = ((decimalColor >> 8) & 0x00ff) + amt;
		b > 255 && (b = 255);
		b < 0 && (b = 0);
		const newColor = `${(g | (b << 8) | (r << 16)).toString(16)}`;
		if (newColor.length === 4) return `#00${newColor}`;
		return `#${newColor}`;
	}
	return color;
};
