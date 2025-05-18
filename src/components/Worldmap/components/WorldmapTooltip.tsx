"use client";
import { ReactNode, useEffect, useState } from "react";
import { SegmentDataset, useGraph, useGraphRef } from "../../../hooks/use-graph/use-graph";
import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { GraphUtils } from "../../../utils/graph/graph";
import { TooltipMouse } from "../../Tooltip/TooltipMouse";

type Props = {
	tooltip: (datapoint: SegmentDataset[number]) => ReactNode;
};

const WorldmapTooltipComponent = ({ tooltip }: Props) => {
	const { id, data } = useGraph();
	const [datapoint, setDatapoint] = useState<SegmentDataset[number]>();
	const ref = useGraphRef();

	if (!GraphUtils.isSegmentData(data)) return null;
	const dataset = Object.fromEntries(data.map((datapoint) => [datapoint.id ?? datapoint.name, datapoint]));
	useEffect(() => {
		/* Keeps 'Worldmap' as server component */
		const countries = Array.from(document.querySelectorAll(`#${CSS.escape(id)} [data-iso]`)).filter(
			(country): country is SVGElement => {
				return country instanceof Element && country.getAttribute("data-iso") !== null;
			},
		);
		const onMouseMove = (e: MouseEvent) => {
			const target = e.currentTarget;
			if (!(target instanceof Element)) return;
			const iso = target.getAttribute("data-iso");
			if (!iso) return;
			const datapoint = dataset[iso];
			if (!datapoint) return;
			return setDatapoint({
				...dataset[iso],
				stroke: window.getComputedStyle(target).fill,
				fill: window.getComputedStyle(target).fill,
			});
		};
		const onMouseLeave = () => setDatapoint(undefined);
		const controller = new AbortController();
		countries.forEach((country) => {
			country.addEventListener("mouseleave", onMouseLeave, { signal: controller.signal, passive: true });
			country.addEventListener("mousemove", onMouseMove, { signal: controller.signal, passive: true });
		});
		return () => controller.abort();
	});
	if (!datapoint) return null;
	const content = tooltip(datapoint);
	if (!content) return null;
	return (
		<TooltipMouse active={true} bounds={ref}>
			{tooltip(datapoint)}
		</TooltipMouse>
	);
};

export const WorldmapTooltip = HydrateContext(WorldmapTooltipComponent);
