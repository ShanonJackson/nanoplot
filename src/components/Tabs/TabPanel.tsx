import React from 'react';
import { useTabsContext } from './tabs-context';

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

export default function TabPanel({ id, children }: TabPanelProps) {
    const { activeTab } = useTabsContext();
  
    return activeTab === id ? <div className="h-[450px]">{children}</div> : null;
  }