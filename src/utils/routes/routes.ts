import {
	BarGraphIcon,
	LineGraphIcon,
	PieGraphIcon,
	RadarGraphtIcon,
	ScatterGraphIcon,
	SunburstCartIcon,
	WorldmapIcon,
} from "../../assets/icons";
import { AreaGraphIcon } from "../../assets/Icons/AreaGraphIcon/AreaGraphIcon";
import { HeatmapGraphIcon } from "../../assets/Icons/HeatmapGraphIcon/HeatmapGraphIcon";

export const Href = {
	HOME: "/",
	BARS: "/graphs/bars",
	PIE: "/graphs/pie",
	LINES: "/graphs/lines",
	SCATTER: "/graphs/scatter",
	RADAR: "/graphs/radar",
	WORLDMAP: "/graphs/worldmap",
	SUNBURST: "/graphs/sunburst",
	DOCUMENTATION: {
		["V1_0_0"]: {
			INDEX: "/documentation/1.0.0",
			GETTING_STARTED: "/documentation/1.0.0/getting-started",
			GRAPHS: {
				LINES: {
					INDEX: "/documentation/1.0.0/lines",
					TOOLTIP: "/documentation/1.0.0/lines/tooltip",
					EXAMPLES: "/documentation/1.0.0/lines/examples",
					PLAYGROUND: "/documentation/1.0.0/lines/playground",
				},
				SCATTER: {
					INDEX: "/documentation/1.0.0/scatter",
					TOOLTIP: "/documentation/1.0.0/scatter/tooltip",
					PLAYGROUND: "/documentation/1.0.0/scatter/playground",
				},
				BARS: {
					INDEX: "/documentation/1.0.0/bars",
					PLAYGROUND: "/documentation/1.0.0/bars/playground",
				},
				PIE: {
					INDEX: "/documentation/1.0.0/pie",
					PLAYGROUND: "/documentation/1.0.0/pie/playground",
				},
				AREA: {
					INDEX: "/documentation/1.0.0/area",
					TOOLTIP: "/documentation/1.0.0/area/tooltip",
					PLAYGROUND: "/documentation/1.0.0/area/playground",
				},
				RADAR: {
					INDEX: "/documentation/1.0.0/radar",
					PLAYGROUND: "/documentation/1.0.0/radar/playground",
				},
				HEATMAP: {
					INDEX: "/documentation/1.0.0/heatmap",
					PLAYGROUND: "/documentation/1.0.0/heatmap/playground",
				},
				WORLDMAP: {
					INDEX: "/documentation/1.0.0/worldmap",
					PLAYGROUND: "/documentation/1.0.0/worldmap/playground",
				},
			},
		},
	},
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
		name: "Radar Graph",
		href: "/graphs/radar",
		icon: RadarGraphtIcon,
	},
	{
		name: "Area Graph",
		href: "/graphs/area",
		icon: AreaGraphIcon,
	},
	{
		name: "Heatmap Graph",
		href: "/graphs/heatmap",
		icon: HeatmapGraphIcon,
	},
	{
		name: "Scatter Graph",
		href: "/graphs/scatter",
		icon: ScatterGraphIcon,
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
