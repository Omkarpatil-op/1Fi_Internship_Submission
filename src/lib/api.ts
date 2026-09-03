import { Product, Category, EMIPlan } from '@/types/marketplace';

export async function fetchProducts(params?: {
  search?: string;
  category?: string;
  sort?: string;
  brand?: string;
  zeroCostOnly?: boolean;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category && params.category !== 'all') query.set('category', params.category);
  if (params?.sort) query.set('sort', params.sort);
  if (params?.brand) query.set('brand', params.brand);
  if (params?.zeroCostOnly) query.set('zeroCostOnly', 'true');

  const res = await fetch(`/api/marketplace/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`/api/marketplace/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return data.product;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/marketplace/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.categories;
}

export async function fetchEMIPlans(
  amount: number,
  supportedTenures?: number[],
  zeroCostTenures?: number[]
): Promise<EMIPlan[]> {
  const res = await fetch('/api/marketplace/emi-calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, supportedTenures, zeroCostTenures }),
  });
  if (!res.ok) throw new Error('Failed to calculate EMI plans');
  const data = await res.json();
  return data.plans;
}
