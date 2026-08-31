import { Seat, Facility, PricingPlan, BlogPost, Testimonial, GalleryImage } from '../types';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Dedicated Dining & Lunch Area',
    category: 'Dining & Lounge',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45.jpeg',
    description: 'Clean and spacious dining area equipped with tables and chairs to have lunch, meals, and snacks comfortably without disturbing the study bays.'
  },
  {
    id: 'g2',
    title: 'Climate-Controlled AC Zone',
    category: 'Reading Area',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (1).jpeg',
    description: 'Optimized 7 AM - 10 PM temperature control ensures peak focus and zero fatigue during long study sessions.'
  },
  {
    id: 'g3',
    title: 'Individual Premium Desk Setup',
    category: 'Cabins',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (2).jpeg',
    description: 'Custom designed study desks with high-comfort cushion chairs and personal lockers designed for study marathons.'
  },
  {
    id: 'g4',
    title: 'High-Speed Fiber Wi-Fi Corridor',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46.jpeg',
    description: 'Multi-access point high bandwidth fiber internet connection uninterrupted for lectures and online mock tests.'
  },
  {
    id: 'g5',
    title: 'Centralized Book & Locker Station',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (1).jpeg',
    description: 'Secure personal lockers included with Pink Desks to store heavy reference books, laptops, and study materials.'
  },
  {
    id: 'g6',
    title: 'Refreshment & Dining Area',
    category: 'Dining & Lounge',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (2).jpeg',
    description: 'Hygienic separate dining zone to take meals and tea breaks comfortably without disturbing quiet reading areas.'
  },
  {
    id: 'g7',
    title: 'Filtered Mineral Water Dispenser',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.46 (3).jpeg',
    description: 'Continuous supply of chilled and normal RO UV filtered drinking water throughout the day.'
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
    title: 'CCTV & Security Monitoring',
    category: 'Amenities',
    url: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.47 (2).jpeg',
    description: 'Complete round-the-clock surveillance for student safety and item security during operating hours.'
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
    description: 'Dual climate-controlled environment with modern AC systems ensuring cool, silent, and optimal comfort from 7 AM to 10 PM.',
    iconName: 'Wind',
    highlight: '7 AM - 10 PM AC'
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
    description: 'A dedicated, clean dining lounge to enjoy home meals, snacks, and tea breaks comfortably without disturbing study bays.',
    iconName: 'Coffee',
    highlight: 'Separate Lunch Area'
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
    title: 'Continuous Power Backup & CCTV',
    description: 'Reliable inverter power backup ensuring continuous illumination, fans, and high-speed Wi-Fi during grid fluctuations.',
    iconName: 'Lock',
    highlight: 'Inverter Power Backup'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_pink',
    name: 'Pink Premium AC Desk',
    deskColor: 'pink',
    totalDesks: 52,
    tagline: '52 Premium Desks with Ergonomic Cushion Chairs & Personal Locker',
    popular: true,
    zoneType: 'ac_pink',
    chairType: 'High-Comfort Cushion Chair',
    hasLocker: true,
    priceMonthly: 3000,
    rates: {
      days7: 1000,
      days10: 1300,
      days15: 1800,
      days20: 2200,
      days30: 3000
    },
    features: [
      'Ergonomic High-Comfort Cushion Chair',
      'Personal Book Storage Locker Included',
      'Full 100% Chilled Air Conditioning',
      '7:00 AM - 10:00 PM Operating Access',
      'Universal Power Socket & LED Desk Light',
      'High-Speed 300 Mbps Unlimited Fiber Wi-Fi',
      'Separate Dining & Lunch Area Access',
      'RO UV Mineral Water & Sanitized Restrooms'
    ]
  },
  {
    id: 'plan_blue',
    name: 'Blue Standard AC Desk',
    deskColor: 'blue',
    totalDesks: 21,
    tagline: '21 Standard AC Desks with Normal Sturdy Chairs (No Locker)',
    popular: false,
    zoneType: 'ac_blue',
    chairType: 'Standard Sturdy Chair',
    hasLocker: false,
    priceMonthly: 2100,
    rates: {
      days7: 600,
      days10: 850,
      days15: 1200,
      days20: 1500,
      days30: 2100
    },
    features: [
      'Standard Sturdy Study Chair',
      'No Locker Facility',
      'Full 100% Chilled Air Conditioning',
      '7:00 AM - 10:00 PM Operating Access',
      'Universal Power Socket & LED Desk Light',
      'High-Speed 300 Mbps Unlimited Fiber Wi-Fi',
      'Separate Dining & Lunch Area Access',
      'RO UV Mineral Water & Sanitized Restrooms'
    ]
  }
];

