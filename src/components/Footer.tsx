import React from 'react';
import { Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#fbcfe8] text-slate-600 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 - Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#db2777] bg-white flex items-center justify-center shadow-xs">
                <img src="/images/logo.jpeg" alt="Sree Sree Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-extrabold text-[#db2777] font-['Outfit']">Sree Sree Services</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Tirupati's premier AC reading hall and study room provider. Peaceful, secure, and equipped with all modern amenities for competitive exam aspirants.
            </p>
            <div className="text-xs text-[#db2777] font-extrabold">
              Operational: 7:00 AM – 10:00 PM • All 365 Days
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Outfit']">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#home" className="hover:text-[#db2777] transition-colors">Home Page</a></li>
              <li><a href="#facilities" className="hover:text-[#db2777] transition-colors">Premium Facilities</a></li>
              <li><a href="#seats" className="hover:text-[#db2777] transition-colors">Visual Seat Map</a></li>
              <li><a href="#pricing" className="hover:text-[#db2777] transition-colors">Pricing & Plans</a></li>
              <li><a href="#gallery" className="hover:text-[#db2777] transition-colors">Real Photo Tour</a></li>
              <li><a href="#blog" className="hover:text-[#db2777] transition-colors">Exam Study Blogs</a></li>
              <li><a href="/login" className="hover:text-[#db2777] transition-colors text-slate-400 font-normal">Admin Login</a></li>
            </ul>
          </div>

          {/* Col 3 - Tirupati Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Outfit']">Branch Address</h4>
            <div className="flex items-start space-x-2 text-xs text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-[#db2777] shrink-0 mt-0.5" />
              <span>1st Floor above Axis Bank, Near Lakshmipuram Circle, Air Bypass Rd, Kennedy Nagar, Ashok Nagar, Tirupati, AP 517501</span>
            </div>
          </div>

          {/* Col 4 - Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Outfit']">Connect With Us</h4>
            <div className="space-y-2 text-xs font-semibold">
              <a href="tel:+919666152456" className="flex items-center space-x-2 text-[#db2777] hover:underline font-extrabold">
                <Phone className="w-4 h-4" />
                <span>+91 9666152456</span>
              </a>
              <a href="mailto:info@sreesreeservices.in" className="flex items-center space-x-2 hover:text-[#db2777]">
                <Mail className="w-4 h-4 text-[#db2777]" />
                <span>info@sreesreeservices.in</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#fbcfe8] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <div className="flex items-center space-x-4">
            <p>© {new Date().getFullYear()} Sree Sree Reading Hall (Sree Sree Services). All rights reserved.</p>
            <a href="/login" className="text-slate-400 hover:text-[#db2777] text-[11px] underline">Admin Access</a>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-bold shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
