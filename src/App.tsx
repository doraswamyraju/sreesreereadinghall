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
import { Seat, ShiftType, PricingPlan, BlogPost } from './types';
import { GENERATED_SEATS, PRICING_PLANS, BLOG_POSTS } from './data/mockData';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Dynamic States (Managed via Dashboard)
  const [seats, setSeats] = useState<Seat[]>(GENERATED_SEATS);
  const [plans, setPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);

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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#db2777] selection:text-white font-sans">
      
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
        <SeatMap seats={seats} plans={plans} onSelectSeatForBooking={handleSelectSeatForBooking} />
        <Pricing plans={plans} onOpenBooking={handleOpenBooking} />
        <Gallery />
        <Blog posts={blogs} />
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

      {/* Dashboard & Pricing Manager */}
      {showDashboard && (
        <DashboardPreview
          seats={seats}
          onUpdateSeats={setSeats}
          plans={plans}
          onUpdatePlans={setPlans}
          blogs={blogs}
          onUpdateBlogs={setBlogs}
          onClose={() => setShowDashboard(false)}
        />
      )}

    </div>
  );
}

export default App;
