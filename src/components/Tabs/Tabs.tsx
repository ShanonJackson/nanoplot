import React, { ReactNode } from "react";
import { TabsProvider } from "./tabs-context";
import { Tab } from "./Tab";

interface TabsProps {
	activeTab: string;
	onTabChange: (tabId: string) => void;
	children: ReactNode;
}

export function Tabs({ activeTab, onTabChange, children }: TabsProps) {
	return (
		<TabsProvider activeTab={activeTab} onTabChange={onTabChange}>
			<div className="flex bg-[rgb(247,250,251)]">{children}</div>
		</TabsProvider>
	);
}

Tabs.Tab = Tab;
