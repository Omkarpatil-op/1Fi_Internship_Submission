'use client';

import React, { useState } from 'react';
import { EMIPlan } from '@/types/marketplace';
import { formatINR } from '@/lib/emi';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
  productPrice: number;
}

export default function EMIPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
  productPrice,
}: EMIPlanSelectorProps) {
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const zeroCostPlans = plans.filter((p) => p.isZeroCost);
  const displayPlans = showAllPlans ? plans : zeroCostPlans;

  return (
    <div className="flex flex-col gap-3 py-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-bold text-gray-900">Select EMI Plan</h3>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#f5f0ff] text-[#712CDC] text-[10px] font-extrabold uppercase">
            <Sparkles className="w-2.5 h-2.5" />
            0% Interest
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowExplainer(!showExplainer)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#712CDC] hover:underline cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Plan details</span>
        </button>
      </div>

      {/* Explainer Box */}
      {showExplainer && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#f5f0ff] to-[#f9f5ff] border border-[#ece5ff] text-xs text-gray-700 flex flex-col gap-2 animate-in fade-in duration-200">
          <p className="font-semibold text-[#712CDC]">
            0% No-Cost EMI Details:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-gray-600 text-[11.5px]">
            <li>
              <strong>Zero Downpayment:</strong> Take home your device without any upfront payment.
            </li>
            <li>
              <strong>Zero Interest:</strong> Total repayment equals the actual product purchase price on 0% plans.
            </li>
            <li>
              <strong>Zero Processing Fee:</strong> No hidden charges or file fees.
            </li>
          </ul>
        </div>
      )}

      {/* Plans List Table */}
      <div className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-xs divide-y divide-gray-100">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          <span>Tenure & Interest</span>
          <span>Monthly Installment</span>
        </div>

        {displayPlans.map((plan) => {
          const isSelected = selectedPlan.tenureMonths === plan.tenureMonths;
          return (
            <div
              key={plan.tenureMonths}
              onClick={() => onSelectPlan(plan)}
              className={`flex items-center justify-between px-4 py-3.5 transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#f5f0ff]/80 text-[#712CDC]'
                  : 'hover:bg-gray-50/80 text-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#712CDC] bg-[#712CDC] text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">
                      {plan.tenureMonths} months
                    </span>
                    {plan.isZeroCost ? (
                      <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-[#712CDC] text-[10px] font-extrabold">
                        0% p.a. No Cost
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-500">
                        {plan.interestRateAnnual}% p.a.
                      </span>
                    )}
                  </div>
                  <span className="text-[10.5px] text-gray-400">
                    Total: {formatINR(plan.totalRepayment)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-gray-900 block">
                  {formatINR(plan.monthlyEMI)}
                  <span className="text-[10.5px] font-normal text-gray-500">/mo</span>
                </span>
                {plan.isZeroCost ? (
                  <span className="text-[10px] font-semibold text-emerald-600">
                    Save {formatINR(Math.round(productPrice * 0.12))} in interest
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400">
                    Interest: {formatINR(plan.totalInterest)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Toggle View More Plans */}
      {plans.length > zeroCostPlans.length && (
        <button
          type="button"
          onClick={() => setShowAllPlans(!showAllPlans)}
          className="flex items-center justify-center gap-1 py-2 text-xs font-semibold text-[#712CDC] hover:text-[#5b24b5] transition-colors cursor-pointer"
        >
          <span>{showAllPlans ? 'Show only 0% No-Cost plans' : 'View extended tenures (up to 60 mos)'}</span>
          {showAllPlans ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Selected Plan Summary Card */}
      <div className="rounded-xl border border-[#ece5ff] bg-[#f5f0ff]/60 p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Selected Plan:</span>
          <span className="font-bold text-[#712CDC]">
            {selectedPlan.tenureMonths} Months ({formatINR(selectedPlan.monthlyEMI)}/mo)
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>Downpayment:</span>
          <span className="font-semibold text-emerald-600">₹0 (Zero)</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>Processing Fee:</span>
          <span className="font-semibold text-emerald-600">₹0 (Waived)</span>
        </div>
      </div>
    </div>
  );
}
