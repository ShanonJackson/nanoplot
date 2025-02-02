import React, { ComponentProps } from "react";
import { HorizontalBars } from "./components/HorizontalBars";
import { VerticalBars } from "./components/VerticalBars";

type VerticalProps = { horizontal?: false } & ComponentProps<typeof VerticalBars>;
type HorizontalProps = { horizontal?: true } & ComponentProps<typeof HorizontalBars>;

export const Bars = (props: VerticalProps | HorizontalProps) => {
	return props.horizontal ? <HorizontalBars {...props} /> : <VerticalBars {...props} />;
};
