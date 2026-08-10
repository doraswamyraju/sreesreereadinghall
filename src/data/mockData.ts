import { Seat, Facility, PricingPlan, BlogPost, Testimonial, GalleryImage } from '../types';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Spacious Silent Study Bay',
    category: 'Reading Area',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45.jpeg',
    description: 'Ergonomic wooden cubicles equipped with personal charging ports, soft led lights, and privacy partitions.'
  },
  {
    id: 'g2',
    title: 'Climate-Controlled AC Zone',
    category: 'Reading Area',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (1).jpeg',
    description: 'Optimized temperature control ensures peak focus and zero fatigue during long study sessions.'
  },
  {
    id: 'g3',
    title: 'Individual Premium Desk Setup',
    category: 'Cabins',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (2).jpeg',
    description: 'Custom designed study desks with high back support chairs designed for 12+ hour study marathons.'
  },
  {
    id: 'g4',
    title: 'High-Speed Fiber Wi-Fi Corridor',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46.jpeg',
    description: 'Multi-access point high bandwidth fiber internet connection uninterrupted by power cuts.'
  },
  {
    id: 'g5',
    title: 'Centralized Book & Locker Station',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (1).jpeg',
    description: 'Secure personal lockers to store heavy reference books, laptops, and study materials.'
  },
  {
    id: 'g6',
    title: 'Dedicated Dining & Refreshment Lounge',
    category: 'Dining & Lounge',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (2).jpeg',
    description: 'Hygienic separate dining zone to take meals and tea breaks without disturbing reading areas.'
  },
  {
    id: 'g7',
    title: 'Filtered Mineral Water Dispenser',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (3).jpeg',
    description: 'Continuous supply of chilled and normal RO UV filtered drinking water.'
  },
  {
    id: 'g8',
    title: 'Clean & Hygienic Washrooms',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.47.jpeg',
    description: 'Separate, well-sanitized restrooms for male and female aspirants maintaining highest hygiene standards.'
  },
  {
    id: 'g9',
    title: 'Distraction-Free Silent Zone',
    category: 'Cabins',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.47 (1).jpeg',
    description: 'Acoustically tuned environment created specifically for APPSC, UPSC, and NEET aspirants.'
  },
  {
    id: 'g10',
    title: '24/7 CCTV & Security Monitoring',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.47 (2).jpeg',
    description: 'Complete round-the-clock surveillance for student safety and item security.'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'f1',
    title: 'High Speed Fiber WiFi',
    description: 'Ultra-fast fiber optic internet connection with uninterrupted uptime for online lectures, research, and PDF downloads.',
    iconName: 'Wifi',
    highlight: 'Up to 300 Mbps'
  },
  {
    id: 'f2',
    title: 'Central Air Conditioning',
    description: 'Dual climate-controlled environment with modern AC systems ensuring cool, silent, and optimal comfort year-round.',
    iconName: 'Wind',
    highlight: '24/7 Temperature Control'
  },
  {
    id: 'f3',
    title: 'RO Filtered Drinking Water',
    description: 'Complimentary cold & ambient multi-stage RO UV filtered drinking water stations across all study bays.',
    iconName: 'Droplets',
    highlight: 'Pure Mineral Water'
  },
  {
    id: 'f4',
    title: 'Dedicated Quiet Study Bay',
    description: 'Pin-drop silence policy enforced strictly with acoustic sound isolation and privacy partitions for max concentration.',
    iconName: 'VolumeX',
    highlight: 'Zero Distractions'
  },
  {
    id: 'f5',
    title: 'Personal Power & LED Lamp',
    description: 'Each desk features universal power sockets for laptop/mobile charging and glare-free personal LED lighting.',
    iconName: 'Zap',
    highlight: 'Every Desk Power'
  },
  {
    id: 'f6',
    title: 'Dining & Lunch Area',
    description: 'A dedicated, clean dining lounge to enjoy home meals, snacks, and tea breaks comfortably.',
    iconName: 'Coffee',
    highlight: 'Separate Food Lounge'
  },
  {
    id: 'f7',
    title: 'Gender-Specific Restrooms',
    description: 'Immaculately maintained, daily sanitized separate washroom facilities for male and female aspirants.',
    iconName: 'ShieldCheck',
    highlight: 'Daily Sanitized'
  },
  {
    id: 'f8',
    title: '24/7 CCTV & Power Backup',
    description: 'Heavy duty generator backup ensuring light and fan continuity during grid power outages.',
    iconName: 'Lock',
    highlight: 'Full Generator Support'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_ac_prime',
    name: 'AC Prime Bay',
    tagline: 'Best for intensive exam preparation (APPSC Group 1/2, UPSC, NEET)',
    priceMonthly: 1500,
    priceDaily: 100,
    popular: true,
    zoneType: 'ac_prime',
    features: [
      'Reserved Dedicated Desk with Nameplate',
      'Full Day 24/7 Access Permission',
      'Dual Power Sockets & Personal Desk Lamp',
      'High-Speed Unlimited Fiber WiFi',
      'Personal Book Storage Shelf/Locker',
      'Access to AC Lounge & Dining Area',
      'RO Drinking Water & Clean Washroom'
    ]
  },
  {
    id: 'plan_ac_std',
    name: 'AC Standard Shift',
    tagline: 'Ideal for flexible shift seekers (Morning / Evening)',
    priceMonthly: 1200,
    priceDaily: 80,
    popular: false,
    zoneType: 'ac_standard',
    features: [
      'Standard AC Reading Cubicle',
      'Shift Choice (6 AM - 2 PM or 2 PM - 10 PM)',
      'High-Speed Fiber WiFi Connection',
      'Single Desk Power Socket',
      'Access to Lunch & Refreshment Lounge',
      'RO Drinking Water & Clean Washroom'
    ]
  },
  {
    id: 'plan_non_ac',
    name: 'Non-AC Economy Bay',
    tagline: 'Affordable, quiet option with natural ventilation',
    priceMonthly: 900,
    priceDaily: 60,
    popular: false,
    zoneType: 'non_ac',
    features: [
      'Dedicated Non-AC Reading Table',
      'High Speed WiFi Access',
      'Individual Wall Fan & LED Lighting',
      'Personal Power Socket',
      'RO Drinking Water & Washrooms'
    ]
  }
];

