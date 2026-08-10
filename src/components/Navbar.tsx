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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 border-b border-[#fbcfe8] py-3 shadow-sm backdrop-blur-md' : 'bg-white border-b border-[#fbcfe8] py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#db2777] shadow-sm group-hover:scale-105 transition-transform bg-white flex items-center justify-center">
              <img 
                src="/images/logo.jpeg" 
                alt="Sree Sree Reading Hall Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#db2777] font-['Outfit']">
                  Sree Sree
                </span>
                <span className="bg-[#fdf2f8] text-[#db2777] text-xs font-bold px-2 py-0.5 rounded-full border border-[#fbcfe8]">
                  Services
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Premium Reading Hall & Study Bays</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white border border-[#fbcfe8] px-4 py-1.5 rounded-full shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#db2777] px-3.5 py-1.5 rounded-full transition-colors hover:bg-[#fdf2f8]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Call CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onToggleDashboard}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                showDashboard 
                  ? 'bg-[#db2777] text-white border-[#db2777]' 
                  : 'bg-white text-slate-700 border-[#fbcfe8] hover:text-[#db2777] hover:border-[#db2777]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#db2777]" />
              <span>{showDashboard ? 'Exit Dashboard' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fdf2f8] transition-colors text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#db2777]" />
              <span>+91 9666152456</span>
            </a>

            {/* Solid Pink Button - NO Gradient */}
            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Seat</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg bg-[#db2777] text-white font-bold text-xs shadow"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-700 hover:text-[#db2777]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#fbcfe8] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-md">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-[#db2777] py-2 px-3 rounded-lg hover:bg-[#fdf2f8] transition-colors"
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
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-[#db2777] text-xs font-bold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{showDashboard ? 'Return to Main Website' : 'Admin & Pricing Portal'}</span>
            </button>

            <a
              href="tel:+919666152456"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#db2777] text-white text-xs font-bold"
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
