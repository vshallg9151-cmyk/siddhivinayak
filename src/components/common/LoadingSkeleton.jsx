import React from 'react';
import { Sparkles, Car } from 'lucide-react';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-[70vh] bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6 animate-pulse">
        
        {/* Animated Brand Logo Spinner */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto shadow-lg shadow-amber-500/20">
          <Car className="w-8 h-8 text-slate-950 animate-bounce" />
        </div>

        <div className="space-y-2">
          <div className="h-6 bg-slate-900 rounded-xl w-3/4 mx-auto border border-slate-800"></div>
          <div className="h-4 bg-slate-900 rounded-xl w-1/2 mx-auto border border-slate-800"></div>
        </div>

        {/* Skeleton Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="h-48 bg-slate-950 rounded-2xl border border-slate-800/80"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-950 rounded-lg w-full"></div>
            <div className="h-4 bg-slate-950 rounded-lg w-5/6"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-10 bg-slate-950 rounded-xl"></div>
            <div className="h-10 bg-slate-950 rounded-xl"></div>
            <div className="h-10 bg-slate-950 rounded-xl"></div>
          </div>
        </div>

        <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 animate-pulse">
          <Sparkles className="w-4 h-4" /> Loading Siddhivinayak Mobility Portal...
        </span>

      </div>
    </div>
  );
}
