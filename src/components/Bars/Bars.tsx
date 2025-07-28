import React, { ComponentProps } from "react";
import { HorizontalBars } from "./components/HorizontalBars";
import { VerticalBars } from "./components/VerticalBars";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";
import { ColorUtils } from "../../utils/color/color";
import { BarsMouse } from "./components/BarsMouse";

type VerticalProps = { horizontal?: false } & ComponentProps<typeof VerticalBars>;
type HorizontalProps = { horizontal?: true } & ComponentProps<typeof HorizontalBars>;

export const Bars = ({ horizontal, ...props }: VerticalProps | HorizontalProps) => {
	return horizontal ? <HorizontalBars {...props} /> : <VerticalBars {...props} />;
};

Bars.context = (ctx: InternalGraphContext): InternalGraphContext => {
	return {
		...ctx,
		colors: ColorUtils.scheme.contrast,
	};
};

Bars.Mouse = BarsMouse;
