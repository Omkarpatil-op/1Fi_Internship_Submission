'use client';

import React from 'react';
import { Category, CategoryId } from '@/types/marketplace';
import { Smartphone, Laptop, Headphones, Tablet, Watch, LayoutGrid } from 'lucide-react';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'smartphones':
        return Smartphone;
      case 'laptops':
        return Laptop;
      case 'audio':
        return Headphones;
      case 'tablets':
        return Tablet;
      case 'wearables':
        return Watch;
      default:
        return LayoutGrid;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const Icon = getCategoryIcon(cat.id);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
              isSelected
                ? 'bg-[#712CDC] text-white shadow-[0_2px_8px_rgba(113,44,220,0.25)] scale-[1.02]'
                : 'bg-white border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
