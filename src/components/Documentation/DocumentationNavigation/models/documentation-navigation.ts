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
				href: "#",
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
				href: "#",
				children: [
					{
						title: "Overview",
						href: "#",
					},
					{
						title: "Scatter.Tooltip",
						href: "#",
					},
				],
			},
			{
				title: "Bars",
				href: "#",
			},
			{
				title: "Radar",
				href: "#",
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
