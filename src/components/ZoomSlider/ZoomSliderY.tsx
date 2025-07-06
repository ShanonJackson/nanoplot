import React from "react";
import { Graph } from "../Graph/Graph";
import { InternalGraphContext, useGraph } from "../../hooks/use-graph/use-graph";
import { VerticalRangeSlider } from "../Slider/VerticalRangeSlider";

type Props = {
	onChange: (zoom: { x: [number, number]; y: [number, number] }) => void;
	distance?: { minimum?: number };
};

export const ZoomSliderY = ({ onChange, distance = { minimum: 10 } }: Props) => {
	const { zoom } = useGraph();
	return (
		<Graph.Column className={"pl-[20px]"}>
			<VerticalRangeSlider value={zoom.y} onChange={(y) => onChange({ ...zoom, y })} distance={distance} />
		</Graph.Column>
	);
};

ZoomSliderY.context = (ctx: InternalGraphContext, props: Props): InternalGraphContext => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			columns: ctx.layout.columns + " max-content",
		},
	};
};
