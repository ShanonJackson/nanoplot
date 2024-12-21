import React from "react";
import { VerticalBars } from "@/components/Bars/components/VerticalBars";
import { ComponentProps } from "react";

export const Bars = (props: ComponentProps<typeof VerticalBars>) => {
	return <VerticalBars {...props} />;
};
