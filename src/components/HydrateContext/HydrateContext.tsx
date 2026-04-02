import * as React from "react";
import { useContext, useMemo } from "react";
import { ClientContext, GraphContextClient } from "../../hooks/use-graph/use-client-graph";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";

const ISO_DATE_PREFIX = /^\d{4}-\d{2}-\d{2}/;

function toTemporal(value: string) {
	if (!ISO_DATE_PREFIX.test(value)) return value;
	if (value.includes("[")) return Temporal.ZonedDateTime.from(value);
	if (/T.*[Z+\-]/.test(value) && !value.includes("[")) return Temporal.Instant.from(value);
	if (value.includes("T")) return Temporal.PlainDateTime.from(value);
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return Temporal.PlainDate.from(value);
	return value;
}

const TEMPORAL_KEYS = new Set(["x", "y", "tick"]);
const contextFromParse = (json: string): InternalGraphContext => {
	function reviver(key: string, value: unknown) {
		if (TEMPORAL_KEYS.has(key) && typeof value === "string") return toTemporal(value);
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

		const content = (() => {
			if (!ref.current) return null;
			if (client) return client; /* <Graph/> was rendered in a browser context, no need to serialize/deserialize */
			/* If Graph didn't send down it's javascript code, (i.e as server component, it's sent us the JSON for context in a script tag */
			return document.getElementById(ref.current?.closest("[data-ctx=graph]")?.id + "-context")?.innerText;
		})();
		const ctx = useMemo(() => {
			if (typeof content === "string") return contextFromParse(content);
			return content;
		}, [content]);

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
