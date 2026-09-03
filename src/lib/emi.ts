import { EMIPlan } from '@/types/marketplace';

/**
 * Format number as Indian Rupee string (e.g., 79900 -> ₹79,900)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Calculate EMI plans for a given principal amount and supported tenures
 */
export function calculateEMIPlans(
  principal: number,
  supportedTenures: number[] = [3, 6, 9, 12, 18, 24, 36, 48, 60],
  zeroCostTenures: number[] = [3, 6, 9, 12, 18, 24]
): EMIPlan[] {
  return supportedTenures.map((tenure) => {
    const isZeroCost = zeroCostTenures.includes(tenure);
    
    if (isZeroCost) {
      const monthlyEMI = Math.round(principal / tenure);
      return {
        tenureMonths: tenure,
        monthlyEMI,
        interestRateAnnual: 0,
        isZeroCost: true,
        totalInterest: 0,
        processingFee: 0,
        totalRepayment: principal,
        downpayment: 0,
      };
    }

    // Extended tenures have low competitive LAMF rates (7.49% - 8.49%)
    let annualRate = 7.49;
    if (tenure >= 48) annualRate = 7.99;
    if (tenure >= 60) annualRate = 8.49;

    const monthlyRate = annualRate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const monthlyEMI = Math.round(emi);
    const totalRepayment = monthlyEMI * tenure;
    const totalInterest = totalRepayment - principal;

    return {
      tenureMonths: tenure,
      monthlyEMI,
      interestRateAnnual: annualRate,
      isZeroCost: false,
      totalInterest,
      processingFee: 0,
      totalRepayment,
      downpayment: 0,
    };
  });
}

/**
 * Get lowest monthly EMI from supported plans
 */
export function getLowestMonthlyEMI(
  principal: number,
  supportedTenures: number[] = [3, 6, 9, 12, 18, 24]
): { monthlyEMI: number; tenure: number; isZeroCost: boolean } {
  const plans = calculateEMIPlans(principal, supportedTenures, supportedTenures);
  const longestZeroCost = plans.filter((p) => p.isZeroCost).slice(-1)[0] || plans[0];
  return {
    monthlyEMI: longestZeroCost.monthlyEMI,
    tenure: longestZeroCost.tenureMonths,
    isZeroCost: longestZeroCost.isZeroCost,
  };
}
