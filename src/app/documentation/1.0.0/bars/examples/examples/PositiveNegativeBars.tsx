export const PositiveNegativeBars = `
import { Legend } from "nanoplot/Legend";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import { Bars } from "nanoplot/Bars";
import { XAxis } from "nanoplot/XAxis";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-10"}>
			<Graph
				data={[
					{
						name: "Churn",
						fill: "#f43f5e",
						group: "financials",
						data: [
							{ x: new Date(2025, 0, 1), y: -100_000 },
							{ x: new Date(2025, 1, 1), y: -120_000 },
							{ x: new Date(2025, 2, 1), y: -110_000 },
							{ x: new Date(2025, 3, 1), y: -130_000 },
							{ x: new Date(2025, 4, 1), y: -90_000 },
							{ x: new Date(2025, 5, 1), y: -140_000 },
							{ x: new Date(2025, 6, 1), y: -80_000 },
							{ x: new Date(2025, 7, 1), y: -110_000 },
							{ x: new Date(2025, 8, 1), y: -150_000 },
							{ x: new Date(2025, 9, 1), y: -120_000 },
							{ x: new Date(2025, 10, 1), y: -100_000 },
							{ x: new Date(2025, 11, 1), y: -110_000 },
						].map(({ x, y }) => ({ x: months[x.getMonth()], y })),
					},
					{
						name: "Revenue",
						fill: "#8249f0",
						group: "financials",
						data: [
							{ x: new Date(2025, 0, 1), y: 1_200_000 },
							{ x: new Date(2025, 1, 1), y: 1_300_000 },
							{ x: new Date(2025, 2, 1), y: 1_350_000 },
							{ x: new Date(2025, 3, 1), y: 1_250_000 },
							{ x: new Date(2025, 4, 1), y: 1_450_000 },
							{ x: new Date(2025, 5, 1), y: 1_500_000 },
							{ x: new Date(2025, 6, 1), y: 1_150_000 },
							{ x: new Date(2025, 7, 1), y: 1_400_000 },
							{ x: new Date(2025, 8, 1), y: 1_550_000 },
							{ x: new Date(2025, 9, 1), y: 1_480_000 },
							{ x: new Date(2025, 10, 1), y: 1_380_000 },
							{ x: new Date(2025, 11, 1), y: 1_280_000 },
						].map(({ x, y }) => ({ x: months[x.getMonth()], y })),
					},
				]}
			>
				<Legend position={"top"} alignment={"end"} />
				<YAxis
					display={(v) => {
						return (
							"$" +
							new Intl.NumberFormat("en", {
								notation: "compact",
								compactDisplay: "short",
								maximumFractionDigits: 2,
							}).format(Number(v.data.y))
						);
					}}
				/>
				<GridLines vertical={false} />
				<Bars
					labels={(v) => {
						return (
							"$" +
							new Intl.NumberFormat("en", {
								notation: "compact",
								compactDisplay: "short",
								maximumFractionDigits: 2,
							}).format(Number(v.data.y))
						);
					}}
				/>
				<XAxis />
			</Graph>
		</div>
	);
};
`;
