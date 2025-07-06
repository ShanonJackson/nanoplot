import React, { ReactNode } from "react";
import * as R from "react";
import { InternalGraphContext } from "./use-graph";

export const ClientContext = R.createContext<InternalGraphContext | undefined>?.(undefined);

export const GraphContextClient = ({ value, children }: { value: InternalGraphContext; children: ReactNode }) => {
	return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};
export const useGraphClient = () => {
	const ctx = R.useContext(ClientContext);
	if (!ctx) throw Error("Can only useGraph inside <Graph/>");
	return ctx;
};
