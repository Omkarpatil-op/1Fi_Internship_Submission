import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/marketplace';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'featured';
  const brand = searchParams.get('brand');
  const zeroCostOnly = searchParams.get('zeroCostOnly') === 'true';

  let filtered: Product[] = [...PRODUCTS];

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Brand filter
  if (brand) {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  // Zero cost filter
  if (zeroCostOnly) {
    filtered = filtered.filter((p) => p.zeroCostTenures.length > 0);
  }

  // Search filter
  if (search) {
    filtered = filtered.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search);
      const matchBrand = p.brand.toLowerCase().includes(search);
      const matchTagline = p.tagline.toLowerCase().includes(search);
      const matchDesc = p.description.toLowerCase().includes(search);
      const matchSpecs = p.specs.some(
        (s) => s.label.toLowerCase().includes(search) || s.value.toLowerCase().includes(search)
      );
      return matchName || matchBrand || matchTagline || matchDesc || matchSpecs;
    });
  }

  // Sorting
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === 'emi_asc') {
    const getMinEMI = (p: Product) => Math.round(p.basePrice / (p.zeroCostTenures.slice(-1)[0] || 12));
    filtered.sort((a, b) => getMinEMI(a) - getMinEMI(b));
  } else if (sort === 'popular') {
    filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    products: filtered,
  });
}
