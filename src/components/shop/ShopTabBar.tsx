'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export type ShopTabType = 'brands' | 'stores' | 'marketplace';

interface ShopTabBarProps {
  activeTab: ShopTabType;
  onChangeTab: (tab: ShopTabType) => void;
}

export default function ShopTabBar({ activeTab, onChangeTab }: ShopTabBarProps) {
  const tabs = [
    { id: 'brands' as ShopTabType, label: 'Top Brands' },
    { id: 'stores' as ShopTabType, label: 'Nearby Stores' },
    { 
      id: 'marketplace' as ShopTabType, 
      label: '1Fi Marketplace', 
      isNew: true 
    },
  ];

  return (
    <div className="relative z-[10] -mt-6 px-3">
      <div
        className="flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff]/95 p-1.5 shadow-[0_4px_20px_rgba(113,44,220,0.08)] backdrop-blur-md"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex-1 rounded-full py-[9px] px-1 text-center text-[11px] sm:text-[12px] font-semibold tracking-[-0.01em] transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer select-none ${
                isActive
                  ? 'bg-white text-[#712CDC] shadow-[0_2px_6px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.10)]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="truncate">{tab.label}</span>
              {tab.isNew && (
                <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8.5px] font-bold tracking-tight uppercase shrink-0 ${
                  isActive ? 'bg-[#712CDC] text-white' : 'bg-[#e5d4ff] text-[#712CDC]'
                }`}>
                  <Sparkles className="w-2 h-2" />
                  New
                </span>
              )}
              {isActive && (
                <span
                  className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-[#712CDC]"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
