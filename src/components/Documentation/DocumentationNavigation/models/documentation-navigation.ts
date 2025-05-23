import { Href } from "../../../../utils/routes/routes";

type MenuItem = {
	title: string;
	href?: string;
	children?: MenuItem[];
};

const Hrefs = Href.DOCUMENTATION.V1_0_0;
export const documentationNavigation: Array<{ title: string; items: MenuItem[] }> = [
	{
		title: "",
		items: [
			{
				title: "Get Started",
				href: Hrefs.GETTING_STARTED,
			},
		],
	},
	{
		title: "GRAPHS",
		items: [
			{
				title: "Lines",
				href: Hrefs.GRAPHS.LINES.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.LINES.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.LINES.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.LINES.PLAYGROUND,
					},
				],
			},
			{
				title: "Scatter",
				href: Hrefs.GRAPHS.SCATTER.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.SCATTER.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.SCATTER.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.SCATTER.PLAYGROUND,
					},
				],
			},
			{
				title: "Bars",
				href: Hrefs.GRAPHS.BARS.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.BARS.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.BARS.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.BARS.PLAYGROUND,
					},
				],
			},
			{
				title: "Pie",
				href: Hrefs.GRAPHS.PIE.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.PIE.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.PIE.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.PIE.PLAYGROUND,
					},
				],
			},
			{
				title: "Area",
				href: Hrefs.GRAPHS.AREA.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.AREA.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.AREA.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.AREA.PLAYGROUND,
					},
				],
			},
			{
				title: "Radar",
				href: Hrefs.GRAPHS.RADAR.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.RADAR.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.RADAR.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.RADAR.PLAYGROUND,
					},
				],
			},
			{
				title: "Heatmap",
				href: Hrefs.GRAPHS.HEATMAP.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.HEATMAP.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.HEATMAP.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.HEATMAP.PLAYGROUND,
					},
				],
			},
			{
				title: "Worldmap",
				href: Hrefs.GRAPHS.WORLDMAP.INDEX,
				children: [
					{
						title: "Overview",
						href: Hrefs.GRAPHS.WORLDMAP.INDEX,
					},
					{
						title: "Examples",
						href: Hrefs.GRAPHS.WORLDMAP.EXAMPLES,
					},
					{
						title: "Playground",
						href: Hrefs.GRAPHS.WORLDMAP.PLAYGROUND,
					},
				],
			},
		],
	},
	// {
	// 	title: "CARTESIAN",
	// 	items: [
	// 		{
	// 			title: "Gridlines",
	// 			href: Hrefs.CARTESIAN.GRIDLINES,
	// 		},
	// 		{
	// 			title: "YAxis",
	// 			href: Hrefs.CARTESIAN.Y_AXIS,
	// 		},
	// 		{
	// 			title: "XAxis",
	// 			href: Hrefs.CARTESIAN.X_AXIS,
	// 		},
	// 		{
	// 			title: "Legend",
	// 			href: Hrefs.CARTESIAN.LEGEND,
	// 		},
	// 		{
	// 			title: "ZoomSlider",
	// 			href: Hrefs.CARTESIAN.ZOOM_SLIDER,
	// 		},
	// 	],
	// },
	// {
	// 	title: "EXTENDING",
	// 	items: [
	// 		{
	// 			title: "Extensibility",
	// 			href: "#",
	// 		},
	// 		{
	// 			title: "Themeing",
	// 			href: "#",
	// 		},
	// 	],
	// },
];
