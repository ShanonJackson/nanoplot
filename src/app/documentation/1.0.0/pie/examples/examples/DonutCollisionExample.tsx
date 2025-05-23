export const PieCollisionExample = `
import {Pie} from "nanoplot/Pie";
import {Graph} from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
	
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-5"}>
			<Graph
				data={[
					{ name: "A", value: 90 },
					{ name: "B", value: 1 },
					{ name: "C", value: 1 },
					{ name: "D", value: 1 },
					{ name: "E", value: 1 },
					{ name: "F", value: 1 },
					{ name: "G", value: 1 },
					{ name: "H", value: 1 },
					{ name: "I", value: 1 },
				]}>
				<Pie />
			</Graph>
		</div>
	);
};
`;
