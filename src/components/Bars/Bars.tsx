import React, { ComponentProps } from "react";
import { HorizontalBars } from "./components/HorizontalBars";
import { VerticalBars } from "./components/VerticalBars";
import { GraphContext } from "../../hooks/use-graph/use-graph";
import { ColorUtils } from "../../utils/color/color";

type VerticalProps = { horizontal?: false } & ComponentProps<typeof VerticalBars>;
type HorizontalProps = { horizontal?: true } & ComponentProps<typeof HorizontalBars>;

export const Bars = (props: VerticalProps | HorizontalProps) => {
	return props.horizontal ? <HorizontalBars {...props} /> : <VerticalBars {...props} />;
};

Bars.context = (ctx: GraphContext, props: VerticalProps | HorizontalProps): GraphContext => {
	return {
		...ctx,
		colorFor: ColorUtils.schemes.segmented,
	};
};
