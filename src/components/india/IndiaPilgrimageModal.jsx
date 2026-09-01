import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, Calendar, Utensils, Car, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';
import { INDIAN_PILGRIMAGE_YATRA } from '../../data/phase7Data';
import { DISPLAY_PHONE } from '../../utils/whatsappHelper';

export default function IndiaPilgrimageModal({ isOpen, onClose, onOpenPlanner }) {
  const [selectedYatra, setSelectedYatra] = useState(INDIAN_PILGRIMAGE_YATRA[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 font-black text-xl">
                🛕
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Indian Pilgrimage & Spiritual Yatra AI
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Sacred Circuits
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Char Dham, 12 Jyotirlinga, Shakti Peeths, Temple Darshan & Sattvik Food</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Yatra Switcher Tabs */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {INDIAN_PILGRIMAGE_YATRA.map(y => (
              <button
                key={y.id}
                onClick={() => setSelectedYatra(y)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  selectedYatra.id === y.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🛕 {y.name}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
            
            {/* Top Banner */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800">
              <img src={selectedYatra.image} alt={selectedYatra.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-black uppercase text-amber-400 tracking-widest">Divine Journey</span>
                <h2 className="text-2xl font-black text-white">{selectedYatra.name}</h2>
                <p className="text-xs text-slate-300 font-medium mt-0.5">{selectedYatra.destinations}</p>
              </div>
            </div>

            {/* Overview & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pilgrimage Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedYatra.description}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting Package</span>
                  <span className="text-2xl font-black text-amber-400">₹{selectedYatra.startingPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block">per person (Cab + Hotel + Darshan)</span>
                </div>
                <button
                  onClick={() => { onOpenPlanner(); onClose(); }}
                  className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Generate Yatra Itinerary
                </button>
              </div>
            </div>

            {/* Travel Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Best Time To Visit
                </p>
                <p className="text-xs font-semibold text-slate-200 mt-1">{selectedYatra.bestMonths}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Pure Veg & Sattvik Meals
                </p>
                <p className="text-xs font-semibold text-slate-200 mt-1">{selectedYatra.foodGuide}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" /> Outstation Chauffeur Cabs
                </p>
                <p className="text-xs font-semibold text-slate-200 mt-1">Innova Crysta / Tempo Traveller with experienced hill drivers.</p>
              </div>
            </div>

            {/* Route Map */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">📍 Recommended Yatra Route Circuit</h4>
              <p className="text-xs text-slate-200 font-semibold">{selectedYatra.routePlan}</p>
            </div>

            {/* Helpline Call Card */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-300">Need Special Senior Citizen / VIP Darshan Assistance?</h4>
                <p className="text-[11px] text-slate-400">Call our dedicated Pilgrimage Helpline for custom Yatra arrangements.</p>
              </div>
              <a
                href="tel:9173746558"
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" /> {DISPLAY_PHONE}
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
