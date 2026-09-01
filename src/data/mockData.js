export const POPULAR_CITIES = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', isPopular: true, badge: 'High Demand' },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', isPopular: true, badge: 'Popular' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', isPopular: true, badge: 'Popular' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', isPopular: true },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', isPopular: true, badge: 'Heritage Hub' },
  { id: 'goa', name: 'Goa', state: 'Goa', isPopular: true, badge: 'Beach Special' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', isPopular: true },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', isPopular: true },
];

export const CATEGORIES = [
  'All Cars',
  'Hatchback',
  'Sedan',
  'SUV',
  'Luxury',
  '7 Seater',
  'Off-Road'
];

export const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric'];
export const TRANSMISSION_TYPES = ['Manual', 'Automatic'];
export const SEATING_CAPACITIES = ['4 Seater', '5 Seater', '7 Seater'];

export const FLEET_CARS = [
  {
    id: 'thar-4x4',
    name: 'Mahindra Thar 4x4 Hard Top',
    brand: 'Mahindra',
    model: 'Thar LX 4x4',
    year: 2024,
    category: 'Off-Road',
    categoryTag: 'SUV',
    tagline: 'The Ultimate Off-Road Companion for Mountain Road Trips',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 3499,
    securityDeposit: 5000,
    seats: 4,
    seatingLabel: '4 Seater',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    fuelTypeLabel: 'Diesel 4WD',
    mileage: '13.5 kmpl',
    engine: '2.2L mHawk Turbo Diesel (130 bhp)',
    color: 'Rage Red / Everest White',
    groundClearance: '226 mm',
    bootSpace: '310 Litres',
    rating: 4.9,
    reviewsCount: 142,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Pune', 'Goa', 'Delhi', 'Jaipur'],
    unlimitedKmAvailable: true,
    bestFor: 'Mountain Passes, Off-Road Expeditions & Beach Cruises',
    features: [
      '4x4 Shift-on-Fly Drivetrain',
      '7-inch Touchscreen Infotainment',
      'Apple CarPlay & Android Auto',
      'Convertible/Hardtop Option',
      'All-Terrain AT Tyres',
      'Hill Hold & Descent Control',
      'Dual Front Airbags',
      'ABS with EBD & ESP',
      'Rear Parking Sensors',
      'High-Power USB Charger'
    ],
    description: 'Conquer the rugged terrains of Leh-Ladakh, Himachal, or Western Ghats with our pristine Mahindra Thar 4x4. Built for adventure enthusiasts who demand style, power, and high ground clearance.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹5,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta ZX',
    brand: 'Toyota',
    model: 'Innova Crysta 2.4 ZX',
    year: 2024,
    category: '7 Seater',
    categoryTag: 'MUV',
    tagline: 'King of Highway Comfort for Family & Group Travel',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 3899,
    securityDeposit: 5000,
    seats: 7,
    seatingLabel: '7 Seater',
    transmission: 'Manual',
    fuelType: 'Diesel',
    fuelTypeLabel: 'Diesel',
    mileage: '14.8 kmpl',
    engine: '2.4L GD Turbo Diesel (148 bhp)',
    color: 'Super White / Garnet Red',
    groundClearance: '178 mm',
    bootSpace: '300 Litres (Expandable to 758L)',
    rating: 4.95,
    reviewsCount: 310,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Pune', 'Ahmedabad', 'Bengaluru', 'Hyderabad'],
    unlimitedKmAvailable: true,
    bestFor: 'Extended Family Vacations & Interstate Highway Tours',
    features: [
      'Leatherette Captain Seats',
      'Automatic Climate Control (Rear Vents)',
      'Cruise Control & Eco/Power Modes',
      '8-inch Touchscreen Audio',
      '7 Airbags & Vehicle Stability Control',
      'Ambient Cabin Lighting',
      'Foldable Seat Tables',
      'Power Adjust Driver Seat',
      'Reverse Camera & Parking Sensors',
      'Fast USB Mobile Charging'
    ],
    description: 'The indisputable benchmark for long-distance family travel across India. Superior suspension, plush captain seats, and exceptional reliability make Innova Crysta our most requested vehicle.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹5,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'scorpio-n',
    name: 'Mahindra Scorpio N Z8L',
    brand: 'Mahindra',
    model: 'Scorpio N Z8L 4WD',
    year: 2024,
    category: 'SUV',
    categoryTag: 'SUV',
    tagline: 'Big, Bold & Feature-Packed Powerful 7-Seater SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 3699,
    securityDeposit: 5000,
    seats: 7,
    seatingLabel: '7 Seater',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    fuelTypeLabel: 'Diesel mHawk',
    mileage: '15.2 kmpl',
    engine: '2.2L mHawk Turbo Diesel (172 bhp)',
    color: 'Deep Forest Green / Stealth Black',
    groundClearance: '187 mm',
    bootSpace: '460 Litres',
    rating: 4.88,
    reviewsCount: 184,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Pune', 'Jaipur', 'Ahmedabad'],
    unlimitedKmAvailable: true,
    bestFor: 'Royal Rajasthan Circuits & Rugged Highway Road Trips',
    features: [
      'Sony 12-Speaker 3D Immersive Sound',
      'Electric Sunroof',
      'Wireless Apple CarPlay & Android Auto',
      'Rich Coffee Black Leather Seats',
      'Zip / Zap / Zoom Drive Modes',
      'Front & Rear Parking Cameras',
      '6 Airbags & ISOFIX Child Mounts',
      'Wireless Phone Charging Pad',
      'Dual Zone Climate Control',
      'Keyless Push Button Start'
    ],
    description: 'Dominating road presence combined with luxury features. Ideal for highway road trips, royal Rajasthan circuits, or business weekend travel.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹5,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'creta-sx',
    name: 'Hyundai Creta SX (O)',
    brand: 'Hyundai',
    model: 'Creta SX (O) IVT',
    year: 2024,
    category: 'SUV',
    categoryTag: 'SUV',
    tagline: 'Smooth City Cruiser & Efficient Highway Companion',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 2699,
    securityDeposit: 4000,
    seats: 5,
    seatingLabel: '5 Seater',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    fuelTypeLabel: 'Petrol Smartstream',
    mileage: '17.4 kmpl',
    engine: '1.5L MPi Petrol (113 bhp)',
    color: 'Titan Grey / Atlas White',
    groundClearance: '190 mm',
    bootSpace: '433 Litres',
    rating: 4.82,
    reviewsCount: 215,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Pune', 'Goa', 'Bengaluru'],
    unlimitedKmAvailable: true,
    bestFor: 'Urban City Commutes & Weekend Getaways',
    features: [
      'Voice-Enabled Panoramic Sunroof',
      'Bose Premium 8-Speaker Audio System',
      'Front Ventilated Seats',
      '10.25-inch HD Touchscreen Navigation',
      'Wireless Mobile Charging',
      '360 Degree Surround View Camera',
      'Electronic Parking Brake with Auto Hold',
      'Level 2 ADAS Safety Suite',
      'Air Purifier with AQI Display',
      'Rear Window Sunshade Blinds'
    ],
    description: 'The preferred urban SUV for daily city commutes, airport transfers, and weekend getaways from Mumbai to Lonavala or Delhi to Agra.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹4,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'ertiga-zxi',
    name: 'Maruti Suzuki Ertiga Hybrid',
    brand: 'Maruti Suzuki',
    model: 'Ertiga ZXi Plus Smart Hybrid',
    year: 2024,
    category: '7 Seater',
    categoryTag: 'MUV',
    tagline: 'Smart & Budget-Friendly 7-Seater Family Cruiser',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 2399,
    securityDeposit: 3500,
    seats: 7,
    seatingLabel: '7 Seater',
    transmission: 'Manual',
    fuelType: 'CNG',
    fuelTypeLabel: 'Petrol + Factory CNG',
    mileage: '26.1 km/kg (CNG)',
    engine: '1.5L K15C Smart Hybrid (102 bhp)',
    color: 'Magma Grey / Pearl Arctic White',
    groundClearance: '185 mm',
    bootSpace: '209 Litres (Expandable to 550L)',
    rating: 4.78,
    reviewsCount: 290,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Pune', 'Ahmedabad'],
    unlimitedKmAvailable: true,
    bestFor: 'Budget Family Pilgrimage Trips & Group Tours',
    features: [
      'Smart Hybrid Dual Battery System',
      'High Mileage CNG Efficiency',
      'Flexi 60:40 Split Seating',
      'Roof-Mounted Rear AC Vents with 4 Speeds',
      '7-inch SmartPlay Studio Infotainment',
      'Dual Airbags & ESP with Hill Hold',
      'Cooled Cup Holders',
      'Electrically Foldable ORVMs',
      'Rear Parking Camera with Sensors',
      'Engine Auto Start-Stop'
    ],
    description: 'Extremely economical and comfortable 7-seater MUV for extended family tours, pilgrimage visits, and weekend retreats.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹3,500 Security Deposit (100% Refundable)'
  },
  {
    id: 'fortuner-legender',
    name: 'Toyota Fortuner Legender 4x4',
    brand: 'Toyota',
    model: 'Fortuner Legender 2.8 4x4 AT',
    year: 2024,
    category: 'Luxury',
    categoryTag: 'Luxury SUV',
    tagline: 'VIP Command Position & Rugged Elegance',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 5999,
    securityDeposit: 10000,
    seats: 7,
    seatingLabel: '7 Seater',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    fuelTypeLabel: '2.8L Turbo Diesel 4x4',
    mileage: '14.2 kmpl',
    engine: '2.8L GD Turbo Diesel (201 bhp / 500 Nm)',
    color: 'Dual Tone White Pearl & Black Roof',
    groundClearance: '225 mm',
    bootSpace: '296 Litres',
    rating: 4.96,
    reviewsCount: 165,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Pune', 'Bengaluru', 'Jaipur', 'Hyderabad'],
    unlimitedKmAvailable: true,
    bestFor: 'VIP Executive Delegations & Himalayan SUV Expeditions',
    features: [
      'JBL 11-Speaker Premium Audio with Subwoofer',
      'Sequential LED Turn Indicators',
      'Kick-Sensor Powered Tailgate',
      'Maroon & Black Dual-Tone Leather Seats',
      'Eco / Normal / Sport Drive Modes',
      '4x4 High/Low Range Electronic Lock',
      'Ventilated Front Bucket Seats',
      'Wireless Smartphone Charger',
      'Puddle Lamps with Logo Projection',
      'Vehicle Stability & Traction Control'
    ],
    description: 'Unmatched prestige and power for mountain expeditions, high-profile events, and long distance cross-country journeys.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹10,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'bmw-5-series',
    name: 'BMW 5 Series M Sport',
    brand: 'BMW',
    model: '520d M Sport',
    year: 2024,
    category: 'Luxury',
    categoryTag: 'Sedan',
    tagline: 'Exquisite Executive Luxury & Chauffeur Comfort',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 11999,
    securityDeposit: 20000,
    seats: 5,
    seatingLabel: '5 Seater',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    fuelTypeLabel: 'TwinPower Turbo Diesel',
    mileage: '17.6 kmpl',
    engine: '2.0L TwinPower Turbo (190 bhp)',
    color: 'Carbon Black / Phytonic Blue',
    groundClearance: '145 mm',
    bootSpace: '530 Litres',
    rating: 4.98,
    reviewsCount: 76,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'],
    unlimitedKmAvailable: false,
    bestFor: 'Executive Corporate Travel & Luxury Wedding Chauffeur',
    features: [
      'Harman Kardon 16-Speaker Surround Sound',
      'Soft-Close Luxury Doors',
      'BMW Gesture Control & Head-Up Display',
      'Dakota Leather Reclining Rear Seats',
      'Four-Zone Automatic Climate Control',
      'Adaptive Suspension with Sports Mode',
      'Wireless Apple CarPlay & Android Auto',
      'Ambient Air Package with Fragrance',
      'Parking Assistant Plus with 3D View',
      'Power Boot Lid with Kick Sensor'
    ],
    description: 'Elevate VIP travel, luxury weddings, and executive corporate delegations with our top-of-the-line BMW 5 Series accompanied by uniform-clad professional chauffeurs.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹20,000 Security Deposit (100% Refundable)'
  },
  {
    id: 'mg-zs-ev',
    name: 'MG ZS EV Exclusive Pro',
    brand: 'MG Motor',
    model: 'ZS EV 50.3 kWh',
    year: 2024,
    category: 'Sedan',
    categoryTag: 'Electric',
    tagline: 'Zero Emission 100% Electric SUV with 461km Range',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerDay: 2999,
    securityDeposit: 4000,
    seats: 5,
    seatingLabel: '5 Seater',
    transmission: 'Automatic',
    fuelType: 'Electric',
    fuelTypeLabel: '100% Electric (50.3 kWh)',
    mileage: '461 km / Full Charge',
    engine: 'Permanent Magnet Synchronous Motor (174 bhp)',
    color: 'Ferris White / Dark Grey',
    groundClearance: '177 mm',
    bootSpace: '448 Litres',
    rating: 4.85,
    reviewsCount: 98,
    availableStatus: 'Available Now',
    cityLocation: ['Mumbai', 'Delhi', 'Bengaluru', 'Pune'],
    unlimitedKmAvailable: true,
    bestFor: 'Eco-Friendly City Drives & Quick Express Charging',
    features: [
      '50.3 kWh Battery with IP69K Waterproofing',
      'Dual Pane Panoramic Skyroof',
      'Fast DC Charging (0-80% in 50 Mins)',
      'i-SMART 75+ Connected Car Features',
      'Digital Bluetooth Car Key Access',
      'PM 2.5 Air Filter',
      '3-Level Regenerative Braking',
      'Level 2 ADAS Safety Suite',
      '6 Airbags & Hill Descent Control',
      'Wireless Mobile Charger'
    ],
    description: 'Experience futuristic electric mobility with instant torque, ultra-silent cabin, and complimentary RFID fast-charging card across major highway charging networks.',
    selfDriveEligible: true,
    chauffeurEligible: true,
    depositText: '₹4,000 Security Deposit (100% Refundable)'
  }
];

