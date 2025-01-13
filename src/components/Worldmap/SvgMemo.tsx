import { memo, useId } from "react"
import { GraphContext } from "@/hooks/use-graph/use-graph"
import { countries } from "@/utils/countries"

type Props = {
	data: GraphContext['data']
}

export const SvgMemo = memo(({data}: Props) => {
	if(data === undefined) return <></>
	const id = useId();
	const dataset = Object.fromEntries(data.map((datapoint) => [datapoint.id ?? datapoint.name, datapoint]));
	return (
		<svg
			id={id}
		>{Object.entries(countries).map(([iso, path], i) => {
			const color = "#2c2c2c";
			return (
				<path
					key={i}
					d={path}
					fill={typeof dataset[iso]?.fill === "string" ? dataset[iso].fill : color}
					stroke={dataset[iso]?.stroke ?? "white"}
					strokeWidth={0.5}
					data-iso={iso}
					className={`hover:stroke-white hover:stroke-[1.5] worldmapcountry${iso} worldmap__country`}
				/>
			);
		})}</svg>
	)
}, (oldProps,newProps) => {return true;})
