import React, { Fragment, useState } from "react";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { ColorUtils } from "@/utils/color/color";
import { PathUtils } from "@/utils/path/path";
import { SunburstLoading } from "./SunburstLoading";

export type Sunburst = Array<{
	name: string;
	value: number;
	stroke?: string;
	children: Sunburst;
}>;

type Props = { loading?: boolean };

const RING_SIZE = 0.2;
const data = [
	{ name: "Other", value: 50, children: [] },
	{
		name: "Amazon",
		value: 30,
		children: [
			{
				name: "",
				value: 20,
				children: [
					{
						name: "",
						value: 10,
						children: [
							{ name: "", value: 5, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 1, children: [] },
						],
					},
					{ name: "", value: 10, children: [] },
				],
			},
			{
				name: "",
				value: 5,
				children: [
					{ name: "", value: 2, children: [] },
					{ name: "", value: 1, children: [] },
					{ name: "", value: 1, children: [] },
					{ name: "", value: 1, children: [] },
				],
			},
			{ name: "", value: 5, children: [] },
		],
	},
	{
		name: "Disney",
		value: 40,
		children: [
			{
				name: "Anime",
				value: 20,
				children: [
					{
						name: "Spirited Away",
						value: 20,
						children: [
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
							{ name: "", value: 2, children: [] },
						],
					},
				],
			},
			{
				name: "Action",
				value: 20,
				children: [
					{
						name: "y",
						value: 10,
						children: [
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
						],
					},
					{
						name: "x",
						value: 10,
						children: [
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
							{ name: "", value: 1, children: [] },
						],
					},
				],
			},
		],
	},
	{
		name: "Netflix",
		value: 30,
		children: [
			{ name: "ABC", value: 20, children: [] },
			{ name: "", value: 5, children: [] },
			{ name: "", value: 5, children: [] },
		],
	},
];

export const Sunburst = ({ loading }: Props) => {
	const { viewbox } = useGraph();
	const [activeRing, setActiveRing] = useState<Sunburst[number]>();
	const dataset = data.toSorted((a, b) => b.value - a.value);

	if (loading) return <SunburstLoading />;

	/* maximum depth */
	const rings = (function getDepth(data: Sunburst, depth = 1): number {
		const depths = data.map((segment): number => {
			if (segment.children.length) return depth + getDepth(segment.children);
			return depth;
		});
		return Math.max(...depths);
	})(data);

	const render = ({
		ring,
		availableDegrees,
		startDegrees,
		previousTotal,
		color,
	}: {
		ring: number;
		availableDegrees: number;
		startDegrees: number;
		previousTotal: number;
		color?: string;
	}) => {
		const RING_WIDTH = 300;
		const RING_GAP = 20;
		const SEGMENT_GAP_DEGREES = 0.5;

		return (d: Sunburst[number], i: number, bursts: Sunburst) => {
			const isActiveRing = activeRing === d;
			const degrees = (() => {
				if (isActiveRing) return 360;
				// if (activeRing && !isActiveRing) return 0;
				const suggested = availableDegrees * (d.value / previousTotal);
				return suggested === 360 ? suggested : suggested - SEGMENT_GAP_DEGREES;
			})();
			const previousDegrees = (() => {
				if (isActiveRing) return 0;
				// if (activeRing && !isActiveRing) return 0;
				return (
					startDegrees +
					availableDegrees *
						(bursts.slice(0, i).reduce((sum: number, { value }: Sunburst[number]) => sum + value, 0) / previousTotal)
				);
			})();

			const stroke = color || ColorUtils.colorFor(i);
			if (activeRing && !isActiveRing && ring === 1) return null;

			return (
				<Fragment key={i}>
					<Segment
						segment={d}
						degrees={degrees}
						previousDegrees={previousDegrees}
						ring={ring}
						stroke={stroke}
						onClick={() => {
							if (!d.children.length) return;
							setActiveRing(d);
						}}
					/>

					{d.children.map(
						render({
							ring: ring + 1,
							availableDegrees: degrees,
							startDegrees: previousDegrees,
							previousTotal: d.value,
							color: stroke,
						}),
					)}
				</Fragment>
			);
		};
	};

	return (
		<svg viewBox={`0 0 ${viewbox.x} ${viewbox.y}`} className={"h-full w-full"}>
			{dataset.map(
				render({
					ring: 1,
					availableDegrees: 360,
					startDegrees: 0,
					previousTotal: dataset.reduce((sum, { value }) => sum + value, 0),
				}),
			)}
			<path
				d={PathUtils.circleArc(viewbox.x / 2, viewbox.y / 2, 320)}
				fill="black"
				stroke="black"
				onClick={() => setActiveRing(undefined)}
			/>
		</svg>
	);
};

type SegmentProps = {
	previousDegrees: number;
	degrees: number;
	stroke: string;
	ring: number;
	segment?: Sunburst[number];
	onClick?: () => void;
} & React.JSX.IntrinsicElements["path"];

export const Segment = ({ onClick, previousDegrees, degrees, ring, stroke, ...path }: SegmentProps) => {
	const { viewbox } = useGraph();
	const RING_WIDTH = 300;
	const RING_GAP = 20;
	const start = previousDegrees;
	const size = previousDegrees + degrees;

	return (
		<path
			d={PathUtils.annularArc(
				viewbox.x / 2,
				viewbox.y / 2,
				start,
				size,
				RING_WIDTH * ring + RING_GAP,
				RING_WIDTH * ring + RING_WIDTH,
			)}
			fill={stroke}
			stroke={stroke}
			onClick={onClick}
			{...path}
		/>
	);
};
