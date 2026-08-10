import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Facilities } from './components/Facilities';
import { SeatMap } from './components/SeatMap';
import { Pricing } from './components/Pricing';
import { Gallery } from './components/Gallery';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { BookingModal } from './components/BookingModal';
import { DashboardPreview } from './components/DashboardPreview';
import { Footer } from './components/Footer';
import { Seat, ShiftType } from './types';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedShift, setSelectedShift] = useState<ShiftType>('full_day');

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectSeatForBooking = (seat: Seat, shift: ShiftType) => {
    setSelectedSeat(seat);
    setSelectedShift(shift);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onToggleDashboard={() => setShowDashboard(!showDashboard)}
        showDashboard={showDashboard}
      />

      {/* Main Page Sections */}
      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <Facilities onOpenBooking={handleOpenBooking} />
        <SeatMap onSelectSeatForBooking={handleSelectSeatForBooking} />
        <Pricing onOpenBooking={handleOpenBooking} />
        <Gallery />
        <Blog />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Checkout Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedSeat={selectedSeat}
        selectedShift={selectedShift}
      />

      {/* Dashboard & Blog Creator Preview */}
      {showDashboard && (
        <DashboardPreview onClose={() => setShowDashboard(false)} />
      )}

    </div>
  );
}

export default App;
