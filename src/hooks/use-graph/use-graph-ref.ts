import { useGraph } from "@/hooks/use-graph/use-graph";
import { useEffect, useRef, useState } from "react";

export const useGraphRef = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [, forceUpdate] = useState({});
	const { id } = useGraph();
	useEffect(() => {
		const ele = document.getElementById(id);
		if (!ele || !(ele instanceof HTMLDivElement)) return;
		ref.current = ele;
		forceUpdate({}); // force re-render. (stateful ref)
	}, [id]);
	return ref;
};
