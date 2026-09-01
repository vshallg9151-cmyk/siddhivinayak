import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Star, Award, ShieldCheck, Heart, MapPin, Users, DollarSign, Sparkles, Filter } from 'lucide-react';
import { HOTELS_RANKINGS_DATA } from '../../data/phase4Data';

export default function AIHotelRankings({ destination = 'All' }) {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredHotels = HOTELS_RANKINGS_DATA.filter(h => {
    const matchesDest = destination === 'All' || h.destination.toLowerCase() === destination.toLowerCase();
    const matchesCat = categoryFilter === 'All' || h.category === categoryFilter;
    return matchesDest && matchesCat;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 backdrop-blur-xl">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Hotel className="w-5 h-5 text-amber-400" />
              AI Ranked Hotels & Resorts
            </h3>
            <span className="bg-amber-500/20 text-amber-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              Verified Ratings
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Scored by AI across cleanliness, distance, family friendliness & value</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === 'All'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Ratings
          </button>
          <button
            onClick={() => setCategoryFilter('Luxury')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === 'Luxury'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Luxury 5-Star
          </button>
          <button
            onClick={() => setCategoryFilter('Standard')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === 'Standard'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Standard & Resort
          </button>
        </div>
      </div>

      {/* Hotel Cards List */}
      <div className="space-y-4">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row gap-5 items-stretch"
          >
            {/* Left Image */}
            <div className="relative w-full md:w-56 h-40 rounded-xl overflow-hidden shrink-0">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Score {hotel.aiRecommendationScore}%
              </div>
            </div>

            {/* Middle Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{hotel.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> {hotel.destination} • {hotel.distanceFromCenter}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-xl border border-amber-500/30 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {hotel.rating} ({hotel.reviewsCount})
                  </div>
                </div>

                {/* Score Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Cleanliness</p>
                    <p className="text-xs font-extrabold text-emerald-400">{hotel.cleanliness} / 10</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Family Friendly</p>
                    <p className="text-xs font-extrabold text-sky-400">{hotel.familyScore} / 10</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Couple Vibe</p>
                    <p className="text-xs font-extrabold text-rose-400">{hotel.coupleScore} / 10</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Budget Rating</p>
                    <p className="text-xs font-extrabold text-amber-400">{hotel.budgetScore} / 10</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {hotel.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800 font-medium">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Price & Booking Drop */}
            <div className="md:w-44 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400">Avg Room / Night</p>
                <p className="text-xl font-black text-amber-400">₹{hotel.price.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-slate-500">+ Taxes & Breakfast</p>
              </div>

              <button
                onClick={() => alert(`Launching room reservation assistance for ${hotel.name}`)}
                className="w-full mt-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Reserve Stay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