// Generate 52 Pink Desks (P-01 to P-52) and 21 Blue Desks (B-01 to B-21) -> Total 73 Desks
export const GENERATED_SEATS: Seat[] = [
  ...Array.from({ length: 52 }, (_, i) => {
    const num = i + 1;
    const seatNumber = num < 10 ? `P-0${num}` : `P-${num}`;
    const occupiedPink = [4, 7, 12, 18, 23, 31, 39, 45];
    const reservedPink = [2, 9, 15, 28, 42];

    let status: 'available' | 'reserved' | 'occupied' = 'available';
    if (occupiedPink.includes(num)) status = 'occupied';
    if (reservedPink.includes(num)) status = 'reserved';

    const row = String.fromCharCode(65 + Math.floor(i / 8));
    const col = (i % 8) + 1;

    return {
      id: `pink_${num}`,
      seatNumber,
      color: 'pink' as const,
      zone: 'ac_pink' as const,
      row,
      col,
      status,
      hasPowerOutlet: true,
      hasDeskLamp: true,
      hasLocker: true,
      chairType: 'cushion' as const,
      priceMonthly: 3000,
      rates: {
        days7: 1000,
        days10: 1300,
        days15: 1800,
        days20: 2200,
        days30: 3000
      }
    };
  }),
  ...Array.from({ length: 21 }, (_, i) => {
    const num = i + 1;
    const seatNumber = num < 10 ? `B-0${num}` : `B-${num}`;
    const occupiedBlue = [3, 8, 14, 19];
    const reservedBlue = [5, 11];

    let status: 'available' | 'reserved' | 'occupied' = 'available';
    if (occupiedBlue.includes(num)) status = 'occupied';
    if (reservedBlue.includes(num)) status = 'reserved';

    const row = String.fromCharCode(71 + Math.floor(i / 7));
    const col = (i % 7) + 1;

    return {
      id: `blue_${num}`,
      seatNumber,
      color: 'blue' as const,
      zone: 'ac_blue' as const,
      row,
      col,
      status,
      hasPowerOutlet: true,
      hasDeskLamp: true,
      hasLocker: false,
      chairType: 'normal' as const,
      priceMonthly: 2100,
      rates: {
        days7: 600,
        days10: 850,
        days15: 1200,
        days20: 1500,
        days30: 2100
      }
    };
  })
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Maintain 10+ Hours of Focused Study Daily for APPSC Group 1 & 2',
    slug: 'maintain-focused-study-hours-appsc',
    excerpt: 'Discover actionable strategies to eliminate digital distractions, manage fatigue, and structure your reading hall routine for maximum memory retention.',
    content: `
# Mastering High-Volume Study Sessions in a Reading Hall

Preparing for competitive examinations like APPSC, UPSC, or NEET requires consistent, high-yield study sessions over several months. Studying at home often presents continuous micro-distractions—family conversations, household chores, and ambient noise.

Here is how top rankers structure their days at **Sree Sree Reading Hall (7:00 AM to 10:00 PM)**:

### 1. The 90-Minute Focus Block Method
Human brains maintain peak cognitive capacity for 90 to 110 minutes. Divide your day into core study blocks:
- **Block 1 (7:00 AM - 9:30 AM):** High difficulty subjects (Polity / Economy).
- **Block 2 (10:00 AM - 1:00 PM):** Problem solving / Aptitude / Current Affairs.
- **Lunch Break (1:00 PM - 2:00 PM):** Meal at our Dedicated Dining Area.
- **Block 3 (2:00 PM - 5:30 PM):** Revision & MCQs.
- **Block 4 (6:00 PM - 9:30 PM):** Answer writing practice & test analysis.

### 2. Environment Matters: Why AC Quiet Zones Work
Temperature and acoustic control significantly reduce mental fatigue. At Sree Sree Reading Hall, our climate-controlled quiet bays keep your body at ease so all metabolic energy is focused on learning.

### 3. Hydration & Desk Ergonomics
Keep a water bottle at your desk and take advantage of our RO mineral water stations. Hydration prevents afternoon brain fog!
    `,
    category: 'Study Tips',
    author: 'K. Rama Krishna (APPSC Ranker Mentor)',
    date: 'August 02, 2026',
    readTime: '4 min read',
    image: '/images/gallery/WhatsApp Image 2026-08-10 at 14.38.45 (1).jpeg',
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

### 1. Peer Motivation & Focused Atmosphere
Seeing 70+ other aspirants silently absorbed in their books creates an undeniable psychological push. Procrastination disappears naturally when everyone around you is working hard.

### 2. Uninterrupted Power Backup & High Speed Wi-Fi
Home power cuts during critical online test series or video lectures disrupt focus. Sree Sree provides reliable inverter power backup and high-speed fiber internet so your learning never stops.

### 3. Dedicated Dining Area & Clean Washrooms
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
    comment: 'Sree Sree Reading Hall was my daily sanctuary. The pin-drop silence, comfortable cushion chair, chilled AC, and continuous power backup helped me attempt 50+ mock tests without interruption.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'K. Anusha',
    exam: 'DSC SGT Aspirant',
    comment: 'The separate hygienic washrooms, dedicated lunch room, and safe female student environment gave me complete peace of mind. Desks are wide and lighting is very gentle on the eyes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'M. Harish Chandra',
    exam: 'UPSC Civil Services Aspirant',
    comment: 'Located centrally above Axis Bank on Air Bypass Road, Tirupati. High speed internet speed is fantastic for downloading large lectures and reading PDFs from 7 AM to 10 PM.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const FAQS = [
  {
    question: 'What are the operating timings of Sree Sree Reading Hall?',
    answer: 'We operate every day from 7:00 AM to 10:00 PM (Monday through Sunday, 365 days a year). Members can choose Full Day (7 AM - 10 PM) or flexible shift options.'
  },
  {
    question: 'What are the 2 desk types and their pricing packages?',
    answer: 'We offer 2 types of 100% AC desks: (1) 52 Pink Desks with ergonomic cushion chairs & personal lockers (₹1000/week, ₹1300/10d, ₹1800/15d, ₹2200/20d, ₹3000/30d), and (2) 21 Blue Desks with standard chairs and no locker (₹600/week, ₹850/10d, ₹1200/15d, ₹1500/20d, ₹2100/30d). Both have full AC, power socket, Wi-Fi, and dining area access.'
  },
  {
    question: 'Where is Sree Sree Reading Hall located in Tirupati?',
    answer: 'We are conveniently located on the 1st floor above Axis Bank, Near Lakshmipuram Circle, Air Bypass Road, Tirupati, Andhra Pradesh 517501.'
  },
  {
    question: 'How does the desk reservation and offline payment work?',
    answer: 'Select your preferred Pink or Blue desk on our interactive seat map, choose your duration, and reserve online. No online payment is needed! You pay offline (Cash / UPI / GPay) upon visiting Sree Sree Reading Hall to activate your seat.'
  },
  {
    question: 'Are there power backup and internet facilities during power cuts?',
    answer: 'Yes. We have reliable inverter power backup for lights, fans, and high-speed fiber optic Wi-Fi to ensure zero disruption to your daily study and online tests.'
  },
  {
    question: 'Is there a separate lunch and dining space for meals?',
    answer: 'Yes! We provide a dedicated, hygienic Lunch Area (Dining Area) with tables and comfortable seating so you can enjoy your meals without disturbing the reading bays.'
  }
];
