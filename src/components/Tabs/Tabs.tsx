import React, { ReactNode } from "react";
import { TabsProvider } from "./tabs-context";
import { Tab } from "./Tab";

interface TabsProps {
	active: string;
	onTabChange: (tabId: string) => void;
	children: ReactNode;
}

export function Tabs({ active, onTabChange, children }: TabsProps) {
	return (
		<TabsProvider active={active} onTabChange={onTabChange}>
			<div className="flex bg-[rgb(247,250,251)]">{children}</div>
		</TabsProvider>
	);
}

Tabs.Tab = Tab;
