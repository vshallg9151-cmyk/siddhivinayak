import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Bell, AlertTriangle, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { PRICE_PREDICTION_DATA } from '../../data/phase7Data';

export default function PricePredictionWidget() {
  const [alertSaved, setAlertSaved] = useState(false);

  const handleSaveAlert = () => {
    setAlertSaved(true);
    setTimeout(() => setAlertSaved(false), 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-slate-100">AI Price Prediction & Trend Engine</h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live Forecast
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Intelligent pricing insights & price drop alert tracker</p>
        </div>

        <button
          onClick={handleSaveAlert}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            alertSaved
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
          }`}
        >
          {alertSaved ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {alertSaved ? 'Price Alert Active!' : 'Set Free Price Drop Alert'}
        </button>
      </div>

      {/* Prediction Warning Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200 leading-snug">
          {PRICE_PREDICTION_DATA.predictionAlert}
        </p>
      </div>

      {/* Flight & Hotel Price Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flight Trend */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">✈️ Flight Price Trend (Mumbai - Goa)</h4>
          <div className="flex items-end gap-3 h-28 pt-4">
            {PRICE_PREDICTION_DATA.flights.map((f, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-bold text-amber-400">₹{f.price}</span>
                <div
                  style={{ height: `${(f.price / 4500) * 100}%` }}
                  className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md"
                />
                <span className="text-[9px] text-slate-400">{f.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Trend */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">🏨 Hotel Price Trend (Lonavala Resorts)</h4>
          <div className="flex items-end gap-3 h-28 pt-4">
            {PRICE_PREDICTION_DATA.hotels.map((h, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-bold text-sky-400">₹{h.price}</span>
                <div
                  style={{ height: `${(h.price / 7500) * 100}%` }}
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md"
                />
                <span className="text-[9px] text-slate-400">{h.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