export const ROAD_TRIP_DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Western Coast',
    tagline: 'Sun-kissed Beaches, Coastal Roads & Portuguese Charm',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Mahindra Thar / Convertible',
    drivingDuration: '10 hrs from Mumbai / Pune',
    highlights: ['Baga & Palolem Beaches', 'Dudhsagar Waterfalls', 'Old Goa Cathedrals', 'Sunset Cruises'],
    fuelEstimate: '₹4,200',
    tollEstimate: '₹850',
    popularRoute: 'Mumbai - Pune Expressway - Kolhapur - Belgaum - Goa'
  },
  {
    id: 'manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    tagline: 'Snow Peaks, Pine Forests & Thrilling Himalayan Passes',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Mahindra Thar 4x4 / Fortuner',
    drivingDuration: '12 hrs from Delhi NCR',
    highlights: ['Atal Tunnel', 'Solang Valley Adventure', 'Old Manali Cafes', 'Rohtang Pass'],
    fuelEstimate: '₹5,800',
    tollEstimate: '₹1,100',
    popularRoute: 'Delhi - Ambala - Chandigarh - Mandi - Kullu - Manali'
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    state: 'Union Territory',
    tagline: 'The Ultimate Bucket-List High Altitude Expedition',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Mahindra Thar 4x4 / Scorpio N',
    drivingDuration: 'Multi-day Expedition',
    highlights: ['Pangong Tso Lake', 'Khardung La Pass', 'Nubra Valley Sand Dunes', 'Magnetic Hill'],
    fuelEstimate: '₹12,500',
    tollEstimate: '₹1,400',
    popularRoute: 'Manali - Jispa - Sarchu - Leh Circuit'
  },
  {
    id: 'jaipur',
    name: 'Jaipur & Udaipur Circuit',
    state: 'Rajasthan',
    tagline: 'Royal Palaces, Desert Forts & Majestic Fort Drives',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Hyundai Creta / Innova Crysta',
    drivingDuration: '5 hrs from Delhi',
    highlights: ['Amer Fort', 'Hawa Mahal', 'Lake Pichola Udaipur', 'Desert Camping'],
    fuelEstimate: '₹3,600',
    tollEstimate: '₹720',
    popularRoute: 'Delhi - Jaipur Expressway (NE4)'
  },
  {
    id: 'kerala',
    name: 'Munnar & Kerala Backwaters',
    state: 'God\'s Own Country',
    tagline: 'Lush Tea Plantations, Misty Hills & Serene Waters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Innova Crysta / Scorpio N',
    drivingDuration: '9 hrs from Bengaluru',
    highlights: ['Munnar Tea Gardens', 'Alleppey Houseboats', 'Varkala Cliff', 'Wayanad Wildlife'],
    fuelEstimate: '₹4,900',
    tollEstimate: '₹680',
    popularRoute: 'Bengaluru - Salem - Dindigul - Theni - Munnar'
  },
  {
    id: 'rann-of-kutch',
    name: 'Rann of Kutch',
    state: 'Gujarat',
    tagline: 'Endless White Salt Desert & Cultural Extravaganza',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80',
    recommendedVehicle: 'Scorpio N / Ertiga Hybrid',
    drivingDuration: '6 hrs from Ahmedabad',
    highlights: ['White Rann Sunset', 'Rann Utsav Village', 'Kala Dungar', 'Mandvi Beach'],
    fuelEstimate: '₹3,400',
    tollEstimate: '₹550',
    popularRoute: 'Ahmedabad - Viramgam - Dhrangadhra - Bhuj - Dhordo'
  }
];

