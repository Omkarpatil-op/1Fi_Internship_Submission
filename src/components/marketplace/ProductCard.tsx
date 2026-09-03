'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/marketplace';
import { formatINR, getLowestMonthlyEMI } from '@/lib/emi';
import { Star, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const lowestEMI = getLowestMonthlyEMI(product.basePrice, product.supportedTenures);
  const discountPercent = Math.round(
    ((product.originalPrice - product.basePrice) / product.originalPrice) * 100
  );

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#712CDC]/40 transition-all duration-200">
      {/* Top badges & Wishlist */}
      <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f0ff] border border-[#ece5ff] px-2 py-0.5 text-[10px] font-bold text-[#712CDC] shadow-xs">
            <Sparkles className="w-2.5 h-2.5" />
            0% EMI
          </span>
          {discountPercent > 0 && (
            <span className="inline-flex rounded-full bg-green-50 border border-green-200 px-1.5 py-0.2 text-[9.5px] font-semibold text-green-700">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="h-7 w-7 rounded-full bg-white/90 backdrop-blur-xs border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 shadow-xs transition-transform active:scale-90 pointer-events-auto cursor-pointer"
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/shop/marketplace/${product.id}`} className="block relative w-full pt-[85%] bg-gradient-to-b from-gray-50/50 to-white overflow-hidden p-3">
        <div className="absolute inset-3 flex items-center justify-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 500px) 50vw, 250px"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3 pt-2">
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-0.5">
          <span className="font-semibold uppercase tracking-wider text-gray-500">
            {product.brand}
          </span>
          <div className="flex items-center gap-0.5 text-amber-500 font-semibold text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link href={`/shop/marketplace/${product.id}`}>
          <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[15px] font-bold text-gray-900">
            {formatINR(product.basePrice)}
          </span>
          <span className="text-[11px] text-gray-400 line-through">
            {formatINR(product.originalPrice)}
          </span>
        </div>

        {/* 1Fi EMI Highlight Banner */}
        <div className="mt-2.5 rounded-xl bg-[#f5f0ff] border border-[#ece5ff] p-2 flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">EMI from</span>
            <span className="text-[#712CDC] font-extrabold text-[12px]">
              {formatINR(lowestEMI.monthlyEMI)}
              <span className="text-[10px] font-normal text-gray-500">/mo</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-gray-500">
            <span>{lowestEMI.tenure} months</span>
            <span className="text-[#712CDC] font-semibold">0% interest</span>
          </div>
        </div>

        {/* EMI Note */}
        <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate">Pay ₹0 today · 0% No-Cost EMI</span>
        </div>
      </div>
    </div>
  );
}