export const GENERATED_SEATS: Seat[] = Array.from({ length: 48 }, (_, i) => {
  const num = i + 1;
  const seatNumber = num < 10 ? `S-0${num}` : `S-${num}`;
  let zone: 'ac_prime' | 'ac_standard' | 'non_ac' | 'silent_cabin' = 'ac_prime';
  if (num > 16 && num <= 32) zone = 'ac_standard';
  if (num > 32) zone = 'non_ac';

  // Fixed status distribution for realistic map demo
  const occupiedIds = [3, 4, 7, 12, 15, 18, 22, 29, 35, 41];
  const reservedIds = [2, 9, 14, 25, 38];

  let status: 'available' | 'reserved' | 'occupied' = 'available';
  if (occupiedIds.includes(num)) status = 'occupied';
  if (reservedIds.includes(num)) status = 'reserved';

  const row = String.fromCharCode(65 + Math.floor(i / 8));
  const col = (i % 8) + 1;
  const pricePerMonth = zone === 'ac_prime' ? 1500 : zone === 'ac_standard' ? 1200 : 900;

  return {
    id: `seat_${num}`,
    seatNumber,
    zone,
    row,
    col,
    status,
    hasPowerOutlet: true,
    hasDeskLamp: zone !== 'non_ac',
    pricePerMonth
  };
});

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Maintain 10+ Hours of Focused Study Daily for APPSC Group 1 & 2',
    slug: 'maintain-focused-study-hours-appsc',
    excerpt: 'Discover actionable strategies to eliminate digital distractions, manage fatigue, and structure your reading hall routine for maximum memory retention.',
    content: `
# Mastering High-Volume Study Sessions in a Reading Hall

Preparing for competitive examinations like APPSC, UPSC, or NEET requires consistent, high-yield study sessions over several months. Studying at home often presents continuous micro-distractions—family conversations, household chores, and ambient noise.

Here is how top rankers structure their days at **Sree Sree Reading Hall**:

### 1. The 90-Minute Focus Block Method
Human brains maintain peak cognitive capacity for 90 to 110 minutes. Divide your day into four core study blocks:
- **Block 1 (6:30 AM - 8:30 AM):** High difficulty subjects (Polity / Economy).
- **Block 2 (9:30 AM - 11:30 AM):** Problem solving / Aptitude / Current Affairs.
- **Block 3 (2:00 PM - 4:00 PM):** Revision & MCQs.
- **Block 4 (5:30 PM - 7:30 PM):** Answer writing practice & note making.

### 2. Environment Matters: Why AC Quiet Zones Work
Temperature and acoustic control significantly reduce mental fatigue. At Sree Sree Reading Hall, our climate-controlled quiet bays keep your body at ease so all metabolic energy is focused on learning.

### 3. Hydration & Desk Ergonomics
Keep a water bottle at your desk and take advantage of our RO mineral water stations. Hydration prevents afternoon brain fog!
    `,
    category: 'Study Tips',
    author: 'K. Rama Krishna (APPSC Ranker Mentor)',
    date: 'August 02, 2026',
    readTime: '4 min read',
    image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45.jpeg',
    tags: ['APPSC', 'Study Hacks', 'Productivity', 'Tirupati']
  },
  {
    id: 'b2',
    title: 'Why a Dedicated Reading Hall Beats Home Study for Competitive Aspirants',
    slug: 'reading-hall-vs-home-study',
    excerpt: 'Peer motivation, zero household noise, guaranteed internet, and ergonomic infrastructure make reading rooms the preferred choice for serious students.',
    content: `
# Reading Hall vs Home Study: The Competitive Edge

When preparing among lakhs of competitors, small advantages compound into major score differentials. Here is why switching to a dedicated reading room like **Sree Sree Reading Hall** accelerates your preparation:

### 1. Peer Pressure & Positive Atmosphere
Seeing 50 other aspirants silently absorbed in their books creates an undeniable psychological push. Procrastination disappears naturally when everyone around you is working hard.

### 2. Uninterrupted Power & High Speed Wi-Fi
Home power cuts during critical online test series or video lectures disrupt focus. Sree Sree provides generator backup and high-speed fiber internet so your learning never stops.

### 3. Separate Dining & Rest Facilities
Studying in the same room where you sleep leads to lethargy. Having distinct spaces for reading, dining, and taking short breaks creates clear mental boundaries.
    `,
    category: 'Productivity',
    author: 'Editorial Team',
    date: 'July 28, 2026',
    readTime: '3 min read',
    image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (1).jpeg',
    tags: ['Competitive Exams', 'Focus', 'Environment']
  },
  {
    id: 'b3',
    title: 'Top Revision Techniques for AP Police Constable & DSC Examinations',
    slug: 'revision-techniques-dsc-police',
    excerpt: 'Effective memory retention techniques including Spaced Repetition, Active Recall, and mock test analysis.',
    content: `
# Revision Techniques That Guarantee Success

Reading a textbook once is rarely enough. Success in DSC and Police Constable exams relies heavily on rapid recall during timed tests.

### Key Strategies:
1. **Active Recall:** Close the book after reading a section and write down key dates, formulas, or facts from memory.
2. **Spaced Repetition:** Review notes on Day 1, Day 3, Day 7, and Day 30.
3. **Mock Analysis:** Spend at least 1 hour analyzing every wrong answer in your test series.
    `,
    category: 'Exam Prep',
    author: 'V. Suresh (Educational Consultant)',
    date: 'July 15, 2026',
    readTime: '5 min read',
    image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.47 (1).jpeg',
    tags: ['DSC', 'AP Police', 'Revision']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'P. Sai Teja',
    exam: 'APPSC Group 2 Executive Ranker',
    rank: 'State Rank 42',
    comment: 'Sree Sree Reading Hall was my second home for 8 months. The pin-drop silence, comfortable AC, and 24/7 power backup helped me attempt 50+ mock tests without interruption.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'K. Anusha',
    exam: 'DSC SGT Aspirant',
    comment: 'The separate hygienic washrooms and safe female student environment gave me complete peace of mind. Desks are wide and lighting is very gentle on the eyes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'M. Harish Chandra',
    exam: 'UPSC Civil Services Aspirant',
    comment: 'Located centrally in Kennedy Nagar near Passport Office, Tirupati. High speed internet speed is fantastic for downloading large lectures and reading PDFs.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const FAQS = [
  {
    question: 'What are the operating timings of Sree Sree Reading Hall?',
    answer: 'We operate 24 hours a day, 7 days a week. Members can choose Full Day 24/7 access or specific shift timings (Morning, Evening, or Night shifts).'
  },
  {
    question: 'Where is Sree Sree Reading Hall located in Tirupati?',
    answer: 'We are conveniently located at 1st floor of Axis Bank, AVM Plaza, Air Bypass Road, near Lakshmipuram Circle, near Passport Office, Kennedy Nagar, Ashok Nagar, Tirupati, Andhra Pradesh 517501.'
  },
  {
    question: 'Can I select and reserve my exact desk seat in advance?',
    answer: 'Yes! Our interactive visual seat map allows you to pick your preferred desk number (AC Prime, Standard, or Non-AC) and lock it with a fixed seat tag.'
  },
  {
    question: 'Are there power backup and internet facilities during power cuts?',
    answer: 'Absolutely. We have continuous diesel generator power backup and high-speed fiber optic Wi-Fi to ensure zero disruption to online exams and lectures.'
  },
  {
    question: 'Is there a separate dining space for eating lunch/snacks?',
    answer: 'Yes, we have a dedicated, clean dining lounge with drinking water facilities so you can enjoy your meals comfortably without disturbing the quiet reading zone.'
  }
];
