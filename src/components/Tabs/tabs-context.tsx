import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextType {
	active: string;
	onChange: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProviderProps {
	children: ReactNode;
	active: string;
	onTabChange: (tabId: string) => void;
}

export const TabsProvider = ({ children, active, onTabChange }: TabsProviderProps) => {
	const onChange = (tabId: string) => {
		onTabChange(tabId);
	};

	return <TabsContext.Provider value={{ active, onChange }}>{children}</TabsContext.Provider>;
};

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("useTabsContext must be used within a TabsProvider");
	}
	return context;
};
