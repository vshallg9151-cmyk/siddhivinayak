export const NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    title: '☀️ Sunny Weather Forecast for Lonavala',
    message: 'Ideal clear skies predicted for monsoon drive & sight-seeing this weekend.',
    type: 'weather',
    time: '10 mins ago',
    unread: true
  },
  {
    id: 'notif-2',
    title: '✈️ Mumbai-Goa Flight Drop Alert',
    message: 'Direct flight prices dropped by 18% for next weekend trips.',
    type: 'offer',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 'notif-3',
    title: '🏨 Luxury Resort Deal in Mahabaleshwar',
    message: 'Get 25% off on Le Méridien Mahabaleshwar + complimentary breakfast with Siddhivinayak Pass.',
    type: 'hotel',
    time: '3 hours ago',
    unread: true
  },
  {
    id: 'notif-4',
    title: '🎉 Ganesh Chaturthi Celebrations in Pune',
    message: 'Grand festive processions starting Sep 7. Book your luxury Innova Crysta early!',
    type: 'event',
    time: 'Yesterday',
    unread: false
  },
  {
    id: 'notif-5',
    title: '🚧 Mumbai-Pune Expressway Maintenance Alert',
    message: 'Lane diversion near Khandala ghat between 2 AM - 5 AM tonight.',
    type: 'traffic',
    time: '2 days ago',
    unread: false
  }
];

export const DESTINATION_WEATHER = {
  'Lonavala': {
    city: 'Lonavala & Khandala',
    temp: 24,
    condition: 'Pleasant & Misty',
    icon: 'CloudRain',
    humidity: 78,
    rainChance: 35,
    aqi: 28,
    aqiStatus: 'Good / Clean Air',
    sunrise: '06:08 AM',
    sunset: '07:12 PM',
    bestHours: '07:00 AM - 11:00 AM & 04:00 PM - 07:00 PM',
  },
  'Mahabaleshwar': {
    city: 'Mahabaleshwar & Panchgani',
    temp: 21,
    condition: 'Cool & Foggy',
    icon: 'CloudFog',
    humidity: 82,
    rainChance: 40,
    aqi: 18,
    aqiStatus: 'Pristine Mountain Air',
    sunrise: '06:10 AM',
    sunset: '07:10 PM',
    bestHours: '06:30 AM - 10:30 AM & 03:30 PM - 06:30 PM',
  },
  'Goa': {
    city: 'North & South Goa',
    temp: 30,
    condition: 'Sunny & Tropical',
    icon: 'Sun',
    humidity: 68,
    rainChance: 15,
    aqi: 32,
    aqiStatus: 'Fresh Coastal Air',
    sunrise: '06:15 AM',
    sunset: '07:02 PM',
    bestHours: '04:00 PM - 08:30 PM (Sunset & Beach Vibe)',
  },
  'Udaipur': {
    city: 'Udaipur, Rajasthan',
    temp: 32,
    condition: 'Warm & Clear',
    icon: 'SunMedium',
    humidity: 45,
    rainChance: 10,
    aqi: 54,
    aqiStatus: 'Moderate',
    sunrise: '05:58 AM',
    sunset: '07:22 PM',
    bestHours: '08:00 AM - 11:30 AM & 05:00 PM - 08:00 PM',
  },
  'Leh Ladakh': {
    city: 'Leh & Nubra Valley',
    temp: 14,
    condition: 'Crisp & Sunny',
    icon: 'Snowflake',
    humidity: 25,
    rainChance: 5,
    aqi: 12,
    aqiStatus: 'Ultra Pure Alpine Air',
    sunrise: '05:35 AM',
    sunset: '07:30 PM',
    bestHours: '09:00 AM - 04:00 PM',
  },
  'Shirdi': {
    city: 'Shirdi Divine Pilgrimage',
    temp: 29,
    condition: 'Partly Cloudy',
    icon: 'SunCloud',
    humidity: 55,
    rainChance: 20,
    aqi: 42,
    aqiStatus: 'Good',
    sunrise: '06:05 AM',
    sunset: '07:08 PM',
    bestHours: '04:00 AM - 08:00 AM (Aarti) & 06:00 PM - 09:00 PM',
  }
};

