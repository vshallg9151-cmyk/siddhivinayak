export const DOMESTIC_CATEGORIES = [
  { id: 'cat-rajasthan', title: 'Rajasthan Heritage Tours', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80', desc: 'Palaces of Jaipur, Udaipur Lakes & Thar Desert Safaris', startingPrice: 14999 },
  { id: 'cat-gujarat', title: 'Gujarat Rann Utsav & Temples', image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80', desc: 'White Desert Kutch, Somnath & Dwarka Pilgrimage', startingPrice: 12499 },
  { id: 'cat-kerala', title: 'Kerala Backwaters & Tea Gardens', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', desc: 'Munnar Hills, Alleppey Houseboats & Kovalam Beaches', startingPrice: 16500 },
  { id: 'cat-kashmir', title: 'Kashmir Paradise Holidays', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80', desc: 'Srinagar Houseboats, Gulmarg Gondola & Pahalgam Valleys', startingPrice: 18999 },
  { id: 'cat-himachal', title: 'Himachal Snow & Mountain Trips', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', desc: 'Manali Solang Valley, Shimla Mall Road & Spiti Off-Road', startingPrice: 11999 },
  { id: 'cat-goa', title: 'Goa Beaches & Coastal Drives', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', desc: 'Calangute, Palolem, Dudhsagar Waterfalls & Thar 4x4 Trips', startingPrice: 8999 },
  { id: 'cat-ladakh', title: 'Leh Ladakh Biker & SUV Safaris', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80', desc: 'Pangong Tso Lake, Khardung La Pass & Nubra Valley', startingPrice: 24999 },
  { id: 'cat-northeast', title: 'North East Seven Sisters Wonders', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', desc: 'Meghalaya Living Root Bridges, Kaziranga & Gangtok', startingPrice: 21500 }
];

export const INDIAN_PILGRIMAGE_YATRA = [
  {
    id: 'pilg-chardham',
    name: 'Char Dham Yatra (Uttarakhand)',
    destinations: 'Badrinath, Kedarnath, Gangotri & Yamunotri',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate sacred pilgrimage in the Himalayas with VIP Darshan passes, Helicopter booking assistance & luxury Innova Crysta outstation cabs.',
    bestMonths: 'May to October (Avoid peak monsoon Jul-Aug)',
    foodGuide: '100% Pure Vegetarian & Jain Sattvik meals guaranteed at every halt.',
    routePlan: 'Haridwar → Barkot (Yamunotri) → Uttarkashi (Gangotri) → Guptkashi (Kedarnath) → Badrinath → Rishikesh',
    startingPrice: 24999
  },
  {
    id: 'pilg-jyotirlinga',
    name: '12 Jyotirlinga Darshan Circuit',
    destinations: 'Somnath, Mahakaleshwar, Trimbakeshwar, Bhimashankar, Mallikarjuna, Omkareshwar, Kashi Vishwanath, etc.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    description: 'Devotional circuit across Shiva temples in Maharashtra, Gujarat, MP & UP with doorstep cab pickup & priest assistance.',
    bestMonths: 'October to March (Ideal for Mahashivratri)',
    foodGuide: 'Traditional Maharashtrian & Gujarati Upvas / Sattvik Thalis.',
    routePlan: 'Customized regional circuits (e.g. 5 Maharashtra Jyotirlingas in 4 Days)',
    startingPrice: 12999
  },
  {
    id: 'pilg-shaktipeeth',
    name: 'Shakti Peeth & Devi Temples',
    destinations: 'Ekvira Devi (Lonavala), Vaishno Devi, Kamakhya, Mahalaxmi (Kolhapur)',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'Blessed tours to divine Goddess shrines with priority token booking and elder-friendly AC transport.',
    bestMonths: 'Year-round (Special Navratri Packages)',
    foodGuide: 'Pure Sattvik vegetarian Prasad & thali dining.',
    routePlan: 'Doorstep pickup from Mumbai, Pune, Ahmedabad & Delhi',
    startingPrice: 6999
  }
];

export const FESTIVAL_TRAVEL_RECOMMENDATIONS = [
  {
    id: 'fest-navratri',
    festival: 'Navratri Garba Festival (Gujarat)',
    location: 'Vadodara & Ahmedabad, Gujarat',
    date: 'October (Sharad Navratri)',
    highlight: 'World-famous United Way Garba, traditional Chaniya Choli shopping & midnight street food at Manek Chowk.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fest-kumbh',
    festival: 'Kumbh Mela & Ganga Aarti',
    location: 'Prayagraj, Haridwar & Varanasi',
    date: 'Auspicious Shahi Snan Dates',
    highlight: 'Sacred holy dip at Triveni Sangam, evening Ganga Aarti & VIP tented accommodations.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fest-pushkar',
    festival: 'Pushkar Camel Fair & Cultural Fest',
    location: 'Pushkar, Rajasthan',
    date: 'November (Kartik Purnima)',
    highlight: 'Hot air ballooning over desert dunes, cattle fair, folk dance & Brahma Temple darshan.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
  }
];

export const INDIA_FOOD_EXPLORER = [
  { region: 'Maharashtra', food: 'Misal Pav, Puran Poli, Sol Kadhi & Kanda Bhajji', spot: 'Hotel Ramnath (Lonavala) & Joshi Wadewale (Pune)' },
  { region: 'Gujarat', food: 'Kutchhi Dabeli, Khaman Dhokla, Undhiyu & Jalebi Fafda', spot: 'Das Khaman (Ahmedabad) & Chandravilas Thali' },
  { region: 'Rajasthan', food: 'Dal Baati Churma, Gatte Ki Sabzi & Ker Sangri', spot: 'Laxmi Mishthan Bhandar (Jaipur) & Natraj Thali (Udaipur)' },
  { region: 'Kerala', food: 'Appam with Stew, Kerala Sadya & Malabar Parotta', spot: 'Grand Pavilion (Kochi) & Saravana Bhavan' }
];

export const INDIAN_LANGUAGES_ONLY = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', name: 'मराठी (Marathi)' }
];

export const PRICE_PREDICTION_DATA = {
  flights: [
    { day: 'Today', price: 3499, trend: 'stable' },
    { day: '+2 Days', price: 3650, trend: 'up' },
    { day: '+4 Days', price: 3990, trend: 'up' },
    { day: '+7 Days', price: 4450, trend: 'up' }
  ],
  hotels: [
    { day: 'Today', price: 5500, trend: 'stable' },
    { day: '+2 Days', price: 5800, trend: 'up' },
    { day: '+4 Days', price: 6400, trend: 'up' },
    { day: '+7 Days', price: 7200, trend: 'up' }
  ],
  predictionAlert: '📈 Price Warning: Fares for Mumbai-Goa & Lonavala resorts are predicted to increase by ~18% over the next 7 days due to weekend demand. Lock in now with 20% advance!'
};

export const INSURANCE_PLANS = [
  {
    id: 'ins-basic',
    name: 'Standard India Travel Shield',
    pricePerDay: 199,
    coverageAmount: '₹5,00,000',
    medicalCoverage: 'Emergency Hospitalization & Accident Protection in India',
    baggageLoss: 'Up to ₹25,000',
    tripCancellation: 'Up to ₹50,000',
    recommended: false
  },
  {
    id: 'ins-pro',
    name: 'Siddhivinayak VIP Bharat Protect',
    pricePerDay: 399,
    coverageAmount: '₹15,00,000',
    medicalCoverage: 'Unlimited Cashless Hospitalization & Emergency Road Assistance across all Indian States',
    baggageLoss: 'Up to ₹50,00,00',
    tripCancellation: '100% Booking Refund Protection',
    recommended: true
  }
];

export const GAMIFICATION_BADGES = [
  { id: 'b1', name: 'Ghat Explorer', desc: 'Completed 3+ mountain road trips', icon: '🏔️', unlocked: true },
  { id: 'b2', name: 'Beach Nomad', desc: 'Explored North & South Goa coves', icon: '🏖️', unlocked: true },
  { id: 'b3', name: 'Spiritual Seeker', desc: 'Visited Shirdi & Ekvira Devi shrines', icon: '🛕', unlocked: true },
  { id: 'b4', name: 'Bharat Traveler', desc: 'Earned 500+ Siddhivinayak Loyalty Points', icon: '👑', unlocked: true }
];

export const REVIEW_SENTIMENT_ANALYSIS = {
  overallSentiment: '98% POSITIVE (Extremely Satisfied)',
  serviceQualityScore: 9.9,
  pros: [
    'Clean, brand-new Mahindra Thar 4x4 & Innova Crysta vehicles',
    'Polite, punctual chauffeur drivers with deep ghat navigation skills',
    'Instant WhatsApp booking confirmation to 9173746558 & zero hidden fees',
    'Pure Vegetarian & Sattvik dining guidance at temple circuits'
  ],
  cons: [
    'Peak monsoon weekend traffic near Khandala expressway exit'
  ],
  topSuggestions: 'Book 3-4 days in advance during long weekend holidays.'
};
