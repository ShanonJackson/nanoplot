import { Pie } from "nanoplot/pie";
import { Graph } from "nanoplot/graph";
import "nanoplot/styles.css";

export const PieEmptyExample = () => {
	return (
		<Graph data={[]}>
			<Pie />
		</Graph>
	);
};

// Code snippet.
// Data snippet.
