"use client";
import { Bars } from "@/components/Bars/Bars";
import { useState } from "react";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import NanoPage from "@/components/Template/NanoPage";
import { ControlGroup } from "../../components/ControlGroup/ControlGroup";

export default function Page() {
	const [bars, setBars] = useState<boolean>(false);

	return (
		<NanoPage
			title={"Bar Graph"}
			data={[
				{
					name: "My First Dataset",
					data: MOCK_DATA.map(({ x, y }) => {
						if (bars) return { x: y, y: x };
						return { x, y };
					}),
				},
			]}
			graph={<Bars horizontal={bars} />}
		>
			<ControlGroup title="Base">
				<Control name={"Horizontal Bras"} type={"boolean"}>
					<BooleanControl value={bars} onChange={() => setBars(!bars)} description={"Display Bras horizontally"} />
				</Control>
			</ControlGroup>
		</NanoPage>
	);
}

const MOCK_DATA = [
	{ x: "Jan", y: 57 },
	{ x: "Feb", y: 91 },
	{ x: "Mar", y: 83 },
	{ x: "Apr", y: 74 },
	{ x: "May", y: 51 },
	{ x: "Jun", y: 63 },
	{ x: "Jul", y: 71 },
	{ x: "Aug", y: 73 },
	{ x: "Sep", y: 68 },
	{ x: "Oct", y: 93 },
	{ x: "Nov", y: 84 },
	{ x: "Dec", y: 48 },
];
