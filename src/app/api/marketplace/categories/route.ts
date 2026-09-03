import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/data/products';

export async function GET() {
  return NextResponse.json({
    success: true,
    categories: CATEGORIES,
  });
}
