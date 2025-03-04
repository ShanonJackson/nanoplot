import * as React from "react";
import { useContext, useMemo } from "react";
import { ClientContext, GraphContextClient } from "../../hooks/use-graph/use-client-graph";
import { useStatefulRef } from "../../hooks/use-stateful-ref";
import { contextFromParse } from "../../hooks/use-graph/use-graph";

export const HydrateContext = <PROPS extends Record<any, unknown>>(Component: React.FC<PROPS>) => {
	return (props: PROPS) => {
		const client = useContext(ClientContext);
		const [ref, setRef] = useStatefulRef<HTMLDivElement>(); /* remount after set-ref */
		const ctx = useMemo(() => {
			if (!ref.current) return null;
			if (client) return client; /* <Graph/> was rendered in a browser context, no need to serialize/desierialize */
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
