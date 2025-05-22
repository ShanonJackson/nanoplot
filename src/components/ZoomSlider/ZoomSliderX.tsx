import React from "react";
import { Graph } from "../Graph/Graph";
import { GraphContext, useGraph } from "../../hooks/use-graph/use-graph";
import { RangeSlider } from "../Slider/RangeSlider";

type Props = {
	onChange: (zoom: { x: [number, number]; y: [number, number] }) => void;
	distance?: { minimum?: number };
};

export const ZoomSliderX = ({ onChange, distance = { minimum: 10 } }: Props) => {
	const { zoom } = useGraph();
	return (
		<Graph.Row className={"pb-[10px]"}>
			<RangeSlider value={zoom.x} onChange={(x) => onChange({ ...zoom, x })} distance={distance} />
		</Graph.Row>
	);
};

ZoomSliderX.context = (ctx: GraphContext, props: Props): GraphContext => {
	return {
		...ctx,
		layout: {
			...ctx.layout,
			rows: "max-content " + ctx.layout.rows,
		},
	};
};
