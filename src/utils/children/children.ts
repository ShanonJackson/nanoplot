import * as React from "react";
import { GraphContext } from "nanoplot/use-graph";

export const ChildrenUtils = {
	context(c: React.ReactNode, i: GraphContext): GraphContext {
		for (const ch of React.Children.toArray(c)) {
			if (!React.isValidElement(ch)) continue;
			const fn = (ch.type as any)?.context;
			if (typeof fn === "function") i = fn(i, ch.props);
		}
		return i;
	},
};
