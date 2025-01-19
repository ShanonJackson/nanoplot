import React from 'react';
import { useTabsContext } from './tabs-context';

interface TabProps {
    id: string;
    children: React.ReactNode;
}

export default function Tab({ id, children }: TabProps) {
    const { activeTab, onTabClick } = useTabsContext();

    const isActive = activeTab === id;

    return (
        <button
            onClick={() => onTabClick(id)}
            className={`inline-flex h-11 w-24 px-2 text-slate-400 hover:text-black ${isActive ? 'bg-white' : ''}`}
        >
            {children}
        </button>
    );
}

