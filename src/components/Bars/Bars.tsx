import React, { ComponentProps } from "react";
import { VerticalBars } from "@/components/Bars/components/VerticalBars";
import { HorizontalBars } from "./components/HorizontalBars";

type VerticalProps = { horizontal?: false } & ComponentProps<typeof VerticalBars>;
type HorizontalProps = { horizontal?: true } & ComponentProps<typeof HorizontalBars>;

export const Bars = (props: VerticalProps | HorizontalProps) => {
	return props.horizontal ? <HorizontalBars {...props} /> : <VerticalBars {...props} />;
};
