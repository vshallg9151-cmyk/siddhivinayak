import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, Utensils, Hotel, ShoppingBag, CreditCard, Cross, Fuel, Shield, Bath, Navigation, Phone } from 'lucide-react';

export default function NearbyDiscoveryModal({ isOpen, onClose, destination = 'Lonavala' }) {
  const [activeCategory, setActiveCategory] = useState('cafes');

  const nearbyItems = {
    cafes: [
      { name: 'The German Bakery Cafe', distance: '400m away', rating: 4.8, phone: '+91 98220 11223', desc: 'Cold brews, artisanal pastries & cozy seating.' },
      { name: 'Café Coffee Day Express', distance: '850m away', rating: 4.2, phone: '+91 98220 33445', desc: 'Quick coffee & roadside snacks.' }
    ],
    restaurants: [
      { name: 'Rama Krishna Pure Veg', distance: '200m away', rating: 4.9, phone: '+91 98220 55667', desc: 'South Indian Dosa, Thali & Jain specialties.' },
      { name: 'Parsi Dhaba Expressway', distance: '1.2 km away', rating: 4.7, phone: '+91 98220 77889', desc: 'Authentic Dhansak & Kheema Pav.' }
    ],
    hotels: [
      { name: 'Fariyas Resort & Spa', distance: '1.5 km away', rating: 4.7, phone: '+91 02114 273852', desc: 'Luxury resort with indoor water park.' },
      { name: 'Orchid Resort Lonavala', distance: '900m away', rating: 4.5, phone: '+91 02114 274000', desc: 'Family stay with swimming pool.' }
    ],
    markets: [
      { name: 'Lonavala Super Market & Chikki Hub', distance: '300m away', rating: 4.8, phone: '+91 98221 11000', desc: 'Fresh chikki, fudge & local handicrafts.' },
      { name: 'Mg Road Souvenir Flea Market', distance: '600m away', rating: 4.4, phone: 'N/A', desc: 'Leather goods, wooden artifacts & toys.' }
    ],
    atms: [
      { name: 'SBI Bank 24/7 ATM', distance: '150m away', status: 'Cash Available', desc: 'Accepts all Visa/Mastercard/UPI.' },
      { name: 'HDFC Bank ATM', distance: '350m away', status: 'Cash Available', desc: '24 Hours operational.' }
    ],
    hospitals: [
      { name: 'Lonavala General & Emergency Hospital', distance: '1.1 km away', phone: '02114-272214', desc: '24/7 Casualty, ICU & Ambulance Service.' },
      { name: 'Sanjeevani Care Clinic', distance: '700m away', phone: '02114-273399', desc: 'First Aid & General OPD.' }
    ],
    petrol: [
      { name: 'HP Auto Fuel Station & EV Charger', distance: '800m away', phone: '02114-275555', desc: 'Petrol, Diesel & 60kW EV Fast Charging.' },
      { name: 'Indian Oil Petrol Pump', distance: '1.4 km away', phone: '02114-276666', desc: '24/7 Fuel & Air Pressure.' }
    ],
    police: [
      { name: 'Lonavala City Police Station', distance: '650m away', phone: '02114-273033 / 100', desc: 'Tourist Assistance Desk & SOS Duty.' }
    ],
    washrooms: [
      { name: 'Clean & Hygienic Public Washroom', distance: '250m away', status: 'Open 24/7', desc: 'Wheelchair accessible & sanitized.' }
    ]
  };

  if (!isOpen) return null;

  const categories = [
    { key: 'cafes', label: 'Cafes', icon: Coffee },
    { key: 'restaurants', label: 'Restaurants', icon: Utensils },
    { key: 'hotels', label: 'Hotels', icon: Hotel },
    { key: 'markets', label: 'Markets', icon: ShoppingBag },
    { key: 'atms', label: 'ATMs', icon: CreditCard },
    { key: 'hospitals', label: 'Hospitals', icon: Cross },
    { key: 'petrol', label: 'Petrol & EV', icon: Fuel },
    { key: 'police', label: 'Police Station', icon: Shield },
    { key: 'washrooms', label: 'Washrooms', icon: Bath }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Nearby Discovery Hub
                <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  {destination}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Essential services, dining & amenities near your location</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeCategory === cat.key
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Item Cards */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
            {nearbyItems[activeCategory]?.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-100 text-sm">{item.name}</h4>
                    <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-md border border-slate-700 font-bold">
                      {item.distance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.phone && item.phone !== 'N/A' && (
                    <a
                      href={`tel:${item.phone.split('/')[0]}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call
                    </a>
                  )}
                  <button
                    onClick={() => alert(`Opening maps directions to ${item.name}`)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Navigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
