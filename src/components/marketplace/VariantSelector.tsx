'use client';

import React from 'react';
import { StorageVariant, ColorVariant } from '@/types/marketplace';
import { formatINR } from '@/lib/emi';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  storageVariants?: StorageVariant[];
  selectedStorage?: StorageVariant;
  onSelectStorage: (variant: StorageVariant) => void;
  colorVariants?: ColorVariant[];
  selectedColor?: ColorVariant;
  onSelectColor: (variant: ColorVariant) => void;
}

export default function VariantSelector({
  storageVariants,
  selectedStorage,
  onSelectStorage,
  colorVariants,
  selectedColor,
  onSelectColor,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-4 py-3 border-y border-gray-100">
      {/* Color Selection */}
      {colorVariants && colorVariants.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-900">Color</span>
            <span className="text-gray-500 font-medium">{selectedColor?.name}</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {colorVariants.map((c) => {
              const isSelected = selectedColor?.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectColor(c)}
                  className={`group relative flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC] shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/10 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.hex }}
                  >
                    {isSelected && (
                      <Check className={`w-2.5 h-2.5 ${c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f2f1ed' ? 'text-black' : 'text-white'}`} />
                    )}
                  </span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / Configuration Selection */}
      {storageVariants && storageVariants.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-900">Storage / Model</span>
            <span className="text-gray-500 font-medium">{selectedStorage?.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {storageVariants.map((s) => {
              const isSelected = selectedStorage?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectStorage(s)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC] shadow-xs'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-bold">{s.name}</span>
                  {s.priceDiff > 0 ? (
                    <span className="text-[10px] text-gray-500 mt-0.5">
                      +{formatINR(s.priceDiff)}
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400 mt-0.5">Base</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
