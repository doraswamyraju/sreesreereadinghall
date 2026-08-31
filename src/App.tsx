import React, { useState, useEffect } from 'react';
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
import { LoginPage } from './components/LoginPage';
import { Footer } from './components/Footer';
import { Seat, ShiftType, DurationOption, PricingPlan, BlogPost } from './types';
import { GENERATED_SEATS, PRICING_PLANS, BLOG_POSTS } from './data/mockData';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Dynamic States (Managed via Dashboard)
  const [seats, setSeats] = useState<Seat[]>(GENERATED_SEATS);
  const [plans, setPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);

  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedShift, setSelectedShift] = useState<ShiftType>('full_day');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('30_days');

  // Simple router listener for /login or #login
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.hash === '#login' || window.location.pathname === '/login') {
        setCurrentPath('/login');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectSeatForBooking = (seat: Seat, shift: ShiftType, duration: DurationOption) => {
    setSelectedSeat(seat);
    setSelectedShift(shift);
    setSelectedDuration(duration);
    setIsBookingOpen(true);
  };

  // If path is /login and not logged into dashboard yet, show Login Page
  if (currentPath === '/login' && !showDashboard) {
    return (
      <LoginPage
        onLoginSuccess={() => {
          setShowDashboard(true);
        }}
        onBackToHome={() => {
          navigate('/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#db2777] selection:text-white font-sans">
      
      {/* Navigation Header (Clean, no admin link) */}
      <Navbar onOpenBooking={handleOpenBooking} />

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

      {/* Booking Checkout Modal (With Duration selection & Offline payment flow) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedSeat={selectedSeat}
        selectedShift={selectedShift}
        selectedDuration={selectedDuration}
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
          onClose={() => {
            setShowDashboard(false);
            if (currentPath === '/login') {
              navigate('/');
            }
          }}
        />
      )}

    </div>
  );
}

export default App;
