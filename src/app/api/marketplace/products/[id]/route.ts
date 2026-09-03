import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    product,
  });
}
