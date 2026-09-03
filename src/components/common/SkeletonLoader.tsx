'use client';

import React from 'react';

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-xs animate-shimmer"
        >
          <div className="w-full pt-[80%] bg-gray-100 rounded-xl mb-3" />
          <div className="h-3 w-16 bg-gray-100 rounded mb-1.5" />
          <div className="h-4 w-full bg-gray-100 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
          <div className="h-10 w-full bg-purple-50/50 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-shimmer">
      <div className="w-full aspect-square bg-gray-100 rounded-2xl" />
      <div className="h-4 w-24 bg-gray-100 rounded" />
      <div className="h-6 w-3/4 bg-gray-100 rounded" />
      <div className="h-8 w-1/3 bg-gray-100 rounded" />
      <div className="h-24 w-full bg-purple-50/60 rounded-2xl" />
    </div>
  );
}
