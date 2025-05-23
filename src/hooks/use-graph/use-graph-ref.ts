import { useStatefulRef } from "../use-stateful-ref";
import { useLayoutEffect } from "react";
import { useGraph } from "./use-graph";

export const useGraphRef = () => {
	const [ref, setRef] = useStatefulRef<HTMLDivElement>();
	const { id } = useGraph();
	useLayoutEffect(() => {
		const element = document.getElementById(id);
		if (!element || !(element instanceof HTMLDivElement)) return;
		setRef(element);
	}, []);
	return ref;
};
