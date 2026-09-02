import React from 'react';
import { Car, UserCheck, ShieldCheck, Check } from 'lucide-react';

export default function RentalTypeCard({ selectedType, onChangeType, rentalType, onChange }) {
  const activeType = selectedType || rentalType || 'self-drive';
  const handleSelect = onChangeType || onChange || (() => {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      {/* Option 1: Self Drive */}
      <div
        onClick={() => handleSelect('self-drive')}
        className={`p-5 sm:p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
          activeType === 'self-drive'
            ? 'bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-slate-900/90 border-amber-400 text-white shadow-xl shadow-amber-500/10 scale-[1.01]'
            : 'bg-slate-900/80 backdrop-blur-md border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
        }`}
      >
        {activeType === 'self-drive' && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        <div>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 shadow-md">
            <Car className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white">Self Drive Rental</h3>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-4 leading-relaxed">
            Drive your dream car independently across highways with zero per-km limits.
          </p>

          <ul className="space-y-2 text-[11px] font-semibold text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Independent driving freedom</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Valid DL & Govt ID required</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Refundable Security Deposit applicable</span>
            </li>
          </ul>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-extrabold text-amber-400 flex items-center justify-between">
          <span>Standard Base Rental Rate</span>
          <span>Included</span>
        </div>
      </div>

      {/* Option 2: With Driver */}
      <div
        onClick={() => handleSelect('chauffeur')}
        className={`p-5 sm:p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
          activeType === 'chauffeur'
            ? 'bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-slate-900/90 border-amber-400 text-white shadow-xl shadow-amber-500/10 scale-[1.01]'
            : 'bg-slate-900/80 backdrop-blur-md border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
        }`}
      >
        {activeType === 'chauffeur' && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        <div>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 shadow-md">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>With Driver</span>
            <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
              VIP CARE
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-4 leading-relaxed">
            Relax and enjoy the view. Uniformed, background-verified professional chauffeur.
          </p>

          <ul className="space-y-2 text-[11px] font-semibold text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Professional verified chauffeur included</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero Driving License requirement</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Stress-free parking & highway expertise</span>
            </li>
          </ul>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-extrabold text-amber-400 flex items-center justify-between">
          <span>Chauffeur Allowance Fee</span>
          <span>+ ₹500 / day</span>
        </div>
      </div>

    </div>
  );
}