export const HOTELS_RANKINGS_DATA = [
  {
    id: 'h1',
    name: 'The Machan Eco Resort',
    destination: 'Lonavala',
    rating: 4.8,
    reviewsCount: 840,
    price: 8500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    cleanliness: 9.8,
    distanceFromCenter: '12 km (Jungle Canopy)',
    familyScore: 9.6,
    coupleScore: 9.9,
    budgetScore: 8.5,
    aiRecommendationScore: 98,
    tags: ['Luxury Treehouse', 'Eco Friendly', 'Private Jacuzzi', 'Infinity View'],
    category: 'Luxury'
  },
  {
    id: 'h2',
    name: 'Le Méridien Mahabaleshwar Resort & Spa',
    destination: 'Mahabaleshwar',
    rating: 4.9,
    reviewsCount: 1250,
    price: 11200,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    cleanliness: 9.9,
    distanceFromCenter: '2.5 km',
    familyScore: 9.8,
    coupleScore: 9.7,
    budgetScore: 8.2,
    aiRecommendationScore: 97,
    tags: ['5 Star', 'Evergreen Forest', 'Heated Pool', 'Spa & Wellness'],
    category: 'Luxury'
  },
  {
    id: 'h3',
    name: 'Taj Fort Aguada Resort & Spa',
    destination: 'Goa',
    rating: 4.9,
    reviewsCount: 2300,
    price: 14500,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    cleanliness: 10.0,
    distanceFromCenter: 'Beachfront Sinquerim',
    familyScore: 9.9,
    coupleScore: 9.9,
    budgetScore: 7.9,
    aiRecommendationScore: 99,
    tags: ['Heritage Sea View', 'Private Beach Access', 'Fine Dining', 'Poolside Bar'],
    category: 'Luxury'
  },
  {
    id: 'h4',
    name: 'Fariyas Resort Lonavala',
    destination: 'Lonavala',
    rating: 4.6,
    reviewsCount: 1620,
    price: 6200,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    cleanliness: 9.3,
    distanceFromCenter: '1.8 km',
    familyScore: 9.7,
    coupleScore: 9.1,
    budgetScore: 9.1,
    aiRecommendationScore: 94,
    tags: ['Water Park inside', 'Kid Friendly', 'Buffet Breakfast', 'Spa'],
    category: 'Standard'
  },
  {
    id: 'h5',
    name: 'Brightland Resort & Spa',
    destination: 'Mahabaleshwar',
    rating: 4.7,
    reviewsCount: 980,
    price: 7400,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    cleanliness: 9.5,
    distanceFromCenter: '4.0 km',
    familyScore: 9.5,
    coupleScore: 9.6,
    budgetScore: 8.8,
    aiRecommendationScore: 95,
    tags: ['Valley View', 'Solar Heated Pool', 'Organic Garden'],
    category: 'Standard'
  }
];

export const RESTAURANTS_RANKINGS_DATA = [
  {
    id: 'r1',
    name: 'Rama Krishna Pure Veg',
    destination: 'Lonavala',
    cuisine: 'North Indian, South Indian & Street Food',
    tasteScore: 9.8,
    hygieneScore: 9.7,
    popularity: 'Top Rated by Families',
    vegOnly: true,
    jainAvailable: true,
    familyFriendly: true,
    priceRange: '₹400 for two',
    mustTry: 'South Indian Filter Coffee, Pav Bhaji & Cheese Butter Dosa'
  },
  {
    id: 'r2',
    name: 'Mapro Garden Cafe & Bakery',
    destination: 'Mahabaleshwar',
    cuisine: 'Fresh Strawberry Desserts, Pizzas & Sandwiches',
    tasteScore: 9.9,
    hygieneScore: 9.9,
    popularity: 'Iconic Tourist Destination',
    vegOnly: true,
    jainAvailable: true,
    familyFriendly: true,
    priceRange: '₹600 for two',
    mustTry: 'Fresh Strawberry with Whipped Cream & Wood-fired Paneer Pizza'
  },
  {
    id: 'r3',
    name: 'Britto’s Beach Shack',
    destination: 'Goa',
    cuisine: 'Goan Seafood, Continental & Cocktails',
    tasteScore: 9.7,
    hygieneScore: 9.4,
    popularity: 'Baga Beach Hotspot',
    vegOnly: false,
    jainAvailable: false,
    familyFriendly: true,
    priceRange: '₹1,200 for two',
    mustTry: 'Prawn Balchão, Butter Garlic Crab & Bebinca'
  },
  {
    id: 'r4',
    name: 'Fisherman’s Wharf',
    destination: 'Goa',
    cuisine: 'Authentic Goan & Multi-Cuisine',
    tasteScore: 9.8,
    hygieneScore: 9.8,
    popularity: 'Riverside Fine Dining',
    vegOnly: false,
    jainAvailable: true,
    familyFriendly: true,
    priceRange: '₹1,500 for two',
    mustTry: 'Fish Curry Rice, Goan Sausage Pao & Pork Vindaloo'
  },
  {
    id: 'r5',
    name: 'The German Bakery',
    destination: 'Lonavala',
    cuisine: 'Artisanal Bakery, Italian & Coffee',
    tasteScore: 9.5,
    hygieneScore: 9.6,
    popularity: 'Youth & Couple Favorite',
    vegOnly: false,
    jainAvailable: true,
    familyFriendly: true,
    priceRange: '₹700 for two',
    mustTry: 'Blueberry Cheesecake & Cold Brew Coffee'
  }
];

