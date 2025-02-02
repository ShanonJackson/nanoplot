import React from "react";
import { createContext, ReactNode, useContext } from "react";
import { GraphContext } from "./use-graph";

const ClientContext = createContext<GraphContext | undefined>(undefined);

export const GraphContextClient = ({ value, children }: { value: GraphContext; children: ReactNode }) => {
	return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};
export const useGraphClient = () => {
	const ctx = useContext(ClientContext);
	if (!ctx) throw Error("Can only useGraph inside <Graph/>");
	return ctx;
};
