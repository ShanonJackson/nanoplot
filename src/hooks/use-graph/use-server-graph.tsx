import React from "react";
import { cache, ReactNode } from "react";
import { InternalGraphContext } from "./use-graph";

const [get, set] = cache((): [() => InternalGraphContext, (ctx: InternalGraphContext) => void] => {
	let ctx = {} as InternalGraphContext;
	return [() => ctx, (value: InternalGraphContext) => (ctx = value)];
})();
export const GraphContextServer = ({ value, children }: { value: InternalGraphContext; children: ReactNode }) => {
	set(value);
	return <>{children}</>;
};
export const useGraphServer = () => get();
