"use client";
import { isValidElement, ReactNode, useEffect, useState } from "react";
import { SegmentDataset, useGraph } from "../../../hooks/use-graph/use-graph";
import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { GraphUtils } from "../../../utils/graph/graph";
import { Popup } from "../../Tooltip/Popup";
import { Portal } from "../../Portal/Portal";
import { TooltipMouse } from "../../Tooltip/TooltipMouse";

type Props = {
	tooltip: (datapoint: SegmentDataset[number]) => ReactNode;
};

const WorldmapTooltipComponent = ({ tooltip }: Props) => {
	const { id, data } = useGraph();
	const [position, setPosition] = useState<{ x: number; y: number; datapoint: SegmentDataset[number] }>();
	if (!GraphUtils.isSegmentData(data)) return null;
	const dataset = Object.fromEntries(data.map((datapoint) => [datapoint.id ?? datapoint.name, datapoint]));
	useEffect(() => {
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
			return setPosition({
				x: e.clientX + window.scrollX,
				y: e.clientY + window.scrollY,
				datapoint: {
					...dataset[iso],
					stroke: window.getComputedStyle(target).fill,
					fill: window.getComputedStyle(target).fill,
				},
			});
		};
		const onMouseLeave = () => setPosition(undefined);
		const controller = new AbortController();
		countries.forEach((country) => country.addEventListener("mousemove", onMouseMove, { signal: controller.signal, passive: true }));
		countries.forEach((country) => country.addEventListener("mouseleave", onMouseLeave, { signal: controller.signal, passive: true }));
		return () => controller.abort();
	});
	if (!position) return null;
	const content = tooltip(position.datapoint);
	if (!content) return null;
	return <TooltipMouse active={true}>HELLO WORLD</TooltipMouse>;
};

export const WorldmapTooltip = HydrateContext(WorldmapTooltipComponent);
