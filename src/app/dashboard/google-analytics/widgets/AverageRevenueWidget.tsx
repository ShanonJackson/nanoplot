import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { YAxis } from "../../../../components/YAxis/YAxis";
import { Bars } from "../../../../components/Bars/Bars";
import { XAxis } from "../../../../components/XAxis/XAxis";
import { GridLines } from "../../../../components/GridLines/GridLines";

export const AverageValueWidget = () => {
	return (
		<Widget className={"p-6 w-[464px]"}>
			<div className="space-y-6">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<h2 className="text-sm font-medium text-gray-700">Average 120d value by</h2>
						<div className="flex items-center gap-1">
							<span className="text-sm text-gray-900">First user primary channel group (Default C...</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
								<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
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
				<div className="h-[240px]">
					<Graph
						data={[
							{
								name: "Revenue",
								fill: "rgb(26, 115, 232)",
								data: [
									{ x: 65, y: "Email" },
									{ x: 6.0, y: "Cross-network" },
									{ x: 4.0, y: "Unassigned" },
									{ x: 3.0, y: "Referral" },
									{ x: 2.0, y: "Paid Search" },
									{ x: 1.5, y: "Organic Shopping" },
									{ x: 1.0, y: "Direct" },
								].map(({ x, y }) => ({ x: x, y })),
							},
						]}
					>
						<YAxis />
						<GridLines vertical={true} horizontal={false} border={false} />
						<Bars horizontal={true} size={80} />
						<XAxis
							ticks={{ to: 80, jumps: 5 }}
							display={(x) => {
								if (x === 80) return null;
								return typeof x === "number"
									? new Intl.NumberFormat("en-US", {
											style: "currency",
											currency: "USD",
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										}).format(x)
									: null;
							}}
						/>
					</Graph>
				</div>
				<div className="flex justify-end pt-2">
					<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
						View user acquisition cohorts
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
