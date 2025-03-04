import React, { ComponentProps } from "react";
import { HorizontalBars } from "./components/HorizontalBars";
import { VerticalBars } from "./components/VerticalBars";
import { GraphContext } from "../../hooks/use-graph/use-graph";
import { ColorUtils } from "../../utils/color/color";

type VerticalProps = { horizontal?: false } & ComponentProps<typeof VerticalBars>;
type HorizontalProps = { horizontal?: true } & ComponentProps<typeof HorizontalBars>;

export const Bars = ({ horizontal, ...props }: VerticalProps | HorizontalProps) => {
	return horizontal ? <HorizontalBars {...props} /> : <VerticalBars {...props} />;
};

Bars.context = (ctx: GraphContext): GraphContext => {
	return {
		...ctx,
		colors: ColorUtils.scheme.contrast,
	};
};
