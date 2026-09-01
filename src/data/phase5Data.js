export const TOUR_PACKAGES_DATA = [
  {
    id: 'pkg-goa-beach',
    title: 'Goa Tropical Sun & Beach Escape',
    destination: 'Goa',
    duration: '4 Days / 3 Nights',
    nights: 3,
    days: 4,
    category: 'Beach & Nightlife',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerPerson: 12499,
    originalPrice: 15999,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 310,
    hotelCategory: '4 Star Beachfront Resort',
    includedTransport: 'Luxury Cab & Airport Transfers',
    mealPlan: 'Breakfast & Seafood Dinner',
    seasonPrice: {
      peak: 15999,
      standard: 12499,
      monsoon: 9999
    },
    itinerary: [
      { day: 1, title: 'Arrival in Goa & Sunset Cruise', desc: 'Private pickup from Goa Airport / Madgaon Station. Check-in to resort & evening Mandovi River sunset cruise.' },
      { day: 2, title: 'North Goa Beaches & Fort Aguada', desc: 'Visit Fort Aguada, Calangute, Baga beach & Water Sports activity.' },
      { day: 3, title: 'South Goa Heritage & Latin Quarter', desc: 'Visit Basilica of Bom Jesus, Mangueshi Temple & Fontainhas heritage walk.' },
      { day: 4, title: 'Souvenir Shopping & Departure', desc: 'Breakfast at resort, checkout & transfer back to Airport/Station.' }
    ],
    inclusions: ['4-Star Hotel Stay with Pool', 'Daily Buffet Breakfast', 'Private AC Cab for Sightseeing', 'Mandovi River Cruise Pass', 'All Tolls & Driver Allowances'],
    exclusions: ['Airfare / Train Tickets', 'Personal Water Sports Expenses', 'Alcoholic Beverages', 'GST 5%'],
    policies: '100% Refund if cancelled 7 days prior to travel date. 50% refund within 3-6 days.'
  },
  {
    id: 'pkg-rajasthan-royal',
    title: 'Udaipur & Jaipur Royal Heritage Trail',
    destination: 'Udaipur',
    duration: '5 Days / 4 Nights',
    nights: 4,
    days: 5,
    category: 'Heritage & Culture',
    badge: 'Luxury Special',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerPerson: 18999,
    originalPrice: 23999,
    discountPercent: 20,
    rating: 4.95,
    reviewsCount: 184,
    hotelCategory: 'Heritage Palace Resort',
    includedTransport: 'Chauffeur Innova Crysta',
    mealPlan: 'Breakfast & Rajasthani Thali',
    seasonPrice: {
      peak: 23999,
      standard: 18999,
      monsoon: 14999
    },
    itinerary: [
      { day: 1, title: 'Arrival in Udaipur & Lake Pichola Boat Ride', desc: 'Private palace welcome, check-in & sunset boat ride past Taj Lake Palace.' },
      { day: 2, title: 'City Palace & Jagdish Temple', desc: 'Explore City Palace museum, Saheliyon-ki-Bari & local handicrafts market.' },
      { day: 3, title: 'Drive to Jaipur via Chittorgarh Fort', desc: 'Scenic highway drive with guided tour of historic Chittorgarh Fort.' },
      { day: 4, title: 'Amer Fort & Hawa Mahal', desc: 'Elephant/Jeep ride at Amer Fort, Jal Mahal photo stop & City Palace Jaipur.' },
      { day: 5, title: 'Shopping & Departure', desc: 'Buy authentic Kundan jewelry & Jaipur prints before airport drop.' }
    ],
    inclusions: ['5-Star Palace Stay', 'Daily Rajasthani Gourmet Meals', 'Chauffeur Innova Crysta throughout', 'Boat Ride Passes', 'Monument Entry Tickets'],
    exclusions: ['Flight/Train Tickets', 'Camera Permits', 'GST 5%'],
    policies: 'Full refund 10 days prior to travel date.'
  },
  {
    id: 'pkg-lonavala-monsoon',
    title: 'Lonavala & Khandala Waterfall Retreat',
    destination: 'Lonavala',
    duration: '2 Days / 1 Night',
    nights: 1,
    days: 2,
    category: 'Nature & Weekend',
    badge: 'Popular Weekend',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerPerson: 4999,
    originalPrice: 6500,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 420,
    hotelCategory: 'Valley View Resort',
    includedTransport: 'Private SUV / Cab',
    mealPlan: 'Breakfast & High Tea',
    seasonPrice: {
      peak: 6500,
      standard: 4999,
      monsoon: 5499
    },
    itinerary: [
      { day: 1, title: 'Drive to Lonavala & Tiger’s Leap', desc: 'Doorstep pickup from Mumbai/Pune. Visit Tiger’s Leap, Lion’s Point & Bhushi Dam.' },
      { day: 2, title: 'Karla Caves & Cooper’s Fudge', desc: 'Visit ancient Karla Buddhist Caves, buy authentic Cooper’s Fudge & evening drop home.' }
    ],
    inclusions: ['Resort Stay with Breakfast', 'Doorstep Pickup & Drop', 'Sightseeing SUV Cab', 'Chikki Gift Box'],
    exclusions: ['Personal Expenses'],
    policies: '100% Refund 48 hours prior to trip.'
  }
];

