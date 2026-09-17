import React from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-[#E2D9C8] ${className}`}>
      <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`group inline-flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-[#B84A22] text-[#B84A22] font-semibold'
                  : 'border-transparent text-[#78716C] hover:text-[#292524] hover:border-[#D6CBB7]'
              }`}
            >
              {tab.icon && (
                <span className={`w-4 h-4 ${isActive ? 'text-[#B84A22]' : 'text-[#A8A29E]'}`}>
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`ml-1.5 rounded-full py-0.5 px-2 text-[11px] font-semibold ${
                    isActive
                      ? 'bg-[#FDF2EC] text-[#B84A22]'
                      : 'bg-[#EFEAE1] text-[#78716C] group-hover:bg-[#E5DFD4]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
