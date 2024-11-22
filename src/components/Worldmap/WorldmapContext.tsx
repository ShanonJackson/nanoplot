"use client";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";

type WorldmapContext = {
	id: string;
};
const WorldmapContext = createContext<WorldmapContext | undefined>(undefined);
export const useWorldmap = () => {
	const ctx = useContext(WorldmapContext);
	const ref = useRef<SVGSVGElement | null>(null);
	if (!ctx) throw Error("Please use within WorldmapProvider");

	useEffect(() => {
		const svg = document.getElementById(ctx.id);
		if (!svg || !(svg instanceof SVGSVGElement)) return;
		ref.current = svg;
	}, [ctx.id]);

	return {
		ref,
		scale: { x: ref.current?.viewBox.baseVal.width, y: ref.current?.viewBox.baseVal.height },
		countries: Array.from(ref.current?.children ?? []).filter((c) => c instanceof SVGPathElement),
	};
};
export const WorldmapProvider = ({ children, ...rest }: { children: ReactNode } & WorldmapContext) => {
	return <WorldmapContext.Provider value={rest}>{children}</WorldmapContext.Provider>;
};
