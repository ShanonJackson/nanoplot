import { ReactNode } from "react";

type Props<T extends Record<string, unknown>> = {
	columns: Array<keyof T>;
	data: T[];
	renderers?: Partial<{
		[K in keyof T]: (value: T[K]) => ReactNode;
	}>;
};

export const DocumentationTable = <T extends Record<string, unknown>>({ columns, data, renderers }: Props<T>) => {
	return (
		<table className={"w-full"}>
			<thead>
				<tr>
					{columns.map((col, i) => (
						<td key={i} className={"border border-gray-200 px-4 py-2 font-semibold text-center"}>
							{col.toString()}
						</td>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => {
					return (
						<tr key={i} className={"odd:bg-[#f6f8fa]"}>
							{columns.map((col, i) => (
								<td key={i} className={"border border-gray-200 px-4 py-2"}>
									{renderers?.[col] ? renderers[col](row[col]) : row[col]}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
