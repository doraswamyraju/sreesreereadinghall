import React, { useState } from 'react';
import { Seat, ShiftType, PricingPlan, DurationOption } from '../types';
import { Sparkles, Clock, Filter, CheckCircle, ShieldCheck, Info } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  plans: PricingPlan[];
  onSelectSeatForBooking: (seat: Seat, shift: ShiftType, duration: DurationOption) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ seats, plans, onSelectSeatForBooking }) => {
  const [selectedSeatId, setSelectedSeatId] = useState<string>('pink_1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pink' | 'blue'>('all');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('full_day');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('30_days');

  const selectedSeat = seats.find((s) => s.id === selectedSeatId) || seats[0] || {
    id: 'pink_1',
    seatNumber: 'P-01',
    color: 'pink',
    zone: 'ac_pink',
    rates: { days7: 1000, days10: 1300, days15: 1800, days20: 2200, days30: 3000 },
    chairType: 'cushion',
    hasLocker: true,
    priceMonthly: 3000,
    status: 'available'
  };

  const isPink = selectedSeat.color === 'pink';

  // Calculate pricing based on selected duration
  const getDurationPrice = (seat: Seat, duration: DurationOption) => {
    switch (duration) {
      case '7_days': return seat.rates.days7;
      case '10_days': return seat.rates.days10;
      case '15_days': return seat.rates.days15;
      case '20_days': return seat.rates.days20;
      case '30_days': return seat.rates.days30;
      default: return seat.rates.days30;
    }
  };

  const currentPrice = getDurationPrice(selectedSeat, selectedDuration);

  const filteredSeats = seats.filter((seat) => {
    if (activeFilter === 'all') return true;
    return seat.color === activeFilter;
  });

  const pinkCount = seats.filter(s => s.color === 'pink').length;
  const blueCount = seats.filter(s => s.color === 'blue').length;

  return (
    <section id="seats" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8]">
            Interactive Seat Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            CHOOSE YOUR <span className="text-[#db2777]">PERSONAL STUDY DESK</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Select your preferred desk from our <strong>52 Pink Cushion Desks (with Lockers)</strong> or <strong>21 Blue Standard Desks</strong>. Operating hours: <strong>7:00 AM to 10:00 PM (100% AC)</strong>.
          </p>
        </div>

        {/* Filters & Legend Bar */}
        <div className="p-4 sm:p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-[#fbcfe8] shadow-xs">
          
          {/* Zone Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-600 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Desk Filter:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#db2777] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-[#fbcfe8] hover:border-[#db2777]'
              }`}
            >
              All Desks (73)
            </button>
            <button
              onClick={() => setActiveFilter('pink')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeFilter === 'pink'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-pink-50 text-pink-700 border border-pink-300 hover:bg-pink-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" />
              <span>Pink Cushion Desks with Locker ({pinkCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('blue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeFilter === 'blue'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span>Blue Standard Desks ({blueCount})</span>
            </button>
          </div>

          {/* Seat Status Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-pink-100 border-2 border-pink-500" />
              <span>Pink Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-blue-100 border-2 border-blue-500" />
              <span>Blue Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-amber-100 border-2 border-amber-500" />
              <span>Reserved</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-200 border-2 border-slate-400 opacity-60" />
              <span>Occupied</span>
            </div>
          </div>

        </div>

        {/* Main Grid + Inspector Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Visual Floor Plan Grid (Col 7) */}
          <div className="lg:col-span-7 p-6 rounded-3xl relative bg-white border border-[#fbcfe8] shadow-xs">
            <div className="flex items-center justify-between mb-4 border-b border-[#fbcfe8] pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#db2777]" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Floor Layout Grid ({filteredSeats.length} Desks Displayed)
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">Front Entrance ↑</span>
            </div>

            {/* Grid Map */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-2.5 py-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredSeats.map((seat) => {
                const isSelected = seat.id === selectedSeatId;
                const isPinkDesk = seat.color === 'pink';

                let bgClasses = isPinkDesk
                  ? 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-500 hover:bg-pink-100'
                  : 'bg-blue-50 border-blue-300 text-blue-700 hover:border-blue-500 hover:bg-blue-100';
                
                if (seat.status === 'occupied') {
                  bgClasses = 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60';
                } else if (seat.status === 'reserved') {
                  bgClasses = 'bg-amber-50 border-amber-300 text-amber-900 cursor-not-allowed';
                }

                if (isSelected) {
                  bgClasses = isPinkDesk
                    ? 'bg-[#db2777] text-white border-slate-900 shadow-md scale-105 z-10'
                    : 'bg-blue-600 text-white border-slate-900 shadow-md scale-105 z-10';
                }

                return (
                  <button
                    key={seat.id}
                    disabled={seat.status !== 'available'}
                    onClick={() => setSelectedSeatId(seat.id)}
                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center transition-all p-1 font-mono font-bold text-xs ${bgClasses}`}
                  >
                    <span>{seat.seatNumber}</span>
                    <span className="text-[8px] opacity-90 font-sans font-semibold mt-0.5">
                      {isPinkDesk ? 'Cushion' : 'Normal'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#fbcfe8] text-[11px] text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
              <span>* Both Pink & Blue desks are 100% Air Conditioned (7 AM - 10 PM).</span>
              <span className="text-[#db2777] font-bold">Pay Offline at Desk</span>
            </div>
          </div>

          {/* Seat Details Inspector (Col 5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border-2 border-[#db2777] flex flex-col justify-between bg-white shadow-md">
            <div className="space-y-5">
              
              {/* Desk Title & Price */}
              <div className="flex items-center justify-between border-b border-[#fbcfe8] pb-4">
                <div>
                  <span className="text-xs text-[#db2777] font-extrabold uppercase tracking-wider">
                    {isPink ? 'Pink Premium Desk' : 'Blue Standard Desk'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] flex items-center">
                    Desk {selectedSeat.seatNumber}
                    <span className={`ml-3 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isPink 
                        ? 'bg-pink-100 text-pink-700 border-pink-300' 
                        : 'bg-blue-100 text-blue-700 border-blue-300'
                    }`}>
                      {isPink ? 'Cushion + Locker' : 'Normal Chair'}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-[#db2777] font-['Outfit']">₹{currentPrice}</span>
                  <span className="text-xs text-slate-500 font-semibold block">Total Payable at Desk</span>
                </div>
              </div>

              {/* Duration Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 flex items-center uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#db2777] mr-1.5" /> Select Duration Package:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '7_days', title: '1 Week (7 Days)', price: selectedSeat.rates.days7 },
                    { id: '10_days', title: '10 Days', price: selectedSeat.rates.days10 },
                    { id: '15_days', title: '15 Days', price: selectedSeat.rates.days15 },
                    { id: '20_days', title: '20 Days', price: selectedSeat.rates.days20 },
                    { id: '30_days', title: '1 Month (30 Days)', price: selectedSeat.rates.days30 },
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedDuration(pkg.id as DurationOption)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedDuration === pkg.id
                          ? 'bg-[#fdf2f8] border-[#db2777] text-slate-900 shadow-xs'
                          : 'bg-white border-[#fbcfe8] text-slate-700 hover:border-[#db2777]'
                      }`}
                    >
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">{pkg.title}</p>
                      <p className="text-xs font-black text-[#db2777] mt-0.5">₹{pkg.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Operating Shifts (7am - 10pm) */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 flex items-center uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#db2777] mr-1.5" /> Daily Shift (Operating Hours 7 AM - 10 PM):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'full_day', title: 'Full Day', time: '7 AM - 10 PM' },
                    { id: 'morning', title: 'Morning', time: '7 AM - 2:30 PM' },
                    { id: 'evening', title: 'Evening', time: '2:30 PM - 10 PM' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShift(s.id as ShiftType)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedShift === s.id
                          ? 'bg-[#fdf2f8] border-[#db2777] text-slate-900 shadow-xs font-bold'
                          : 'bg-white border-[#fbcfe8] text-slate-700 hover:border-[#db2777]'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900">{s.title}</p>
                      <p className="text-[10px] text-slate-500">{s.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desk Specifications */}
              <div className="bg-[#fdf2f8] border border-[#fbcfe8] p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Desk Features & Amenities:</span>
                  <span className="text-[#db2777]">{isPink ? '52 Desks Available' : '21 Desks Available'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-800 font-semibold">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#db2777]" />
                    <span>{isPink ? 'Cushion Chairs' : 'Normal Chairs'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#db2777]" />
                    <span>{isPink ? 'Locker Included' : 'No Locker'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#db2777]" />
                    <span>100% Chilled AC</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#db2777]" />
                    <span>Power & Fast Wi-Fi</span>
                  </div>
                </div>
              </div>

              {/* Offline Payment Note */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-[11px] text-amber-900 font-medium">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Pay Offline at Desk:</strong> No online payment is charged now. Your desk will be held provisionally. Pay by Cash / UPI when you visit the reading hall.
                </span>
              </div>

            </div>

            {/* Reserve Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectSeatForBooking(selectedSeat, selectedShift, selectedDuration)}
                className="w-full py-4 rounded-2xl bg-[#db2777] hover:bg-[#be185d] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>Confirm & Reserve Desk {selectedSeat.seatNumber}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
