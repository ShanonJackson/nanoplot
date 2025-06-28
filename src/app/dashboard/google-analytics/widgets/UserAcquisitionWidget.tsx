import { Widget } from "./Widget";
import { Graph } from "../../../../components/Graph/Graph";
import { Bars } from "../../../../components/Bars/Bars";
import { XAxis } from "../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../components/YAxis/YAxis";
import { GridLines } from "../../../../components/GridLines/GridLines";

export const UserAcquisitionWidget = () => {
	return (
		<Widget className={"p-6"}>
			<div>
				<div className="flex items-start justify-between mb-2">
					<div className="space-y-1">
						<h2 className="text-sm font-medium text-gray-700">New users by</h2>
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
				<div className={"h-[250px]"}>
					<Graph
						data={[
							{
								name: "New Users",
								fill: "rgb(26, 115, 232)",
								data: [
									{ x: "Direct", y: 66_695 },
									{ x: "Organic Search", y: 14_269 },
									{ x: "Paid Search", y: 1795 },
									{ x: "Cross Network", y: 1545 },
									{ x: "Referral", y: 1470 },
									{ x: "Unassigned", y: 394 },
									{ x: "Organic Social", y: 275 },
								].map(({ x, y }) => /* Horizontal */ ({ y: x, x: y })),
							},
						]}
					>
						<YAxis />
						<GridLines vertical={true} horizontal={false} border={false} />
						<Bars horizontal={true} size={80} />
						<XAxis ticks={{ jumps: 5 }} display={(x) => (x === 80_000 ? null : x.toString())} />
					</Graph>
				</div>
				<div className="flex justify-end mt-[40px]">
					<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
						View user acquisition
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
