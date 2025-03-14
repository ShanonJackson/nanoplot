import { Href } from "../../../../utils/routes/routes";

type MenuItem = {
	title: string;
	href?: string;
	children?: MenuItem[];
};

export const documentationNavigation: Array<{ title: string; items: MenuItem[] }> = [
	{
		title: "",
		items: [
			{
				title: "Get Started",
				href: Href.DOCUMENTATION.V1_0_0.GETTING_STARTED,
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
						href: "#",
					},
					{
						title: "Lines.Tooltip",
						href: "#",
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
