import React, { useState } from 'react';
import { PricingPlan, DurationOption } from '../types';
import { Check, Star, Sparkles, Clock, ShieldCheck, CreditCard } from 'lucide-react';

interface PricingProps {
  plans: PricingPlan[];
  onOpenBooking: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ plans, onOpenBooking }) => {
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('30_days');

  const durations: { id: DurationOption; label: string; days: number }[] = [
    { id: '7_days', label: '1 Week (7 Days)', days: 7 },
    { id: '10_days', label: '10 Days', days: 10 },
    { id: '15_days', label: '15 Days', days: 15 },
    { id: '20_days', label: '20 Days', days: 20 },
    { id: '30_days', label: '1 Month (30 Days)', days: 30 },
  ];

  const getPrice = (plan: PricingPlan, dur: DurationOption) => {
    switch (dur) {
      case '7_days': return plan.rates.days7;
      case '10_days': return plan.rates.days10;
      case '15_days': return plan.rates.days15;
      case '20_days': return plan.rates.days20;
      case '30_days': return plan.rates.days30;
      default: return plan.rates.days30;
    }
  };

  return (
    <section id="pricing" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8]">
            Transparent Pricing Rates
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            AFFORDABLE <span className="text-[#db2777]">MEMBERSHIP PACKAGES</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Choose between our <strong>52 Pink Cushion Desks with Lockers</strong> or <strong>21 Blue Standard Desks</strong>. Both options feature 100% chilled air conditioning and all amenities.
          </p>

          {/* Duration Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {durations.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDuration(d.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDuration === d.id
                    ? 'bg-[#db2777] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-[#fbcfe8] hover:border-[#db2777]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid (2 Main Desk Types) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch mb-12">
          {plans.map((plan) => {
            const isPink = plan.deskColor === 'pink';
            const price = getPrice(plan, selectedDuration);
            const currentDurLabel = durations.find(d => d.id === selectedDuration)?.label || '30 Days';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                  isPink
                    ? 'border-2 border-[#db2777] shadow-xl ring-2 ring-pink-100'
                    : 'border border-blue-300 shadow-md hover:border-blue-500'
                }`}
              >
                {/* Badge */}
                {isPink ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#db2777] text-white font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>52 Desks • Cushion Chairs & Locker</span>
                  </div>
                ) : (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <span>21 Desks • Standard Chairs (No Locker)</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {plan.name}
                    </h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isPink ? 'bg-pink-100 text-pink-700 border-pink-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      100% AC
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                    {plan.tagline}
                  </p>

                  {/* Price Banner */}
                  <div className={`p-4 rounded-2xl mb-6 border ${
                    isPink ? 'bg-pink-50 border-pink-200' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-4xl font-black text-slate-900 font-['Outfit']">₹{price}</span>
                        <span className="text-xs text-slate-600 font-bold ml-1.5">/ {currentDurLabel}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">Pay Offline at Desk</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1 font-semibold">
                      Operating Timings: <strong>7:00 AM to 10:00 PM Daily</strong>
                    </div>
                  </div>

                  {/* Pricing Tiers Quick Reference Table */}
                  <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 text-xs font-semibold">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Full Duration Rate Card:</p>
                    <div className="grid grid-cols-5 gap-1 text-center font-mono">
                      <div className={`p-1 rounded ${selectedDuration === '7_days' ? 'bg-[#db2777] text-white font-bold' : 'bg-white'}`}>
                        <span className="block text-[9px]">1 Wk</span>
                        <span>₹{plan.rates.days7}</span>
                      </div>
                      <div className={`p-1 rounded ${selectedDuration === '10_days' ? 'bg-[#db2777] text-white font-bold' : 'bg-white'}`}>
                        <span className="block text-[9px]">10 D</span>
                        <span>₹{plan.rates.days10}</span>
                      </div>
                      <div className={`p-1 rounded ${selectedDuration === '15_days' ? 'bg-[#db2777] text-white font-bold' : 'bg-white'}`}>
                        <span className="block text-[9px]">15 D</span>
                        <span>₹{plan.rates.days15}</span>
                      </div>
                      <div className={`p-1 rounded ${selectedDuration === '20_days' ? 'bg-[#db2777] text-white font-bold' : 'bg-white'}`}>
                        <span className="block text-[9px]">20 D</span>
                        <span>₹{plan.rates.days20}</span>
                      </div>
                      <div className={`p-1 rounded ${selectedDuration === '30_days' ? 'bg-[#db2777] text-white font-bold' : 'bg-white'}`}>
                        <span className="block text-[9px]">30 D</span>
                        <span>₹{plan.rates.days30}</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-8 text-xs text-slate-800 font-medium">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPink ? 'text-[#db2777]' : 'text-blue-600'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 ${
                    isPink ? 'bg-[#db2777] hover:bg-[#be185d]' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve {plan.name}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Offline Payment Assurance Notice */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-start sm:items-center space-x-3 text-xs text-slate-700 font-medium shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#db2777] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong className="text-slate-900 font-bold block mb-0.5">Offline Payment at Reading Hall:</strong>
            All memberships are paid in person (Cash / UPI / GPay) after visiting Sree Sree Reading Hall and inspecting your desk. No advance card charges online!
          </div>
        </div>

      </div>
    </section>
  );
};
