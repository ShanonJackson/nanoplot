import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { Lines } from "../../../../components/Lines/Lines";
import { XAxis } from "../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../components/YAxis/YAxis";
import { GridLines } from "../../../../components/GridLines/GridLines";

export const UserActivityWidget = () => {
	return (
		<Widget className={"flex flex-col p-6 w-[544px] pl-10"}>
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-sm font-medium text-gray-900">User activity over time</h2>
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
			<div className="flex gap-6 min-h-0">
				<Graph
					gap={{ bottom: 30 }}
					data={[
						{
							name: "30 Days",
							stroke: "rgb(26, 115, 232)",
							data: Array.from({ length: 30 }, (_, i) => ({
								x: new Date(2025, 5, i + 1),
								y: 108000 - i * 100, // gradually decreasing from ~108K to ~105K
							})),
						},
						{
							name: "7 Days",
							stroke: "rgb(52, 168, 83)",
							data: Array.from({ length: 30 }, (_, i) => ({
								x: new Date(2025, 5, i + 1),
								y: 45000 - i * 150, // decreasing more steeply from ~45K to ~40500
							})),
						},
						{
							name: "1 Day",
							stroke: "rgb(251, 188, 5)",
							data: Array.from({ length: 30 }, (_, i) => ({
								x: new Date(2025, 5, i + 1),
								y: 21000 - i * 50, // slowly tapering from ~21K to ~19500
							})),
						},
					]}
				>
					<GridLines vertical={false} border={false} />
					<Lines />
					<Lines.Tooltip
						tooltip={{
							title: (x) => {
								if (typeof x === "number" || typeof x === "string") return null;
								return x.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " " + x.getFullYear();
							},
						}}
					/>
					<YAxis
						className="ml-2"
						position="right"
						display={(v) =>
							typeof v === "number"
								? new Intl.NumberFormat("en-US", {
										notation: "compact",
										compactDisplay: "short",
										minimumFractionDigits: 0,
										maximumFractionDigits: 1,
									}).format(v)
								: null
						}
					/>
					<XAxis
						ticks={{ jumps: "P7D" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return x.toLocaleDateString("en-US", { month: "short", day: "numeric" });
						}}
					/>
				</Graph>
				<div className="space-y-4 flex-1 [width:min-content] flex-shrink-0 min-w-[80px]">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">30 Days</span>
						</div>
						<div className="text-lg font-bold text-gray-900">100K</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-600"></div>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">7 Days</span>
						</div>
						<div className="text-lg font-bold text-gray-900">21K</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-orange-500 rotate-45"></div>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">1 Day</span>
						</div>
						<div className="text-lg font-bold text-gray-900">1.5K</div>
					</div>
				</div>
			</div>
		</Widget>
	);
};
