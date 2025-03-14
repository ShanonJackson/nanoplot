import * as React from "react";
import { useContext, useMemo } from "react";
import { ClientContext, GraphContextClient } from "../../hooks/use-graph/use-client-graph";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { GraphContext } from "../../hooks/use-graph/use-graph";

const isISODateString = (value: unknown): value is string => {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) && !isNaN(Date.parse(value));
};
const contextFromParse = (json: string): GraphContext => {
	function reviver(key: string, value: unknown) {
		if ((key === "x" || key === "tick") && isISODateString(value)) return new Date(value);
		return value;
	}
	return JSON.parse(json, reviver);
};

export const HydrateContext = <PROPS extends Record<string | number | symbol, any>>(
	Component: React.ComponentType<PROPS>,
): React.ComponentType<PROPS> => {
	return (props: PROPS) => {
		const client = useContext(ClientContext);
		const [ref, setRef] = useStatefulRef<HTMLDivElement>(); /* remount after set-ref */
		const ctx = useMemo(() => {
			if (!ref.current) return null;
			if (client) return client; /* <Graph/> was rendered in a browser context, no need to serialize/deserialize */
			/* If Graph didn't send down it's javascript code, (i.e as server component, it's sent us the JSON for context in a script tag */
			const context = document.getElementById(ref.current?.closest("[data-ctx=graph]")?.id + "-context")?.innerText;
			if (!context) return null;
			return contextFromParse(context);
		}, [ref.current]);
		return (
			<>
				<div className={"[grid-area:graph]"} ref={setRef} />
				{ctx && (
					<GraphContextClient value={ctx}>
						<Component {...props} />
					</GraphContextClient>
				)}
			</>
		);
	};
};