export const DESTINATION_INSIGHTS = {
  'Lonavala': {
    language: 'Marathi & Hindi (English widely understood)',
    currency: 'Indian Rupee (₹ INR)',
    emergency: {
      police: '100 / 02114-273033 (Lonavala City Police)',
      ambulance: '108',
      touristHelpline: '1800-229-930 (Maharashtra Tourism)',
      womenSafety: '1091'
    },
    safetyTips: [
      'Avoid standing close to un-barricaded cliff edges near Tiger Point during heavy fog.',
      'Always keep headlights on low beam while driving through ghat roads in fog.',
      'Beware of monkeys near Bhushi Dam and Karla Caves; keep food items inside bags.'
    ],
    customs: 'Remove shoes before entering religious shrines like Ekvira Devi Temple near Karla Caves.',
    bestPhotoSpots: ['Tiger’s Leap Cliff Edge', 'Lion’s Point Sunset Viewpoint', 'Lonavala Lake Footbridge', 'Rajmachi Fort Vista'],
    bestSunsetPoints: ['Lion’s Point Sunset Vista', 'Duke’s Nose Ridge'],
    famousFoods: ['Lonavala Chikki (Groundnut & Dryfruit)', 'Fudge from Cooper’s', 'Hot Corn Cob (Bhutta)', 'Kanda Bhajji'],
    shoppingToBuy: ['Authentic Cooper’s Chocolate Walnut Fudge', 'Maganlal Chikki box', 'Wooden Handicrafts']
  },
  'Mahabaleshwar': {
    language: 'Marathi, Hindi & English',
    currency: 'Indian Rupee (₹ INR)',
    emergency: {
      police: '100 / 02168-260233',
      ambulance: '108',
      touristHelpline: '1800-229-930',
      womenSafety: '1091'
    },
    safetyTips: [
      'Drive in low gear down Ambenali Ghat towards Poladpur.',
      'Wear sturdy non-slip footwear while trekking near Prattapgad Fort stairs.',
      'Carry light woolens even during summer evenings as mountain temperature drops.'
    ],
    customs: 'Respect historical fort structures. Do not litter in the eco-sensitive forest zones.',
    bestPhotoSpots: ['Arthur’s Seat Canopy', 'Needle Hole Rock (Elephant Head)', 'Venna Lake Boating Dock', 'Kate’s Point'],
    bestSunsetPoints: ['Bombay Point (Sunset Point)', 'Wilson Point (Sunrise Point)'],
    famousFoods: ['Fresh Strawberry with Cream', 'Mulberry Ice Cream', 'Strawberry Thickshake', 'Corn Patties'],
    shoppingToBuy: ['Fresh Farm Strawberries & Raspberries', 'Mapro Fruit Jams & Syrups', 'Chana (Roasted Gram)', 'Handmade Leather Footwear']
  },
  'Goa': {
    language: 'Konkani, Marathi, English & Hindi',
    currency: 'Indian Rupee (₹ INR)',
    emergency: {
      police: '112 / 100 (Goa Tourist Police)',
      ambulance: '108',
      touristHelpline: '1364 (Goa Tourism 24/7)',
      womenSafety: '1091'
    },
    safetyTips: [
      'Pay close attention to beach lifeguard flags (Red means DO NOT SWIM).',
      'Always rent helmets when driving self-drive 2-wheelers; traffic police strictly check.',
      'Avoid purchasing narcotics or unapproved party tickets from unauthorized beach touts.'
    ],
    customs: 'Dress modestly when visiting churches like Basilica of Bom Jesus and Mangueshi Temple.',
    bestPhotoSpots: ['Aguada Fort Lighthouse', 'Parra Coconut Tree Road', 'Fontainhas Latin Quarter', 'Chapora Fort (Dil Chahta Hai point)'],
    bestSunsetPoints: ['Anjuna Cliff', 'Arambol Sweet Water Lake', 'Vagator Sunset Rock'],
    famousFoods: ['Goan Fish Curry Rice', 'Prawn Balchão', 'Chicken Xacuti', 'Bebinca Layer Cake', 'Feni'],
    shoppingToBuy: ['Goan Cashew Nuts (W-180 Jumbo)', 'Handcrafted Azulejos Tiles', 'Spices from Sahakari Spice Farm', 'Feni Spirits']
  }
};

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['visa', 'international', 'passport', 'permit'],
    answer: `🌍 **Visa & Travel Permit Information:**
• **Bali (Indonesia):** Visa on Arrival (VoA) available for Indians (IDR 500,000 / approx ₹2,700 for 30 days). Ensure 6 months passport validity.
• **Thailand:** Visa-Exemption / VoA free for Indian tourists until end of year!
• **Dubai (UAE):** Pre-approved EVisa (process time 48 hrs) or VoA if holding valid US/UK/Schengen visa.
• **Europe (Schengen):** Requires short-stay Schengen Visa (apply 45-60 days prior).
• **Domestic Permits (Ladakh/Arunachal):** Inner Line Permit (ILP) required for Leh-Ladakh Nubra/Pangong and North East. We assist in 100% ILP processing for all our fleet clients!`
  },
  {
    keywords: ['best time', 'season', 'when to visit', 'weather timing'],
    answer: `🌤️ **Best Time to Visit Popular Destinations:**
• **Lonavala & Khandala:** June to September (Monsoon greenery & waterfalls) or Oct to March (Cool pleasant road trips).
• **Mahabaleshwar:** October to June (Fresh Strawberry harvesting peak: Dec - Feb).
• **Goa:** November to February (Peak beach & party season) or July-Aug (Lush monsoon beauty).
• **Udaipur & Rajasthan:** October to March (Comfortable sightseeing weather).
• **Leh-Ladakh:** May to September (Road passes Manali/Srinagar remain open).`
  },
  {
    keywords: ['hidden gem', 'secret spot', 'unexplored', 'offbeat'],
    answer: `✨ **Top Hidden Gems Recommended by AI:**
1. **Lonavala:** Kataldhar Waterfall ( requires 45-min trek, stunning rainbow views).
2. **Mahabaleshwar:** Tapola (The Mini Kashmir of West India with backwater kayaking).
3. **Goa:** Kakolem Beach (Secluded secret cove beach in South Goa) & Harvalem Waterfall.
4. **Alibaug:** Korlai Fort & Lighthouse (Pink-hued Portuguese fort with 360-degree ocean view).`
  },
  {
    keywords: ['safety', 'safe', 'emergency', 'solo woman', 'night driving'],
    answer: `🛡️ **Travel Safety & Guidelines:**
• All Siddhivinayak fleet cars are equipped with **GPS Real-Time Tracking** and **SOS Panic Buttons**.
• Ghat roads (Khandala/Ambenali) require low-beam lights during night fog.
• 24/7 Roadside Assistance hotline: **+91 98230 12345**.
• Tourist helpline numbers are saved in every car dashboard handbook.`
  },
  {
    keywords: ['festival', 'celebration', 'event', 'ganesh', 'sunburn'],
    answer: `🎉 **Upcoming Festival Recommendations:**
• **Ganesh Chaturthi (Maharashtra):** Sep 7 - 17 | Experience grand dhol-tasha pathaks in Pune & Mumbai!
• **Sunburn Beach Music Festival (Goa):** Dec 28 - 31 | Vagator beach electronic music extravaganza.
• **Maha Shivratri & Shirdi Deepotsav:** Special spiritual road trip packages available.`
  }
];
