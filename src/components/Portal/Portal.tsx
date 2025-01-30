"use client";
import React from "react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
	children?: ReactNode;
	target?: () => Element | null /* Lazy, so 'document' wont be evaluated in SSR environments */;
};

export const Portal = ({ target, children }: Props) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []); /* SSR Safe - Portals can't mount before a ref is established on client */
	if (!mounted) return null;
	return <>{createPortal(children, target?.() || document.body)}</>;
};
