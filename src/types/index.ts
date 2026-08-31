export type ShiftType = 'full_day' | 'morning' | 'evening';

export type SeatStatus = 'available' | 'reserved' | 'occupied' | 'maintenance';
export type DeskColorType = 'pink' | 'blue';
export type ZoneType = 'ac_pink' | 'ac_blue';

export type DurationOption = '7_days' | '10_days' | '15_days' | '20_days' | '30_days';

export interface Seat {
  id: string;
  seatNumber: string;
  color: DeskColorType;
  zone: ZoneType;
  row: string;
  col: number;
  status: SeatStatus;
  hasPowerOutlet: boolean;
  hasDeskLamp: boolean;
  hasLocker: boolean;
  chairType: 'cushion' | 'normal';
  priceMonthly: number;
  rates: {
    days7: number;
    days10: number;
    days15: number;
    days20: number;
    days30: number;
  };
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
  deskColor: DeskColorType;
  totalDesks: number;
  tagline: string;
  popular?: boolean;
  zoneType: ZoneType;
  chairType: string;
  hasLocker: boolean;
  rates: {
    days7: number;
    days10: number;
    days15: number;
    days20: number;
    days30: number;
  };
  priceMonthly: number;
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
  deskColor: DeskColorType;
  fullName: string;
  phone: string;
  email: string;
  examPrep: string;
  shift: ShiftType;
  duration: DurationOption;
  totalPrice: number;
  paymentMode: 'offline_at_desk';
}
