import { Widget } from "./Widget";

export const SessionsWidget = () => {
	return (
		<Widget className={"px-6 pt-6"}>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<span className="text-sm font-medium text-gray-900">Sessions</span>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
							<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span className="text-sm text-gray-900 ml-2">by Session medium</span>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
							<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
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

				<div className="space-y-3">
					<div className="flex justify-between items-center pb-2">
						<h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Session medium</h3>
						<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sessions</span>
					</div>
					<div className="space-y-3">
						{[
							{ label: "(none)", value: "80K", percentage: 80 },
							{ label: "organic", value: "21K", percentage: 21 },
							{ label: "cpc", value: "4.7K", percentage: 4.7 },
							{ label: "referral", value: "4.3K", percentage: 4.3 },
							{ label: "(data not available)", value: "714", percentage: 0.7 },
							{ label: "email", value: "709", percentage: 0.7 },
							{ label: "other", value: "2", percentage: 0.002 },
						].map((item, index) => (
							<div key={index} className={`flex flex-wrap justify-between items-center`}>
								<span className="text-sm text-gray-700">{item.label}</span>
								<span className="text-sm font-medium text-gray-900">{item.value}</span>
								<div className="relative h-[1px] w-full bg-blue-200 [flex-basis:100%]">
									<div
										className={`h-[2px] absolute inset-0 bg-blue-500 top-[-0.5px]`}
										style={{ width: item.percentage + "%" }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-end pt-2">
					<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-[12px]">
						View traffic acquisition
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