export const TRUST_FEATURES = [
  {
    id: 'no-hidden',
    title: 'No Hidden Charges',
    description: '100% transparent door-step pricing. Taxes, insurance, and Fastag setup included.',
    iconName: 'ShieldCheck',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'unlimited-km',
    title: 'Unlimited KM Options',
    description: 'Drive stress-free without per-kilometer limits on selected self-drive rental cars.',
    iconName: 'Gauge',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'roadside-assist',
    title: '24×7 Roadside Assistance',
    description: 'Pan-India emergency support team on standby with instant replacement vehicle cover.',
    iconName: 'Headphones',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'sanitized',
    title: 'Sanitized & Serviced',
    description: '50-Point comprehensive mechanical inspection and deep sanitization before every trip.',
    iconName: 'Sparkles',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'easy-cancel',
    title: 'Easy Free Cancellation',
    description: 'Flexible life happens! Cancel free of charge up to 24 hours prior to trip start.',
    iconName: 'RotateCcw',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'secure-pay',
    title: 'Secure Instant Refund',
    description: 'Bank-grade encrypted payments via UPI, Credit Cards, and immediate deposit refunds.',
    iconName: 'Lock',
    color: 'from-violet-500 to-purple-600'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Rajesh Kulkarni',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripPhoto: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    carUsed: 'Mahindra Thar 4x4',
    review: 'Rented the Thar 4x4 for a 7-day Goa road trip with college buddies. The car was delivered right to my doorstep in Dadar in sparkling condition! Smooth process, zero hidden fees, and zero deposit hassle. Siddhivinayak Tours is far superior to Zoomcar.'
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    city: 'Delhi NCR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripPhoto: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    carUsed: 'Toyota Innova Crysta',
    review: 'Booked an Innova Crysta with driver for a family trip from Delhi to Manali & Shimla. Our chauffeur Ramesh ji was punctual, extremely polite, and drove safely through mountain curves. Highly recommend for family road trips!'
  },
  {
    id: 3,
    name: 'Vikram Mehta',
    city: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripPhoto: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
    carUsed: 'Hyundai Creta Automatic',
    review: 'Used Siddhivinayak Tours for my Udaipur business retreat. Booking took literally 2 minutes on mobile, and the car condition was like brand new (under 12,000 km on odometer). Top-notch service!'
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 'weekend20',
    title: 'Weekend Escape Pass',
    discount: '20% OFF',
    code: 'WEEKEND20',
    validity: 'Valid on Friday - Sunday Bookings',
    tag: 'Popular',
    description: 'Planning a quick getaway to Lonavala, Mahabaleshwar, or Agra? Get instant 20% flat discount on all self-drive SUVs.',
    bgGradient: 'from-blue-600 to-indigo-900'
  },
  {
    id: 'festive35',
    title: 'Long-Term Roadie Special',
    discount: '35% OFF',
    code: 'LONGTRIP35',
    validity: 'For Bookings >= 7 Days',
    tag: 'Best Value',
    description: 'Embarking on a cross-state road trip? Save big with our extended rental rates and free unlimited kilometer upgrade.',
    bgGradient: 'from-amber-600 to-yellow-800'
  },
  {
    id: 'airport15',
    title: 'Airport Transfer Guarantee',
    discount: 'FLAT ₹500 OFF',
    code: 'AIRPORTVIP',
    validity: '24/7 Chauffeur Pickups',
    tag: 'Instant Delivery',
    description: 'On-time pickup at Mumbai T2, Delhi T3, or Bengaluru Airport with complimentary bottled water and baggage assistance.',
    bgGradient: 'from-slate-800 to-slate-950'
  }
];

