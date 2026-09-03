import { NextRequest, NextResponse } from 'next/server';
import { calculateEMIPlans } from '@/lib/emi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, supportedTenures, zeroCostTenures } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid positive amount is required' },
        { status: 400 }
      );
    }

    const plans = calculateEMIPlans(
      amount,
      supportedTenures || [3, 6, 9, 12, 18, 24, 36, 48, 60],
      zeroCostTenures || [3, 6, 9, 12, 18, 24]
    );

    return NextResponse.json({
      success: true,
      principal: amount,
      plans,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request payload' },
      { status: 400 }
    );
  }
}
