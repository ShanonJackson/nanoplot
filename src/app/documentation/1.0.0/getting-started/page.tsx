import Link from "next/link";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { InstallCommand } from "../../../../components/InstallCommand/InstallCommand";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";
import React from "react";

export default function Page() {
	return (
		<DocumentationLayout>
			<Link href={"#getting-started"}>
				<h1>Getting Started</h1>
			</Link>
			<InstallCommand className={"my-2"} />
			<div className={"w-[90%] my-4"}>
				<Sandpack
					files={{
						"App.js": `import {Pie} from "nanoplot/Pie";
import {Graph} from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto"}>
			<Graph
				data={[
					{
						name: "elixir",
						value: 333,
					},
					{
						name: "stylus",
						value: 257,
					},
					{
						name: "css",
						value: 30,
					},
					{
						name: "haskell",
						value: 192,
					},
					{
						name: "python",
						value: 283,
					},
				]}
			>
				<Pie donut />
			</Graph>
		</div>
	);
};
`,
					}}
				/>
			</div>
		</DocumentationLayout>
	);
}
