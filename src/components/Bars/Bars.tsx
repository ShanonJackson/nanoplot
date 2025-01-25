import React from "react";
import { VerticalBars } from "@/components/Bars/components/VerticalBars";
import { HorizontalBars } from "./components/HorizontalBars";

type ComponentProps = {
	horizontal?: boolean;
	loading?: boolean;
	size?: number;
	radius?: number;
};

export const Bars = ({ horizontal, loading, ...props }: ComponentProps) => {
	return horizontal ? <HorizontalBars {...props} /> : <VerticalBars loading={loading} {...props} />;
};
