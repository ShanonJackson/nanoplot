"use client";
import { useState } from "react";
import { Graph } from "../../../../components/Graph/Graph";
import { Lines } from "../../../../components/Lines/Lines";
import { XAxis } from "../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../components/YAxis/YAxis";
import { toRgb } from "../../../../utils/color/to-rgb";

export default function Page() {
	return (
		<div>
			<DashboardOverview />
		</div>
	);
}

const ChevronDownIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2">
		<path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const TrendDownIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1">
		<path d="M12 9L8 5L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M12 9L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		<path d="M12 5L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
	</svg>
);

const Dropdown = ({ value, options }: { value: string; options: string[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(value);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center text-white bg-gray-900 hover:bg-gray-800 px-3 py-2 rounded-lg text-sm transition-colors"
			>
				{selected}
				<ChevronDownIcon />
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10">
					{options.map((option) => (
						<button
							key={option}
							onClick={() => {
								setSelected(option);
								setIsOpen(false);
							}}
							className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg text-sm"
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

const MetricCard = ({
	value,
	label,
	isChange = false,
	isNegative = false,
}: {
	value: string;
	label: string;
	isChange?: boolean;
	isNegative?: boolean;
}) => (
	<div className="text-center">
		<div
			className={`text-2xl font-bold mb-1 ${
				isChange
					? isNegative
						? "text-red-500 flex items-center justify-center"
						: "text-green-500 flex items-center justify-center"
					: "text-white"
			}`}
		>
			{isChange && isNegative && <TrendDownIcon />}
			{value}
		</div>
		<div className="text-gray-500 text-sm">{label}</div>
	</div>
);

const DashboardOverview = () => {
	const timeOptions = ["This Week", "Last Week", "This Month", "Last Month"];

	return (
		<div className="bg-black rounded-xl p-6 w-full max-w-lg mx-auto">
			{/* Header */}
			<div className="flex justify-between items-start mb-8">
				<div>
					<h2 className="text-white text-2xl font-bold">Overview</h2>
					<p className="text-gray-500 text-sm">Mar 2022</p>
				</div>
				<Dropdown value="This Week" options={timeOptions} />
			</div>
			<div className={"h-[250px]"}>
				<Graph
					data={[
						{
							name: "Cars",
							stroke: "#fe1515",
							data: [
								{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
								{ x: new Date(2024, 0, 2, 0, 0, 0, 0), y: 25 },
								{ x: new Date(2024, 0, 3, 0, 0, 0, 0), y: 50 },
								{ x: new Date(2024, 0, 4, 0, 0, 0, 0), y: 45 },
								{ x: new Date(2024, 0, 5, 0, 0, 0, 0), y: 35 },
								{ x: new Date(2024, 0, 6, 0, 0, 0, 0), y: 55 },
							],
						},
					]}
				>
					<Lines curve={"natural"} />
					<Lines.Reference x={new Date(2024, 0, 4, 0, 0, 0, 0)} y={45}>
						HELLO WORLd
					</Lines.Reference>
					<XAxis
						ticks={{ jumps: "P1D" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							// Return short day of week like Mon, Tue, etc.
							return x.toLocaleDateString("en-US", { weekday: "short" });
						}}
					/>
				</Graph>
			</div>
			<div className="grid grid-cols-3 gap-6">
				<MetricCard value="$140" label="Current Price" />
				<MetricCard value="20%" label="Change (7D)" isChange={true} isNegative={true} />
				<MetricCard value="120k" label="Total Holders" />
			</div>
		</div>
	);
};
