import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, BookOpen, Sparkles, LayoutDashboard } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-rose-500/40 shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform bg-rose-950 flex items-center justify-center">
              <img 
                src="/images/logo.jpeg" 
                alt="Sree Sree Reading Hall Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-['Outfit']">
                  Sree Sree
                </span>
                <span className="bg-rose-500/20 text-rose-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-rose-500/30">
                  Services
                </span>
              </div>
              <p className="text-xs text-rose-300/90 font-medium">Premium Reading Hall & Study Bays</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-rose-950/40 border border-rose-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-rose-400 px-3 py-1.5 rounded-full transition-colors hover:bg-rose-500/10"
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
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-rose-950/50 text-slate-300 border-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>{showDashboard ? 'Exit Dashboard' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-950/60 transition-colors text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>+91 9666152456</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 hover:shadow-rose-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
              className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-rose-500/20 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-rose-900/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-rose-400 py-2 px-3 rounded-lg hover:bg-rose-900/30 transition-colors"
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
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{showDashboard ? 'Return to Main Website' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 text-xs font-semibold"
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
