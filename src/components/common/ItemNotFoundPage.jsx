import React from 'react';
import { SearchX, Home, Car, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ItemNotFoundPage({ 
  title = "Destination or Vehicle Not Found", 
  message = "The location or vehicle you are searching for might have been moved or is currently unavailable.",
  onNavigate 
}) {
  return (
    <div className="min-h-[70vh] bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
          <SearchX className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1 shadow-md"
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>

          <button
            onClick={() => onNavigate && onNavigate('fleet')}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1"
          >
            <Car className="w-3.5 h-3.5 text-amber-400" /> Fleet
          </button>

          <button
            onClick={() => window.history.back()}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
