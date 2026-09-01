import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Car, Flag, Sparkles } from 'lucide-react';

export default function BookingStatusTracker({ activeStatusIndex = 2 }) {
  const statuses = [
    { title: 'Enquiry Received', desc: 'Booking order placed', icon: Clock },
    { title: 'Verification Pending', desc: 'DL & Aadhaar audit', icon: ShieldCheck },
    { title: 'Booking Confirmed', desc: 'Vehicle reserved', icon: CheckCircle2 },
    { title: 'Vehicle Ready', desc: 'Sanitized & at hub', icon: Car },
    { title: 'Trip Started', desc: 'Key delivered', icon: Sparkles },
    { title: 'Trip Completed', desc: 'Vehicle returned', icon: Flag }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20">
            Real-Time Order Tracking
          </span>
          <h3 className="text-lg font-black text-white mt-1">Live Booking Status Preview</h3>
        </div>
        <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-max">
          Status: {statuses[activeStatusIndex]?.title}
        </div>
      </div>

      {/* 6-Stage Progress Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {statuses.map((item, idx) => {
          const isDone = idx <= activeStatusIndex;
          const isCurrent = idx === activeStatusIndex;
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                isCurrent
                  ? 'bg-brand-navy border-brand-gold text-white shadow-luxury-gold ring-1 ring-brand-gold'
                  : isDone
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 text-xs font-bold ${
                isCurrent
                  ? 'bg-brand-gold text-brand-navy'
                  : isDone
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-[11px] font-extrabold leading-tight">{item.title}</h4>
              <span className="text-[9px] text-slate-400 font-medium mt-1">{item.desc}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
