import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Star, ShieldCheck, Heart, MapPin, Check, Leaf } from 'lucide-react';
import { RESTAURANTS_RANKINGS_DATA } from '../../data/phase4Data';

export default function AIRestaurantRankings({ destination = 'All' }) {
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [jainOnlyFilter, setJainOnlyFilter] = useState(false);

  const filteredRestaurants = RESTAURANTS_RANKINGS_DATA.filter(r => {
    const matchesDest = destination === 'All' || r.destination.toLowerCase() === destination.toLowerCase();
    const matchesVeg = !vegOnlyFilter || r.vegOnly;
    const matchesJain = !jainOnlyFilter || r.jainAvailable;
    return matchesDest && matchesVeg && matchesJain;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-400" />
              AI Restaurant & Food Rankings
            </h3>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Hygiene Scored
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Ranked by taste, cleanliness, local popularity, Veg & Jain compliance</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              vegOnlyFilter
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> 100% Pure Veg Only
          </button>
          <button
            onClick={() => setJainOnlyFilter(!jainOnlyFilter)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              jainOnlyFilter
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Jain Meals Available
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredRestaurants.map((res) => (
          <div
            key={res.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-slate-100">{res.name}</h4>
                {res.vegOnly && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-bold border border-emerald-500/30 flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Pure Veg
                  </span>
                )}
                {res.jainAvailable && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-bold border border-amber-500/30">
                    Jain Options
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400">{res.cuisine} • <strong className="text-slate-300">{res.destination}</strong></p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                <span>🔥 Taste: <strong className="text-amber-400">{res.tasteScore}/10</strong></span>
                <span>✨ Hygiene: <strong className="text-emerald-400">{res.hygieneScore}/10</strong></span>
                <span>📍 Popularity: <strong className="text-sky-400">{res.popularity}</strong></span>
              </div>

              <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2 rounded-xl border border-slate-800/60 mt-1">
                ⭐ Must Try: {res.mustTry}
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-xs text-slate-400 font-bold">{res.priceRange}</p>
              <button
                onClick={() => alert(`Showing table reservation & map route for ${res.name}`)}
                className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-colors"
              >
                View Menu & Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
