import React, { useState } from 'react';
import { Seat, ShiftType } from '../types';
import { X, CheckCircle2, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeat: Seat | null;
  selectedShift: ShiftType;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedSeat,
  selectedShift,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    examPrep: 'APPSC Group 2',
    durationMonths: 1
  });

  if (!isOpen) return null;

  const seatNumber = selectedSeat ? selectedSeat.seatNumber : 'S-01';
  const zoneName = selectedSeat ? selectedSeat.zone.replace('_', ' ').toUpperCase() : 'AC PRIME';
  const basePrice = selectedSeat ? selectedSeat.pricePerMonth : 1500;
  
  const totalPrice = basePrice * formData.durationMonths;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative max-w-lg w-full glass-card border-2 border-[#db2777] rounded-3xl overflow-hidden bg-white shadow-2xl">
        
        {/* Header */}
        <div className="p-6 bg-[#db2777] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-lg font-black text-white font-['Outfit'] uppercase">Desk Reservation Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            
            {/* Seat Summary Box */}
            <div className="bg-[#fdf2f8] border border-[#fbcfe8] p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#db2777] font-extrabold uppercase tracking-wider">Reserved Seat</span>
                <h4 className="text-xl font-black text-slate-900 font-['Outfit']">Desk {seatNumber}</h4>
                <p className="text-xs text-slate-600 font-bold">{zoneName} • {selectedShift.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#db2777] font-['Outfit']">₹{totalPrice}</span>
                <span className="text-xs text-slate-500 font-bold block">{formData.durationMonths} Month(s)</span>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#db2777] shadow-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9666152456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#db2777] shadow-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Duration</label>
                <select
                  value={formData.durationMonths}
                  onChange={(e) => setFormData({ ...formData, durationMonths: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                >
                  <option value={1}>1 Month (₹{basePrice})</option>
                  <option value={3}>3 Months (₹{basePrice * 3})</option>
                  <option value={6}>6 Months (₹{basePrice * 6})</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#db2777] shadow-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Reserve Seat Desk {seatNumber} Now</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-medium text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#db2777]" />
              <span>Zero cancellation fee prior to campus onboarding.</span>
            </p>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#db2777] mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">Seat Locked Successfully!</h3>
            <p className="text-xs text-slate-600 font-medium">
              Desk <strong className="text-[#db2777] font-mono text-sm">{seatNumber}</strong> has been provisionally reserved for <strong className="text-slate-900">{formData.fullName}</strong>.
            </p>
            <div className="bg-[#fdf2f8] border border-[#fbcfe8] p-3 rounded-xl text-left text-xs text-slate-800 space-y-1 font-mono">
              <p>Branch: Axis Bank Plaza, Tirupati</p>
              <p>Phone: +91 9666152456</p>
              <p>Status: Pending Campus Verification</p>
            </div>
            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="w-full py-3 bg-[#db2777] text-white font-black text-xs rounded-xl uppercase tracking-wider"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