export const HOTELS_CATALOG_DATA = [
  {
    id: 'htl-1',
    name: 'The Machan Eco Resort Lonavala',
    city: 'Lonavala',
    rating: 4.9,
    pricePerNight: 8500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free WiFi', 'Breakfast Included', 'Infinity View', 'Spa', 'Private Deck'],
    roomTypes: ['Canopy Machan', 'Heritage Machan', 'Sunset Suite']
  },
  {
    id: 'htl-2',
    name: 'Le Méridien Mahabaleshwar Resort & Spa',
    city: 'Mahabaleshwar',
    rating: 4.95,
    pricePerNight: 11200,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    amenities: ['5 Star', 'Heated Pool', 'Spa', 'Kids Club', 'Forest Walk'],
    roomTypes: ['Classic Forest Room', 'Tranquility Suite']
  },
  {
    id: 'htl-3',
    name: 'Taj Fort Aguada Resort Goa',
    city: 'Goa',
    rating: 4.9,
    pricePerNight: 14500,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Beach', 'Fine Dining', 'Infinity Pool', 'Sea View'],
    roomTypes: ['Superior Sea View Room', 'Hermitage Villa']
  }
];

export const FLIGHTS_DATA = [
  { id: 'fl-1', airline: 'IndiGo 6E-204', from: 'Mumbai (BOM)', to: 'Goa (GOI)', depTime: '07:15 AM', arrTime: '08:30 AM', duration: '1h 15m', price: 3499, seatsLeft: 8 },
  { id: 'fl-2', airline: 'Air India AI-631', from: 'Mumbai (BOM)', to: 'Udaipur (UDR)', depTime: '10:45 AM', arrTime: '12:15 PM', duration: '1h 30m', price: 4299, seatsLeft: 4 },
  { id: 'fl-3', airline: 'Vistara UK-925', from: 'Delhi (DEL)', to: 'Goa (GOI)', depTime: '02:00 PM', arrTime: '04:35 PM', duration: '2h 35m', price: 5899, seatsLeft: 12 }
];

export const TRAINS_DATA = [
  { id: 'tr-1', trainName: 'Vande Bharat Express (22229)', from: 'Mumbai CSMT', to: 'Madgaon Goa', depTime: '05:25 AM', arrTime: '01:10 PM', duration: '7h 45m', price1A: 2450, priceEC: 1420, available: 'AVAILABLE 24' },
  { id: 'tr-2', trainName: 'Deccan Queen Express (12124)', from: 'Pune Junction', to: 'Mumbai CSMT', depTime: '07:15 AM', arrTime: '10:25 AM', duration: '3h 10m', price1A: 890, priceEC: 450, available: 'AVAILABLE 45' }
];

export const BUSES_DATA = [
  { id: 'bs-1', operator: 'Neeta Travels Volvo Sleeper', from: 'Mumbai', to: 'Goa', depTime: '08:00 PM', arrTime: '07:00 AM', duration: '11h 00m', price: 1200, seatsLeft: 14 },
  { id: 'bs-2', operator: 'Purple Metrolink AC Seater', from: 'Pune', to: 'Mahabaleshwar', depTime: '06:30 AM', arrTime: '10:00 AM', duration: '3h 30m', price: 450, seatsLeft: 20 }
];

export const MOCK_CRM_LEADS = [
  {
    id: 'lead-101',
    customerName: 'Rahul Sharma',
    phone: '9820011223',
    email: 'rahul.s@gmail.com',
    destination: 'Goa 4D Package',
    budget: '₹35,000',
    travelDate: '2026-08-20',
    travelers: 4,
    source: 'Website Enquiry Form',
    status: 'New',
    assignedStaff: 'Amit Patel',
    notes: 'Requested Jain food options and airport pickup.'
  },
  {
    id: 'lead-102',
    customerName: 'Priya Verma',
    phone: '9892044556',
    email: 'priya.v@yahoo.com',
    destination: 'Udaipur Heritage Tour',
    budget: '₹50,000',
    travelDate: '2026-09-05',
    travelers: 2,
    source: 'AI Assistant Chatbot',
    status: 'Contacted',
    assignedStaff: 'Neha Joshi',
    notes: 'Honeymoon couple trip requested 5-star palace stay.'
  },
  {
    id: 'lead-103',
    customerName: 'Vikram Mehta',
    phone: '9821177889',
    email: 'vikram.m@techcorp.com',
    destination: 'Mahindra Thar Self-Drive Lonavala',
    budget: '₹12,000',
    travelDate: '2026-08-15',
    travelers: 4,
    source: 'WhatsApp Directly',
    status: 'Booked',
    assignedStaff: 'Suresh Kumar',
    notes: 'Confirmed 2 days Thar rental with unlimited km.'
  }
];

export const MOCK_COUPONS = [
  { code: 'FIRST500', discount: '₹500 Flat Off', minBooking: 3000, expiry: '2026-12-31', active: true },
  { code: 'MONSOON25', discount: '25% Off on Cabs & Hotels', minBooking: 5000, expiry: '2026-09-30', active: true },
  { code: 'SVVIP1000', discount: '₹1,000 Off on Tour Packages', minBooking: 10000, expiry: '2026-12-31', active: true }
];

export const SUPPORT_FAQS = [
  {
    q: 'How do I modify or cancel my booking?',
    a: 'You can cancel or modify your booking directly from your Customer Dashboard under "Upcoming Trips" or by contacting our 24/7 helpline.'
  },
  {
    q: 'What documents are required for self-drive car rentals?',
    a: 'You will need a valid Original Indian Driving License (held for at least 1 year) and an Aadhaar Card / Passport for identity verification.'
  },
  {
    q: 'Are all toll taxes and driver allowances included in cab rentals?',
    a: 'Yes! All Siddhivinayak outstation cab packages are 100% transparent with zero hidden charges. Driver allowance, state permit, and fuel are included.'
  },
  {
    q: 'Can I pay a partial advance to confirm my booking?',
    a: 'Yes, you can pay a 20% advance payment during online checkout to lock your booking rate, and pay the remaining 80% balance upon vehicle arrival.'
  }
];
