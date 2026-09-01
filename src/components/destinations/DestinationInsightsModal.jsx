import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, DollarSign, ShieldAlert, Camera, Sunset, Utensils, ShoppingBag, PhoneCall, Compass, CheckCircle } from 'lucide-react';
import { DESTINATION_INSIGHTS } from '../../data/phase4Data';

export default function DestinationInsightsModal({ isOpen, onClose, destination = 'Lonavala' }) {
  if (!isOpen) return null;

  const insights = DESTINATION_INSIGHTS[destination] || DESTINATION_INSIGHTS['Lonavala'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Destination Insights & Culture Guide
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                    {destination}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Everything you need to know before visiting</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-200">
            {/* Quick Fact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <Globe className="w-6 h-6 text-sky-400 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Local Language</p>
                  <p className="text-xs font-bold text-slate-100">{insights.language}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Currency & Tipping</p>
                  <p className="text-xs font-bold text-slate-100">{insights.currency}</p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-rose-950/20 p-5 rounded-2xl border border-rose-900/30">
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3">
                <PhoneCall className="w-4 h-4" /> Emergency Helplines & Contacts
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div><span className="text-slate-400">Police SOS:</span> <strong className="text-slate-100">{insights.emergency.police}</strong></div>
                <div><span className="text-slate-400">Ambulance:</span> <strong className="text-slate-100">{insights.emergency.ambulance}</strong></div>
                <div><span className="text-slate-400">Tourism Helpline:</span> <strong className="text-slate-100">{insights.emergency.touristHelpline}</strong></div>
                <div><span className="text-slate-400">Women Safety:</span> <strong className="text-slate-100">{insights.emergency.womenSafety}</strong></div>
              </div>
            </div>

            {/* Safety Tips & Local Customs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="w-4 h-4" /> Travel Safety Advice
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {insights.safetyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-4 h-4" /> Local Etiquette & Customs
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{insights.customs}</p>
              </div>
            </div>

            {/* Photo Spots & Sunset Vistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Camera className="w-4 h-4" /> Best Photography Spots
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {insights.bestPhotoSpots.map((spot, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-sky-300 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                      📸 {spot}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sunset className="w-4 h-4" /> Best Sunset Points
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {insights.bestSunsetPoints.map((sunset, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-rose-300 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                      🌅 {sunset}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Famous Delicacies & Shopping Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Utensils className="w-4 h-4" /> Iconic Local Delicacies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {insights.famousFoods.map((food, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                      🍱 {food}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShoppingBag className="w-4 h-4" /> Top Souvenirs to Buy
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {insights.shoppingToBuy.map((shop, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                      🛍️ {shop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
