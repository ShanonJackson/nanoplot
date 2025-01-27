import { memo, useId } from "react"
import { GraphContext, useGraph } from "@/hooks/use-graph/use-graph"
import { countries } from "@/utils/countries"

type Props = {
	fill?: string, 
	stroke?: string
}

export const Country = memo(({ fill, stroke }: Props) => {
	const id = useId();
	const { data } = useGraph();
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
					fill={fill ?? (typeof dataset[iso]?.fill === "string" ? dataset[iso].fill : color)}
					stroke={stroke ?? (dataset[iso]?.stroke ?? "white")}
					strokeWidth={0.5}
					data-iso={iso}
					className={`hover:stroke-white hover:stroke-[1.5] worldmap__country_${iso} worldmap__country`}
				/>
			);
		})}</svg>
	)
}, (oldProps,newProps) => {return true;})
