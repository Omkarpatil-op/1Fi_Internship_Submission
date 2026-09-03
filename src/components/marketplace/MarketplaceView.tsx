'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Product, CategoryId } from '@/types/marketplace';
import { CATEGORIES } from '@/data/products';
import { fetchProducts } from '@/lib/api';
import SearchFilterBar from './SearchFilterBar';
import CategoryPills from './CategoryPills';
import ProductCard from './ProductCard';
import FilterSheet from './FilterSheet';
import { ProductGridSkeleton } from '@/components/common/SkeletonLoader';
import ErrorState from '@/components/common/ErrorState';
import { SearchX, RotateCcw } from 'lucide-react';

export default function MarketplaceView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sort, setSort] = useState('featured');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [zeroCostOnly, setZeroCostOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [, startTransition] = useTransition();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 280);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products dynamically when filters change
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
        search: debouncedSearch,
        category: selectedCategory,
        sort,
        brand: selectedBrand,
        zeroCostOnly,
      });
      startTransition(() => {
        setProducts(data);
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedCategory, sort, selectedBrand, zeroCostOnly]);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSort('featured');
    setSelectedBrand('');
    setZeroCostOnly(false);
  };

  const activeFilterCount =
    (selectedBrand ? 1 : 0) +
    (zeroCostOnly ? 1 : 0) +
    (sort !== 'featured' ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
      {/* Search and Quick Filters */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        onOpenFilter={() => setIsFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* Category Horizontal Carousel */}
      <CategoryPills
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Results Header & Summary */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight text-gray-900">
            {selectedCategory === 'all'
              ? 'All Devices & Electronics'
              : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-[11.5px] text-gray-500">
            {loading ? 'Searching...' : `${products.length} products with 0% Mutual Fund EMI`}
          </p>
        </div>

        {/* Active Filters Pill Summary */}
        {(selectedBrand || zeroCostOnly || sort !== 'featured') && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#712CDC] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Product Grid Content */}
      {loading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={loadProducts} />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xs">
          <div className="h-12 w-12 rounded-full bg-[#f5f0ff] text-[#712CDC] flex items-center justify-center mb-3">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-xs text-gray-500 mb-4 max-w-[28ch]">
            We could not find any products matching your search criteria.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-[#712CDC] text-white text-xs font-semibold hover:bg-[#5b24b5] transition-colors shadow-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sort={sort}
        onSortChange={(val) => {
          setSort(val);
        }}
        selectedBrand={selectedBrand}
        onBrandChange={(b) => {
          setSelectedBrand(b);
        }}
        zeroCostOnly={zeroCostOnly}
        onZeroCostToggle={(z) => {
          setZeroCostOnly(z);
        }}
        onReset={resetAllFilters}
      />
    </div>
  );
}
