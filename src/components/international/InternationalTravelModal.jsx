import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, CreditCard, Clock, ShieldAlert, PhoneCall, Smartphone, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { INTERNATIONAL_DESTINATIONS } from '../../data/phase7Data';

export default function InternationalTravelModal({ isOpen, onClose }) {
  const [selectedDest, setSelectedDest] = useState(INTERNATIONAL_DESTINATIONS[0]);

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
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  International Travel & Visa Intelligence Hub
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Worldwide
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Visa guidelines, SIM advice, timezones & embassy helplines for Indian travelers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Destination Switcher Tabs */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {INTERNATIONAL_DESTINATIONS.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDest(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  selectedDest.id === d.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🏝️ {d.destination} ({d.country})
              </button>
            ))}
          </div>

          {/* Factsheet Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
            
            {/* Top Destination Hero Banner */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800">
              <img src={selectedDest.image} alt={selectedDest.destination} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-black uppercase text-amber-400 tracking-widest">{selectedDest.country}</span>
                <h2 className="text-2xl font-black text-white">{selectedDest.destination}</h2>
                <p className="text-xs text-slate-300 italic mt-0.5">{selectedDest.tagline}</p>
              </div>
            </div>

            {/* Visa & Passport Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Visa Policy for Indian Citizens
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedDest.visaInfo}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="w-4 h-4" /> Passport & Entry Rules
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedDest.passportRequirements}</p>
              </div>
            </div>

            {/* Currency, Timezone & SIM Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Currency & Rates
                </p>
                <p className="text-xs font-bold text-slate-100 mt-1">{selectedDest.currency}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> Time Difference
                </p>
                <p className="text-xs font-bold text-slate-100 mt-1">{selectedDest.timeZone}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-rose-400" /> Tourist SIM / eSIM
                </p>
                <p className="text-xs font-bold text-slate-100 mt-1">{selectedDest.simInfo}</p>
              </div>
            </div>

            {/* Embassy & Emergency Contacts */}
            <div className="bg-rose-950/20 p-4 rounded-2xl border border-rose-900/30">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1">
                <PhoneCall className="w-4 h-4" /> Indian Embassy / Consulate Contacts
              </h4>
              <p className="text-xs text-slate-200 font-semibold">{selectedDest.embassyContact}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
