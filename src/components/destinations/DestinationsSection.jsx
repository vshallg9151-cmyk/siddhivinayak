import React, { useState } from 'react';
import { ROAD_TRIP_DESTINATIONS } from '../../data/mockData';
import DestinationDrawer from './DestinationDrawer';
import { MapPin, Compass, ArrowUpRight, Sparkles, Clock, Car } from 'lucide-react';

export default function DestinationsSection({ onTriggerAIPlanner }) {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <section id="destinations" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Iconic Indian Driving Circuits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
            Popular Road Trip Destinations
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-normal">
            Handcrafted road trip routes with high-clearance SUVs, transparent toll estimates, and verified stay points.
          </p>
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROAD_TRIP_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group bg-brand-bgLight rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-luxury hover:border-brand-gold/40 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Media Container */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* State Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/90 backdrop-blur-md text-brand-navy shadow-sm">
                    {dest.state}
                  </span>
                </div>

                {/* Duration Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{dest.drivingDuration}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-brand-navy group-hover:text-brand-blue transition-colors flex items-center justify-between">
                    <span>{dest.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="mt-4 p-3 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500 font-normal">
                      <Car className="w-4 h-4 text-brand-blue" /> Recommended:
                    </span>
                    <span className="text-brand-navy font-bold">{dest.recommendedVehicle.split('/')[0]}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="w-full py-3 rounded-2xl bg-brand-navy hover:bg-slate-900 text-slate-100 hover:text-brand-gold font-bold text-xs shadow-md transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Route Details</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Destination Drawer */}
      {selectedDestination && (
        <DestinationDrawer
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onPlanTrip={(dest) => {
            setSelectedDestination(null);
            onTriggerAIPlanner(dest);
          }}
        />
      )}
    </section>
  );
}
