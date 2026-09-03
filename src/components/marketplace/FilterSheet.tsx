'use client';

import React from 'react';
import { X, Check } from 'lucide-react';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sort: string;
  onSortChange: (val: string) => void;
  selectedBrand: string;
  onBrandChange: (val: string) => void;
  zeroCostOnly: boolean;
  onZeroCostToggle: (val: boolean) => void;
  onReset: () => void;
}

const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Sony'];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured & Recommended' },
  { id: 'emi_asc', label: 'Lowest Monthly EMI' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'popular', label: 'Most Popular' },
];

export default function FilterSheet({
  isOpen,
  onClose,
  sort,
  onSortChange,
  selectedBrand,
  onBrandChange,
  zeroCostOnly,
  onZeroCostToggle,
  onReset,
}: FilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[500px] rounded-t-[28px] bg-white p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Sort & Filter</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Section */}
        <div className="py-4 border-b border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
            Sort By
          </h4>
          <div className="flex flex-col gap-1.5">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = sort === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSortChange(opt.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#f5f0ff] text-[#712CDC]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#712CDC]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Section */}
        <div className="py-4 border-b border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
            Filter by Brand
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onBrandChange('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !selectedBrand
                  ? 'bg-[#712CDC] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            {BRANDS.map((b) => {
              const isSelected = selectedBrand.toLowerCase() === b.toLowerCase();
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => onBrandChange(isSelected ? '' : b)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#712CDC] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        {/* 0% Interest Only Toggle */}
        <div className="py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">0% Interest Only</h4>
            <p className="text-xs text-gray-500">Show products with zero-cost EMI tenures</p>
          </div>
          <button
            type="button"
            onClick={() => onZeroCostToggle(!zeroCostOnly)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              zeroCostOnly ? 'bg-[#712CDC]' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={zeroCostOnly}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                zeroCostOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 pb-2 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#712CDC] text-xs font-bold text-white hover:bg-[#5b24b5] transition-colors shadow-sm cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
