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

const now = new Date();
const generateInitialData = (min, max) => {
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
				<Graph gap={{ right: 35, left: 10, top: 20, bottom: 10 }} data={dataset}>
					<Legend position={"top"} />
					<YAxis />
					<GridLines />
					<Lines />
					<Lines.Tooltip
						tooltip={{
							title: (v) => format(new Date(+v), "yyyy-mm-dd hh:mm"),
							display: (v) => v.y.toString(),
						}}
					/>
					<XAxis
						ticks={{ jumps: "every 2 hours" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return format(x, "hh:mm");
						}}
					/>
				</Graph>
			</div>
		</div>
	);
}
