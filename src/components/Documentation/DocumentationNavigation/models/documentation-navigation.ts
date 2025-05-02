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
						title: "Lines.Tooltip",
						href: Hrefs.GRAPHS.LINES.TOOLTIP,
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
				href: "#",
			},
			{
				title: "Radar",
				href: Hrefs.GRAPHS.RADAR.INDEX,
			},
			{
				title: "Pie",
				href: "#",
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
