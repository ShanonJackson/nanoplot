"use client";
import { Graph } from "@/components/Graph/Graph";
import { Sunburst } from "@/components/Sunburst/Sunburst";

export default function Page() {
	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 h-full border-[1px] border-dotted border-foreground"}></div>
			<div className={"border-[1px] h-full border-dotted border-foreground"}>
				<Graph gap={{ bottom: 30 }} data={[]}>
					<Sunburst />
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-foreground"}>EXAMPLES</div>
		</div>
	);
}
