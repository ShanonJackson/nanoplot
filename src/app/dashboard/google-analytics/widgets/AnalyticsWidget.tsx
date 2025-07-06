import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { Bars } from "../../../../components/Bars/Bars";
import { useState } from "react";

export const AnalyticsWidget = () => {
	const [hovered, setHovered] = useState<
		{ id: string; fill: string; data: { x: string | number | Date; y: string | number | Date } } | undefined
	>(undefined);
	return (
		<Widget className={"p-6"}>
			<div className="space-y-[20px]">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active users in last 30 minutes</h2>
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
				</div>
				<div className="text-4xl font-bold text-gray-900">64</div>
				<div className="space-y-3">
					<h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active users per minute</h3>
					<div className="h-[44px]">
						<Graph
							data={[
								{
									name: "Active Users",
									fill: "rgb(26, 115, 232)",
									data: [
										{ x: "30 minutes ago", y: 3 },
										{ x: "29 minutes ago", y: 3 },
										{ x: "28 minutes ago", y: 5 },
										{ x: "27 minutes ago", y: 5 },
										{ x: "26 minutes ago", y: 7 },
										{ x: "25 minutes ago", y: 7 },
										{ x: "24 minutes ago", y: 6 },
										{ x: "23 minutes ago", y: 4 },
										{ x: "22 minutes ago", y: 3 },
										{ x: "21 minutes ago", y: 8 },
										{ x: "20 minutes ago", y: 4 },
										{ x: "19 minutes ago", y: 5 },
										{ x: "18 minutes ago", y: 5 },
										{ x: "17 minutes ago", y: 3 },
										{ x: "16 minutes ago", y: 2 },
										{ x: "15 minutes ago", y: 1 },
										{ x: "14 minutes ago", y: 5 },
										{ x: "13 minutes ago", y: 2 },
										{ x: "12 minutes ago", y: 5 },
										{ x: "11 minutes ago", y: 2 },
										{ x: "10 minutes ago", y: 8 },
										{ x: "9 minutes ago", y: 8 },
										{ x: "8 minutes ago", y: 8 },
										{ x: "7 minutes ago", y: 6 },
										{ x: "6 minutes ago", y: 4 },
										{ x: "5 minutes ago", y: 3 },
										{ x: "4 minutes ago", y: 6 },
										{ x: "3 minutes ago", y: 6 },
										{ x: "2 minutes ago", y: 4 },
										{ x: "1 minute ago", y: 0 },
									],
								},
							]}
						>
							<Bars
								size={82}
								className="[&>path]:transition-all [&>path]:duration-200 [&>path]:ease-in-out"
								fill={(segment) => {
									if (!hovered) return segment.fill;
									const isX = hovered?.data.x === segment.data.x;
									const isY = hovered?.data.y === segment.data.y;
									return isX && isY ? segment.fill : "rgb(26, 115, 232, 0.1)";
								}}
								stroke={(segment) => {
									if (!hovered) return segment.fill;
									const isX = hovered?.data.x === segment.data.x;
									const isY = hovered?.data.y === segment.data.y;
									return isX && isY ? segment.fill : "rgb(26, 115, 232, 0.1)";
								}}
								onMouseEnter={(rect) => setHovered(rect)}
								onMouseLeave={() => setHovered(undefined)}
							/>
						</Graph>
					</div>
				</div>
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Top countries</h3>
						<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active users</span>
					</div>

					<div>
						<div className="flex justify-between items-center border-b border-blue-200">
							<span className="text-sm font-medium text-gray-900">United States</span>
							<span className="text-sm font-medium text-gray-900">23</span>
						</div>
						<div className="flex justify-between items-center border-b border-blue-200">
							<span className="text-sm font-medium text-gray-900">Canada</span>
							<span className="text-sm font-medium text-gray-900">2</span>
						</div>
						<div className="flex justify-between items-center border-b border-blue-200">
							<span className="text-sm font-medium text-gray-900">Colombia</span>
							<span className="text-sm font-medium text-gray-900">2</span>
						</div>
						<div className="flex justify-between items-center border-b border-blue-200">
							<span className="text-sm font-medium text-gray-900">Japan</span>
							<span className="text-sm font-medium text-gray-900">2</span>
						</div>
						<div className="flex justify-between items-center border-b border-blue-200">
							<span className="text-sm font-medium text-gray-900">Mexico</span>
							<span className="text-sm font-medium text-gray-900">2</span>
						</div>
					</div>
				</div>
				<div className="flex justify-end mb-2">
					<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
						View realtime
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
							<path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
				</div>
			</div>
		</Widget>
	);
};
