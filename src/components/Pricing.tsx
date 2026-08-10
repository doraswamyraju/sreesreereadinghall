import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Sparkles, Star } from 'lucide-react';

interface PricingProps {
  onOpenBooking: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'daily'>('monthly');

  return (
    <section id="pricing" className="py-20 relative bg-emerald-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Affordable <span className="gradient-text">Membership Plans</span> for Every Aspirant
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            No hidden maintenance fees or security deposits. Choose between full-month memberships or daily trial passes.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-900 border border-emerald-500/30 p-1 rounded-2xl mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Membership (Save 25%)
            </button>
            <button
              onClick={() => setBillingCycle('daily')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'daily'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daily Pass
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceDaily;
            const period = billingCycle === 'monthly' ? '/ Month' : '/ Day';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'glass-card border-2 border-emerald-400 shadow-2xl shadow-emerald-500/20 bg-slate-900/90 scale-105 z-10'
                    : 'glass-card border border-emerald-500/20 bg-slate-900/60 hover:border-emerald-500/40'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-white font-['Outfit'] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-emerald-900/40">
                    <span className="text-4xl font-black text-white font-['Outfit']">₹{price}</span>
                    <span className="text-xs text-slate-400 font-medium ml-1">{period}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-md ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                      : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30'
                  }`}
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
