import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { Lines } from "../../../../components/Lines/Lines";
import { XAxis } from "../../../../components/XAxis/XAxis";
import { GridLines } from "../../../../components/GridLines/GridLines";
import { YAxis } from "../../../../components/YAxis/YAxis";

type Props = {};

export const LinesWidget = ({}: Props) => {
	return (
		<Widget className={"flex w-[700px] p-6 flex-col"}>
			<div className="flex items-center justify-between mb-8">
				<button className="p-2 hover:bg-gray-100 rounded-full">
					<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<div className="flex-1 grid grid-cols-3 gap-8 mx-8">
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-2">
							<span className="text-sm text-gray-600">Active users</span>
							<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="text-3xl font-semibold text-gray-900">92K</div>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-2">
							<span className="text-sm text-gray-600">New users</span>
							<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="text-3xl font-semibold text-gray-900">89K</div>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-2">
							<span className="text-sm text-gray-600">Engagement</span>
							<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
								<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
						<div className="text-3xl font-semibold text-gray-900">51s</div>
					</div>
				</div>
				<button className="p-2 hover:bg-gray-100 rounded-full">
					<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
			<div className="relative w-full h-0 flex-1">
				<Graph
					className={"min-h-0"}
					data={[
						{
							name: "Active Users",
							stroke: "rgb(26, 115, 232)",
							data: [
								{ x: new Date(2025, 5, 30, 0, 0), y: 4562 }, // June 30
								{ x: new Date(2025, 5, 31, 0, 0), y: 3249 }, // July 1
								{ x: new Date(2025, 6, 1, 0, 0), y: 3230 }, // July 2
								{ x: new Date(2025, 6, 2, 0, 0), y: 3855 }, // July 3
								{ x: new Date(2025, 6, 3, 0, 0), y: 3714 }, // July 4
								{ x: new Date(2025, 6, 4, 0, 0), y: 3596 }, // July 5
								{ x: new Date(2025, 6, 5, 0, 0), y: 4475 }, // July 6
								{ x: new Date(2025, 6, 6, 0, 0), y: 3380 }, // July 7
								{ x: new Date(2025, 6, 7, 0, 0), y: 3202 }, // July 8
								{ x: new Date(2025, 6, 8, 0, 0), y: 3162 }, // July 9
								{ x: new Date(2025, 6, 9, 0, 0), y: 3619 }, // July 10
								{ x: new Date(2025, 6, 10, 0, 0), y: 3612 }, // July 11
								{ x: new Date(2025, 6, 11, 0, 0), y: 3730 }, // July 12
								{ x: new Date(2025, 6, 12, 0, 0), y: 3874 }, // July 13
								{ x: new Date(2025, 6, 13, 0, 0), y: 3769 }, // July 14
								{ x: new Date(2025, 6, 14, 0, 0), y: 3810 }, // July 15
								{ x: new Date(2025, 6, 15, 0, 0), y: 3243 }, // July 16
								{ x: new Date(2025, 6, 16, 0, 0), y: 3610 }, // July 17
								{ x: new Date(2025, 6, 17, 0, 0), y: 3477 }, // July 18
								{ x: new Date(2025, 6, 18, 0, 0), y: 3826 }, // July 19
								{ x: new Date(2025, 6, 19, 0, 0), y: 2994 }, // July 20
								{ x: new Date(2025, 6, 20, 0, 0), y: 3446 }, // July 21
								{ x: new Date(2025, 6, 21, 0, 0), y: 3281 }, // July 22
								{ x: new Date(2025, 6, 22, 0, 0), y: 3111 }, // July 23
								{ x: new Date(2025, 6, 23, 0, 0), y: 3832 }, // July 24
								{ x: new Date(2025, 6, 24, 0, 0), y: 4000 }, // July 25
								{ x: new Date(2025, 6, 25, 0, 0), y: 3770 }, // July 26
								{ x: new Date(2025, 6, 26, 0, 0), y: 2324 }, // July 27
							],
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
						className={"ml-2"}
						position={"right"}
						display={(v) => {
							// format 4000 to say 4k using Intl.NumberFormat
							if (typeof v === "number") {
								return new Intl.NumberFormat("en-US", {
									notation: "compact",
									compactDisplay: "short",
									minimumFractionDigits: 0,
									maximumFractionDigits: 1,
								}).format(v);
							}
						}}
					/>
					<XAxis
						ticks={{ jumps: "P7D" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							// format standard month name i.e "Jul", "Sep" etc.
							return x.toLocaleDateString("en-US", { month: "short", day: "numeric" });
						}}
					/>
				</Graph>
			</div>
		</Widget>
	);
};
