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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative max-w-lg w-full glass-card border border-rose-500/40 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">Desk Reservation Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            
            {/* Seat Summary Box */}
            <div className="bg-rose-950/40 border border-rose-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">Reserved Seat</span>
                <h4 className="text-xl font-extrabold text-white font-['Outfit']">Desk {seatNumber}</h4>
                <p className="text-xs text-slate-400">{zoneName} • {selectedShift.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-['Outfit']">₹{totalPrice}</span>
                <span className="text-xs text-slate-400 block">{formData.durationMonths} Month(s)</span>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-rose-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9666152456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-rose-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Duration</label>
                <select
                  value={formData.durationMonths}
                  onChange={(e) => setFormData({ ...formData, durationMonths: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400"
                >
                  <option value={1}>1 Month (₹{basePrice})</option>
                  <option value={3}>3 Months (₹{basePrice * 3})</option>
                  <option value={6}>6 Months (₹{basePrice * 6})</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-rose-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Reserve Seat Desk {seatNumber} Now</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Zero cancellation fee prior to campus onboarding.</span>
            </p>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-rose-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-['Outfit']">Seat Locked Successfully!</h3>
            <p className="text-xs text-slate-300">
              Desk <strong className="text-rose-400 font-mono text-sm">{seatNumber}</strong> has been provisionally reserved for <strong className="text-white">{formData.fullName}</strong>.
            </p>
            <div className="bg-slate-950 border border-rose-500/20 p-3 rounded-xl text-left text-xs text-slate-300 space-y-1 font-mono">
              <p>Branch: Axis Bank Plaza, Tirupati</p>
              <p>Phone: +91 9666152456</p>
              <p>Status: Pending Campus Verification</p>
            </div>
            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
