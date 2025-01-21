import { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProviderProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabsProvider = ({ children, activeTab, onTabChange }: TabsProviderProps) => {
  const setActiveTab = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};