export type CategoryId = 'all' | 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables';

export interface Category {
  id: CategoryId;
  name: string;
}

export interface StorageVariant {
  id: string;
  name: string;
  priceDiff: number; // relative to basePrice
}

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  tagline: string;
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  deliveryEstimate: string;
  images: string[];
  basePrice: number;
  originalPrice: number;
  featured?: boolean;
  popular?: boolean;
  variants: {
    storage?: StorageVariant[];
    colors?: ColorVariant[];
  };
  specs: ProductSpec[];
  supportedTenures: number[];
  zeroCostTenures: number[];
}

export interface EMIPlan {
  tenureMonths: number;
  monthlyEMI: number;
  interestRateAnnual: number;
  isZeroCost: boolean;
  totalInterest: number;
  processingFee: number;
  totalRepayment: number;
  downpayment: number;
}
