import {
	BarGraphIcon,
	LineGraphIcon,
	PieGraphIcon,
	RadarGraphtIcon,
	ScatterGraphIcon,
	SunburstCartIcon,
	WorldmapIcon,
} from "../../assets/icons";

export const Href = {
	HOME: "/",
	BARS: "/graphs/bars",
	PIE: "/graphs/pie",
	LINES: "/graphs/lines",
	SCATTER: "/graphs/scatter",
	RADAR: "/graphs/radar",
	WORLDMAP: "/graphs/worldmap",
	SUNBURST: "/graphs/sunburst",
};

export const Routes = [
	{
		name: "Bar Graph",
		href: "/graphs/bars",
		icon: BarGraphIcon,
	},
	{
		name: "Pie Graph",
		href: "/graphs/pie",
		icon: PieGraphIcon,
	},
	{
		name: "Line Graph",
		href: "/graphs/lines",
		icon: LineGraphIcon,
	},
	{
		name: "Scatter Graph",
		href: "/graphs/scatter",
		icon: ScatterGraphIcon,
	},
	{
		name: "Radar Graph",
		href: "/graphs/radar",
		icon: RadarGraphtIcon,
	},
	{
		name: "Worldmap",
		href: "/graphs/worldmap",
		icon: WorldmapIcon,
	},
	{
		name: "Sunburst",
		href: "/graphs/sunburst",
		icon: SunburstCartIcon,
	},
];
