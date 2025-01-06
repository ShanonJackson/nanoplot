"use client";
import { Lines } from "@/components/Lines/Lines";
import NanoPage from "@/components/Template/NanoPage";

export default function Page() {
	return <NanoPage title={"Line Graph"} data={data} graph={<Lines />} />;
}

const data = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: 1, y: 20 },
			{ x: 2, y: 40 },
			{ x: 3, y: 30 },
			{ x: 4, y: 50 },
			{ x: 5, y: 36 },
			{ x: 6, y: 60 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: 1, y: 5.25 },
			{ x: 2, y: 10 },
			{ x: 3, y: 25.4 },
			{ x: 4, y: 36 },
			{ x: 5, y: 40 },
			{ x: 6, y: 35 },
		],
	},
];
