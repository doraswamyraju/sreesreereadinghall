import React from 'react';
import { Wifi, Wind, Droplets, VolumeX, Zap, Coffee, ShieldCheck, Lock, Check } from 'lucide-react';
import { FACILITIES } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-[#db2777]" />,
  Wind: <Wind className="w-6 h-6 text-[#db2777]" />,
  Droplets: <Droplets className="w-6 h-6 text-[#db2777]" />,
  VolumeX: <VolumeX className="w-6 h-6 text-[#db2777]" />,
  Zap: <Zap className="w-6 h-6 text-[#db2777]" />,
  Coffee: <Coffee className="w-6 h-6 text-[#db2777]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#db2777]" />,
  Lock: <Lock className="w-6 h-6 text-[#db2777]" />,
};

interface FacilitiesProps {
  onOpenBooking: () => void;
}

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  return (
    <section id="facilities" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8]">
            World-Class Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            DESIGNED FOR <span className="text-[#db2777]">ZERO DISTRACTION</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Every amenity at Sree Sree Reading Hall is thoughtfully engineered so you can study for 12+ hours without strain or discomfort.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="glass-card p-6 rounded-2xl relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white border-[#fbcfe8]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[facility.iconName] || <Check className="w-6 h-6 text-[#db2777]" />}
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {facility.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit'] group-hover:text-[#db2777] transition-colors">
                  {facility.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {facility.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#fbcfe8] flex items-center justify-between text-[11px] text-[#db2777] font-bold">
                <span>Included in All Plans</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner Bar - Solid Pink Background matching Flyer */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#db2777] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] uppercase">Ready to experience Tirupati's quietest study hall?</h3>
            <p className="text-xs sm:text-sm text-pink-100 font-medium">Reserve your desk today. Flexible daily and monthly shifts available.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-pink-50 text-[#db2777] font-black text-xs tracking-wider uppercase shadow-md transition-all shrink-0"
          >
            Lock Your Seat Now
          </button>
        </div>

      </div>
    </section>
  );
};