export const POLICIES_DATA = {
  overview: [
    'Complete vehicle sanitized & mechanically inspected 50-point checklist before every trip.',
    'Includes complimentary Fastag tag pre-loaded with ₹500 starting balance.',
    '24/7 Pan-India emergency roadside assistance hotline with instant towing cover.'
  ],
  inclusions: [
    'Comprehensive All-India Commercial Insurance Cover',
    'State Tax & All-India Tourist Permit Clearance',
    'Pre-loaded Fastag Card with automatic toll logging',
    'Free Doorstep Delivery & Collection for bookings over 3 days',
    'Emergency Spare Tyre, Wheel Jack & Tool Kit'
  ],
  exclusions: [
    'Fuel / Electricity Charging expenses incurred during trip',
    'Fastag Toll charges incurred beyond pre-loaded balance',
    'Interstate state border entry taxes (if applicable outside home state)',
    'Chauffeur allowance (₹500/day if opting for Chauffeur-driven mode)',
    'Traffic violation fines incurred during rental period'
  ],
  fuelPolicy: [
    'Same-to-Same Fuel Policy: Return the vehicle with the exact fuel level as received.',
    'Fuel discrepancy will be charged as per actual market pump rate + 10% handling fee.',
    'Electric Vehicles (EVs) are delivered with minimum 80% charge and can be returned with 20%+ charge.'
  ],
  cancellationPolicy: [
    'Free Cancellation up to 24 hours before trip start time (100% full refund).',
    'Cancellation within 12-24 hours: 1-day base rental fee deducted.',
    'Cancellation within 12 hours or No-Show: 50% booking amount non-refundable.',
    'Instant refund processed to original payment method (UPI / Credit Card) within 24 hours.'
  ],
  termsConditions: [
    'Original Driving License (DL) & Aadhaar Card mandatory at delivery.',
    'Driver minimum age requirement: 21 years with valid DL held for at least 1 year.',
    'Speed Limit: Vehicles are governed at 120 km/h as per Indian Ministry of Road Transport norms.',
    'Smoking and alcohol consumption inside the vehicle are strictly prohibited (Penalty: ₹2,500 deep cleaning charge).'
  ]
};
