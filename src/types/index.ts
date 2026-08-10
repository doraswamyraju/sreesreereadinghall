export type ShiftType = 'morning' | 'afternoon' | 'evening' | 'full_day' | 'night_shift';

export type SeatStatus = 'available' | 'reserved' | 'occupied' | 'maintenance';
export type ZoneType = 'ac_prime' | 'ac_standard' | 'non_ac' | 'silent_cabin';

export interface Seat {
  id: string;
  seatNumber: string;
  zone: ZoneType;
  row: string;
  col: number;
  status: SeatStatus;
  hasPowerOutlet: boolean;
  hasDeskLamp: boolean;
  pricePerMonth: number;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceDaily: number;
  popular?: boolean;
  zoneType: ZoneType;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Study Tips' | 'Exam Prep' | 'Productivity' | 'Announcements';
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  rank?: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Reading Area' | 'Amenities' | 'Cabins' | 'Dining & Lounge';
  url: string;
  description: string;
}

export interface BookingFormData {
  seatId: string;
  seatNumber: string;
  fullName: string;
  phone: string;
  email: string;
  examPrep: string;
  shift: ShiftType;
  startDate: string;
  durationMonths: number;
  totalPrice: number;
}
