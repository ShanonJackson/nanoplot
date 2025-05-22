import React, { ReactNode } from "react";
import { GraphContextRaw } from "../../hooks/use-graph/use-graph";

export const ChildrenUtils = {
	context: (children: ReactNode, initial: GraphContextRaw): GraphContextRaw => {
		/* if the child has a static method .context(graphcontext, props) execute it and return the context */
		return React.Children.toArray(children).reduce<GraphContextRaw>((acc, child) => {
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
