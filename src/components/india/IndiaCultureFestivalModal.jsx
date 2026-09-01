import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Utensils, Calendar, ShoppingBag, MapPin, ArrowRight } from 'lucide-react';
import { FESTIVAL_TRAVEL_RECOMMENDATIONS, INDIA_FOOD_EXPLORER, DOMESTIC_CATEGORIES } from '../../data/phase7Data';

export default function IndiaCultureFestivalModal({ isOpen, onClose, onOpenPlanner }) {
  const [activeTab, setActiveTab] = useState('festivals'); // 'festivals' | 'food' | 'categories'

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
                🪔
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  India Food, Culture & Festival Explorer
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Domestic Intelligence
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Navratri, Kumbh Mela, Pushkar Fair, Regional Delicacies & Traditional Markets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2">
            {[
              { key: 'festivals', label: 'Festival Celebrations (Navratri, Kumbh, Pushkar)' },
              { key: 'food', label: 'Local Food & Street Flavors' },
              { key: 'categories', label: 'Domestic Travel Categories' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
            
            {/* Festivals View */}
            {activeTab === 'festivals' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FESTIVAL_TRAVEL_RECOMMENDATIONS.map(fest => (
                  <div key={fest.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                    <div className="h-40 relative">
                      <img src={fest.image} alt={fest.festival} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent p-3 flex items-end">
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md">
                          📅 {fest.date}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{fest.festival}</h4>
                        <p className="text-[11px] text-amber-400 font-semibold mt-0.5">📍 {fest.location}</p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{fest.highlight}</p>
                      </div>

                      <button
                        onClick={() => { onOpenPlanner(); onClose(); }}
                        className="mt-3 w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-amber-500/40"
                      >
                        Plan Festival Trip <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Food Explorer View */}
            {activeTab === 'food' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Culinary Trail & Iconic Regional Dining</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INDIA_FOOD_EXPLORER.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-sm text-slate-100">{item.region} Delicacies</h5>
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-md">
                          Authentic Local
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">🍽️ Must Try: <strong className="text-amber-400">{item.food}</strong></p>
                      <p className="text-xs text-slate-400">📍 Iconic Dining Spots: {item.spot}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories View */}
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {DOMESTIC_CATEGORIES.map(cat => (
                  <div key={cat.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-2">
                    <img src={cat.image} alt={cat.title} className="w-full h-28 object-cover rounded-xl" />
                    <h5 className="font-bold text-xs text-slate-100 truncate">{cat.title}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{cat.desc}</p>
                    <p className="text-xs font-black text-amber-400">From ₹{cat.startingPrice.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
