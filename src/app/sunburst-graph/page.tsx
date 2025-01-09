"use client";
import { Graph } from "@/components/Graph/Graph";
import { Sunburst } from "@/components/Sunburst/Sunburst";

export default function Page() {
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div
				className={
					"row-span-2 h-full border-[1px] border-dotted border-[hsl(0deg,0%,0%)] dark:border-[hsl(0deg,0%,100%)] p-4 dark:bg-gray-800"
				}
			>
				<h1 className={"text-2xl"}>Sunburst Graph</h1>
			</div>
			<div
				className={
					"border-[1px] h-full border-dotted border-[hsl(0deg,0%,0%)] dark:border-[hsl(0deg,0%,100%)] overflow-hidden resize"
				}
			>
				<Graph gap={{ bottom: 30 }} data={[]}>
					<Sunburst />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-[hsl(0deg,0%,0%)] dark:border-[hsl(0deg,0%,100%)]"}>EXAMPLES</div>
		</div>
	);
}
