import React from 'react';
import { BookOpen, Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-emerald-900/40 text-slate-400 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 - Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/40 bg-emerald-950 flex items-center justify-center">
                <img src="/images/logo.jpeg" alt="Sree Sree Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-extrabold text-white font-['Outfit']">Sree Sree Services</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tirupati's premier AC reading hall and study room provider. Peaceful, secure, and equipped with all modern amenities for competitive exam aspirants.
            </p>
            <div className="text-xs text-emerald-400 font-semibold">
              Operational 24/7 • All 365 Days
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home Page</a></li>
              <li><a href="#facilities" className="hover:text-emerald-400 transition-colors">Premium Facilities</a></li>
              <li><a href="#seats" className="hover:text-emerald-400 transition-colors">Visual Seat Map</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing & Plans</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">Real Photo Tour</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Exam Study Blogs</a></li>
            </ul>
          </div>

          {/* Col 3 - Tirupati Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Branch Address</h4>
            <div className="flex items-start space-x-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>1st floor of Axis bank, AVM plaza, Air Bypass Rd, near Lakshmipuram circle, near passport office, Kennedy Nagar, Ashok Nagar, Tirupati, AP 517501</span>
            </div>
          </div>

          {/* Col 4 - Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Connect With Us</h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+919666152456" className="flex items-center space-x-2 text-emerald-400 hover:underline">
                <Phone className="w-4 h-4" />
                <span>+91 9666152456</span>
              </a>
              <a href="mailto:info@sreesreeservices.in" className="flex items-center space-x-2 hover:text-emerald-400">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>info@sreesreeservices.in</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Sree Sree Reading Hall (Sree Sree Services). All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900 text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
