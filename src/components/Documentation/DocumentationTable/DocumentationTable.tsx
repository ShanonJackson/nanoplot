import { ReactNode } from "react";

type Props<T extends Record<string, unknown>> = {
	columns: Array<keyof T>;
	data: T[];
	renderers?: {
		[K in keyof T]?: (value: T[K], row: T) => ReactNode;
	};
};

export const DocumentationTable = <T extends Record<string, unknown>>({ columns, data, renderers }: Props<T>) => {
	return (
		<div className={"overflow-x-auto"}>
			<table className={"w-full my-6 text-neutral-700 dark:text-neutral-100"}>
				<thead>
					<tr>
						{columns.map((col, i) => (
							<td
								key={i}
								className={
									"border border-gray-200 dark:bg-slate-800 dark:border-slate-600 px-4 py-2 font-semibold text-center"
								}
							>
								{col.toString()}
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, i) => {
						return (
							<tr key={i} className={"odd:bg-[#f6f8fa] dark:bg-slate-800 odd:dark:bg-slate-700"}>
								{columns.map((col, i) => (
									<td key={i} className={"border border-gray-200 dark:border-slate-600 px-4 py-2"}>
										{renderers?.[col] ? renderers[col](row[col], row) : String(row[col])}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
