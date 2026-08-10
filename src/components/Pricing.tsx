import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, Star } from 'lucide-react';

interface PricingProps {
  plans: PricingPlan[];
  onOpenBooking: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ plans, onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'daily'>('monthly');

  return (
    <section id="pricing" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8]">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            AFFORDABLE <span className="text-[#db2777]">MEMBERSHIP PLANS</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            No hidden maintenance fees or security deposits. Choose between full-month memberships or daily trial passes.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-white border border-[#fbcfe8] p-1 rounded-2xl mt-4 shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#db2777] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#db2777]'
              }`}
            >
              Monthly Membership
            </button>
            <button
              onClick={() => setBillingCycle('daily')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                billingCycle === 'daily'
                  ? 'bg-[#db2777] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#db2777]'
              }`}
            >
              Daily Pass
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceDaily;
            const period = billingCycle === 'monthly' ? '/ Month' : '/ Day';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'glass-card border-2 border-[#db2777] shadow-xl bg-white scale-105 z-10'
                    : 'glass-card border border-[#fbcfe8] bg-white hover:border-[#db2777]'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#db2777] text-white font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-slate-900 font-['Outfit'] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#fbcfe8]">
                    <span className="text-4xl font-black text-slate-900 font-['Outfit']">₹{price}</span>
                    <span className="text-xs text-slate-500 font-bold ml-1">{period}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8 text-xs text-slate-800 font-medium">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-[#db2777] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solid Pink Button */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Choose {plan.name}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
