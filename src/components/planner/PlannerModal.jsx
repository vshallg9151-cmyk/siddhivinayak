import React, { useState } from 'react';
import { X, Sparkles, Navigation, Fuel, DollarSign, Hotel, Camera, CheckSquare, CloudSun, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function PlannerModal({ initialDestination, onClose, onScheduleTrip }) {
  const [origin, setOrigin] = useState('Mumbai');
  const [destination, setDestination] = useState(initialDestination?.name || 'Goa');
  const [vehicleType, setVehicleType] = useState('Mahindra Thar 4x4');
  const [passengers, setPassengers] = useState(4);

  // Dynamic route calculation mockup
  const distanceKm = destination === 'Leh Ladakh' ? 1250 : destination === 'Goa' ? 590 : destination === 'Manali' ? 540 : 420;
  const estFuelLiters = Math.round(distanceKm / 11);
  const fuelCost = estFuelLiters * 98; // Avg diesel/petrol rate
  const tollCost = Math.round(distanceKm * 1.8);
  const estimatedHours = Math.round(distanceKm / 55);

  const packingItems = [
    'Fastag card recharged with min ₹1,000 balance',
    'Original Driving License & Digital Digilocker RC',
    'Emergency Tire Inflator & First Aid Kit',
    'Portable Power Bank & Type-C Car Charger',
    'High Altitude Warm Jackets & Sunblock (if mountains)',
    'Offline Google Maps downloaded for low signal zones'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-brand-navy/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-brand-navy via-slate-900 to-slate-950 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold mb-3 border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Siddhivinayak AI Road Trip Engine v2.4</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Smart Highway Route & Cost Estimator
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time calculations for fuel expenses, Fastag tolls, optimal scenic stops, and weather forecasts.
          </p>

          {/* Source & Destination Selector Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Starting Point</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Pune">Pune</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="Goa">Goa</option>
                <option value="Manali">Manali</option>
                <option value="Leh Ladakh">Leh Ladakh</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Kerala">Kerala</option>
                <option value="Udaipur">Udaipur</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Selected Vehicle</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="Mahindra Thar 4x4">Mahindra Thar 4x4</option>
                <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                <option value="Mahindra Scorpio N">Mahindra Scorpio N</option>
                <option value="Hyundai Creta">Hyundai Creta</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Metric Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-center">
              <Navigation className="w-5 h-5 text-brand-gold mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Distance</span>
              <span className="text-lg font-black text-white">{distanceKm} km</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-center">
              <Fuel className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Fuel Estimate</span>
              <span className="text-lg font-black text-white">₹{fuelCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-center">
              <DollarSign className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Fastag Tolls</span>
              <span className="text-lg font-black text-white">₹{tollCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-center">
              <CloudSun className="w-5 h-5 text-sky-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Weather Preview</span>
              <span className="text-lg font-black text-white">26°C Pleasant</span>
            </div>
          </div>

          {/* Curated Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hotels & Stays */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Hotel className="w-4 h-4" />
                Recommended Highway Stays & Resorts
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center justify-between p-2 bg-slate-800/60 rounded-xl">
                  <span>Luxury Highway Resort & Spa</span>
                  <span className="text-brand-gold font-bold">4.8 ★</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-slate-800/60 rounded-xl">
                  <span>Scenic View Boutique Stays</span>
                  <span className="text-brand-gold font-bold">4.7 ★</span>
                </li>
              </ul>
            </div>

            {/* Tourist Attractions */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Top Instagrammable Viewpoints
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center justify-between p-2 bg-slate-800/60 rounded-xl">
                  <span>Sunset Cliff Viewpoint (Km 240)</span>
                  <span className="text-emerald-400 font-semibold">Photo Spot</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-slate-800/60 rounded-xl">
                  <span>Heritage Food Plaza & Cafe</span>
                  <span className="text-amber-400 font-semibold">Food Break</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Packing Checklist */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
            <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Essential Highway Packing Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {packingItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Estimated Travel Cost</span>
            <span className="text-2xl font-black text-brand-gold">
              ₹{(fuelCost + tollCost).toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onScheduleTrip({ origin, destination, vehicleType, cost: fuelCost + tollCost })}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-500 text-brand-navy font-extrabold text-xs sm:text-sm shadow-luxury-gold hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Reserve Vehicle for this Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
