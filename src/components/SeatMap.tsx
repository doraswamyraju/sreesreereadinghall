import React, { useState } from 'react';
import { Seat, ShiftType, PricingPlan } from '../types';
import { Sparkles, Clock, Filter, CheckCircle } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  plans: PricingPlan[];
  onSelectSeatForBooking: (seat: Seat, shift: ShiftType) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ seats, plans, onSelectSeatForBooking }) => {
  const [selectedSeatId, setSelectedSeatId] = useState<string>('seat_1');
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('full_day');

  const selectedSeat = seats.find((s) => s.id === selectedSeatId) || seats[0] || {
    id: 'seat_1', seatNumber: 'S-01', zone: 'ac_prime', pricePerMonth: 1500, status: 'available'
  };

  const matchedPlan = plans.find(p => p.zoneType === selectedSeat.zone);
  const baseMonthlyPrice = matchedPlan ? matchedPlan.priceMonthly : selectedSeat.pricePerMonth;

  const filteredSeats = seats.filter((seat) => {
    if (activeZoneFilter === 'all') return true;
    return seat.zone === activeZoneFilter;
  });

  const getShiftPrice = (basePrice: number, shift: ShiftType) => {
    if (shift === 'full_day') return basePrice;
    if (shift === 'morning' || shift === 'afternoon') return Math.round(basePrice * 0.75);
    return Math.round(basePrice * 0.65);
  };

  const currentPrice = getShiftPrice(baseMonthlyPrice, selectedShift);

  return (
    <section id="seats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
            Interactive Visual Reservation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Choose Your <span className="gradient-text">Personal Study Desk</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base">
            Click on any available desk in the floor plan to view desk specs, select your study shift, and lock your reservation.
          </p>
        </div>

        {/* Filters & Legend Bar */}
        <div className="glass-card p-4 sm:p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 border border-rose-200">
          
          {/* Zone Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter Zone:
            </span>
            {[
              { id: 'all', label: `All Bays (${seats.length} Desks)` },
              { id: 'ac_prime', label: `AC Prime Bay (₹${plans.find(p=>p.zoneType==='ac_prime')?.priceMonthly || 1500})` },
              { id: 'ac_standard', label: `AC Standard (₹${plans.find(p=>p.zoneType==='ac_standard')?.priceMonthly || 1200})` },
              { id: 'non_ac', label: `Non-AC Economy (₹${plans.find(p=>p.zoneType==='non_ac')?.priceMonthly || 900})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveZoneFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeZoneFilter === tab.id
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-rose-50 text-slate-700 border border-rose-200 hover:border-rose-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Seat Status Legend */}
          <div className="flex items-center space-x-4 text-xs font-medium text-slate-700">
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-emerald-100 border-2 border-emerald-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-amber-100 border-2 border-amber-500" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-200 border-2 border-slate-400 opacity-60" />
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-rose-600 border-2 border-amber-400" />
              <span>Selected</span>
            </div>
          </div>

        </div>

        {/* Main Grid + Inspector Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Visual Floor Plan Grid (Col 7) */}
          <div className="lg:col-span-7 glass-card p-6 rounded-3xl relative bg-white/90 border border-rose-200">
            <div className="flex items-center justify-between mb-4 border-b border-rose-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <Sparkles className="w-4 h-4 text-rose-600 mr-2" />
                Floor Layout Grid (Desks S-01 to S-{seats.length})
              </h3>
              <span className="text-xs text-slate-500 font-mono">Front Entrance ↑</span>
            </div>

            {/* Grid Map */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 sm:gap-3 py-4">
              {filteredSeats.map((seat) => {
                const isSelected = seat.id === selectedSeatId;
                let bgClasses = 'bg-rose-50/80 border-rose-300 text-rose-900 hover:border-rose-400 hover:bg-rose-100';
                
                if (seat.status === 'occupied') {
                  bgClasses = 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60';
                } else if (seat.status === 'reserved') {
                  bgClasses = 'bg-amber-50 border-amber-300 text-amber-900 cursor-not-allowed';
                }

                if (isSelected) {
                  bgClasses = 'bg-rose-600 text-white border-amber-400 shadow-lg ring-2 ring-amber-400 scale-105 z-10';
                }

                return (
                  <button
                    key={seat.id}
                    disabled={seat.status !== 'available'}
                    onClick={() => setSelectedSeatId(seat.id)}
                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center transition-all p-1 font-mono font-bold text-xs ${bgClasses}`}
                  >
                    <span>{seat.seatNumber}</span>
                    <span className="text-[9px] opacity-75 font-sans font-normal mt-0.5">
                      {seat.zone === 'ac_prime' ? 'AC-P' : seat.zone === 'ac_standard' ? 'AC-S' : 'NonAC'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>* AC Prime seats include individual high-back study chairs & top lighting.</span>
              <span className="text-rose-700 font-semibold">Tirupati Sree Sree Branch</span>
            </div>
          </div>

          {/* Seat Details Inspector (Col 5) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border-2 border-rose-300 flex flex-col justify-between bg-white/95">
            <div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6">
                <div>
                  <span className="text-xs text-rose-700 font-semibold uppercase tracking-wider">Selected Desk</span>
                  <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] flex items-center">
                    Desk {selectedSeat.seatNumber}
                    <span className="ml-3 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                      {selectedSeat.zone.replace('_', ' ').toUpperCase()}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-rose-600 font-['Outfit']">₹{currentPrice}</span>
                  <span className="text-xs text-slate-500 block">/ Month</span>
                </div>
              </div>

              {/* Shift Selection Buttons */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-800 flex items-center uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-rose-600 mr-1.5" /> Select Your Preferred Shift:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'full_day', title: 'Full Day (24 Hours)', sub: `₹${baseMonthlyPrice}` },
                    { id: 'morning', title: 'Morning Shift', sub: `6 AM - 2 PM (₹${Math.round(baseMonthlyPrice*0.75)})` },
                    { id: 'afternoon', title: 'Evening Shift', sub: `2 PM - 10 PM (₹${Math.round(baseMonthlyPrice*0.75)})` },
                    { id: 'night_shift', title: 'Night Owl Shift', sub: `10 PM - 6 AM (₹${Math.round(baseMonthlyPrice*0.65)})` },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShift(s.id as ShiftType)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedShift === s.id
                          ? 'bg-rose-50 border-rose-400 text-slate-900 shadow-sm'
                          : 'bg-white border-rose-200 text-slate-700 hover:border-rose-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900">{s.title}</p>
                      <p className="text-[10px] text-slate-600">{s.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desk Specs */}
              <div className="space-y-2.5 bg-rose-50/60 border border-rose-200 p-4 rounded-2xl mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Desk Amenities:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                    <span>Power Sockets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                    <span>Fiber Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                    <span>Silent Bay Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                    <span>Locker Support</span>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <button
              onClick={() => onSelectSeatForBooking(selectedSeat, selectedShift)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Confirm & Reserve Desk {selectedSeat.seatNumber}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
