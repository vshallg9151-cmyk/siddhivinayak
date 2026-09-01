import React from 'react';
import { Scale, X, ArrowRight, Sparkles } from 'lucide-react';

export default function CompareBar({ compareList, onRemoveFromCompare, onOpenComparePage, onClearCompare }) {
  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-brand-navy text-white p-4 rounded-3xl shadow-2xl border border-brand-gold/30 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-gold text-brand-navy flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>Compare Vehicles</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-brand-gold">
                {compareList.length} / 3 Selected
              </span>
            </h4>
            <p className="text-[11px] text-slate-300">Select up to 3 cars to compare specs & pricing</p>
          </div>
        </div>

        {/* Selected Car Thumbnails */}
        <div className="flex items-center gap-2">
          {compareList.map((car) => (
            <div key={car.id} className="relative group">
              <img
                src={car.image}
                alt={car.name}
                className="w-12 h-10 rounded-xl object-cover border border-white/20"
              />
              <button
                onClick={() => onRemoveFromCompare(car.id)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] shadow"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClearCompare}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>
          <button
            onClick={onOpenComparePage}
            disabled={compareList.length < 2}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs shadow-luxury transition-all flex items-center gap-1.5 ${
              compareList.length >= 2
                ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-brand-navy hover:scale-105 shadow-luxury-gold'
                : 'bg-white/10 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
