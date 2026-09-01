import React from 'react';
import { Compass, Home, PhoneCall, ArrowLeft } from 'lucide-react';
import { DISPLAY_PHONE } from '../../utils/whatsappHelper';

export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-amber-400">404</h1>
          <h2 className="text-xl font-bold text-slate-100">Destination Not Found</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or tour itinerary you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onGoHome}
            className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Home className="w-4 h-4" /> Return to Home
          </button>
          <a
            href="https://wa.me/919173746558"
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-700"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
