import { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export default function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('chart');

  const onTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabClick }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
}
