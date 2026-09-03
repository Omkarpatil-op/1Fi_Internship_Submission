'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative flex flex-col bg-white">
      {/* Main Image Viewport */}
      <div className="relative w-full aspect-square bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={images[currentIndex] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 500px) 100vw, 500px"
          className="object-contain p-4 transition-all duration-300"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f0ff] border border-[#ece5ff] px-2.5 py-1 text-[11px] font-bold text-[#712CDC] shadow-xs">
            <Sparkles className="w-3 h-3" />
            0% No-Cost EMI
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-700 shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            1Fi Verified Partner
          </span>
        </div>
      </div>

      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-2.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-200 ${
                currentIndex === idx
                  ? 'w-6 bg-[#712CDC]'
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
