'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AppShell from '@/components/common/AppShell';
import ShopBanner from '@/components/shop/ShopBanner';
import ShopTabBar, { ShopTabType } from '@/components/shop/ShopTabBar';
import MarketplaceView from '@/components/marketplace/MarketplaceView';
import TopBrandsTab from '@/components/shop/TopBrandsTab';
import NearbyStoresTab from '@/components/shop/NearbyStoresTab';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize with 'marketplace' tab by default or query param
  const initialTab = (searchParams.get('tab') as ShopTabType) || 'marketplace';
  const [activeTab, setActiveTab] = useState<ShopTabType>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as ShopTabType;
    if (tabParam && ['brands', 'stores', 'marketplace'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: ShopTabType) => {
    setActiveTab(tab);
    router.replace(`/shop?tab=${tab}`, { scroll: false });
  };

  return (
    <AppShell>
      {/* 1Fi Shop Promo Banner */}
      <ShopBanner />

      {/* 3-Tab Segmented Navigation Bar */}
      <ShopTabBar activeTab={activeTab} onChangeTab={handleTabChange} />

      {/* Active Tab View */}
      <main className="flex-1">
        {activeTab === 'marketplace' && <MarketplaceView />}
        {activeTab === 'brands' && <TopBrandsTab />}
        {activeTab === 'stores' && <NearbyStoresTab />}
      </main>
    </AppShell>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-[#712CDC] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
