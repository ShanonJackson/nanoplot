import {
	WorldmapIcon,
	PieGraphIcon,
	ScatterGraphIcon,
	LineGraphIcon,
	BarGraphIcon,
	RadarGraphtIcon,
	SunburstCartIcon,
} from "@/assets/icons";

export const Routes = [
	{
		name: "Pie Graph",
		href: "/pie-graph",
		icon: PieGraphIcon,
	},
	{
		name: "Line Graph",
		href: "/line-graph",
		icon: LineGraphIcon,
	},
	{
		name: "Bar Graph",
		href: "/bar-graph",
		icon: BarGraphIcon,
	},
	{
		name: "Scatter Graph",
		href: "/scatter-graph",
		icon: ScatterGraphIcon,
	},
	{
		name: "Radar Graph",
		href: "/radar-graph",
		icon: RadarGraphtIcon,
	},
	{
		name: "Worldmap",
		href: "/worldmap",
		icon: WorldmapIcon,
	},
	{
		name: "Sunburst",
		href: "/sunburst-graph",
		icon: SunburstCartIcon,
	},
];
