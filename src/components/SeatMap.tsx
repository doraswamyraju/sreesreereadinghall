import React, { useState } from 'react';
import { Seat, ShiftType, ZoneType } from '../types';
import { GENERATED_SEATS } from '../data/mockData';
import { Sparkles, CheckCircle, Info, Zap, Shield, Filter, Clock } from 'lucide-react';

interface SeatMapProps {
  onSelectSeatForBooking: (seat: Seat, shift: ShiftType) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ onSelectSeatForBooking }) => {
  const [selectedSeatId, setSelectedSeatId] = useState<string>('seat_1');
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('full_day');

  const selectedSeat = GENERATED_SEATS.find((s) => s.id === selectedSeatId) || GENERATED_SEATS[0];

  const filteredSeats = GENERATED_SEATS.filter((seat) => {
    if (activeZoneFilter === 'all') return true;
    return seat.zone === activeZoneFilter;
  });

  // Calculate shift multiplier
  const getShiftPrice = (basePrice: number, shift: ShiftType) => {
    if (shift === 'full_day') return basePrice;
    if (shift === 'morning' || shift === 'afternoon') return Math.round(basePrice * 0.75);
    return Math.round(basePrice * 0.65); // night shift
  };

  const currentPrice = getShiftPrice(selectedSeat.pricePerMonth, selectedShift);

  return (
    <section id="seats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Interactive Visual Reservation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Choose Your <span className="gradient-text">Personal Study Desk</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Click on any green seat in the floor plan to view desk specs, select your study shift, and lock your reservation.
          </p>
        </div>

        {/* Filters & Legend Bar */}
        <div className="glass-card p-4 sm:p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Zone Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter Zone:
            </span>
            {[
              { id: 'all', label: 'All Bays (48 Desks)' },
              { id: 'ac_prime', label: 'AC Prime Bay (₹1500)' },
              { id: 'ac_standard', label: 'AC Standard (₹1200)' },
              { id: 'non_ac', label: 'Non-AC Economy (₹900)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveZoneFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeZoneFilter === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-emerald-950/40 text-slate-300 border border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Seat Status Legend */}
          <div className="flex items-center space-x-4 text-xs font-medium text-slate-300">
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-emerald-500/30 border-2 border-emerald-400" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-amber-500/30 border-2 border-amber-400" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-700 border-2 border-slate-600 opacity-60" />
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-blue-500 border-2 border-blue-400" />
              <span>Selected</span>
            </div>
          </div>

        </div>

        {/* Main Grid + Inspector Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Visual Floor Plan Grid (Col 7) */}
          <div className="lg:col-span-7 glass-card p-6 rounded-3xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-emerald-900/40 pb-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center">
                <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
                Floor Layout Grid (Seats S-01 to S-48)
              </h3>
              <span className="text-xs text-slate-400 font-mono">Front Entrance & Entrance Bay ↑</span>
            </div>

            {/* Grid Map */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 sm:gap-3 py-4">
              {filteredSeats.map((seat) => {
                const isSelected = seat.id === selectedSeatId;
                let bgClasses = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20';
                
                if (seat.status === 'occupied') {
                  bgClasses = 'bg-slate-900/80 border-slate-800 text-slate-500 cursor-not-allowed opacity-60';
                } else if (seat.status === 'reserved') {
                  bgClasses = 'bg-amber-950/30 border-amber-500/40 text-amber-300 cursor-not-allowed';
                }

                if (isSelected) {
                  bgClasses = 'bg-blue-600 text-white border-blue-300 shadow-lg shadow-blue-500/40 ring-2 ring-blue-400 scale-105 z-10';
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

            <div className="mt-4 pt-3 border-t border-emerald-900/40 text-[11px] text-slate-400 flex items-center justify-between">
              <span>* AC Prime seats include individual high-back study chairs & top lighting.</span>
              <span className="text-emerald-400 font-semibold">Tirupati Sree Sree Branch</span>
            </div>
          </div>

          {/* Seat Details & Booking Inspector (Col 5) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-6">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Selected Seat</span>
                  <h3 className="text-2xl font-black text-white font-['Outfit'] flex items-center">
                    Desk {selectedSeat.seatNumber}
                    <span className="ml-3 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {selectedSeat.zone.replace('_', ' ').toUpperCase()}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-['Outfit']">₹{currentPrice}</span>
                  <span className="text-xs text-slate-400 block">/ Month</span>
                </div>
              </div>

              {/* Shift Selection Buttons */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-300 flex items-center uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Select Your Preferred Shift:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'full_day', title: 'Full Day (24 Hours)', sub: '₹1500 / mo' },
                    { id: 'morning', title: 'Morning Shift', sub: '6 AM - 2 PM (₹1125)' },
                    { id: 'afternoon', title: 'Evening Shift', sub: '2 PM - 10 PM (₹1125)' },
                    { id: 'night_shift', title: 'Night Owl Shift', sub: '10 PM - 6 AM (₹975)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShift(s.id as ShiftType)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedShift === s.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                          : 'bg-emerald-950/30 border-emerald-500/20 text-slate-300 hover:border-emerald-500/40'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.title}</p>
                      <p className="text-[10px] text-slate-400">{s.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desk Specifications */}
              <div className="space-y-2.5 bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-2xl mb-6">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Desk Amenities:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Personal Power Socket</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>High-Speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Silent Bay Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Locker Support</span>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <button
              onClick={() => onSelectSeatForBooking(selectedSeat, selectedShift)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 hover:from-emerald-400 hover:to-emerald-200 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Confirm & Reserve Desk {selectedSeat.seatNumber}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
