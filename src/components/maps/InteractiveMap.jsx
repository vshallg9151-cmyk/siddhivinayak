import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Hotel, Utensils, Fuel, Car, Shield, Compass, Phone, Navigation, Star } from 'lucide-react';

export default function InteractiveMap({ destination = 'Lonavala' }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'attractions' | 'hotels' | 'restaurants' | 'parking' | 'fuel'
  const [selectedPin, setSelectedPin] = useState(null);

  const pins = [
    {
      id: 'p1',
      name: 'Tiger’s Leap Viewpoint',
      category: 'attractions',
      icon: Compass,
      x: 35,
      y: 30,
      rating: 4.9,
      detail: 'Highest cliff overhang in Lonavala with 650m drop view.',
      address: 'Kurvande, Lonavala'
    },
    {
      id: 'p2',
      name: 'The Machan Eco Resort',
      category: 'hotels',
      icon: Hotel,
      x: 65,
      y: 45,
      rating: 4.8,
      detail: 'Luxury treehouses nestled 30 feet high in evergreen canopy.',
      address: 'Atvan, Lonavala'
    },
    {
      id: 'p3',
      name: 'Rama Krishna Pure Veg',
      category: 'restaurants',
      icon: Utensils,
      x: 48,
      y: 60,
      rating: 4.7,
      detail: 'Famous for South Indian Dosa & Jain Thali meals.',
      address: 'Old Mumbai-Pune Highway'
    },
    {
      id: 'p4',
      name: 'HP Auto Fuel Station & EV Fast Charge',
      category: 'fuel',
      icon: Fuel,
      x: 25,
      y: 70,
      rating: 4.5,
      detail: '24/7 Diesel, Petrol & 60kW EV Fast DC Charger.',
      address: 'Expressway Exit, Lonavala'
    },
    {
      id: 'p5',
      name: 'Siddhivinayak Safe Tourist Parking',
      category: 'parking',
      icon: Car,
      x: 52,
      y: 35,
      rating: 4.9,
      detail: 'CCTV-monitored shade parking spot for cars & buses.',
      address: 'Bhushi Dam Road'
    }
  ];

  const filteredPins = activeFilter === 'all'
    ? pins
    : pins.filter(p => p.category === activeFilter);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* Filter Tabs */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <MapPin className="w-4 h-4 text-amber-400" /> Map Filters:
          </span>

          <button
            onClick={() => setActiveFilter('all')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Pins
          </button>
          <button
            onClick={() => setActiveFilter('attractions')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'attractions'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Attractions
          </button>
          <button
            onClick={() => setActiveFilter('hotels')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'hotels'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" /> Hotels
          </button>
          <button
            onClick={() => setActiveFilter('restaurants')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'restaurants'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" /> Restaurants
          </button>
          <button
            onClick={() => setActiveFilter('fuel')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'fuel'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Fuel className="w-3.5 h-3.5" /> Fuel & EV
          </button>
          <button
            onClick={() => setActiveFilter('parking')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeFilter === 'parking'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Parking
          </button>
        </div>

        <span className="text-xs text-slate-400 font-semibold shrink-0">
          📍 Interactive {destination} Canvas
        </span>
      </div>

      {/* Visual Simulated Interactive Map Canvas */}
      <div className="relative w-full h-[360px] bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Map Terrain Grid Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Decorative Roads & River SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30 stroke-amber-500/40" fill="none">
          <path d="M 0 100 Q 200 180 400 120 T 800 250" strokeWidth="4" strokeDasharray="6,6" />
          <path d="M 150 0 Q 180 200 450 360" strokeWidth="3" />
          <path d="M 300 0 Q 350 150 600 360" strokeWidth="2" stroke="#38bdf8" />
        </svg>

        {/* Pins */}
        {filteredPins.map((pin) => {
          const IconComp = pin.icon;
          const isSelected = selectedPin?.id === pin.id;

          return (
            <motion.div
              key={pin.id}
              style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
              whileHover={{ scale: 1.25 }}
              onClick={() => setSelectedPin(isSelected ? null : pin)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              <div
                className={`p-2.5 rounded-full shadow-xl border transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-500/30 scale-110'
                    : 'bg-slate-900 text-amber-400 border-slate-700 hover:border-amber-400'
                }`}
              >
                <IconComp className="w-5 h-5" />
              </div>
              
              {/* Pin Label */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-950/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-800 whitespace-nowrap shadow-md pointer-events-none">
                {pin.name}
              </span>
            </motion.div>
          );
        })}

        {/* Selected Pin Tooltip Card */}
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-30 sm:w-80 bg-slate-900/95 text-slate-100 p-4 rounded-2xl border border-amber-500/40 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {selectedPin.category}
                </span>
                <h4 className="font-bold text-sm text-slate-100 mt-1">{selectedPin.name}</h4>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {selectedPin.rating}
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-2">{selectedPin.detail}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" /> {selectedPin.address}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => alert(`Launching GPS navigation route to ${selectedPin.name}...`)}
                className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <Navigation className="w-3 h-3" /> Get Directions
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
