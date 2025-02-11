"use client";
import { Graph } from "../../../components/Graph/Graph";
import { Legend } from "../../../components/Legend/Legend";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Lines } from "../../../components/Lines/Lines";
import { Bars } from "../../../components/Bars/Bars";
import { useEffect, useState } from "react";

export default function AnalyticsDashboard() {
	const [mounted, setMounted] = useState(false); /* datetime hydration - easier to deal with this way. */
	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<div className="text-black p-6 space-y-6">
			{/* Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<MetricCard title="Requests" value="6k" trend="+20.29%" data={requestData} />
				<MetricCard title="Subrequests" value="8k" trend="+66.61%" data={subrequestData} />
				<MetricCard title="CPU Time" value="11.14" unit="ms" trend="+6.00%" data={cpuData} />
				<MetricCard title="Request Duration" value="515" unit="ms" trend="+19.06%" data={durationData} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col bg-white rounded-lg shadow-md p-6 max-h-[400px]">
					<div className="text-lg font-semibold mb-6">Requests</div>
					<Graph
						data={[
							{
								name: "Requests",
								fill: "#8B7FE8",
								data: requestsBarData,
							},
						]}
						className={"h-0 h-0 flex-1"}
					>
						<YAxis />
						<GridLines />
						<Bars />
						<XAxis />
					</Graph>
				</div>
				<div className="flex flex-col bg-white rounded-lg shadow-md p-6 max-h-[400px]">
					<div className="text-lg font-semibold mb-4">Subrequests</div>
					<Graph
						data={[
							{
								name: "Uncached",
								fill: "#F5A97F",
								data: subrequestsBarData,
							},
						]}
						className={"h-0 flex-1"}
					>
						<Legend alignment="end" position="top" />
						<YAxis />
						<GridLines />
						<Bars />
						<XAxis />
					</Graph>
				</div>
			</div>
		</div>
	);
}

// Metric Card Component
function MetricCard({ title, value, unit, trend, data }: { title: string; value: string; unit?: string; trend: string; data: any }) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex justify-between items-center mb-2">
				<div className="text-sm font-medium">{title}</div>
				<span className="text-xs text-gray-500">{trend}</span>
			</div>
			<div className="text-2xl font-bold">
				{value}
				{unit && <span className="text-xs ml-1">{unit}</span>}
			</div>
			<div className={"[height:100px] [width:auto]"}>
				<Graph
					data={[
						{
							name: title,
							stroke: "#85C1DC",
							data: data,
						},
					]}
					interactions={{ hovered: [title] }}
					gap={{ top: 5, right: 5, bottom: 5, left: 5 }}
				>
					<Lines curve="natural" />
				</Graph>
			</div>
		</div>
	);
}

// Sample data arrays
const requestData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: new Date(2024, i, 1, 0, 0, 0, 0),
		y: Math.random() * 50 + 50,
	}));

const subrequestData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: new Date(2024, i, 1, 0, 0, 0, 0),
		y: Math.random() * 50 + 50,
	}));

const cpuData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: new Date(2024, i, 1, 0, 0, 0, 0),
		y: Math.random() * 5 + 8,
	}));

const durationData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: new Date(2024, i, 1, 0, 0, 0, 0),
		y: Math.random() * 100 + 450,
	}));

const requestsBarData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: `${i}:00`,
		y: Math.floor(Math.random() * 300 + 200),
	}));

const subrequestsBarData = Array(12)
	.fill(0)
	.map((_, i) => ({
		x: `${i}:00`,
		y: Math.floor(Math.random() * 500 + 300),
	}));
