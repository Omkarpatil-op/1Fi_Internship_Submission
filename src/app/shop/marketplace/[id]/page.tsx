'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/common/AppShell';
import ProductGallery from '@/components/marketplace/ProductGallery';
import VariantSelector from '@/components/marketplace/VariantSelector';
import EMIPlanSelector from '@/components/marketplace/EMIPlanSelector';
import { Product, StorageVariant, ColorVariant, EMIPlan } from '@/types/marketplace';
import { fetchProductById } from '@/lib/api';
import { calculateEMIPlans, formatINR } from '@/lib/emi';
import { ProductDetailSkeleton } from '@/components/common/SkeletonLoader';
import ErrorState from '@/components/common/ErrorState';
import { ChevronLeft, Share2, Heart, Star, ArrowRight, Truck, RotateCcw, CheckCircle2, X } from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Variant & EMI states
  const [selectedStorage, setSelectedStorage] = useState<StorageVariant | undefined>();
  const [selectedColor, setSelectedColor] = useState<ColorVariant | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);
  const [planConfirmed, setPlanConfirmed] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const prod = await fetchProductById(resolvedParams.id);
        setProduct(prod);

        // Set initial variants
        if (prod.variants.storage && prod.variants.storage.length > 0) {
          setSelectedStorage(prod.variants.storage[0]);
        }
        if (prod.variants.colors && prod.variants.colors.length > 0) {
          setSelectedColor(prod.variants.colors[0]);
        }

        // Calculate initial EMI plans
        const currentPrice = prod.basePrice + (prod.variants.storage?.[0]?.priceDiff || 0);
        const plans = calculateEMIPlans(currentPrice, prod.supportedTenures, prod.zeroCostTenures);
        const defaultZero = plans.filter((p) => p.isZeroCost).slice(-1)[0] || plans[0];
        setSelectedPlan(defaultZero);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [resolvedParams.id]);

  // Handle storage change -> update total price & recalculate EMI
  const handleStorageChange = (storage: StorageVariant) => {
    setSelectedStorage(storage);
    if (!product) return;
    const newPrice = product.basePrice + storage.priceDiff;
    const newPlans = calculateEMIPlans(newPrice, product.supportedTenures, product.zeroCostTenures);
    const existingTenure = selectedPlan?.tenureMonths || 12;
    const matched = newPlans.find((p) => p.tenureMonths === existingTenure) || newPlans[0];
    setSelectedPlan(matched);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link href="/shop" className="p-1 rounded-full text-gray-700 hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-bold text-gray-900">1Fi Marketplace</span>
          <div className="w-5" />
        </div>
        <ProductDetailSkeleton />
      </AppShell>
    );
  }

  if (error || !product) {
    return (
      <AppShell>
        <div className="p-4">
          <ErrorState message={error || 'Product not found'} />
          <div className="mt-4 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#712CDC]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const effectivePrice = product.basePrice + (selectedStorage?.priceDiff || 0);
  const effectiveOriginalPrice = product.originalPrice + (selectedStorage?.priceDiff || 0);
  const currentPlans = calculateEMIPlans(effectivePrice, product.supportedTenures, product.zeroCostTenures);
  const activePlan = selectedPlan || currentPlans[0];

  return (
    <AppShell>
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <Link
          href="/shop"
          className="flex items-center gap-1 p-1 -ml-1 text-gray-700 hover:text-black rounded-lg transition-colors cursor-pointer"
          aria-label="Back to Shop"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Shop</span>
        </Link>

        <h1 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          1Fi Marketplace
        </h1>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors relative cursor-pointer"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-6 right-0 bg-black text-white text-[10px] px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col pb-28">
        {/* Product Image Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#712CDC] tracking-wider uppercase">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
          </div>

          {/* Pricing & Savings */}
          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-black text-gray-900">
                {formatINR(effectivePrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatINR(effectiveOriginalPrice)}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                Save {formatINR(effectiveOriginalPrice - effectivePrice)}
              </span>
            </div>
            <p className="text-xs font-medium text-[#712CDC]">
              ✨ 0% No-Cost EMI options available
            </p>
          </div>

          {/* Variants Selector */}
          <VariantSelector
            storageVariants={product.variants.storage}
            selectedStorage={selectedStorage}
            onSelectStorage={handleStorageChange}
            colorVariants={product.variants.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Interactive EMI Plan Selector */}
          <EMIPlanSelector
            plans={currentPlans}
            selectedPlan={activePlan}
            onSelectPlan={setSelectedPlan}
            productPrice={effectivePrice}
          />

          {/* Shipping and Delivery */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white">
            <div className="h-9 w-9 rounded-full bg-purple-50 text-[#712CDC] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-gray-900 block truncate">
                {product.deliveryEstimate}
              </span>
              <span className="text-[11px] text-gray-500">
                Pan-India express courier delivery
              </span>
            </div>
          </div>

          {/* Highlights & Features */}
          <div className="flex flex-col gap-2 pt-2">
            <h3 className="text-sm font-bold text-gray-900">Product Highlights</h3>
            <ul className="grid grid-cols-1 gap-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#712CDC] mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications Table */}
          <div className="flex flex-col gap-2 pt-2">
            <h3 className="text-sm font-bold text-gray-900">Technical Specifications</h3>
            <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100 text-xs">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between p-2.5">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-gray-800 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Policies */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-500 pt-2 pb-4">
            <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-800">7-Day Replacement</span>
              <span className="text-[10.5px]">Brand policy</span>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 flex flex-col items-center gap-1">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-800">100% Genuine</span>
              <span className="text-[10.5px]">Official warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Selected EMI & CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-2xl">
        <div className="max-w-[500px] mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10.5px] text-gray-500 font-medium">Selected Plan</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-900">
                {formatINR(activePlan.monthlyEMI)}
              </span>
              <span className="text-xs text-gray-500">/mo</span>
            </div>
            <span className="text-[10.5px] font-semibold text-[#712CDC]">
              {activePlan.tenureMonths} Months ({activePlan.isZeroCost ? '0% interest' : `${activePlan.interestRateAnnual}% p.a.`})
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setPlanConfirmed(false);
              setIsProceedModalOpen(true);
            }}
            className="flex-1 max-w-[240px] py-3.5 px-4 rounded-2xl bg-[#712CDC] hover:bg-[#5b24b5] active:scale-[0.98] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(113,44,220,0.3)] cursor-pointer"
          >
            <span>Proceed with Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Proceed Confirmation Modal */}
      {isProceedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[400px] rounded-3xl bg-white p-5 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">
                {planConfirmed ? 'Plan Confirmed' : 'Proceed with Selected Plan'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProceedModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {planConfirmed ? (
              <div className="flex flex-col items-center text-center py-4 gap-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-gray-900">
                  Plan Selection Complete!
                </h4>
                <p className="text-xs text-gray-500 max-w-[30ch]">
                  You have successfully selected the <strong>{activePlan.tenureMonths}-month EMI plan</strong> for <strong>{product.name}</strong>.
                </p>
                <div className="w-full mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => router.push('/shop')}
                    className="w-full py-3 rounded-xl bg-[#712CDC] hover:bg-[#5b24b5] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2.5 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Product:</span>
                    <span className="font-bold text-gray-900 truncate max-w-[200px]">{product.name}</span>
                  </div>
                  {selectedStorage && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Variant:</span>
                      <span className="font-semibold text-gray-800">{selectedStorage.name} {selectedColor ? `· ${selectedColor.name}` : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Product Price:</span>
                    <span className="font-bold text-gray-900">{formatINR(effectivePrice)}</span>
                  </div>
                  <div className="border-t border-gray-200/60 pt-2 flex items-center justify-between">
                    <span className="text-gray-500">Monthly EMI:</span>
                    <span className="font-extrabold text-[#712CDC] text-sm">
                      {formatINR(activePlan.monthlyEMI)} / mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tenure:</span>
                    <span className="font-semibold text-gray-800">{activePlan.tenureMonths} Months ({activePlan.isZeroCost ? '0% No-Cost EMI' : `${activePlan.interestRateAnnual}% p.a.`})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Downpayment:</span>
                    <span className="font-bold text-emerald-600">₹0 (Zero)</span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsProceedModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanConfirmed(true)}
                    className="flex-1 py-3 rounded-xl bg-[#712CDC] hover:bg-[#5b24b5] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    Confirm Plan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
