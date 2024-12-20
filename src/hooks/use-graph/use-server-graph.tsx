import { GraphContext } from "@/hooks/use-graph/use-graph";
import { cache, ReactNode } from "react";

const [get, set] = cache((): [() => GraphContext, (ctx: GraphContext) => void] => {
	let ctx = {} as GraphContext;
	return [() => ctx, (value: GraphContext) => (ctx = value)];
})();
export const GraphContextServer = ({ value, children }: { value: GraphContext; children: ReactNode }) => {
	set(value);
	return <>{children}</>;
};
export const useGraphServer = () => get();
