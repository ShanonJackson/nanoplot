"use client";
import { Graph } from "@/components/Graph/Graph";
import { XAxis } from "@/components/Axis/XAxis/XAxis";
import { YAxis } from "@/components/Axis/YAxis/YAxis";

export default function Page() {
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-white"}>PLACEHOLDER</div>
			<div className={"border-[1px] h-full border-dotted border-white"}>
				<Graph data={[{ name: "My First Dataset", data: MOCK_DATA }]} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
					<YAxis />
					<XAxis />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-white"}>EXAMPLES</div>
		</div>
	);
}

const MOCK_DATA = [
	{ x: "Jan", y: 57 },
	{ x: "Feb", y: 91 },
	{ x: "Mar", y: 83 },
	{ x: "Apr", y: 74 },
	{ x: "May", y: 51 },
	{ x: "Jun", y: 63 },
	{ x: "Jul", y: 71 },
	{ x: "Aug", y: 73 },
	{ x: "Sep", y: 68 },
	{ x: "Oct", y: 93 },
	{ x: "Nov", y: 84 },
	{ x: "Dec", y: 48 },
];
