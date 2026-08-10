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
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Tirupati's #1 Premium AC Reading Room</span>
              <span className="bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">24/7 OPEN</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-['Outfit'] leading-[1.15]">
              Your Sanctuary for <br />
              <span className="gradient-text">Focused Learning</span> & Rank-Winning Prep.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl font-normal leading-relaxed">
              Equipped with climate-controlled AC, ultra-fast fiber WiFi, sound-proof silent zones, and personal power sockets. Specifically designed for APPSC, UPSC, NEET & Banking aspirants.
            </p>

            {/* Location Pill */}
            <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-white/90 border border-rose-200 p-3.5 rounded-2xl max-w-xl shadow-sm">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Location:</strong> 1st Floor, Axis Bank Plaza, Air Bypass Rd, near Lakshmipuram Circle, Passport Office, Tirupati.
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-1"
              >
                <span>Reserve Your Seat Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#seats"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white border border-rose-200 text-slate-800 hover:text-rose-700 hover:border-rose-300 transition-all font-semibold text-sm shadow-sm"
              >
                <span>View Live Seat Map</span>
              </a>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-rose-200">
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                <Wifi className="w-4 h-4 text-rose-600" />
                <span>300 Mbps WiFi</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                <Wind className="w-4 h-4 text-rose-600" />
                <span>Chilled AC Bays</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span>Pin-Drop Silence</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>RO Water & CCTV</span>
              </div>
            </div>

          </div>

          {/* Right Column - Slider Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-rose-300 p-2 shadow-xl bg-white/90">
              
              <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <img
                  src={GALLERY_IMAGES[currentSlide].url}
                  alt={GALLERY_IMAGES[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2.5 py-1 rounded-full w-fit mb-1">
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
              <div className="flex items-center justify-between px-4 py-3 bg-rose-50/80 rounded-xl mt-2 border border-rose-200">
                <div className="flex space-x-1.5">
                  {GALLERY_IMAGES.slice(0, 6).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-rose-600' : 'w-2 bg-rose-200'}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-rose-800 font-semibold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9/5 Student Rating</span>
                </div>
              </div>

            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-5 -left-4 bg-white/95 border border-rose-300 text-slate-900 p-3.5 rounded-2xl backdrop-blur-md shadow-lg flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-lg border border-rose-300">
                24
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">24 Hours Access</p>
                <p className="text-[11px] text-slate-600">Morning, Evening & Night Shifts</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
