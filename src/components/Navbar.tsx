import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onToggleDashboard: () => void;
  showDashboard: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onToggleDashboard, showDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Seat Map', href: '#seats' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-rose-400 shadow-md group-hover:scale-105 transition-transform bg-white flex items-center justify-center">
              <img 
                src="/images/logo.jpeg" 
                alt="Sree Sree Reading Hall Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-['Outfit']">
                  Sree Sree
                </span>
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-rose-300">
                  Services
                </span>
              </div>
              <p className="text-xs text-rose-700 font-medium">Premium Reading Hall & Study Bays</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/70 border border-rose-200 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-rose-700 px-3 py-1.5 rounded-full transition-colors hover:bg-rose-100/60"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Call CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onToggleDashboard}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                showDashboard 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-white text-slate-700 border-rose-200 hover:text-rose-700 hover:border-rose-300 shadow-sm'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-600" />
              <span>{showDashboard ? 'Exit Dashboard' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors text-xs font-semibold shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>+91 9666152456</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Seat</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold text-xs shadow"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-rose-200 text-slate-700 hover:text-rose-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-rose-200 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-rose-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-800 hover:text-rose-700 py-2 px-3 rounded-lg hover:bg-rose-100/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onToggleDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{showDashboard ? 'Return to Main Website' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-700 text-xs font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: +91 9666152456</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
