import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, MapPin, Sparkles, Star, Wifi, Wind, VolumeX } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#db2777]" />
              <span>Tirupati's #1 Premium AC Reading Room</span>
              <span className="bg-[#db2777] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">7 AM - 10 PM</span>
            </div>

            {/* Title - Pure Brand Pink & Slate Dark */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 font-['Outfit'] leading-[1.15]">
              SREE SREE <br />
              <span className="text-[#db2777]">READING HALL</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl font-medium leading-relaxed">
              Your sanctuary for focused learning & rank-winning exam preparation. Equipped with AC, ultra-fast fiber WiFi, sound-proof silent zones, and personal power sockets.
            </p>

            {/* Solid Pink Location Pill - Matching Flyer */}
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-white bg-[#db2777] p-4 rounded-2xl max-w-xl shadow-md">
              <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <strong className="text-white uppercase tracking-wider font-extrabold block mb-0.5">Location:</strong>
                1st Floor above Axis Bank, Near Lakshmipuram Circle, Air Bypass Rd, Tirupati, AP 517501.
              </div>
            </div>

            {/* CTAs - Solid Pink Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Reserve Your Seat Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#seats"
                className="flex items-center space-x-2 px-6 py-4 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fdf2f8] transition-all font-extrabold text-sm shadow-xs"
              >
                <span>View Live Seat Map</span>
              </a>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#fbcfe8]">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Wifi className="w-4 h-4 text-[#db2777]" />
                <span>300 Mbps WiFi</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Wind className="w-4 h-4 text-[#db2777]" />
                <span>Chilled AC Bays</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <VolumeX className="w-4 h-4 text-[#db2777]" />
                <span>Pin-Drop Silence</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#db2777]" />
                <span>RO Water & CCTV</span>
              </div>
            </div>

          </div>

          {/* Right Column - Slider Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border-2 border-[#db2777] p-2 shadow-lg bg-white">
              
              <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <img
                  src={GALLERY_IMAGES[currentSlide].url}
                  alt={GALLERY_IMAGES[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#db2777] px-2.5 py-1 rounded-full w-fit mb-1 shadow-xs">
                    {GALLERY_IMAGES[currentSlide].category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {GALLERY_IMAGES[currentSlide].title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-0.5">
                    {GALLERY_IMAGES[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#fdf2f8] rounded-xl mt-2 border border-[#fbcfe8]">
                <div className="flex space-x-1.5">
                  {GALLERY_IMAGES.slice(0, 6).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-[#db2777]' : 'w-2 bg-[#fbcfe8]'}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-[#db2777] font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9/5 Student Rating</span>
                </div>
              </div>

            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-5 -left-4 bg-white border-2 border-[#db2777] text-slate-900 p-3.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#db2777] flex items-center justify-center text-white font-black text-xs text-center leading-tight">
                7AM<br/>10PM
              </div>
              <div>
                <p className="text-xs font-bold text-[#db2777]">7 AM - 10 PM Open</p>
                <p className="text-[11px] text-slate-600 font-semibold">Morning, Evening & Full Day Shifts</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
