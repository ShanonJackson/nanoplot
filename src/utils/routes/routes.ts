import {
	BarGraphIcon,
	LineGraphIcon,
	PieGraphIcon,
	RadarGraphtIcon,
	ScatterGraphIcon,
	SunburstCartIcon,
	WorldmapIcon,
} from "../../assets/icons";
import { FC } from 'react';

interface RouteItem {
    name: string;
    href: string;
    icon?: FC<{ className?: string }>;
}

export const Routes: RouteItem[] = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Bar Graph",
		href: "/graphs/bars",
		icon: BarGraphIcon,
	},
	{
		name: "Line Graph",
		href: "/graphs/lines",
		icon: LineGraphIcon,
	},
	{
		name: "Pie Graph",
		href: "/graphs/pie",
		icon: PieGraphIcon,
	},
	{
		name: "Radar Graph",
		href: "/graphs/radar",
		icon: RadarGraphtIcon,
	},
	{
		name: "Scatter Graph",
		href: "/graphs/scatter",
		icon: ScatterGraphIcon,
	},
	{
		name: "Sunburst Graph",
		href: "/graphs/sunburst",
		icon: SunburstCartIcon,
	},
	{
		name: "World Map",
		href: "/graphs/worldmap",
		icon: WorldmapIcon,
	},
];
