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
					EXAMPLES: "/documentation/1.0.0/scatter/examples",
					PLAYGROUND: "/documentation/1.0.0/scatter/playground",
				},
				BARS: {
					INDEX: "/documentation/1.0.0/bars",
					EXAMPLES: "/documentation/1.0.0/bars/examples",
					PLAYGROUND: "/documentation/1.0.0/bars/playground",
				},
				PIE: {
					INDEX: "/documentation/1.0.0/pie",
					EXAMPLES: "/documentation/1.0.0/pie/examples",
					PLAYGROUND: "/documentation/1.0.0/pie/playground",
				},
				AREA: {
					INDEX: "/documentation/1.0.0/area",
					TOOLTIP: "/documentation/1.0.0/area/tooltip",
					EXAMPLES: "/documentation/1.0.0/area/examples",
					PLAYGROUND: "/documentation/1.0.0/area/playground",
				},
				RADAR: {
					INDEX: "/documentation/1.0.0/radar",
					EXAMPLES: "/documentation/1.0.0/radar/examples",
					PLAYGROUND: "/documentation/1.0.0/radar/playground",
				},
				HEATMAP: {
					INDEX: "/documentation/1.0.0/heatmap",
					EXAMPLES: "/documentation/1.0.0/heatmap/examples",
					PLAYGROUND: "/documentation/1.0.0/heatmap/playground",
				},
				WORLDMAP: {
					INDEX: "/documentation/1.0.0/worldmap",
					EXAMPLES: "/documentation/1.0.0/worldmap/examples",
					PLAYGROUND: "/documentation/1.0.0/worldmap/playground",
				},
			},
			CARTESIAN: {
				GRIDLINES: "/documentation/1.0.0/cartesian/gridlines",
				Y_AXIS: "/documentation/1.0.0/cartesian/yaxis",
				X_AXIS: "/documentation/1.0.0/cartesian/xaxis",
				LEGEND: "/documentation/1.0.0/cartesian/legend",
				ZOOM_SLIDER: "/documentation/1.0.0/cartesian/zoom-slider",
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
