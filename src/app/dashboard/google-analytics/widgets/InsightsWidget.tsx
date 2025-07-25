import { Widget } from "./Widget";

export const InsightsWidget = () => {
	return (
		<Widget className={"flex flex-col pt-6 pb-4 w-[384px]"}>
			<div className="flex items-center gap-2 mb-2 px-6">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-600">
					<path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					<path
						d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<h2 className="text-lg font-semibold text-gray-900">Insights</h2>
			</div>
			<div className="bg-gray-50 rounded-lg p-8 text-center space-y-4 flex-1">
				<p className="text-gray-700 font-medium">Your Insights will appear here soon.</p>

				<p className="text-sm text-gray-600">
					In the meantime, you can create new custom insights to monitor your most important metrics.{" "}
					<a href="#" className="text-blue-600 hover:text-blue-700 underline">
						Learn more
					</a>
				</p>
			</div>
			<div className="flex justify-end mt-[10px] px-6">
				<a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
					View all insights
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
						<path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</a>
			</div>
		</Widget>
	);
};
