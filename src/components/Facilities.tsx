import React from 'react';
import { Wifi, Wind, Droplets, VolumeX, Zap, Coffee, ShieldCheck, Lock, Check } from 'lucide-react';
import { FACILITIES } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-emerald-400" />,
  Wind: <Wind className="w-6 h-6 text-emerald-400" />,
  Droplets: <Droplets className="w-6 h-6 text-emerald-400" />,
  VolumeX: <VolumeX className="w-6 h-6 text-emerald-400" />,
  Zap: <Zap className="w-6 h-6 text-emerald-400" />,
  Coffee: <Coffee className="w-6 h-6 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
  Lock: <Lock className="w-6 h-6 text-emerald-400" />,
};

interface FacilitiesProps {
  onOpenBooking: () => void;
}

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  return (
    <section id="facilities" className="py-20 relative bg-emerald-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            World-Class Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Designed for <span className="gradient-text">Zero Distraction</span> & Maximum Productivity
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every amenity at Sree Sree Reading Hall is thoughtfully engineered so you can study for 12+ hours without strain, discomfort, or interruption.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="glass-card p-6 rounded-2xl relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Highlight Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[facility.iconName] || <Check className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                    {facility.highlight}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white mb-2 font-['Outfit'] group-hover:text-emerald-400 transition-colors">
                  {facility.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {facility.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                <span>Included in All Plans</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner Bar */}
        <div className="mt-12 glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-['Outfit']">Ready to experience Tirupati's quietest study hall?</h3>
            <p className="text-xs sm:text-sm text-slate-300">Reserve your desk today. Flexible daily and monthly shifts available.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/25 transition-all shrink-0"
          >
            Lock Your Seat Now
          </button>
        </div>

      </div>
    </section>
  );
};
