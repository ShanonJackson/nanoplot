import React from "react";
import { cache, ReactNode } from "react";
import { GraphContext } from "./use-graph";

const [get, set] = cache((): [() => GraphContext, (ctx: GraphContext) => void] => {
	let ctx = {} as GraphContext;
	return [() => ctx, (value: GraphContext) => (ctx = value)];
})();
export const GraphContextServer = ({ value, children }: { value: GraphContext; children: ReactNode }) => {
	set(value);
	return <>{children}</>;
};
export const useGraphServer = () => get();
