import React from 'react';
import { X, MapPin, Compass, Car, Fuel, Clock, Navigation, CheckCircle } from 'lucide-react';

export default function DestinationDrawer({ destination, onClose, onPlanTrip }) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-navy/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between border-l border-slate-200">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              <Compass className="w-4 h-4 text-brand-gold" />
              <span>Road Trip Guide</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Hero Banner */}
          <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-6 shadow-md">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-xs font-bold text-brand-gold uppercase">{destination.state}</span>
              <h2 className="text-3xl font-extrabold">{destination.name}</h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
            {destination.tagline}
          </p>

          {/* Trip Estimator Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-blue" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Drive Time</span>
                <span className="text-xs font-bold text-slate-900">{destination.drivingDuration}</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-center gap-3">
              <Car className="w-5 h-5 text-amber-600" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Best Vehicle</span>
                <span className="text-xs font-bold text-slate-900">{destination.recommendedVehicle}</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
              Must-Visit Route Stops & Attractions
            </h4>
            <div className="space-y-2">
              {destination.highlights?.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highway Route Info */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 mb-6">
            <h4 className="text-xs font-bold text-brand-gold uppercase mb-1 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              Popular Highway Route
            </h4>
            <p className="text-xs text-slate-300 font-medium">
              {destination.popularRoute}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
          <button
            onClick={() => onPlanTrip(destination)}
            className="w-full py-3.5 rounded-2xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-extrabold text-sm shadow-luxury transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-brand-gold" />
            <span>Plan AI Route for {destination.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
