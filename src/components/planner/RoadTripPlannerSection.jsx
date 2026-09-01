import React, { useState } from 'react';
import PlannerModal from './PlannerModal';
import { Sparkles, Navigation, Fuel, DollarSign, Hotel, Camera, CheckSquare, CloudSun, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RoadTripPlannerSection({ onTripScheduled }) {
  const [plannerModalOpen, setPlannerModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleOpenPlanner = (dest = null) => {
    setSelectedDestination(dest);
    setPlannerModalOpen(true);
  };

  const plannerFeatures = [
    { title: 'Best Routes', desc: 'AI-calculated highway routes avoiding high traffic bottlenecks & roadworks.', icon: Navigation, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { title: 'Fuel Cost Estimate', desc: 'Accurate mileage estimation tailored to your selected car engine.', icon: Fuel, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Toll Estimate', desc: 'Live Fastag toll calculation along national expressways.', icon: DollarSign, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { title: 'Nearby Hotels', desc: 'Top-rated highway stays & luxury resort pitstops.', icon: Hotel, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { title: 'Tourist Attractions', desc: 'Must-visit scenic viewpoints, waterfalls, and local food spots.', icon: Camera, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { title: 'Packing Checklist', desc: 'Custom road trip packing recommendations based on climate.', icon: CheckSquare, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { title: 'Weather Preview', desc: 'Real-time weather radar & temperature forecast.', icon: CloudSun, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' }
  ];

  return (
    <section id="planner" className="py-20 bg-brand-navy relative overflow-hidden text-white">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold mb-4 border border-brand-gold/30">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Next-Gen Travel Technology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Road Trip Planner
          </h2>
          <p className="text-slate-300 text-base mt-3 font-normal leading-relaxed">
            Eliminate road trip anxiety. Calculate live fuel costs, Fastag tolls, scenic viewpoints, weather alerts, and vehicle suitability before you hit the ignition.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plannerFeatures.slice(0, 4).map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-gold/40 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-gold transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Remaining 3 Features Horizontal Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plannerFeatures.slice(4).map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 hover:border-brand-blue/40 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main CTA Container */}
        <div className="text-center">
          <button
            onClick={() => handleOpenPlanner(null)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-brand-navy font-black text-sm sm:text-base shadow-luxury-gold hover:shadow-gold-border-glow hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-brand-navy group-hover:rotate-12 transition-transform" />
            <span>Launch AI Road Trip Planner</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Interactive Planner Modal */}
      {plannerModalOpen && (
        <PlannerModal
          initialDestination={selectedDestination}
          onClose={() => setPlannerModalOpen(false)}
          onScheduleTrip={(tripData) => {
            setPlannerModalOpen(false);
            onTripScheduled(tripData);
          }}
        />
      )}
    </section>
  );
}
