"use client";
import { useState, useEffect } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Legend } from "../../../../../components/Legend/Legend";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Lines } from "../../../../../components/Lines/Lines";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { format } from "../../../../../utils/date/date-format";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { useMounted } from "../../../../../hooks/use-mounted";
import { ZoomSlider } from "../../../../../components/ZoomSlider/ZoomSlider";

const now = new Date();
const generateInitialData = (min: number, max: number) => {
	return Array.from({ length: 6 * 60 * 60 }, (_, i) => ({
		x: new Date(now.getTime() - (6 * 60 * 60 - i) * 1000),
		y: Math.random() * (max - min) + min,
	}));
};

const createInitialDataset = () => [
	{ name: "Line 1", data: generateInitialData(1, 5) },
	{ name: "Line 2", data: generateInitialData(6, 10) },
	{ name: "Line 3", data: generateInitialData(11, 15) },
	{ name: "Line 4", data: generateInitialData(16, 20) },
	{ name: "Line 5", data: generateInitialData(21, 25) },
];

export default function Page() {
	const [dataset, setDataset] = useState(createInitialDataset);
	const [zoom, setZoom] = useState<{ x: [number, number]; y: [number, number] }>({ x: [0, 100], y: [0, 100] });
	const [pinned, setPinned] = useState<string[]>([]);
	const [hovered, setHovered] = useState<string[]>([]);
	const mounted = useMounted();
	useEffect(() => {
		const interval = setInterval(() => {
			setDataset((prevDataset) => {
				const now = new Date();
				return prevDataset.map((line, i) => ({
					...line,
					data: [...line.data.slice(1), { x: now, y: Math.random() * 4 + 1 + i * 5 }],
				}));
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!mounted) return null; /* hydration error from random data */

	return (
		<div>
			<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
				<Graph gap={{ right: 35, left: 10, top: 20, bottom: 10 }} data={dataset} zoom={zoom} interactions={{ hovered, pinned }}>
					<ZoomSlider.X onChange={setZoom} />
					<Legend
						position={"top"}
						onClick={(dp) => {
							setPinned((p) => {
								if (p.includes(dp.id)) return p.filter((pin) => pin !== dp.id);
								return [...p, dp.id];
							});
						}}
						onMouseEnter={(dp) => {
							setHovered((h) => {
								if (h.includes(dp.id)) return h.filter((hov) => hov !== dp.id);
								return [...h, dp.id];
							});
						}}
						onMouseLeave={(dp) => {
							setHovered((h) => h.filter((hov) => hov !== dp.id));
						}}
					/>
					<YAxis />
					<GridLines border />
					<Lines />
					<Lines.Tooltip
						tooltip={{
							title: (v) => format(new Date(+v), "yyyy-mm-dd hh:mm"),
							display: (v) => v.y.toString(),
						}}
					/>
					<XAxis
						ticks={{ jumps: "PT2H" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return format(x, "hh:MM");
						}}
					/>
				</Graph>
			</div>
		</div>
	);
}
