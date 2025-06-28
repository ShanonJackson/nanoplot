import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { Pie } from "../../../../components/Pie/Pie";

export const RevenueWidget = () => {
	return (
		<Widget className={"p-6 w-[384px]"}>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-1">
					<span className="text-sm font-medium text-gray-900">Total revenue</span>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
						<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span className="text-sm text-gray-900 ml-2">by Platform</span>
				</div>
				<div className="flex items-center gap-1">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-600">
						<path
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
						<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<div className={"h-[210px] w-full"}>
					<Graph data={[{ name: "Web", value: 100, stroke: "rgb(26, 115, 232)", fill: "rgb(26, 115, 232)" }]}>
						<Pie donut={35} labels={false} glow={false} />
					</Graph>
				</div>
				<div className="flex items-center gap-2 mt-5 text-center">
					<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
					<span className="text-sm font-medium text-gray-700">WEB</span>
				</div>
				<div className="text-2xl font-bold text-gray-900 ml-2">100.0%</div>
			</div>
			<div className="flex justify-end mt-4">
				<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
					View tech details
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
						<path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</a>
			</div>
		</Widget>
	);
};
