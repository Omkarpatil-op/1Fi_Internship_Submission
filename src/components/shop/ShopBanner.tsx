'use client';

import React from 'react';
import Image from 'next/image';

export default function ShopBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#340775] to-[#4c0d9e]">
      <div className="relative w-full aspect-[16/9] max-h-[260px] overflow-hidden">
        <Image
          src="/assets/shop_banner.webp"
          alt="Shop today, Pay later using Mutual funds"
          fill
          priority
          sizes="(max-width: 500px) 100vw, 500px"
          className="object-cover object-center scale-105"
        />
        {/* Subtle bottom gradient overlay for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
