import { Graph } from "../../../../export";
import { Worldmap } from "../../../../export";

export const WorldMapWidget: React.FC = () => {
	const DATA = [
		{ name: "AR", countryName: "Argentina", value: 3287 },
		{ name: "AT", countryName: "Austria", value: 2100 },
		{ name: "AU", countryName: "Australia", value: 6098 },
		{ name: "BE", countryName: "Belgium", value: 2460 },
		{ name: "BR", countryName: "Brazil", value: 9550 },
		{ name: "CA", countryName: "Canada", value: 8421 },
		{ name: "CH", countryName: "Switzerland", value: 4378 },
		{ name: "CN", countryName: "China", value: 21500 },
		{ name: "DE", countryName: "Germany", value: 10500 },
		{ name: "DK", countryName: "Denmark", value: 1987 },
		{ name: "ES", countryName: "Spain", value: 5478 },
		{ name: "FI", countryName: "Finland", value: 1760 },
		{ name: "FR", countryName: "France", value: 10200 },
		{ name: "GB", countryName: "United Kingdom", value: 10000 },
		{ name: "GR", countryName: "Greece", value: 1590 },
		{ name: "IE", countryName: "Ireland", value: 1683 },
		{ name: "IN", countryName: "India", value: 17200 },
		{ name: "IT", countryName: "Italy", value: 6512 },
		{ name: "JP", countryName: "Japan", value: 10700 },
		{ name: "KR", countryName: "South Korea", value: 7053 },
		{ name: "MX", countryName: "Mexico", value: 7850 },
		{ name: "NL", countryName: "Netherlands", value: 4320 },
		{ name: "NO", countryName: "Norway", value: 2150 },
		{ name: "NZ", countryName: "New Zealand", value: 3950 },
		{ name: "PL", countryName: "Poland", value: 3890 },
		{ name: "PT", countryName: "Portugal", value: 2950 },
		{ name: "RU", countryName: "Russia", value: 14000 },
		{ name: "SE", countryName: "Sweden", value: 3050 },
		{ name: "TR", countryName: "Turkey", value: 3245 },
		{ name: "US", countryName: "United States", value: 30000 },
		{ name: "ZA", countryName: "South Africa", value: 2765 },
	];
	return (
		<div className="flex flex-col h-[400px] w-[768px] bg-white">
			<div className="flex justify-between m-2 p-1">
				<div className="flex justify-start font-bold">
					<div className="mx-1 text-black">
						<select name="criteria-1" defaultValue="activeUsers">
							<option value="activeUsers">Active users</option>
						</select>
					</div>
					<p className="text-gray-400">
						by <span className="border-b-2 border-dotted border-gray-400">Country</span>
					</p>
				</div>
				<div className="flex justify-start items-center w-12 h-full border-2 border-gray-200 rounded-xl  text-gray-500 px-1">
					<select className="pr-1" name="criteria-2" defaultValue="check">
						<option value="check">✔</option>
					</select>
				</div>
			</div>
			<div className="flex">
				<div className="flex items-center w-[500px] px-4 py-8">
					<Graph data={DATA}>
						<Worldmap gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"} />
						<Worldmap.Tooltip
							tooltip={(dp) => {
								return (
									<div>
										<div className={"flex items-center"}>
											<img
												src={`https://flagcdn.com/w40/${dp.name.toLowerCase()}.png`}
												alt={""}
												width={30}
												height={20}
												className={"shrink-0 block"}
											/>
											<div className={"mx-[4px] text-sm font-bold"}>{dp.name}</div>
											<div className={"mx-[4px] text-sm font-bold"}>{dp.value.toString()}</div>
										</div>
										<div className={"h-[3px] w-[64px] mt-[4px]"} style={{ background: dp.fill }} />
									</div>
								);
							}}
						/>
					</Graph>
				</div>

				<div className="flex flex-col flex-1 w-full text-gray-400 text-sm font-bold">
					<div className="flex h-6 w-full justify-between px-4 mb-1">
						<span className="border-b-2 border-dotted border-gray-400">COUNTRY</span>
						<span className="border-b-2 border-dotted border-gray-400">ACTIVE USERS</span>
					</div>
					<hr className="px-4 bg-gray-500" />
					<div>
						{DATA.sort((a, b) => b.value - a.value)
							.slice(0, 7)
							.map((item) => {
								return (
									<div key={item.countryName} className="flex flex-col px-4 pt-2">
										<div className="flex justify-between ">
											<span>{item.countryName}</span>
											<span>
												{item.value > 1000
													? (item.value / 1000).toFixed(item.value % 1000 === 0 ? 0 : 1) + "K"
													: item.value}
											</span>
										</div>
										<div className="w-full h-0.5 bg-gray-200 rounded relative overflow-visible mt-2">
											<div
												className="h-1 -top-0.5 absolute bg-blue-500 rounded"
												style={{ width: `${Math.floor((item.value * 100) / 50000)}%` }}
											></div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			<div className="flex justify-end font-bold text-blue-600 m-2 p-4">
				<button>View countries →</button>
			</div>
		</div>
	);
};
