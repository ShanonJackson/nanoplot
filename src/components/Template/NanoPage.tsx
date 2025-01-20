"use client";

import React, { ComponentProps, useState } from "react";
import { ControlGroup } from "../ControlGroup/ControlGroup";
import { Control } from "../Docs/Control/Control";
import { Graph } from "../Graph/Graph";
import { GridLines, Legend, SegmentDataset, XAxis, XYDataset, YAxis } from "../../export";
import { HTMLControl } from "../Docs/Control/components/HTMLControl/HTMLControl";
import { BooleanControl } from "../Docs/Control/components/BooleanControl/BooleanControl";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	data: XYDataset | SegmentDataset;
	graph: React.ReactNode;
}

function NanoPage({ title, data, graph, children }: Props) {
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});

	const setXAxisPartial = (partial: Partial<ComponentProps<typeof XAxis>>) => setXAxis((prev) => ({ ...prev, ...partial }));
	const setYAxisPartial = (partial: Partial<ComponentProps<typeof YAxis>>) => setYAxis((prev) => ({ ...prev, ...partial }));
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));

	return (
		<div className={"h-full mb-2 overflow-hidden grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<div className={"row-span-2 pb-14 border-[1px] border-dotted border-white"}>
				<h1 className="p-4 font-semibold font-serif text-center">{title}</h1>
				<div className="overflow-y-auto h-full">
					{children}
					<ControlGroup title={"Legend"}>
						<Control name={"position"} type={"'top' | 'bottom' | 'left' | 'right'"}>
							control pending...
						</Control>
						<Control name={"alignment"} type={"'center' | 'left' | 'right' | 'top'"}>
							control pending...
						</Control>
					</ControlGroup>
					<ControlGroup title={"GridLines"}>
						<Control name={"border"} type={"boolean"} default={"false"}>
							<BooleanControl
								value={gridline.border}
								onChange={(checked) => setGridPartial({ border: checked })}
								description={"Adds Border To Graph"}
							/>
						</Control>
						<Control name={"horizontal"} type={"boolean"} default={"false"}>
							<BooleanControl
								value={gridline.horizontal}
								onChange={(checked) => setGridPartial({ horizontal: checked })}
								description={"Adds horizontal grid lines to graph"}
							/>
						</Control>
						<Control name={"vertical"} type={"boolean"} default={"false"}>
							<BooleanControl
								value={gridline.vertical}
								onChange={(checked) => setGridPartial({ vertical: checked })}
								description={"Adds vertical grid lines to graph"}
							/>
						</Control>
					</ControlGroup>
					<ControlGroup title={"YAxis"}>
						<Control name={"title"} type={"ReactNode"}>
							<HTMLControl html={yaxis.title?.toString() ?? ""} onChange={(html) => setYAxisPartial({ title: html })} />
						</Control>
						<Control name={"description"} type={"ReactNode"}>
							<HTMLControl
								html={yaxis.description?.toString() ?? ""}
								onChange={(html) => setYAxisPartial({ description: html })}
							/>
						</Control>
					</ControlGroup>
					<ControlGroup title={"XAxis"}>
						<Control name={"title"} type={"ReactNode"}>
							<HTMLControl html={xaxis.title?.toString() ?? ""} onChange={(html) => setXAxisPartial({ title: html })} />
						</Control>
						<Control name={"description"} type={"ReactNode"}>
							<HTMLControl
								html={xaxis.description?.toString() ?? ""}
								onChange={(html) => setXAxisPartial({ description: html })}
							/>
						</Control>
					</ControlGroup>
				</div>
			</div>
			<div className={"border-[1px] h-full border-dotted border-white pr-4"}>
				<Graph data={data}>
					<Legend position={"top"} alignment={"center"} />
					<YAxis
						{...yaxis}
						title={<div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />}
						description={<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />}
					/>
					<GridLines {...gridline} />
					{graph}
					<XAxis
						{...xaxis}
						title={<div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />}
					/>
				</Graph>
			</div>
			<div className={"border-[1px] border-dotted border-white"}>EXAMPLES</div>
		</div>
	);
}

export default NanoPage;
