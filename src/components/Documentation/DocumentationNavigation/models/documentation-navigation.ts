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
				title: "Overview",
				href: "#",
			},
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
						title: "Scatter.Tooltip",
						href: Hrefs.GRAPHS.SCATTER.TOOLTIP,
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
						title: "Area.Tooltip",
						href: Hrefs.GRAPHS.AREA.TOOLTIP,
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
						title: "Playground",
						href: Hrefs.GRAPHS.WORLDMAP.PLAYGROUND,
					},
				],
			},
		],
	},
	{
		title: "EXTENDING",
		items: [
			{
				title: "Themeing The Graphs",
				href: "#",
			},
			{
				title: "Custom Components",
				href: "#",
			},
		],
	},
];
