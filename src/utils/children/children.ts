import React, { ReactNode } from "react";
import { GraphContext } from "@/hooks/use-graph";

export const ChildrenUtils = {
	pull: <KEYS extends string, VALUES>(children: ReactNode, lookingFor: Record<KEYS, VALUES>): Partial<Record<KEYS, VALUES>> => {
		const values = new Map(Object.entries(lookingFor).map(([k, v]) => [v, k]));
		return React.Children.toArray(children).reduce<Partial<Record<KEYS, VALUES>>>((acc, child) => {
			if (typeof child !== "string" && React.isValidElement(child) && values.has(child.type)) {
				const key = values.get(child.type);
				if (!key) return acc;
				return { ...acc, [key]: child };
			}
			return acc;
		}, {});
	},
	context: (children: ReactNode, initial: GraphContext): GraphContext | undefined => {
		/* if the child has a static method .context(graphcontext, props) execute it and return the context */
		return React.Children.toArray(children).reduce<GraphContext>((acc, child) => {
			if (
				typeof child !== "string" &&
				React.isValidElement(child) &&
				typeof child.type !== "string" &&
				"context" in child.type &&
				typeof child.type.context === "function"
			) {
				return child.type.context(acc, child.props);
			}
			return acc;
		}, initial);
	},
};
