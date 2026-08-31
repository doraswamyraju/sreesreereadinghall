import React, { useState, useEffect } from 'react';
import { Seat, ShiftType, DurationOption } from '../types';
import { X, CheckCircle2, ShieldCheck, Sparkles, MessageSquare, MapPin, Phone, Clock, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeat: Seat | null;
  selectedShift?: ShiftType;
  selectedDuration?: DurationOption;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedSeat,
  selectedShift = 'full_day',
  selectedDuration = '30_days',
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [bookingId, setBookingId] = useState('');
  const [duration, setDuration] = useState<DurationOption>(selectedDuration);
  const [shift, setShift] = useState<ShiftType>(selectedShift);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    examPrep: 'APPSC Group 2',
  });

  useEffect(() => {
    if (selectedDuration) setDuration(selectedDuration);
    if (selectedShift) setShift(selectedShift);
  }, [selectedDuration, selectedShift]);

  if (!isOpen) return null;

  const seat = selectedSeat || {
    id: 'pink_1',
    seatNumber: 'P-01',
    color: 'pink' as const,
    zone: 'ac_pink' as const,
    rates: { days7: 1000, days10: 1300, days15: 1800, days20: 2200, days30: 3000 },
    chairType: 'cushion' as const,
    hasLocker: true,
    priceMonthly: 3000,
    status: 'available' as const
  };

  const isPink = seat.color === 'pink';

  const getPrice = (dur: DurationOption) => {
    switch (dur) {
      case '7_days': return seat.rates.days7;
      case '10_days': return seat.rates.days10;
      case '15_days': return seat.rates.days15;
      case '20_days': return seat.rates.days20;
      case '30_days': return seat.rates.days30;
      default: return seat.rates.days30;
    }
  };

  const getDurationLabel = (dur: DurationOption) => {
    switch (dur) {
      case '7_days': return '1 Week (7 Days)';
      case '10_days': return '10 Days';
      case '15_days': return '15 Days';
      case '20_days': return '20 Days';
      case '30_days': return '1 Month (30 Days)';
      default: return '30 Days';
    }
  };

  const getShiftLabel = (s: ShiftType) => {
    switch (s) {
      case 'full_day': return 'Full Day (7 AM - 10 PM)';
      case 'morning': return 'Morning (7 AM - 2:30 PM)';
      case 'evening': return 'Evening (2:30 PM - 10 PM)';
      default: return 'Full Day';
    }
  };

  const totalPrice = getPrice(duration);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    const generatedId = `SSR-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(generatedId);
    setStep('success');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sree Sree Reading Hall,\n\nI have reserved a desk online:\n• Booking Ref: ${bookingId}\n• Desk: ${seat.seatNumber} (${isPink ? 'Pink Cushion Desk + Locker' : 'Blue Standard Desk'})\n• Duration: ${getDurationLabel(duration)}\n• Shift: ${getShiftLabel(shift)}\n• Total Amount Payable: ₹${totalPrice}\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Exam Prep: ${formData.examPrep}\n\nI will visit Sree Sree Reading Hall to make offline payment and take my seat.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-white shadow-2xl border-2 border-[#db2777] my-8">
        
        {/* Header */}
        <div className="p-5 bg-[#db2777] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-['Outfit'] uppercase">
                Reserve Your Study Desk
              </h3>
              <p className="text-[11px] text-pink-100 font-medium">Zero Online Charge • Pay Offline at Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            
            {/* Seat Summary Box */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isPink ? 'bg-pink-50 border-pink-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <div>
                <span className="text-[10px] text-[#db2777] font-extrabold uppercase tracking-wider">
                  Selected Seat
                </span>
                <h4 className="text-xl font-black text-slate-900 font-['Outfit'] flex items-center">
                  Desk {seat.seatNumber}
                  <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isPink ? 'bg-pink-100 text-pink-700 border-pink-300' : 'bg-blue-100 text-blue-700 border-blue-300'
                  }`}>
                    {isPink ? 'Cushion + Locker' : 'Normal Chair'}
                  </span>
                </h4>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  100% AC • 7 AM - 10 PM Access
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#db2777] font-['Outfit']">₹{totalPrice}</span>
                <span className="text-[11px] text-slate-500 font-bold block">{getDurationLabel(duration)}</span>
              </div>
            </div>

            {/* Duration Package Select */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Select Duration Package *
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as DurationOption)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#db2777] shadow-xs"
              >
                <option value="7_days">1 Week (7 Days) — ₹{seat.rates.days7}</option>
                <option value="10_days">10 Days — ₹{seat.rates.days10}</option>
                <option value="15_days">15 Days — ₹{seat.rates.days15}</option>
                <option value="20_days">20 Days — ₹{seat.rates.days20}</option>
                <option value="30_days">1 Month (30 Days) — ₹{seat.rates.days30}</option>
              </select>
            </div>

            {/* Shift Select */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Operating Shift (7 AM - 10 PM) *
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as ShiftType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#db2777] shadow-xs"
              >
                <option value="full_day">Full Day (7:00 AM - 10:00 PM)</option>
                <option value="morning">Morning Shift (7:00 AM - 2:30 PM)</option>
                <option value="evening">Evening Shift (2:30 PM - 10:00 PM)</option>
              </select>
            </div>

            {/* Student Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Target Examination</label>
              <input
                type="text"
                placeholder="e.g. APPSC Group 1/2, UPSC, NEET, DSC"
                value={formData.examPrep}
                onChange={(e) => setFormData({ ...formData, examPrep: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#db2777] shadow-xs"
              />
            </div>

            {/* Offline Payment Highlight Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium space-y-1">
              <p className="font-bold flex items-center">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 mr-1 shrink-0" />
                Payment is strictly OFFLINE at the reading hall.
              </p>
              <p className="text-amber-800">
                You will not be asked to make any payment online now. Please visit Sree Sree Reading Hall to pay (Cash / UPI) and occupy your desk.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Reservation & Hold Desk {seat.seatNumber}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-medium text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#db2777]" />
              <span>Provisional reservation valid for 24-48 hours.</span>
            </p>
          </form>
        ) : (
          /* Step 2: Success & Booking Slip */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <CheckCircle2 className="w-16 h-16 text-[#db2777] mx-auto animate-bounce" />
            
            <div>
              <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                Provisional Reservation Confirmed
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] mt-2">
                Desk {seat.seatNumber} is Held for You!
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Booking Reference: <strong className="text-[#db2777] font-mono font-extrabold text-sm">{bookingId}</strong>
              </p>
            </div>

            {/* Slip Card */}
            <div className="bg-[#fdf2f8] border border-[#fbcfe8] p-4 rounded-2xl text-left text-xs text-slate-800 space-y-2 font-medium">
              <div className="flex justify-between border-b border-pink-200 pb-2">
                <span>Student Name:</span>
                <strong className="text-slate-900">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between border-b border-pink-200 pb-2">
                <span>Selected Desk:</span>
                <strong className="text-[#db2777] font-mono">{seat.seatNumber} ({isPink ? 'Pink Cushion + Locker' : 'Blue Standard'})</strong>
              </div>
              <div className="flex justify-between border-b border-pink-200 pb-2">
                <span>Duration Package:</span>
                <strong className="text-slate-900">{getDurationLabel(duration)}</strong>
              </div>
              <div className="flex justify-between border-b border-pink-200 pb-2">
                <span>Shift Timings:</span>
                <strong className="text-slate-900">{getShiftLabel(shift)}</strong>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span>Payable Offline at Reception:</span>
                <span className="text-[#db2777] font-black font-['Outfit'] text-base">₹{totalPrice}</span>
              </div>
            </div>

            {/* Offline Payment Instructions */}
            <div className="text-left bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1 text-xs text-slate-700">
              <p className="font-bold text-slate-900 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#db2777] mr-1" />
                Reading Hall Location:
              </p>
              <p className="text-[11px] text-slate-600">
                1st Floor above Axis Bank, Near Lakshmipuram Circle, Air Bypass Rd, Tirupati (7 AM - 10 PM).
              </p>
              <p className="text-[11px] text-[#db2777] font-bold pt-1">
                * Please show this Booking Ref ({bookingId}) at reception and pay via Cash or UPI.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/919666152456?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Booking Details to WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Done & Return to Homepage
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
