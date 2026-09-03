'use client';

import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  onOpenFilter: () => void;
  activeFilterCount: number;
}

export default function SearchFilterBar({
  search,
  onSearchChange,
  onOpenFilter,
  activeFilterCount,
}: SearchFilterBarProps) {
  const quickSearches = ['iPhone 17', 'Pixel 10', 'MacBook', '0% EMI'];

  return (
    <div className="flex flex-col gap-2.5">
      {/* Search Input & Filter Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center h-[46px] rounded-full border border-gray-200 bg-white px-4 shadow-xs focus-within:border-[#712CDC] focus-within:ring-2 focus-within:ring-[#712CDC]/10 transition-all">
          <Search className="h-[17px] w-[17px] text-gray-400 shrink-0 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search phones, laptops, audio..."
            className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 min-w-0"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenFilter}
          className={`relative h-[46px] w-[46px] rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            activeFilterCount > 0
              ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC]'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
          aria-label="Filter products"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#712CDC] text-[10px] font-bold text-white shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick Search Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[11px] text-gray-400 font-medium shrink-0">Popular:</span>
        {quickSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSearchChange(term === '0% EMI' ? '' : term)}
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 hover:bg-[#ece5ff] hover:text-[#712CDC] text-[11px] font-medium text-gray-600 transition-colors shrink-0"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
